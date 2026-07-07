import type { PropsWithChildren } from "react";

type SectionProps = PropsWithChildren<{
  title: string;
  description: string;
}>;

export function Section({ title, description, children }: SectionProps) {
  return (
    <section className="section-block">
      <header className="section-block__header">
        <div>
          <p className="muted-label">Overview / Resumen</p>
          <h2>{title}</h2>
        </div>
        <p className="section-block__description">{description}</p>
      </header>
      {children}
    </section>
  );
}
