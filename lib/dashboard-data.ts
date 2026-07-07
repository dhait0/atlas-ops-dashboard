export const metrics = [
  {
    label: "Open requests / Solicitudes abiertas",
    value: "128",
    delta: "+12.4%",
    tone: "positive" as const,
  },
  {
    label: "SLA compliance / Cumplimiento SLA",
    value: "98.2%",
    delta: "+0.8%",
    tone: "positive" as const,
  },
  { label: "Escalations / Escalamientos", value: "17", delta: "-3", tone: "neutral" as const },
  {
    label: "At-risk accounts / Cuentas en riesgo",
    value: "4",
    delta: "2 new / 2 nuevas",
    tone: "warning" as const,
  },
];

export const trends = [
  { label: "Mon / Lun", value: 52, amount: "42" },
  { label: "Tue / Mar", value: 61, amount: "50" },
  { label: "Wed / Mié", value: 76, amount: "62" },
  { label: "Thu / Jue", value: 67, amount: "55" },
  { label: "Fri / Vie", value: 82, amount: "69" },
];

export const serviceHealth = [
  {
    name: "API gateway / Puerta de enlace API",
    status: "Healthy / Saludable",
    detail: "99.98% uptime and normal latency. / 99.98% de disponibilidad y latencia normal.",
  },
  {
    name: "Sync jobs / Tareas de sincronización",
    status: "Stable / Estable",
    detail: "Four nightly jobs completed without retries. / Cuatro tareas nocturnas completadas sin reintentos.",
  },
];

export const activityItems = [
  {
    title: "New request approved / Nueva solicitud aprobada",
    meta: "Finance onboarding flow completed 8 minutes ago. / El flujo de finanzas terminó hace 8 minutos.",
  },
  {
    title: "Alert cleared / Alerta resuelta",
    meta: "External webhook latency returned to baseline. / La latencia del webhook volvió a la normalidad.",
  },
  {
    title: "Report generated / Reporte generado",
    meta: "Weekly operations summary exported for leadership. / Resumen semanal exportado para dirección.",
  },
];

export const projects = [
  {
    name: "Support queue revamp / Renovación de la cola de soporte",
    owner: "Product Ops / Operaciones de producto",
    status: "On track / En curso",
    statusTone: "positive" as const,
    summary:
      "Refining escalation paths and improving triage visibility. / Refinando rutas de escalamiento y visibilidad.",
  },
  {
    name: "Audit trail export / Exportación del historial de auditoría",
    owner: "Compliance / Cumplimiento",
    status: "Reviewing / En revisión",
    statusTone: "neutral" as const,
    summary:
      "Preparing a client-friendly export with masked records. / Preparando una exportación apta para clientes con datos enmascarados.",
  },
];
