import { DashboardShell } from "@/components/layout/dashboard-shell";
import { HelpProvider } from "@/components/help/help-provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell helpPanel={<HelpProvider />}>
      {children}
    </DashboardShell>
  );
}
