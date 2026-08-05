import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import matter from "gray-matter";
import { Resend } from "resend";
import { newPostEmail, newPostText } from "../src/emails/new-post.mjs";
import { prepareNewsletterImages } from "./prepare-newsletter-images.mjs";

const CONTENT_DIR = path.resolve("src/content/blog");
const FROM = "diariodeundev.com <newsletter@diariodeundev.com>";
const REPLY_TO = "luisjedev@gmail.com";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UNSUBSCRIBE_URL = "{{{RESEND_UNSUBSCRIBE_URL}}}";

function fail(message) {
  console.error(`Error: ${message}`);
  process.exit(1);
}

async function readPosts() {
  const files = (await readdir(CONTENT_DIR)).filter((file) =>
    /\.(md|mdx)$/.test(file),
  );

  return Promise.all(
    files.map(async (file) => {
      const source = await readFile(path.join(CONTENT_DIR, file), "utf8");
      const { data } = matter(source);

      return {
        slug: file.replace(/\.(md|mdx)$/, ""),
        title: data.title,
        description: data.description,
        category: data.category,
        cover: data.cover,
        pubDate: new Date(data.pubDate),
        draft: data.draft === true,
        visible: data.visible !== false,
      };
    }),
  );
}

async function getPost(requestedSlug) {
  const posts = await readPosts();
  const post = requestedSlug
    ? posts.find(({ slug }) => slug === requestedSlug)
    : posts
        .filter(({ draft, visible }) => !draft && visible)
        .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime())[0];

  if (!post) {
    fail(
      requestedSlug
        ? `no existe el post "${requestedSlug}".`
        : "no hay ningún post publicable.",
    );
  }

  if (!post.title || !post.description || Number.isNaN(post.pubDate.getTime())) {
    fail(`el frontmatter de "${post.slug}" está incompleto.`);
  }

  if (post.draft || !post.visible) {
    fail(`el post "${post.slug}" es borrador o no es visible.`);
  }

  return post;
}

const [command, slug, recipient] = process.argv.slice(2);

if (!['draft', 'test'].includes(command)) {
  fail(
    "uso: pnpm newsletter:create [slug] o pnpm newsletter:test [slug] <email>.",
  );
}

const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) fail("falta RESEND_API_KEY en .env.");

const post = await getPost(slug);
const generatedCovers = await prepareNewsletterImages();
const coverPath =
  typeof post.cover === "string" && /^https?:\/\//.test(post.cover)
    ? post.cover
    : generatedCovers.get(post.slug);
const coverUrl = coverPath
  ? new URL(coverPath, "https://diariodeundev.com").toString()
  : undefined;
const emailPost = { ...post, coverUrl };
const resend = new Resend(apiKey);
const subject = `Nuevo artículo: ${post.title}`;

if (command === "test") {
  if (!recipient || !EMAIL_RE.test(recipient)) {
    fail("indica un destinatario válido después del slug.");
  }

  const { data, error } = await resend.emails.send({
    from: FROM,
    to: recipient,
    replyTo: REPLY_TO,
    subject: `[PRUEBA] ${subject}`,
    html: newPostEmail({ ...emailPost, isTest: true }),
    text: newPostText(emailPost),
  });

  if (error) fail(error.message);
  console.log(`Prueba enviada solo a ${recipient}. ID: ${data.id}`);
  process.exit(0);
}

const segmentId =
  process.env.RESEND_SEGMENT_ID ?? process.env.RESEND_AUDIENCE_ID;
if (!segmentId) {
  fail("falta RESEND_SEGMENT_ID (o el antiguo RESEND_AUDIENCE_ID) en .env.");
}

const { data, error } = await resend.broadcasts.create({
  segmentId,
  from: FROM,
  replyTo: REPLY_TO,
  name: `${post.pubDate.toISOString().slice(0, 10)} · ${post.title}`,
  subject,
  previewText: post.description,
  html: newPostEmail(emailPost),
  text: newPostText({ ...emailPost, unsubscribeUrl: UNSUBSCRIBE_URL }),
  send: false,
});

if (error) fail(error.message);
console.log(`Borrador creado en Resend. ID: ${data.id}`);
console.log("Revísalo en Broadcasts y envíalo o prográmalo desde el panel.");
