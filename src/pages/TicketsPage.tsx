import { DiagnosticChecklist } from "../components/DiagnosticChecklist";
import { TicketBadge } from "../components/StatusBadge";
import { useApp } from "../context/AppContext";

export function TicketsPage() {
  const {
    tr,
    tickets,
    selectedTicketId,
    setSelectedTicketId,
    ticketJustCreated,
    escalationDraft,
    submitTicket,
    beginEscalation,
    diagnosis,
    setPage,
    language,
  } = useApp();

  const selected = tickets.find((item) => item.id === selectedTicketId) ?? null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 lg:py-8">
      <h1 className="text-2xl font-bold text-ink">{tr("ticket.title")}</h1>
      <p className="mt-1 text-sm text-muted">{tr("ticket.subtitle")}</p>

      {escalationDraft && (
        <section className="mt-6 rounded-2xl border border-line bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-ink">{tr("ticket.summary")}</h2>
          <p className="mt-1 text-sm text-muted">{tr("ticket.summaryLead")}</p>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="font-medium text-muted">{tr("ticket.problem")}</dt>
              <dd className="mt-1 text-ink">{escalationDraft.problem}</dd>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <dt className="font-medium text-muted">{tr("ticket.channel")}</dt>
                <dd className="mt-1 text-ink">{tr(escalationDraft.channelLabelKey)}</dd>
              </div>
              <div>
                <dt className="font-medium text-muted">{tr("ticket.cause")}</dt>
                <dd className="mt-1 text-ink">{tr(escalationDraft.suspectedCauseKey)}</dd>
              </div>
            </div>
            <div>
              <dt className="font-medium text-muted">{tr("ticket.steps")}</dt>
              <dd className="mt-1 text-ink">
                {escalationDraft.stepsAttemptedKeys.map((key) => tr(key)).join(" · ")}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-muted">{tr("ticket.language")}</dt>
              <dd className="mt-1 text-ink">{tr(language === "hi" ? "lang.hi" : "lang.en")}</dd>
            </div>
            {escalationDraft.screenshotName && (
              <div>
                <dt className="font-medium text-muted">{tr("ticket.screenshot")}</dt>
                <dd className="mt-2">
                  {escalationDraft.screenshotUrl && (
                    <img
                      src={escalationDraft.screenshotUrl}
                      alt=""
                      className="mb-2 h-28 rounded-lg object-cover"
                    />
                  )}
                  <p className="text-ink">{escalationDraft.screenshotName}</p>
                </dd>
              </div>
            )}
          </dl>
          {escalationDraft.diagnostics.length > 0 && (
            <div className="mt-4">
              <DiagnosticChecklist checks={escalationDraft.diagnostics} />
            </div>
          )}
          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={submitTicket}
              className="rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white hover:bg-accent-hover"
            >
              {tr("ticket.create")}
            </button>
            <button
              type="button"
              onClick={() => setPage(diagnosis ? "troubleshooting" : "assist")}
              className="rounded-xl border border-line px-4 py-2.5 text-sm font-medium"
            >
              {tr("ticket.back")}
            </button>
          </div>
        </section>
      )}

      {ticketJustCreated && selected && (
        <section className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
          <h2 className="text-lg font-semibold text-ok">{tr("ticket.created")}</h2>
          <p className="mt-1 text-sm text-ink">{tr("ticket.createdBody")}</p>
          <p className="mt-3 text-sm">
            <span className="text-muted">{tr("ticket.id")}: </span>
            <span className="font-semibold text-ink">{selected.id}</span>
          </p>
          <p className="mt-1 flex items-center gap-2 text-sm">
            <span className="text-muted">{tr("ticket.status")}:</span>
            <TicketBadge status={selected.status} />
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedTicketId(selected.id)}
              className="rounded-xl bg-accent px-4 py-2 text-sm font-medium text-white"
            >
              {tr("ticket.view")}
            </button>
            <button
              type="button"
              onClick={() => setPage("assist")}
              className="rounded-xl border border-line bg-white px-4 py-2 text-sm font-medium"
            >
              {tr("ticket.back")}
            </button>
          </div>
        </section>
      )}

      {!escalationDraft && !ticketJustCreated && tickets.length === 0 && (
        <div className="mt-8 rounded-2xl border border-dashed border-line bg-white p-8 text-center">
          <p className="font-medium text-ink">{tr("ticket.empty")}</p>
          <p className="mt-1 text-sm text-muted">{tr("ticket.emptyHint")}</p>
          {diagnosis ? (
            <button
              type="button"
              onClick={beginEscalation}
              className="mt-4 rounded-xl bg-accent px-4 py-2 text-sm font-medium text-white"
            >
              {tr("ticket.newFromSession")}
            </button>
          ) : (
            <p className="mt-3 text-sm text-muted">{tr("ticket.noSession")}</p>
          )}
        </div>
      )}

      {tickets.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-sm font-semibold text-ink">{tr("ticket.list")}</h2>
          <ul className="space-y-2">
            {tickets.map((ticket) => (
              <li key={ticket.id}>
                <button
                  type="button"
                  onClick={() => setSelectedTicketId(ticket.id)}
                  className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left ${
                    selectedTicketId === ticket.id
                      ? "border-accent bg-accent-soft"
                      : "border-line bg-white"
                  }`}
                >
                  <div>
                    <p className="text-sm font-semibold text-ink">{ticket.id}</p>
                    <p className="line-clamp-1 text-sm text-muted">{ticket.problem}</p>
                  </div>
                  <TicketBadge status={ticket.status} />
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {selected && !escalationDraft && (
        <section className="mt-6 rounded-2xl border border-line bg-white p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-ink">{selected.id}</h2>
            <TicketBadge status={selected.status} />
          </div>
          <p className="mt-3 text-sm text-ink">{selected.problem}</p>
          <p className="mt-2 text-sm text-muted">
            {tr("ticket.channel")}: {tr(selected.channelLabelKey)}
          </p>
          <p className="mt-1 text-sm text-muted">
            {tr("ticket.cause")}: {tr(selected.suspectedCauseKey)}
          </p>
          {selected.diagnostics.length > 0 && (
            <div className="mt-4">
              <DiagnosticChecklist checks={selected.diagnostics} />
            </div>
          )}
        </section>
      )}
    </div>
  );
}
