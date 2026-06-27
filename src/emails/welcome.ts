export function welcomeEmail(email: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Bienvenido a Diario de un Dev</title>
</head>
<body style="margin:0;padding:0;background-color:#f5ece7;font-family:Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#f5ece7;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:580px;width:100%;">

          <!-- HEADER / LOGO -->
          <tr>
            <td style="padding-bottom:24px;">
              <table cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="
                    background-color:#ffdb33;
                    border:2px solid #000;
                    width:40px;
                    height:40px;
                    text-align:center;
                    vertical-align:middle;
                    font-family:'Arial Black',Impact,sans-serif;
                    font-size:20px;
                    font-weight:900;
                    color:#000;
                    box-shadow:2px 2px 0 0 #000;
                  ">D</td>
                  <td style="padding-left:4px;vertical-align:middle;">
                    <span style="
                      font-family:'Arial Black',Impact,sans-serif;
                      font-size:18px;
                      font-weight:900;
                      color:#000;
                      letter-spacing:-0.5px;
                    ">iariodeun<span style="background-color:#ffdb33;padding:0 4px;">dev</span></span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- MAIN CARD -->
          <tr>
            <td style="
              background-color:#ffffff;
              border:2px solid #000;
              box-shadow:8px 8px 0 0 #000;
            ">

              <!-- CARD HEADER (yellow band) -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="
                    background-color:#ffdb33;
                    border-bottom:2px solid #000;
                    padding:20px 32px;
                  ">
                    <h1 style="
                      margin:0;
                      font-family:'Arial Black',Impact,sans-serif;
                      font-size:28px;
                      font-weight:900;
                      color:#000;
                      line-height:1.1;
                      text-transform:uppercase;
                      letter-spacing:-0.5px;
                    ">¡Ya eres parte<br/>de la newsletter!</h1>
                  </td>
                </tr>

                <!-- CARD BODY -->
                <tr>
                  <td style="padding:32px;">

                    <p style="
                      margin:0 0 20px 0;
                      font-family:Arial,sans-serif;
                      font-size:16px;
                      line-height:1.7;
                      color:#000;
                    ">
                      Gracias por suscribirte a <strong>diariodeundev.com</strong>.
                      Tu correo ya está en la lista y recibirás los próximos artículos directamente aquí.
                    </p>

                    <p style="
                      margin:0 0 28px 0;
                      font-family:Arial,sans-serif;
                      font-size:16px;
                      line-height:1.7;
                      color:#000;
                    ">
                      Espero que el contenido te resulte útil — escribo sobre desarrollo web,
                      experiencias reales del día a día como dev y todo lo que aprendo por el camino.
                      Sin filtros, sin postureo.
                    </p>

                    <!-- ACCENT BOX -->
                    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:28px;">
                      <tr>
                        <td style="
                          background-color:#fae583;
                          border:2px solid #000;
                          border-left:4px solid #ffdb33;
                          padding:16px 20px;
                          font-family:Arial,sans-serif;
                          font-size:15px;
                          line-height:1.6;
                          color:#000;
                          font-style:italic;
                        ">
                          Sin spam. Sin ruido. Solo contenido cuando merece la pena publicarlo.
                        </td>
                      </tr>
                    </table>

                    <!-- CTA BUTTON -->
                    <table cellpadding="0" cellspacing="0" role="presentation">
                      <tr>
                        <td style="
                          background-color:#ffdb33;
                          border:2px solid #000;
                          box-shadow:4px 4px 0 0 #000;
                        ">
                          <a href="https://diariodeundev.com" style="
                            display:block;
                            padding:12px 28px;
                            font-family:'Arial Black',Impact,sans-serif;
                            font-size:15px;
                            font-weight:900;
                            color:#000;
                            text-decoration:none;
                            text-transform:uppercase;
                            letter-spacing:0.5px;
                          ">Leer el blog →</a>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding-top:32px;text-align:center;">
              <p style="
                margin:0 0 8px 0;
                font-family:Arial,sans-serif;
                font-size:13px;
                color:#5a5a5a;
              ">
                © ${new Date().getFullYear()} · <a href="https://diariodeundev.com" style="color:#000;text-decoration:underline;">diariodeundev.com</a>
              </p>
              <p style="
                margin:0;
                font-family:Arial,sans-serif;
                font-size:12px;
                color:#aeaeae;
              ">
                Recibiste este correo porque ${email} se suscribió a la newsletter.
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
