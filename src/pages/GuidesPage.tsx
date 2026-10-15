import { useState } from "react";
import { Modal } from "../components/Modal";
import { TutorialCard } from "../components/TutorialCard";
import { useApp } from "../context/AppContext";
import { guideCards } from "../data/mockData";
import { getTutorialById } from "../services/knowledgeService";

export function GuidesPage() {
  const { tr, startIssueFromGuide, setVideoOpen, videoOpen } = useApp();
  const [openId, setOpenId] = useState<string | null>(null);
  const openTutorial = openId ? getTutorialById(openId) : undefined;

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 lg:py-8">
      <h1 className="text-2xl font-bold text-ink">{tr("guides.title")}</h1>
      <p className="mt-1 text-sm text-muted">{tr("guides.subtitle")}</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {guideCards.map((card) => {
          const tutorial = getTutorialById(card.tutorialId);
          if (!tutorial) return null;
          const issue = tutorial.issueIds[0];
          return (
            <div key={card.id} className="flex flex-col">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-accent">
                {tr(card.categoryKey)}
              </p>
              <TutorialCard
                tutorial={tutorial}
                onWatch={() => {
                  setOpenId(tutorial.id);
                  setVideoOpen(true);
                }}
                onRead={() => setOpenId(tutorial.id)}
              />
              <button
                type="button"
                onClick={() => startIssueFromGuide(issue)}
                className="mt-2 text-left text-sm font-medium text-accent hover:underline"
              >
                {tr("guides.useAssist")}
              </button>
            </div>
          );
        })}
      </div>

      {openTutorial && (
        <Modal
          open={Boolean(openId) && (videoOpen || Boolean(openId))}
          onClose={() => {
            setOpenId(null);
            setVideoOpen(false);
          }}
          title={tr(openTutorial.titleKey)}
          wide
        >
          <img src={openTutorial.thumbnail} alt="" className="mb-4 h-48 w-full rounded-xl object-cover" />
          <p className="text-sm text-muted">{tr(openTutorial.whyKey)}</p>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-ink">
            {openTutorial.steps.map((step) => (
              <li key={step.id}>
                <span className="font-medium">{tr(step.titleKey)}</span>
                <p className="text-muted">{tr(step.bodyKey)}</p>
              </li>
            ))}
          </ol>
        </Modal>
      )}
    </div>
  );
}
