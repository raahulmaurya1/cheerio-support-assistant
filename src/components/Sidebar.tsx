import { useApp } from "../context/AppContext";
import type { PageId } from "../types";
import {
  IconBook,
  IconGlobe,
  IconHome,
  IconMessage,
  IconSpark,
  IconTicket,
  IconX,
} from "./Icons";

const NAV: { id: PageId; labelKey: string; icon: typeof IconHome }[] = [
  { id: "home", labelKey: "nav.home", icon: IconHome },
  { id: "assist", labelKey: "nav.assist", icon: IconMessage },
  { id: "guides", labelKey: "nav.guides", icon: IconBook },
  { id: "tickets", labelKey: "nav.tickets", icon: IconTicket },
  { id: "autopilot", labelKey: "nav.autopilot", icon: IconSpark },
];

export function Sidebar() {
  const { tr, page, setPage, language, setLanguage, sidebarOpen, setSidebarOpen, tickets } =
    useApp();

  const go = (id: PageId) => {
    setPage(id);
    setSidebarOpen(false);
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-line bg-white transition-transform lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent text-white shadow-sm">
            <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
              <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <path
                d="M8.2 13.2c1.1 1.6 2.4 2.3 3.8 2.3s2.7-.7 3.8-2.3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <circle cx="9.2" cy="10" r="1" fill="currentColor" />
              <circle cx="14.8" cy="10" r="1" fill="currentColor" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-ink">{tr("brand.product")}</p>
            <p className="text-xs text-muted">{tr("brand.tagline")}</p>
          </div>
        </div>
        <button
          type="button"
          className="rounded-lg p-1 text-muted lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label={tr("nav.closeMenu")}
        >
          <IconX />
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-3" aria-label="Main">
        {NAV.map((item) => {
          const active = page === item.id || (item.id === "assist" && page === "troubleshooting");
          const Icon = item.icon;
          const count = item.id === "tickets" ? tickets.length : 0;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => go(item.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium ${
                active ? "bg-accent-soft text-accent" : "text-muted hover:bg-canvas hover:text-ink"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="flex-1 text-left">{tr(item.labelKey)}</span>
              {count > 0 && (
                <span className="rounded-full bg-accent px-1.5 text-[11px] font-semibold text-white">
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="space-y-4 border-t border-line p-4">
        <div>
          <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
            <IconGlobe className="h-3.5 w-3.5" />
            {tr("nav.language")}
          </p>
          <div className="grid grid-cols-2 gap-1 rounded-xl bg-canvas p-1">
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`rounded-lg px-2 py-1.5 text-sm font-medium ${
                language === "en" ? "bg-white text-ink shadow-sm" : "text-muted"
              }`}
            >
              {tr("lang.en")}
            </button>
            <button
              type="button"
              onClick={() => setLanguage("hi")}
              className={`rounded-lg px-2 py-1.5 text-sm font-medium ${
                language === "hi" ? "bg-white text-ink shadow-sm" : "text-muted"
              }`}
            >
              {tr("lang.hi")}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-line p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-800 text-xs font-semibold text-white">
            PS
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ink">{tr("brand.user")}</p>
            <p className="truncate text-xs text-muted">
              {tr("brand.role")} · {tr("brand.workspace")}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
