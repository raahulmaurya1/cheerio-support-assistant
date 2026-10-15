import { useEffect, useRef } from "react";
import { ChatInput } from "../components/ChatInput";
import { ChatMessage } from "../components/ChatMessage";
import { IconArrowRight, IconSpark } from "../components/Icons";
import { useApp } from "../context/AppContext";
import { commonIssues } from "../data/mockData";
import { t } from "../data/i18n";

export function SupportPage() {
  const { page, tr, language, setLanguage, startConversation, messages, thinking, setPage } = useApp();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  if (page === "assist") {
    return (
      <div className="mx-auto flex h-[calc(100vh-57px)] max-w-3xl flex-col px-4 py-4">
        <div className="scrollbar-thin flex-1 space-y-4 overflow-y-auto pb-4">
          {messages.length === 0 && (
            <div className="space-y-4 py-6">
              <p className="text-center text-sm text-muted">{tr("assist.emptyHint")}</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {commonIssues.map((issue) => (
                  <button
                    key={issue.id}
                    type="button"
                    onClick={() => startConversation(t(language, issue.promptKey), issue.id)}
                    className="rounded-xl border border-line bg-white px-3 py-3 text-left text-sm hover:border-accent"
                  >
                    <span className="font-medium text-ink">{tr(issue.labelKey)}</span>
                    <span className="mt-1 block text-xs text-muted">{tr(issue.descriptionKey)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {thinking && (
            <div className="flex items-center gap-2 text-sm text-muted">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                C
              </span>
              {tr("assist.thinking")}
            </div>
          )}
          <div ref={bottomRef} />
        </div>
        <div className="border-t border-line pt-3">
          <p className="mb-2 text-xs text-muted">{tr("home.privacyNote")}</p>
          <ChatInput
            disabled={thinking}
            onSend={(text, attachment) => startConversation(text, undefined, attachment)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-medium text-accent">{tr("brand.product")}</p>
        <div className="flex rounded-lg bg-white p-1 ring-1 ring-line">
          <button
            type="button"
            onClick={() => setLanguage("en")}
            className={`rounded-md px-2.5 py-1 text-xs font-medium ${language === "en" ? "bg-accent text-white" : "text-muted"}`}
          >
            {tr("lang.en")}
          </button>
          <button
            type="button"
            onClick={() => setLanguage("hi")}
            className={`rounded-md px-2.5 py-1 text-xs font-medium ${language === "hi" ? "bg-accent text-white" : "text-muted"}`}
          >
            {tr("lang.hi")}
          </button>
        </div>
      </div>
      <h1 className="max-w-2xl text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        {tr("home.welcome")}
      </h1>
      <p className="mt-3 max-w-2xl text-base text-muted">{tr("home.subtitle")}</p>

      <div className="mt-8">
        <ChatInput
          onSend={(text, attachment) => startConversation(text, undefined, attachment)}
        />
        <p className="mt-2 text-xs text-muted">{tr("home.privacyNote")}</p>
      </div>

      {messages.length > 0 && (
        <button
          type="button"
          onClick={() => setPage("assist")}
          className="mt-6 flex w-full items-center justify-between rounded-2xl border border-line bg-white px-4 py-3 text-left shadow-sm"
        >
          <div>
            <p className="text-sm font-semibold text-ink">{tr("home.continueTitle")}</p>
            <p className="text-sm text-muted">{tr("home.continueBody")}</p>
          </div>
          <IconArrowRight className="text-accent" />
        </button>
      )}

      <section className="mt-10">
        <h2 className="mb-3 text-sm font-semibold text-ink">{tr("home.commonIssues")}</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {commonIssues.map((issue) => (
            <button
              key={issue.id}
              type="button"
              onClick={() => startConversation(t(language, issue.promptKey), issue.id)}
              className="rounded-2xl border border-line bg-white p-4 text-left shadow-sm transition hover:border-accent"
            >
              <p className="text-sm font-semibold text-ink">{tr(issue.labelKey)}</p>
              <p className="mt-1 text-sm text-muted">{tr(issue.descriptionKey)}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-teal-200 bg-accent-soft p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-white">
              <IconSpark />
            </span>
            <div>
              <h2 className="text-sm font-semibold text-ink">{tr("home.autopilotTitle")}</h2>
              <p className="mt-1 max-w-xl text-sm text-muted">{tr("home.autopilotBody")}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setPage("autopilot")}
            className="shrink-0 rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white hover:bg-accent-hover"
          >
            {tr("home.autopilotCta")}
          </button>
        </div>
      </section>

      <p className="mt-6 text-xs text-muted">{tr("home.demoNote")}</p>
    </div>
  );
}
