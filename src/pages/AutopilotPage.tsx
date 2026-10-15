import { useRef, type ChangeEvent } from "react";
import { IconPaperclip, IconX } from "../components/Icons";
import { WorkflowPreview } from "../components/WorkflowPreview";
import { useApp } from "../context/AppContext";
import {
  actionOptions,
  channelOptions,
  templateOptions,
  triggerOptions,
} from "../data/mockData";

const STEPS = [
  "auto.step1",
  "auto.step2",
  "auto.step3",
  "auto.step4",
  "auto.step5",
] as const;

export function AutopilotPage() {
  const {
    tr,
    autopilot,
    setAutopilotRequest,
    setAutopilotAttachment,
    continueAutopilotRequest,
    prepareAutopilot,
    updateProposal,
    approveAutopilot,
    rejectAutopilot,
    cancelAutopilot,
    proposalValidation,
  } = useApp();
  const fileRef = useRef<HTMLInputElement>(null);

  const phaseIndex =
    autopilot.phase === "idle"
      ? 0
      : autopilot.phase === "review_request"
        ? 0
        : autopilot.phase === "preparing"
          ? 1
          : autopilot.phase === "proposal"
            ? autopilot.editing
              ? 2
              : 3
            : autopilot.phase === "executing"
              ? 4
              : 4;

  const onFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setAutopilotAttachment({
      name: file.name,
      url: URL.createObjectURL(file),
      sizeLabel: `${Math.round(file.size / 1024)} KB`,
    });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 lg:py-8">
      <p className="mb-2 inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-warn">
        {tr("auto.badge")}
      </p>
      <h1 className="text-2xl font-bold text-ink">{tr("auto.title")}</h1>
      <p className="mt-1 text-sm text-muted">{tr("auto.subtitle")}</p>

      <ol className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-5">
        {STEPS.map((key, index) => (
          <li
            key={key}
            className={`rounded-xl border px-3 py-2 text-xs font-medium ${
              index <= phaseIndex
                ? "border-teal-200 bg-accent-soft text-accent"
                : "border-line bg-white text-muted"
            }`}
          >
            <span className="mr-1">{index + 1}.</span>
            {tr(key)}
          </li>
        ))}
      </ol>

      {(autopilot.phase === "idle" || autopilot.phase === "review_request") && (
        <section className="mt-6 space-y-4 rounded-2xl border border-line bg-white p-5">
          <h2 className="text-sm font-semibold text-ink">{tr("auto.step1")}</h2>
          <label className="sr-only" htmlFor="autopilot-request">
            {tr("auto.placeholder")}
          </label>
          <textarea
            id="autopilot-request"
            rows={4}
            value={autopilot.requestText}
            onChange={(event) => setAutopilotRequest(event.target.value)}
            placeholder={tr("auto.placeholder")}
            className="w-full rounded-xl border border-line px-3 py-2 text-sm outline-none focus:border-accent"
          />
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setAutopilotRequest(tr("auto.example"))}
              className="rounded-xl border border-line px-3 py-2 text-sm"
            >
              {tr("auto.useExample")}
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="sr-only" onChange={onFile} />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-xl border border-line px-3 py-2 text-sm"
            >
              <IconPaperclip className="h-4 w-4" />
              {tr("auto.attachHint")}
            </button>
          </div>
          {autopilot.attachment && (
            <div className="flex items-center gap-3 rounded-xl bg-canvas px-3 py-2">
              <img src={autopilot.attachment.url} alt="" className="h-12 w-12 rounded-lg object-cover" />
              <p className="flex-1 truncate text-sm">{autopilot.attachment.name}</p>
              <button
                type="button"
                onClick={() => setAutopilotAttachment(null)}
                aria-label={tr("input.remove")}
                className="p-1 text-muted"
              >
                <IconX className="h-4 w-4" />
              </button>
            </div>
          )}
          {autopilot.phase === "idle" ? (
            <button
              type="button"
              disabled={!autopilot.requestText.trim()}
              onClick={continueAutopilotRequest}
              className="rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white disabled:bg-stone-300"
            >
              {tr("auto.continue")}
            </button>
          ) : (
            <button
              type="button"
              onClick={prepareAutopilot}
              className="rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white"
            >
              {tr("auto.continue")}
            </button>
          )}
        </section>
      )}

      {autopilot.phase === "preparing" && (
        <div className="mt-6 rounded-2xl border border-line bg-white p-8 text-center">
          <p className="text-sm font-medium text-ink">{tr("auto.preparing")}</p>
        </div>
      )}

      {autopilot.proposal &&
        (autopilot.phase === "proposal" ||
          autopilot.phase === "executing" ||
          autopilot.phase === "success" ||
          autopilot.phase === "failure") && (
          <section className="mt-6 space-y-4">
            <div className="rounded-2xl border border-line bg-white p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-sm font-semibold text-ink">{tr("auto.proposalTitle")}</h2>
                <span className="rounded-full bg-canvas px-2 py-1 text-xs font-medium text-muted">
                  {tr("auto.draft")}
                </span>
              </div>
              <p className="mt-2 text-xs text-muted">{tr("auto.notLive")}</p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <label className="text-sm">
                  <span className="mb-1 block font-medium text-muted">{tr("auto.name")}</span>
                  <input
                    value={autopilot.proposal.name}
                    disabled={!autopilot.editing}
                    onChange={(event) => updateProposal({ name: event.target.value })}
                    className="w-full rounded-xl border border-line px-3 py-2 disabled:bg-canvas"
                  />
                </label>
                <FieldSelect
                  label={tr("auto.trigger")}
                  value={autopilot.proposal.triggerId}
                  disabled={!autopilot.editing}
                  options={triggerOptions}
                  onChange={(value) => updateProposal({ triggerId: value })}
                />
                <FieldSelect
                  label={tr("auto.action")}
                  value={autopilot.proposal.actionId}
                  disabled={!autopilot.editing}
                  options={actionOptions}
                  onChange={(value) => updateProposal({ actionId: value })}
                />
                <FieldSelect
                  label={tr("auto.channel")}
                  value={autopilot.proposal.channelId}
                  disabled={!autopilot.editing}
                  options={channelOptions}
                  onChange={(value) => updateProposal({ channelId: value })}
                />
                <FieldSelect
                  label={tr("auto.template")}
                  value={autopilot.proposal.templateId}
                  disabled={!autopilot.editing}
                  options={templateOptions}
                  onChange={(value) => updateProposal({ templateId: value })}
                />
              </div>

              {!proposalValidation.valid && (
                <div className="mt-4 rounded-xl bg-amber-50 px-3 py-2 text-sm text-warn">
                  <p className="font-medium">{tr("auto.missing")}</p>
                  <p>{proposalValidation.missing.map((key) => tr(key)).join(", ")}</p>
                </div>
              )}
            </div>

            <WorkflowPreview proposal={autopilot.proposal} />

            {autopilot.phase === "proposal" && (
              <div className="space-y-3">
                <p className="text-xs text-muted">{tr("auto.needApproval")}</p>
                <div className="flex flex-wrap gap-2">
                  {autopilot.editing ? (
                    <button
                      type="button"
                      onClick={approveAutopilot}
                      className="rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white"
                    >
                      {tr("auto.approve")}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => updateProposal({})}
                      className="rounded-xl border border-line px-4 py-2.5 text-sm"
                    >
                      {tr("auto.editProposal")}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={rejectAutopilot}
                    className="rounded-xl border border-line px-4 py-2.5 text-sm"
                  >
                    {tr("auto.reject")}
                  </button>
                  <button
                    type="button"
                    onClick={cancelAutopilot}
                    className="rounded-xl px-4 py-2.5 text-sm text-muted hover:text-ink"
                  >
                    {tr("auto.cancel")}
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

      {autopilot.phase === "executing" && (
        <p className="mt-6 rounded-2xl border border-line bg-white p-5 text-sm text-muted">
          {tr("auto.executing")}
        </p>
      )}

      {autopilot.phase === "success" && (
        <section className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
          <h2 className="text-lg font-semibold text-ok">{tr("auto.successTitle")}</h2>
          <p className="mt-2 text-sm text-ink">{tr("auto.successBody")}</p>
          <button
            type="button"
            onClick={cancelAutopilot}
            className="mt-4 rounded-xl bg-accent px-4 py-2 text-sm font-medium text-white"
          >
            {tr("auto.another")}
          </button>
        </section>
      )}

      {autopilot.phase === "failure" && (
        <section className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5">
          <h2 className="text-lg font-semibold text-danger">{tr("auto.failureTitle")}</h2>
          <p className="mt-2 text-sm text-ink">{tr("auto.failureBody")}</p>
          {autopilot.execution?.reasonKey && (
            <p className="mt-2 text-sm text-danger">{tr(autopilot.execution.reasonKey)}</p>
          )}
          <p className="mt-3 text-xs text-muted">
            {tr("auto.lastState")}: {autopilot.proposal?.status}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={rejectAutopilot}
              className="rounded-xl bg-accent px-4 py-2 text-sm font-medium text-white"
            >
              {tr("auto.editProposal")}
            </button>
            <button
              type="button"
              onClick={cancelAutopilot}
              className="rounded-xl border border-line bg-white px-4 py-2 text-sm"
            >
              {tr("auto.cancel")}
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

function FieldSelect({
  label,
  value,
  options,
  disabled,
  onChange,
}: {
  label: string;
  value: string;
  disabled: boolean;
  options: { id: string; labelKey: string }[];
  onChange: (value: string) => void;
}) {
  const { tr } = useApp();
  return (
    <label className="text-sm">
      <span className="mb-1 block font-medium text-muted">{label}</span>
      <select
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-line bg-white px-3 py-2 disabled:bg-canvas"
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {tr(option.labelKey)}
          </option>
        ))}
      </select>
    </label>
  );
}
