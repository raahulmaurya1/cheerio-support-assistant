import { useApp } from "../context/AppContext";
import type { ChatMessage as ChatMessageType } from "../types";
import { IconImage } from "./Icons";

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const { tr, selectOption, rewindToQuestion, setPage, beginEscalation } = useApp();
  const isUser = message.role === "user";
  const text = message.textKey ? tr(message.textKey, message.textVars) : message.text ?? "";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} animate-fade-up`}>
      <div className={`max-w-[85%] sm:max-w-[75%] ${isUser ? "" : "space-y-2"}`}>
        {!isUser && (
          <div className="mb-1 flex items-center gap-2 text-xs font-medium text-muted">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
              C
            </span>
            Cheerio Assist
          </div>
        )}
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
            isUser
              ? "rounded-br-md bg-accent text-white"
              : message.variant === "warning"
                ? "rounded-bl-md border border-amber-200 bg-amber-50 text-ink"
                : "rounded-bl-md border border-line bg-white text-ink"
          }`}
        >
          {text}
          {message.attachmentName && (
            <div className={`mt-3 overflow-hidden rounded-xl ${isUser ? "bg-white/15" : "bg-canvas"}`}>
              {message.attachmentUrl && (
                <img
                  src={message.attachmentUrl}
                  alt=""
                  className="h-28 w-full object-cover"
                />
              )}
              <div className={`flex items-center gap-2 px-3 py-2 text-xs ${isUser ? "text-white/90" : "text-muted"}`}>
                <IconImage className="h-4 w-4" />
                {message.attachmentName}
              </div>
            </div>
          )}
        </div>

        {message.options && message.options.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {message.options.map((option) => {
              const selected = message.selectedOptionId === option.id;
              const locked = Boolean(message.selectedOptionId);
              return (
                <button
                  key={option.id}
                  type="button"
                  disabled={locked && !selected}
                  onClick={() => selectOption(message.id, option.id)}
                  className={`rounded-full border px-3 py-1.5 text-sm transition ${
                    selected
                      ? "border-accent bg-accent text-white"
                      : locked
                        ? "cursor-default border-line bg-canvas text-muted"
                        : "border-line bg-white text-ink hover:border-accent hover:text-accent"
                  }`}
                >
                  {tr(option.labelKey)}
                </button>
              );
            })}
            {message.selectedOptionId && (
              <button
                type="button"
                onClick={() => rewindToQuestion(message.id)}
                className="rounded-full px-3 py-1.5 text-sm text-accent hover:underline"
              >
                {tr("assist.changeAnswer")}
              </button>
            )}
          </div>
        )}

        {message.cta === "view_diagnosis" && (
          <button
            type="button"
            onClick={() => setPage("troubleshooting")}
            className="rounded-xl bg-accent px-3 py-2 text-sm font-medium text-white hover:bg-accent-hover"
          >
            {tr("assist.viewDiagnosis")}
          </button>
        )}
        {message.cta === "contact_support" && (
          <button
            type="button"
            onClick={beginEscalation}
            className="rounded-xl border border-line bg-white px-3 py-2 text-sm font-medium text-ink hover:bg-canvas"
          >
            {tr("assist.contactSupport")}
          </button>
        )}
        {message.cta === "view_guides" && (
          <button
            type="button"
            onClick={() => setPage("guides")}
            className="rounded-xl border border-line bg-white px-3 py-2 text-sm font-medium text-ink hover:bg-canvas"
          >
            {tr("assist.viewGuides")}
          </button>
        )}
      </div>
    </div>
  );
}
