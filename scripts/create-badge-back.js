const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const width = 1024;
const height = 1440;

const stripes = Array.from({ length: 64 }, (_, i) => {
  const x = 50 + i * 11.8;
  const w = ((i * 17 + 5) % 4) + 1.8;
  return `<rect x="${x.toFixed(1)}" y="25" width="${w.toFixed(1)}" height="70" fill="rgba(255,255,255,0.75)" />`;
}).join('\n');

const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="cardGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f1319" />
      <stop offset="50%" stop-color="#161b24" />
      <stop offset="100%" stop-color="#0b0e14" />
    </linearGradient>
    <linearGradient id="accentGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ff5722" />
      <stop offset="100%" stop-color="#ff9800" />
    </linearGradient>
    <pattern id="dotPattern" width="28" height="28" patternUnits="userSpaceOnUse">
      <circle cx="14" cy="14" r="1" fill="rgba(255,255,255,0.06)" />
    </pattern>
  </defs>

  <rect width="${width}" height="${height}" fill="url(#cardGrad)" />
  <rect width="${width}" height="${height}" fill="url(#dotPattern)" />

  <rect x="40" y="40" width="944" height="1360" rx="36" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="2" />
  <rect x="52" y="52" width="920" height="1336" rx="28" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1" />

  <!-- Top Hang Slot Indicator Marker -->
  <rect x="442" y="66" width="140" height="18" rx="9" fill="rgba(255,255,255,0.06)" />

  <!-- Header -->
  <text x="80" y="160" font-family="Courier New, monospace" font-size="24" font-weight="bold" fill="#ff5722" letter-spacing="4">// DEV IDENTIFICATION PASS</text>
  <text x="944" y="160" text-anchor="end" font-family="Courier New, monospace" font-size="20" fill="rgba(255,255,255,0.4)">AUTH: VERIFIED</text>
  <line x1="80" y1="190" x2="944" y2="190" stroke="rgba(255,255,255,0.15)" stroke-width="2" />

  <!-- Seal -->
  <circle cx="512" cy="350" r="90" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.15)" stroke-width="2" />
  <circle cx="512" cy="350" r="76" fill="none" stroke="url(#accentGrad)" stroke-width="2" stroke-dasharray="6,6" />
  <text x="512" y="375" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="68" fill="#ffffff">TJ</text>

  <!-- Name & Role -->
  <text x="512" y="495" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="52" fill="#ffffff" letter-spacing="3">THANZEER J</text>
  <text x="512" y="540" text-anchor="middle" font-family="Courier New, monospace" font-weight="bold" font-size="24" fill="#ff9800" letter-spacing="5">FULL-STACK DEVELOPER</text>
  <text x="512" y="575" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="20" fill="rgba(255,255,255,0.5)">WEB &amp; MOBILE APPLICATIONS SPECIALIST</text>

  <!-- Specs Box -->
  <rect x="80" y="620" width="864" height="400" rx="16" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" stroke-width="1.5" />

  <text x="120" y="680" font-family="Courier New, monospace" font-size="18" fill="rgba(255,255,255,0.4)">BASE LOCATION</text>
  <text x="120" y="718" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="26" fill="#ffffff">Kerala, India</text>

  <text x="540" y="680" font-family="Courier New, monospace" font-size="18" fill="rgba(255,255,255,0.4)">EDUCATION</text>
  <text x="540" y="718" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="26" fill="#ffffff">B.Tech in CSE</text>

  <line x1="120" y1="755" x2="904" y2="755" stroke="rgba(255,255,255,0.06)" stroke-width="1" />

  <text x="120" y="810" font-family="Courier New, monospace" font-size="18" fill="rgba(255,255,255,0.4)">CORE TECH</text>
  <text x="120" y="846" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="24" fill="#ffffff">React · Next.js · Node · React Native</text>

  <text x="540" y="810" font-family="Courier New, monospace" font-size="18" fill="rgba(255,255,255,0.4)">SYSTEMS</text>
  <text x="540" y="846" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="24" fill="#ffffff">Linux · Networking · Security</text>

  <line x1="120" y1="885" x2="904" y2="885" stroke="rgba(255,255,255,0.06)" stroke-width="1" />

  <text x="120" y="940" font-family="Courier New, monospace" font-size="18" fill="rgba(255,255,255,0.4)">AVAILABILITY</text>
  <text x="120" y="976" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="24" fill="#4ade80">&#9679; Open for Opportunities</text>

  <text x="540" y="940" font-family="Courier New, monospace" font-size="18" fill="rgba(255,255,255,0.4)">CONTACT</text>
  <text x="540" y="976" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="24" fill="#ffffff">thanzeerwork@gmail.com</text>

  <!-- Barcode Area -->
  <g transform="translate(80, 1070)">
    <rect x="0" y="0" width="864" height="120" rx="8" fill="rgba(255,255,255,0.03)" />
    ${stripes}
  </g>
  <text x="512" y="1235" text-anchor="middle" font-family="Courier New, monospace" font-size="18" fill="rgba(255,255,255,0.4)">SERIAL: TJ-2026-ENG-03 &#183; VERIFIED PASS</text>

  <!-- Hint -->
  <text x="512" y="1330" text-anchor="middle" font-family="Courier New, monospace" font-size="20" fill="rgba(255,255,255,0.45)">&#8644; DRAG TO INTERACT &#183; CLICK TO FLIP</text>
</svg>
`;

const dest = path.join(__dirname, '..', 'public', 'images', 'thanzeer-id-back.png');
sharp(Buffer.from(svg))
  .png({ quality: 95 })
  .toFile(dest)
  .then(() => console.log('Successfully created:', dest))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
