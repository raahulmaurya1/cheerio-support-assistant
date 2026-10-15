import { useApp } from "../context/AppContext";
import { AutopilotPage } from "../pages/AutopilotPage";
import { GuidesPage } from "../pages/GuidesPage";
import { SupportPage } from "../pages/SupportPage";
import { TicketsPage } from "../pages/TicketsPage";
import { TroubleshootingPage } from "../pages/TroubleshootingPage";
import { IconMenu } from "./Icons";
import { Sidebar } from "./Sidebar";

export function AppShell() {
  const { page, tr, setSidebarOpen, sidebarOpen } = useApp();

  const title =
    page === "home"
      ? tr("nav.home")
      : page === "assist"
        ? tr("nav.assist")
        : page === "guides"
          ? tr("nav.guides")
          : page === "tickets"
            ? tr("nav.tickets")
            : page === "autopilot"
              ? tr("nav.autopilot")
              : tr("diagnosis.title");

  return (
    <div className="min-h-screen lg:flex">
      <Sidebar />
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-stone-900/30 lg:hidden"
          aria-label={tr("nav.closeMenu")}
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className="flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-line bg-white/90 px-4 py-3 backdrop-blur">
          <button
            type="button"
            className="rounded-lg p-2 text-ink lg:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label={tr("nav.openMenu")}
          >
            <IconMenu />
          </button>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-ink">{title}</p>
          </div>
          <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-medium text-warn">
            {tr("brand.demo")}
          </span>
        </header>
        <main className="flex-1">
          {(page === "home" || page === "assist") && <SupportPage />}
          {page === "troubleshooting" && <TroubleshootingPage />}
          {page === "tickets" && <TicketsPage />}
          {page === "autopilot" && <AutopilotPage />}
          {page === "guides" && <GuidesPage />}
        </main>
      </div>
    </div>
  );
}
