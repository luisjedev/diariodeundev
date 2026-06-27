import type { APIRoute } from "astro";
import { Resend } from "resend";

// El endpoint se ejecuta bajo demanda (no se prerenderiza en el build).
export const prerender = false;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.RESEND_API_KEY;
  const audienceId = import.meta.env.RESEND_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    return json(
      { error: "El servicio de newsletter no está configurado." },
      500,
    );
  }

  let email: unknown;
  try {
    const body = await request.json();
    email = body?.email;
  } catch {
    return json({ error: "Petición inválida." }, 400);
  }

  if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return json({ error: "Introduce un correo electrónico válido." }, 400);
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.contacts.create({
    audienceId,
    email: email.trim().toLowerCase(),
    unsubscribed: false,
  });

  if (error) {
    return json(
      { error: "No hemos podido completar tu suscripción. Inténtalo de nuevo." },
      502,
    );
  }

  return json({ message: "¡Suscripción confirmada!" });
};
