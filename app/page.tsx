import { DashboardCard } from "@/components/dashboard-card";
import { MetricCard } from "@/components/metric-card";
import { Section } from "@/components/section";
import { activityItems, metrics, projects, serviceHealth, trends } from "@/lib/dashboard-data";

export default function HomePage() {
  return (
    <main className="shell">
      <div className="shell__background" aria-hidden="true">
        <div className="orb orb--one" />
        <div className="orb orb--two" />
        <div className="grid-grid" />
      </div>

      <div className="shell__content">
        <header className="hero">
          <div className="hero__eyebrow">Atlas Ops / internal preview</div>
          <div className="hero__copy">
            <h1>Operational visibility for a busy service team.</h1>
            <p>
              A compact admin dashboard built with mock enterprise data, designed to show product
              thinking, responsive UI, and clean structure without exposing real business logic.
            </p>
          </div>
          <div className="hero__actions">
            <button type="button" className="primary-button">
              Review pipeline
            </button>
            <button type="button" className="secondary-button">
              Export summary
            </button>
          </div>
        </header>

        <section className="metrics-grid" aria-label="Key metrics">
          {metrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </section>

        <section className="content-grid">
          <div className="content-grid__main">
            <Section title="Weekly trend" description="Mock throughput and response-time data.">
              <DashboardCard>
                <div className="trend-panel">
                  <div className="trend-panel__axis">
                    {trends.map((trend) => (
                      <div key={trend.label} className="trend-row">
                        <span className="trend-row__label">{trend.label}</span>
                        <div className="trend-row__track">
                          <span
                            className="trend-row__fill"
                            style={{ width: `${trend.value}%` }}
                          />
                        </div>
                        <span className="trend-row__value">{trend.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </DashboardCard>
            </Section>

            <Section title="Service health" description="A simplified operational snapshot.">
              <div className="health-grid">
                {serviceHealth.map((item) => (
                  <DashboardCard key={item.name}>
                    <div className="health-card">
                      <div>
                        <p className="muted-label">{item.name}</p>
                        <h3>{item.status}</h3>
                      </div>
                      <p className="health-card__detail">{item.detail}</p>
                    </div>
                  </DashboardCard>
                ))}
              </div>
            </Section>
          </div>

          <aside className="content-grid__side">
            <Section title="Recent activity" description="Latest mock events from the ops queue.">
              <DashboardCard>
                <ul className="activity-list">
                  {activityItems.map((item) => (
                    <li key={item.title} className="activity-list__item">
                      <span className="activity-list__dot" aria-hidden="true" />
                      <div>
                        <p className="activity-list__title">{item.title}</p>
                        <p className="activity-list__meta">{item.meta}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </DashboardCard>
            </Section>

            <Section title="Priority projects" description="Work tracked for the next delivery cycle.">
              <div className="project-stack">
                {projects.map((project) => (
                  <DashboardCard key={project.name}>
                    <div className="project-card">
                      <div className="project-card__header">
                        <div>
                          <p className="muted-label">{project.owner}</p>
                          <h3>{project.name}</h3>
                        </div>
                        <span className={`status-chip status-chip--${project.statusTone}`}>
                          {project.status}
                        </span>
                      </div>
                      <p className="project-card__copy">{project.summary}</p>
                    </div>
                  </DashboardCard>
                ))}
              </div>
            </Section>
          </aside>
        </section>
      </div>
    </main>
  );
}
