import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const outputDir = new URL("../public/screenshots/", import.meta.url);

const metrics = [
  { label: "Open requests", value: "128", delta: "+12.4%", tone: "#34d399" },
  { label: "SLA compliance", value: "98.2%", delta: "+0.8%", tone: "#34d399" },
  { label: "Escalations", value: "17", delta: "-3", tone: "#7dd3fc" },
  { label: "At-risk accounts", value: "4", delta: "2 new", tone: "#fbbf24" },
];

const trends = [
  { label: "Mon", value: 52, amount: "42" },
  { label: "Tue", value: 61, amount: "50" },
  { label: "Wed", value: 76, amount: "62" },
  { label: "Thu", value: 67, amount: "55" },
  { label: "Fri", value: 82, amount: "69" },
];

const activityItems = [
  { title: "New request approved", meta: "Finance onboarding flow completed 8 minutes ago." },
  { title: "Alert cleared", meta: "External webhook latency returned to baseline." },
  { title: "Report generated", meta: "Weekly operations summary exported for leadership." },
];

const projects = [
  {
    name: "Support queue revamp",
    owner: "Product Ops",
    status: "On track",
    color: "#34d399",
    summary: "Refining escalation paths and improving triage visibility.",
  },
  {
    name: "Audit trail export",
    owner: "Compliance",
    status: "Reviewing",
    color: "#7dd3fc",
    summary: "Preparing a client-friendly export with masked records.",
  },
];

const healthCards = [
  {
    title: "API gateway",
    status: "Healthy",
    detail: "99.98% uptime and normal latency across regions.",
  },
  {
    title: "Sync jobs",
    status: "Stable",
    detail: "Four nightly jobs completed without retries.",
  },
];

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function cardShadow() {
  return "filter='drop-shadow(0px 22px 60px rgba(2,6,23,0.35))'";
}

function renderMetricCards(x, y, cardW, cardH, gap, mobile = false) {
  return metrics
    .map((metric, index) => {
      const cx = x + index * (cardW + gap);
      return `
        <g transform="translate(${cx}, ${y})">
          <rect width="${cardW}" height="${cardH}" rx="20" fill="rgba(13,22,42,0.88)" stroke="rgba(148,163,184,0.22)" ${cardShadow()} />
          <text x="20" y="34" fill="#91a4c7" font-size="${mobile ? 11 : 12}" letter-spacing="2" text-transform="uppercase">${escapeXml(metric.label)}</text>
          <text x="20" y="${mobile ? 78 : 76}" fill="#e5eefc" font-size="${mobile ? 28 : 34}" font-weight="700" letter-spacing="-1.5">${escapeXml(metric.value)}</text>
          <rect x="${cardW - 74}" y="${mobile ? 54 : 52}" width="54" height="26" rx="13" fill="rgba(255,255,255,0.06)" />
          <text x="${cardW - 47}" y="${mobile ? 72 : 69}" text-anchor="middle" fill="${metric.tone}" font-size="11" font-weight="700">${escapeXml(metric.delta)}</text>
        </g>`;
    })
    .join("");
}

function renderTrendBars(x, y, width, mobile = false) {
  const rowH = mobile ? 44 : 48;
  const labelW = mobile ? 42 : 46;
  const valueW = mobile ? 34 : 40;
  const barW = width - labelW - valueW - 24;
  return trends
    .map((trend, index) => {
      const ty = y + index * rowH;
      return `
        <g transform="translate(${x}, ${ty})">
          <text x="0" y="16" fill="#91a4c7" font-size="${mobile ? 11 : 12}" font-weight="500">${escapeXml(trend.label)}</text>
          <rect x="${labelW}" y="7" width="${barW}" height="${mobile ? 8 : 10}" rx="999" fill="rgba(148,163,184,0.12)" />
          <rect x="${labelW}" y="7" width="${barW * (trend.value / 100)}" height="${mobile ? 8 : 10}" rx="999" fill="url(#barGradient)" />
          <text x="${labelW + barW + 14}" y="16" fill="#91a4c7" font-size="${mobile ? 11 : 12}" text-anchor="end">${escapeXml(trend.amount)}</text>
        </g>`;
    })
    .join("");
}

function renderActivity(x, y, mobile = false) {
  const rowH = mobile ? 54 : 60;
  return activityItems
    .map((item, index) => {
      const ty = y + index * rowH;
      return `
        <g transform="translate(${x}, ${ty})">
          <circle cx="6" cy="8" r="5" fill="#38bdf8" />
          <text x="22" y="12" fill="#e5eefc" font-size="${mobile ? 12 : 13}" font-weight="600">${escapeXml(item.title)}</text>
          <text x="22" y="${mobile ? 31 : 32}" fill="#91a4c7" font-size="${mobile ? 10 : 11}">${escapeXml(item.meta)}</text>
        </g>`;
    })
    .join("");
}

function renderProjects(x, y, width, mobile = false) {
  const cardH = mobile ? 118 : 122;
  const gap = mobile ? 12 : 14;
  return projects
    .map((project, index) => {
      const ty = y + index * (cardH + gap);
      return `
        <g transform="translate(${x}, ${ty})">
          <rect width="${width}" height="${cardH}" rx="18" fill="rgba(13,22,42,0.84)" stroke="rgba(148,163,184,0.22)" ${cardShadow()} />
          <text x="18" y="28" fill="#91a4c7" font-size="${mobile ? 10 : 11}" letter-spacing="2">${escapeXml(project.owner)}</text>
          <text x="18" y="${mobile ? 54 : 56}" fill="#e5eefc" font-size="${mobile ? 13 : 15}" font-weight="600">${escapeXml(project.name)}</text>
          <rect x="${width - 92}" y="20" width="70" height="24" rx="12" fill="rgba(255,255,255,0.06)" />
          <text x="${width - 57}" y="37" text-anchor="middle" fill="${project.color}" font-size="10" font-weight="700">${escapeXml(project.status)}</text>
          <text x="18" y="${mobile ? 84 : 90}" fill="#91a4c7" font-size="${mobile ? 10 : 11}">${escapeXml(project.summary)}</text>
        </g>`;
    })
    .join("");
}

function renderHealthCards(x, y, width, mobile = false) {
  const cardH = mobile ? 110 : 128;
  const gap = mobile ? 12 : 14;
  return healthCards
    .map((card, index) => {
      const tx = mobile ? x : x + (index % 2) * (width / 2 + gap / 2);
      const ty = mobile ? y + index * (cardH + gap) : y;
      const cardW = mobile ? width : width / 2 - gap / 2;
      return `
        <g transform="translate(${tx}, ${ty})">
          <rect width="${cardW}" height="${cardH}" rx="18" fill="rgba(13,22,42,0.84)" stroke="rgba(148,163,184,0.22)" ${cardShadow()} />
          <text x="18" y="30" fill="#91a4c7" font-size="${mobile ? 10 : 11}" letter-spacing="2">${escapeXml(card.title)}</text>
          <text x="18" y="58" fill="#e5eefc" font-size="${mobile ? 13 : 15}" font-weight="600">${escapeXml(card.status)}</text>
          <text x="18" y="${mobile ? 86 : 92}" fill="#91a4c7" font-size="${mobile ? 10 : 11}">${escapeXml(card.detail)}</text>
        </g>`;
    })
    .join("");
}

function buildDesktopSvg() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="1440" height="1600" viewBox="0 0 1440 1600">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#08111f" />
          <stop offset="100%" stop-color="#091423" />
        </linearGradient>
        <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#38bdf8" />
          <stop offset="100%" stop-color="#7dd3fc" />
        </linearGradient>
        <radialGradient id="orb1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="rgba(56,189,248,0.30)" />
          <stop offset="100%" stop-color="rgba(56,189,248,0)" />
        </radialGradient>
        <radialGradient id="orb2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="rgba(99,102,241,0.20)" />
          <stop offset="100%" stop-color="rgba(99,102,241,0)" />
        </radialGradient>
        <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M80 0 L0 0 0 80" fill="none" stroke="rgba(148,163,184,0.08)" stroke-width="1" />
        </pattern>
      </defs>

      <rect width="1440" height="1600" fill="url(#bg)" />
      <rect width="1440" height="1600" fill="url(#grid)" opacity="0.6" />
      <circle cx="110" cy="120" r="240" fill="url(#orb1)" />
      <circle cx="1320" cy="380" r="210" fill="url(#orb2)" />

      <g transform="translate(72,72)">
        <rect width="1296" height="290" rx="28" fill="rgba(9,16,30,0.94)" stroke="rgba(148,163,184,0.18)" ${cardShadow()} />
        <text x="30" y="42" fill="#91a4c7" font-size="12" letter-spacing="3">ATLAS OPS / INTERNAL PREVIEW</text>
        <text x="30" y="116" fill="#e5eefc" font-size="58" font-weight="700" letter-spacing="-3">Operational visibility for a busy service team.</text>
        <text x="30" y="174" fill="#91a4c7" font-size="21">A compact admin dashboard built with mock enterprise data, designed to show product thinking, responsive UI, and clean structure without exposing real business logic.</text>
        <rect x="30" y="216" width="162" height="48" rx="24" fill="url(#barGradient)" />
        <text x="111" y="246" text-anchor="middle" fill="#04111f" font-size="16" font-weight="700">Review pipeline</text>
        <rect x="206" y="216" width="156" height="48" rx="24" fill="rgba(255,255,255,0.03)" stroke="rgba(148,163,184,0.26)" />
        <text x="284" y="246" text-anchor="middle" fill="#e5eefc" font-size="16" font-weight="600">Export summary</text>
      </g>

      ${renderMetricCards(72, 382, 306, 162, 18)}

      <g transform="translate(72, 564)">
        <text x="0" y="0" fill="#91a4c7" font-size="12" letter-spacing="2">OVERVIEW</text>
        <text x="0" y="36" fill="#e5eefc" font-size="24" font-weight="700">Weekly trend</text>
        <text x="760" y="36" text-anchor="end" fill="#91a4c7" font-size="15">Mock throughput and response-time data.</text>
        <rect y="54" width="838" height="356" rx="24" fill="rgba(13,22,42,0.84)" stroke="rgba(148,163,184,0.18)" ${cardShadow()} />
        ${renderTrendBars(24, 102, 790)}
      </g>

      <g transform="translate(72, 966)">
        <text x="0" y="0" fill="#91a4c7" font-size="12" letter-spacing="2">OVERVIEW</text>
        <text x="0" y="36" fill="#e5eefc" font-size="24" font-weight="700">Service health</text>
        <text x="760" y="36" text-anchor="end" fill="#91a4c7" font-size="15">A simplified operational snapshot.</text>
        ${renderHealthCards(0, 54, 838)}
      </g>

      <g transform="translate(930, 564)">
        <text x="0" y="0" fill="#91a4c7" font-size="12" letter-spacing="2">OVERVIEW</text>
        <text x="0" y="36" fill="#e5eefc" font-size="24" font-weight="700">Recent activity</text>
        <text x="430" y="36" text-anchor="end" fill="#91a4c7" font-size="15">Latest mock events from the ops queue.</text>
        <rect y="54" width="438" height="248" rx="24" fill="rgba(13,22,42,0.84)" stroke="rgba(148,163,184,0.18)" ${cardShadow()} />
        ${renderActivity(24, 94)}
      </g>

      <g transform="translate(930, 872)">
        <text x="0" y="0" fill="#91a4c7" font-size="12" letter-spacing="2">OVERVIEW</text>
        <text x="0" y="36" fill="#e5eefc" font-size="24" font-weight="700">Priority projects</text>
        <text x="430" y="36" text-anchor="end" fill="#91a4c7" font-size="15">Work tracked for the next delivery cycle.</text>
        ${renderProjects(0, 54, 438)}
      </g>
    </svg>`;
}

function buildMobileSvg() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="390" height="2180" viewBox="0 0 390 2180">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#08111f" />
          <stop offset="100%" stop-color="#091423" />
        </linearGradient>
        <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#38bdf8" />
          <stop offset="100%" stop-color="#7dd3fc" />
        </linearGradient>
        <radialGradient id="orb1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="rgba(56,189,248,0.30)" />
          <stop offset="100%" stop-color="rgba(56,189,248,0)" />
        </radialGradient>
        <radialGradient id="orb2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="rgba(99,102,241,0.20)" />
          <stop offset="100%" stop-color="rgba(99,102,241,0)" />
        </radialGradient>
        <pattern id="grid" width="72" height="72" patternUnits="userSpaceOnUse">
          <path d="M72 0 L0 0 0 72" fill="none" stroke="rgba(148,163,184,0.08)" stroke-width="1" />
        </pattern>
      </defs>

      <rect width="390" height="2180" fill="url(#bg)" />
      <rect width="390" height="2180" fill="url(#grid)" opacity="0.5" />
      <circle cx="50" cy="90" r="150" fill="url(#orb1)" />
      <circle cx="350" cy="330" r="130" fill="url(#orb2)" />

      <g transform="translate(20,24)">
        <rect width="350" height="320" rx="24" fill="rgba(9,16,30,0.94)" stroke="rgba(148,163,184,0.18)" ${cardShadow()} />
        <text x="20" y="34" fill="#91a4c7" font-size="10" letter-spacing="2.5">ATLAS OPS / INTERNAL PREVIEW</text>
        <text x="20" y="86" fill="#e5eefc" font-size="32" font-weight="700" letter-spacing="-2">Operational visibility for a busy service team.</text>
        <text x="20" y="158" fill="#91a4c7" font-size="13">A compact admin dashboard built with mock enterprise data, designed to show product thinking, responsive UI, and clean structure without exposing real business logic.</text>
        <rect x="20" y="236" width="126" height="40" rx="20" fill="url(#barGradient)" />
        <text x="83" y="262" text-anchor="middle" fill="#04111f" font-size="13" font-weight="700">Review pipeline</text>
        <rect x="154" y="236" width="118" height="40" rx="20" fill="rgba(255,255,255,0.03)" stroke="rgba(148,163,184,0.26)" />
        <text x="213" y="262" text-anchor="middle" fill="#e5eefc" font-size="13" font-weight="600">Export</text>
      </g>

      ${renderMetricCards(20, 380, 166, 124, 18, true)}

      <g transform="translate(20, 652)">
        <text x="0" y="0" fill="#91a4c7" font-size="10" letter-spacing="2">OVERVIEW</text>
        <text x="0" y="28" fill="#e5eefc" font-size="20" font-weight="700">Weekly trend</text>
        <text x="0" y="52" fill="#91a4c7" font-size="12">Mock throughput and response-time data.</text>
        <rect y="68" width="350" height="270" rx="22" fill="rgba(13,22,42,0.84)" stroke="rgba(148,163,184,0.18)" ${cardShadow()} />
        ${renderTrendBars(18, 112, 316, true)}
      </g>

      <g transform="translate(20, 1000)">
        <text x="0" y="0" fill="#91a4c7" font-size="10" letter-spacing="2">OVERVIEW</text>
        <text x="0" y="28" fill="#e5eefc" font-size="20" font-weight="700">Service health</text>
        <text x="0" y="52" fill="#91a4c7" font-size="12">A simplified operational snapshot.</text>
        ${renderHealthCards(0, 72, 350, true)}
      </g>

      <g transform="translate(20, 1270)">
        <text x="0" y="0" fill="#91a4c7" font-size="10" letter-spacing="2">OVERVIEW</text>
        <text x="0" y="28" fill="#e5eefc" font-size="20" font-weight="700">Recent activity</text>
        <text x="0" y="52" fill="#91a4c7" font-size="12">Latest mock events from the ops queue.</text>
        <rect y="68" width="350" height="210" rx="22" fill="rgba(13,22,42,0.84)" stroke="rgba(148,163,184,0.18)" ${cardShadow()} />
        ${renderActivity(18, 106, true)}
      </g>

      <g transform="translate(20, 1540)">
        <text x="0" y="0" fill="#91a4c7" font-size="10" letter-spacing="2">OVERVIEW</text>
        <text x="0" y="28" fill="#e5eefc" font-size="20" font-weight="700">Priority projects</text>
        <text x="0" y="52" fill="#91a4c7" font-size="12">Work tracked for the next delivery cycle.</text>
        ${renderProjects(0, 68, 350, true)}
      </g>
    </svg>`;
}

async function main() {
  await mkdir(outputDir, { recursive: true });

  await sharp(Buffer.from(buildDesktopSvg())).png().toFile(
    fileURLToPath(new URL("./atlas-ops-dashboard-home-desktop.png", outputDir)),
  );

  await sharp(Buffer.from(buildMobileSvg())).png().toFile(
    fileURLToPath(new URL("./atlas-ops-dashboard-home-mobile.png", outputDir)),
  );
}

await main();
