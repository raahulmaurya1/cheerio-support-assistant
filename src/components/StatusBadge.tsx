import { useApp } from "../context/AppContext";
import type { CheckStatus, TicketStatus } from "../types";
import { IconAlert, IconCheck, IconClock } from "./Icons";

export function CheckBadge({ status }: { status: CheckStatus }) {
  const { tr } = useApp();
  const map: Record<CheckStatus, { className: string; icon: "ok" | "warn" | "wait" | "fail" }> = {
    checked: { className: "bg-emerald-50 text-ok border-emerald-200", icon: "ok" },
    needs_attention: { className: "bg-amber-50 text-warn border-amber-200", icon: "warn" },
    not_verified: { className: "bg-stone-100 text-muted border-stone-200", icon: "wait" },
    failed: { className: "bg-red-50 text-danger border-red-200", icon: "fail" },
  };
  const item = map[status];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${item.className}`}>
      {item.icon === "ok" && <IconCheck className="h-3.5 w-3.5" />}
      {item.icon === "warn" && <IconAlert className="h-3.5 w-3.5" />}
      {item.icon === "wait" && <IconClock className="h-3.5 w-3.5" />}
      {item.icon === "fail" && <IconAlert className="h-3.5 w-3.5" />}
      {tr(`status.${status}`)}
    </span>
  );
}

export function TicketBadge({ status }: { status: TicketStatus }) {
  const { tr } = useApp();
  const className =
    status === "resolved"
      ? "bg-emerald-50 text-ok border-emerald-200"
      : status === "in_progress"
        ? "bg-sky-50 text-sky-800 border-sky-200"
        : "bg-amber-50 text-warn border-amber-200";
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${className}`}>
      {tr(`ticket.${status}`)}
    </span>
  );
}
