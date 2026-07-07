type MetricCardProps = {
  label: string;
  value: string;
  delta: string;
  tone: "positive" | "neutral" | "warning";
};

export function MetricCard({ label, value, delta, tone }: MetricCardProps) {
  return (
    <article className="metric-card">
      <p className="muted-label">{label}</p>
      <div className="metric-card__value-row">
        <h2>{value}</h2>
        <span className={`delta delta--${tone}`}>{delta}</span>
      </div>
    </article>
  );
}
