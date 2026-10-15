import { useApp } from "../context/AppContext";
import type { DiagnosticCheck } from "../types";
import { CheckBadge } from "./StatusBadge";

export function DiagnosticChecklist({ checks }: { checks: DiagnosticCheck[] }) {
  const { tr } = useApp();
  if (checks.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white">
      <div className="border-b border-line px-4 py-3 text-sm font-semibold text-ink">
        {tr("diagnosis.checklist")}
      </div>
      <ul>
        {checks.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 last:border-b-0"
          >
            <span className="text-sm text-ink">{tr(item.labelKey)}</span>
            <CheckBadge status={item.status} />
          </li>
        ))}
      </ul>
    </div>
  );
}
