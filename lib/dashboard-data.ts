export const metrics = [
  { label: "Open requests", value: "128", delta: "+12.4%", tone: "positive" as const },
  { label: "SLA compliance", value: "98.2%", delta: "+0.8%", tone: "positive" as const },
  { label: "Escalations", value: "17", delta: "-3", tone: "neutral" as const },
  { label: "At-risk accounts", value: "4", delta: "2 new", tone: "warning" as const },
];

export const trends = [
  { label: "Mon", value: 52, amount: "42" },
  { label: "Tue", value: 61, amount: "50" },
  { label: "Wed", value: 76, amount: "62" },
  { label: "Thu", value: 67, amount: "55" },
  { label: "Fri", value: 82, amount: "69" },
];

export const serviceHealth = [
  {
    name: "API gateway",
    status: "Healthy",
    detail: "99.98% uptime and normal latency across regions.",
  },
  {
    name: "Sync jobs",
    status: "Stable",
    detail: "Four nightly jobs completed without retries.",
  },
];

export const activityItems = [
  {
    title: "New request approved",
    meta: "Finance onboarding flow completed 8 minutes ago.",
  },
  {
    title: "Alert cleared",
    meta: "External webhook latency returned to baseline.",
  },
  {
    title: "Report generated",
    meta: "Weekly operations summary exported for leadership.",
  },
];

export const projects = [
  {
    name: "Support queue revamp",
    owner: "Product Ops",
    status: "On track",
    statusTone: "positive" as const,
    summary: "Refining escalation paths and improving triage visibility.",
  },
  {
    name: "Audit trail export",
    owner: "Compliance",
    status: "Reviewing",
    statusTone: "neutral" as const,
    summary: "Preparing a client-friendly export with masked records.",
  },
];
