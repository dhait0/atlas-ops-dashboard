import type { PropsWithChildren } from "react";

export function DashboardCard({ children }: PropsWithChildren) {
  return <div className="dashboard-card">{children}</div>;
}
