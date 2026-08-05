<div align="center">

# Diario de un Dev

### Opinión, experiencias y tecnología escritas sin prisa.

[**Leer el blog →**](https://diariodeundev.com)

<img src="./public/og.png" alt="Portada de Diario de un Dev" width="100%" />

</div>

## Un diario sobre el oficio de crear software

**Diario de un Dev** es mi rincón personal para escribir sobre desarrollo web, inteligencia artificial y todo lo que voy aprendiendo por el camino.

Aquí tienen cabida las decisiones técnicas, los errores que terminan enseñando algo, las ideas todavía a medio formar y la parte menos visible de trabajar como desarrollador. Sin fórmulas mágicas, sin contenido de relleno y sin postureo.

## Qué encontrarás

- Experiencias reales del día a día como desarrollador.
- Reflexiones sobre tecnología e inteligencia artificial.
- Aprendizajes, decisiones y errores construyendo productos.
- Opinión personal sobre cómo cambia nuestro oficio.
- Artículos escritos cuando hay algo que merece la pena contar.

## El blog por dentro

El sitio está construido con **Astro**, artículos en **Markdown y MDX** y una interfaz retro/neobrutalista basada en **RetroUI** y **Tailwind CSS**. Los elementos interactivos utilizan pequeñas islas de **React** y la newsletter se integra con **Resend**.

El despliegue se realiza en **Vercel**, junto con Web Analytics y Speed Insights.

## Newsletter

Los nuevos artículos se anuncian mediante borradores de Broadcasts en Resend. Las variables `RESEND_API_KEY` y `RESEND_SEGMENT_ID` deben estar configuradas en `.env` (`RESEND_AUDIENCE_ID` sigue admitida por compatibilidad).

```bash
# Envía una prueba a una sola dirección
pnpm newsletter:test esto-sirve-para-algo correo@ejemplo.com

# Crea un borrador para toda la audiencia; nunca lo envía automáticamente
pnpm newsletter:create esto-sirve-para-algo
```

Si no se indica el slug al crear el borrador, se utiliza el último post publicado y visible. Durante el build se genera en `public/images/newsletter/` una versión optimizada de la portada para incluirla en el correo. El envío definitivo se revisa, programa o confirma desde el panel de Resend.

## Enlace

🌐 **[https://diariodeundev.com](https://diariodeundev.com)**

---

<div align="center">

Escrito y construido por **Luis**.

</div>
