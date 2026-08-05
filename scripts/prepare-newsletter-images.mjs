import { mkdir, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import sharp from "sharp";

const CONTENT_DIR = path.resolve("src/content/blog");
const OUTPUT_DIR = path.resolve("public/images/newsletter");

export async function prepareNewsletterImages() {
  const files = (await readdir(CONTENT_DIR)).filter((file) =>
    /\.(md|mdx)$/.test(file),
  );

  await mkdir(OUTPUT_DIR, { recursive: true });

  const covers = new Map();

  for (const file of files) {
    const postPath = path.join(CONTENT_DIR, file);
    const { data } = matter(await readFile(postPath, "utf8"));
    if (typeof data.cover !== "string" || /^https?:\/\//.test(data.cover)) {
      continue;
    }

    const slug = file.replace(/\.(md|mdx)$/, "");
    const source = path.resolve(path.dirname(postPath), data.cover);
    const output = path.join(OUTPUT_DIR, `${slug}.jpg`);

    await sharp(source)
      .resize({ width: 1160, withoutEnlargement: true })
      .jpeg({ quality: 82, progressive: true })
      .toFile(output);

    covers.set(slug, `/images/newsletter/${slug}.jpg`);
  }

  return covers;
}

const isMain =
  process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);

if (isMain) {
  const covers = await prepareNewsletterImages();
  console.log(`${covers.size} portada(s) preparadas para la newsletter.`);
}
