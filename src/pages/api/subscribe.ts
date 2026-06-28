import type { APIRoute } from "astro";
import { Resend } from "resend";
import { welcomeEmail } from "@/emails/welcome";

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
  const normalizedEmail = email.trim().toLowerCase();

  // Comprobamos si el contacto ya existe para no reenviar la bienvenida.
  const existing = await resend.contacts.get({
    audienceId,
    email: normalizedEmail,
  });

  // Ya está suscrito y activo: avisamos y no hacemos nada.
  if (existing.data && existing.data.unsubscribed === false) {
    return json({
      message: "Este correo ya está suscrito a la newsletter.",
      alreadySubscribed: true,
    });
  }

  // Existe pero se había dado de baja: lo reactivamos.
  if (existing.data) {
    const { error } = await resend.contacts.update({
      audienceId,
      email: normalizedEmail,
      unsubscribed: false,
    });

    if (error) {
      return json(
        {
          error:
            "No hemos podido completar tu suscripción. Inténtalo de nuevo.",
        },
        502,
      );
    }
  } else {
    // No existe: lo creamos.
    const { error } = await resend.contacts.create({
      audienceId,
      email: normalizedEmail,
      unsubscribed: false,
    });

    if (error) {
      return json(
        {
          error:
            "No hemos podido completar tu suscripción. Inténtalo de nuevo.",
        },
        502,
      );
    }
  }

  await resend.emails.send({
    from: "diariodeundev.com <newsletter@diariodeundev.com>",
    to: normalizedEmail,
    subject: "¡Ya eres parte de la newsletter!",
    html: welcomeEmail(normalizedEmail),
  });

  return json({ message: "¡Suscripción confirmada!" });
};
