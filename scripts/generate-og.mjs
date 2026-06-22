import sharp from "/Users/luisg/Desktop/diariodeundev/node_modules/.pnpm/sharp@0.34.5/node_modules/sharp/lib/index.js";
import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../public/og.png");

const W = 1200;
const H = 630;

// Box dimensions
const BOX = 300;
const BOX_X = 80;
const BOX_Y = (H - BOX) / 2;
const SHADOW = 14;

const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="${W}" height="${H}" fill="#fff"/>

  <!-- Top/bottom accent stripes -->
  <rect x="0" y="0" width="${W}" height="8" fill="#ffdb33"/>
  <rect x="0" y="${H - 8}" width="${W}" height="8" fill="#ffdb33"/>

  <!-- D box shadow -->
  <rect x="${BOX_X + SHADOW}" y="${BOX_Y + SHADOW}" width="${BOX}" height="${BOX}" fill="#000"/>
  <!-- D box -->
  <rect x="${BOX_X}" y="${BOX_Y}" width="${BOX}" height="${BOX}" fill="#ffdb33" stroke="#000" stroke-width="4"/>
  <!-- D letter -->
  <text
    x="${BOX_X + BOX / 2}"
    y="${BOX_Y + BOX / 2 + 10}"
    text-anchor="middle"
    dominant-baseline="middle"
    font-family="Arial Black, Impact, sans-serif"
    font-size="220"
    font-weight="900"
    fill="#000"
  >D</text>

  <!-- Right side content -->
  <!-- "diariodeun" -->
  <text
    x="430"
    y="248"
    font-family="Arial Black, Impact, sans-serif"
    font-size="74"
    font-weight="900"
    fill="#000"
  >diariodeun</text>

  <!-- "dev" highlight box -->
  <rect x="430" y="266" width="198" height="82" fill="#ffdb33"/>
  <!-- "dev" text -->
  <text
    x="430"
    y="334"
    font-family="Arial Black, Impact, sans-serif"
    font-size="74"
    font-weight="900"
    fill="#000"
  >dev</text>

  <!-- Tagline -->
  <text
    x="430"
    y="408"
    font-family="Arial, Helvetica, sans-serif"
    font-size="28"
    fill="#5a5a5a"
  >Código, ideas y todo lo aprendido.</text>

  <!-- Divider -->
  <rect x="430" y="438" width="680" height="3" fill="#000"/>

  <!-- Bottom label -->
  <text
    x="430"
    y="472"
    font-family="Arial, Helvetica, sans-serif"
    font-size="20"
    letter-spacing="3"
    fill="#aeaeae"
  >APRENDIENDO EN PÚBLICO · UN COMMIT A LA VEZ</text>

  <!-- Outer border -->
  <rect x="0" y="0" width="${W}" height="${H}" fill="none" stroke="#000" stroke-width="6"/>
</svg>`;

const buf = Buffer.from(svg);
await sharp(buf).png().toFile(OUT);
console.log("✓ og.png generada en public/og.png");
