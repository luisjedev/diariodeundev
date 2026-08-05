const SITE_URL = "https://diariodeundev.com";

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

/**
 * Genera el correo que anuncia un nuevo artículo.
 *
 * En un broadcast, unsubscribeUrl debe ser {{{RESEND_UNSUBSCRIBE_URL}}} para
 * que Resend lo sustituya por el enlace individual de cada contacto.
 */
export function newPostEmail({
  title,
  description,
  slug,
  category,
  coverUrl,
  unsubscribeUrl = "{{{RESEND_UNSUBSCRIBE_URL}}}",
  isTest = false,
}) {
  const postUrl = `${SITE_URL}/blog/${encodeURIComponent(slug)}`;
  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(description);
  const safeCategory = escapeHtml(category || "Nuevo artículo");
  const safeCoverUrl = coverUrl ? escapeHtml(coverUrl) : null;
  const safePostUrl = escapeHtml(postUrl);
  const safeUnsubscribeUrl = escapeHtml(unsubscribeUrl);

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <title>${safeTitle}</title>
</head>
<body style="margin:0;padding:0;background-color:#f5ece7;font-family:Arial,sans-serif;color:#000;color-scheme:light;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${safeDescription}</div>

  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#f5ece7;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:580px;width:100%;">
          ${isTest ? `<tr><td style="padding:10px 16px;background:#000;color:#fff;font-size:12px;font-weight:700;text-align:center;text-transform:uppercase;letter-spacing:1px;">Vista previa · Solo tú has recibido este correo</td></tr><tr><td height="16"></td></tr>` : ""}

          <tr>
            <td style="padding-bottom:24px;">
              <table cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="background-color:#ffdb33;border:2px solid #000;width:40px;height:40px;text-align:center;vertical-align:middle;font-family:'Arial Black',Impact,sans-serif;font-size:20px;font-weight:900;color:#000;box-shadow:2px 2px 0 #000;">D</td>
                  <td style="padding-left:4px;vertical-align:middle;">
                    <span style="font-family:'Arial Black',Impact,sans-serif;font-size:18px;font-weight:900;color:#000;letter-spacing:-0.5px;">iariodeun<span style="background-color:#ffdb33;padding:0 4px;">dev</span></span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background-color:#fff;border:2px solid #000;box-shadow:8px 8px 0 #000;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="background-color:#ffdb33;border-bottom:2px solid #000;padding:16px 32px;font-family:'Arial Black',Impact,sans-serif;font-size:13px;font-weight:900;text-transform:uppercase;letter-spacing:1px;">
                    Nuevo artículo
                  </td>
                </tr>
                <tr>
                  <td style="padding:32px;">
                    <span style="display:inline-block;background-color:#fae583;border:2px solid #000;padding:5px 10px;font-family:Arial,sans-serif;font-size:12px;font-weight:700;text-transform:uppercase;">${safeCategory}</span>

                    <h1 style="margin:20px 0 16px;font-family:'Arial Black',Impact,sans-serif;font-size:32px;font-weight:900;line-height:1.12;letter-spacing:-0.8px;color:#000;">${safeTitle}</h1>

                    <p style="margin:0 0 28px;font-family:Arial,sans-serif;font-size:17px;line-height:1.7;color:#222;">${safeDescription}</p>

                    ${safeCoverUrl ? `<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:28px;">
                      <tr>
                        <td style="border:2px solid #000;line-height:0;">
                          <a href="${safePostUrl}" style="display:block;">
                            <img src="${safeCoverUrl}" width="512" alt="Portada de ${safeTitle}" style="display:block;width:100%;max-width:512px;height:auto;border:0;" />
                          </a>
                        </td>
                      </tr>
                    </table>` : ""}

                    <table cellpadding="0" cellspacing="0" role="presentation">
                      <tr>
                        <td style="background-color:#ffdb33;border:2px solid #000;box-shadow:4px 4px 0 #000;">
                          <a href="${safePostUrl}" style="display:block;padding:13px 28px;font-family:'Arial Black',Impact,sans-serif;font-size:15px;font-weight:900;color:#000;text-decoration:none;text-transform:uppercase;letter-spacing:0.5px;">Leer el artículo →</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding-top:32px;text-align:center;">
              <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:13px;color:#5a5a5a;">© ${new Date().getFullYear()} · <a href="${SITE_URL}" style="color:#000;text-decoration:underline;">diariodeundev.com</a></p>
              <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;line-height:1.6;color:#777;">
                Recibiste este correo porque te suscribiste a la newsletter.<br />
                ${isTest ? "En el envío real aparecerá aquí el enlace personal de baja." : `<a href="${safeUnsubscribeUrl}" style="color:#5a5a5a;text-decoration:underline;">Darme de baja</a>`}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function newPostText({ title, description, slug, unsubscribeUrl }) {
  return `Nuevo artículo en Diario de un Dev\n\n${title}\n\n${description}\n\nLeer el artículo: ${SITE_URL}/blog/${encodeURIComponent(slug)}${unsubscribeUrl ? `\n\nDarme de baja: ${unsubscribeUrl}` : ""}`;
}
