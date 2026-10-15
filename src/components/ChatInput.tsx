import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type KeyboardEvent } from "react";
import { useApp } from "../context/AppContext";
import type { Attachment } from "../types";
import { IconMic, IconPaperclip, IconSend, IconX } from "./Icons";

interface ChatInputProps {
  onSend: (text: string, attachment: Attachment | null) => void;
  placeholder?: string;
  disabled?: boolean;
}

type VoiceState = "idle" | "recording" | "processing" | "review";

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function ChatInput({ onSend, placeholder, disabled }: ChatInputProps) {
  const { tr } = useApp();
  const [text, setText] = useState("");
  const [attachment, setAttachment] = useState<Attachment | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [voice, setVoice] = useState<VoiceState>("idle");
  const [transcript, setTranscript] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timers.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const later = (ms: number, fn: () => void) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setProgress(12);
    const url = URL.createObjectURL(file);
    later(180, () => setProgress(48));
    later(360, () => setProgress(86));
    later(520, () => {
      setAttachment({ name: file.name, url, sizeLabel: formatSize(file.size) });
      setProgress(null);
    });
  };

  const startVoice = () => {
    setVoice("recording");
    later(2000, () => {
      setVoice("processing");
      later(900, () => {
        setTranscript(tr("input.voiceExample"));
        setVoice("review");
      });
    });
  };

  const submit = (event?: FormEvent) => {
    event?.preventDefault();
    const value = text.trim();
    if (!value || disabled) return;
    onSend(value, attachment);
    setText("");
    setAttachment(null);
    setVoice("idle");
    setTranscript("");
  };

  const onKey = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
  };

  return (
    <form onSubmit={submit} className="space-y-2">
      {(attachment || progress !== null) && (
        <div className="flex items-center gap-3 rounded-xl border border-line bg-white px-3 py-2">
          {attachment?.url ? (
            <img src={attachment.url} alt="" className="h-12 w-12 rounded-lg object-cover" />
          ) : (
            <div className="h-12 w-12 rounded-lg bg-canvas" />
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-ink">
              {attachment?.name ?? tr("input.uploading")}
            </p>
            {progress !== null ? (
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-canvas">
                <div className="h-full bg-accent transition-all" style={{ width: `${progress}%` }} />
              </div>
            ) : (
              <p className="text-xs text-muted">{attachment?.sizeLabel}</p>
            )}
          </div>
          <button
            type="button"
            onClick={() => setAttachment(null)}
            className="rounded-lg p-1 text-muted hover:bg-canvas"
            aria-label={tr("input.remove")}
          >
            <IconX className="h-4 w-4" />
          </button>
        </div>
      )}

      {voice !== "idle" && (
        <div className="rounded-xl border border-line bg-white px-3 py-3 text-sm">
          {voice === "recording" && (
            <p className="flex items-center gap-2 font-medium text-danger">
              <span className="recording-dot inline-block h-2.5 w-2.5 rounded-full bg-danger" />
              {tr("input.recording")}
            </p>
          )}
          {voice === "processing" && <p className="text-muted">{tr("input.processing")}</p>}
          {voice === "review" && (
            <div className="space-y-3">
              <p className="text-xs text-muted">{tr("input.voiceHint")}</p>
              <p className="text-ink">{transcript}</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="rounded-lg bg-accent px-3 py-1.5 text-sm font-medium text-white"
                  onClick={() => {
                    setText(transcript);
                    setVoice("idle");
                  }}
                >
                  {tr("input.useTranscription")}
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-line px-3 py-1.5 text-sm"
                  onClick={() => {
                    setVoice("idle");
                    setTranscript("");
                  }}
                >
                  {tr("input.cancel")}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex items-end gap-2 rounded-2xl border border-line bg-white p-2 shadow-sm">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={handleFile}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="rounded-xl p-2.5 text-muted hover:bg-canvas hover:text-ink"
          aria-label={tr("input.attach")}
        >
          <IconPaperclip />
        </button>
        <button
          type="button"
          onClick={startVoice}
          disabled={voice === "recording" || voice === "processing"}
          className="rounded-xl p-2.5 text-muted hover:bg-canvas hover:text-ink disabled:opacity-50"
          aria-label={tr("input.voice")}
        >
          <IconMic />
        </button>
        <label className="sr-only" htmlFor="cheerio-chat-input">
          {placeholder ?? tr("input.placeholder")}
        </label>
        <textarea
          id="cheerio-chat-input"
          rows={1}
          value={text}
          disabled={disabled}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={onKey}
          placeholder={placeholder ?? tr("input.placeholder")}
          className="max-h-32 min-h-11 flex-1 resize-none bg-transparent py-2.5 text-sm text-ink outline-none placeholder:text-stone-400"
        />
        <button
          type="submit"
          disabled={disabled || !text.trim()}
          className="rounded-xl bg-accent p-2.5 text-white hover:bg-accent-hover disabled:cursor-not-allowed disabled:bg-stone-300"
          aria-label={tr("input.send")}
        >
          <IconSend />
        </button>
      </div>
    </form>
  );
}
