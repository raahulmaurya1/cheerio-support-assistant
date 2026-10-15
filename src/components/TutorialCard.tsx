import { useApp } from "../context/AppContext";
import type { Tutorial } from "../types";
import { IconClock, IconPlay } from "./Icons";

interface TutorialCardProps {
  tutorial: Tutorial;
  onWatch: () => void;
  onRead: () => void;
}

export function TutorialCard({ tutorial, onWatch, onRead }: TutorialCardProps) {
  const { tr } = useApp();

  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
      <button type="button" onClick={onWatch} className="relative block w-full">
        <img
          src={tutorial.thumbnail}
          alt=""
          className="h-44 w-full object-cover"
        />
        <span className="absolute inset-0 bg-stone-900/20" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-accent shadow">
            <IconPlay />
          </span>
        </span>
        <span className="absolute bottom-3 left-3 rounded-full bg-stone-900/80 px-2 py-0.5 text-xs text-white">
          {tutorial.timestamp} / {tutorial.duration}
        </span>
      </button>
      <div className="space-y-3 p-4">
        <h3 className="text-base font-semibold text-ink">{tr(tutorial.titleKey)}</h3>
        <p className="flex items-center gap-1.5 text-sm text-muted">
          <IconClock className="h-4 w-4" />
          {tr("tut.relevant")}: {tutorial.timestamp}
        </p>
        <p className="text-sm text-muted">
          <span className="font-medium text-ink">{tr("tut.whyLabel")}: </span>
          {tr(tutorial.whyKey)}
        </p>
        <p className="text-xs text-muted">{tr("tut.sampleSource")}</p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onWatch}
            className="rounded-xl bg-accent px-3 py-2 text-sm font-medium text-white hover:bg-accent-hover"
          >
            {tr("tut.watch")}
          </button>
          <button
            type="button"
            onClick={onRead}
            className="rounded-xl border border-line px-3 py-2 text-sm font-medium text-ink hover:bg-canvas"
          >
            {tr("tut.read")}
          </button>
        </div>
      </div>
    </article>
  );
}
