import { useState } from "react";
import { DiagnosticChecklist } from "../components/DiagnosticChecklist";
import { IconPause, IconPlay } from "../components/Icons";
import { Modal } from "../components/Modal";
import { TutorialCard } from "../components/TutorialCard";
import { useApp } from "../context/AppContext";

export function TroubleshootingPage() {
  const {
    tr,
    diagnosis,
    setPage,
    showFix,
    setShowFix,
    beginEscalation,
    activeTutorial,
    completedSteps,
    toggleStep,
    expandedStepId,
    guidanceMode,
    setGuidanceMode,
    videoOpen,
    setVideoOpen,
    stepsMarkedDone,
    markStepsDone,
    verifyPhase,
    runVerification,
    resolveYes,
    resolveNo,
    rewindToQuestion,
    messages,
    setExpandedStepId,
  } = useApp();
  const [playing, setPlaying] = useState(true);

  if (!diagnosis) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="text-xl font-semibold text-ink">{tr("diagnosis.title")}</h1>
        <p className="mt-2 text-sm text-muted">{tr("diagnosis.empty")}</p>
        <button
          type="button"
          onClick={() => setPage("assist")}
          className="mt-6 rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white"
        >
          {tr("diagnosis.startCta")}
        </button>
      </div>
    );
  }

  const firstQuestion = messages.find((item) => item.questionId);
  const total = activeTutorial?.steps.length ?? 0;
  const doneCount = completedSteps.length;
  const canShowFix = Boolean(activeTutorial) && !diagnosis.noDocs;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 lg:py-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-warn">
          {tr("diagnosis.demoLabel")}
        </p>
        {firstQuestion && (
          <button
            type="button"
            onClick={() => rewindToQuestion(firstQuestion.id)}
            className="text-sm font-medium text-accent hover:underline"
          >
            {tr("assist.editAnswers")}
          </button>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <section className="space-y-4">
          <div className="rounded-2xl border border-line bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">
              {tr("diagnosis.title")}
            </p>
            <h1 className="mt-2 text-xl font-bold text-ink">{tr(diagnosis.titleKey)}</h1>
            <p className="mt-3 text-sm leading-relaxed text-muted">{tr(diagnosis.bodyKey)}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {canShowFix && (
                <button
                  type="button"
                  onClick={() => setShowFix(true)}
                  className="rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white hover:bg-accent-hover"
                >
                  {tr("diagnosis.ctaFix")}
                </button>
              )}
              <button
                type="button"
                onClick={beginEscalation}
                className="rounded-xl border border-line px-4 py-2.5 text-sm font-medium text-ink hover:bg-canvas"
              >
                {tr("diagnosis.ctaHuman")}
              </button>
            </div>
          </div>
          <DiagnosticChecklist checks={diagnosis.checks} />
        </section>

        <section className="space-y-4">
          {!showFix && !stepsMarkedDone && (
            <div className="rounded-2xl border border-dashed border-line bg-white p-6 text-sm text-muted">
              {tr("diagnosis.fixHint")}
            </div>
          )}
          {showFix && activeTutorial && (
            <>
              <div className="flex rounded-xl bg-canvas p-1">
                <button
                  type="button"
                  onClick={() => setGuidanceMode("written")}
                  className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium ${
                    guidanceMode === "written" ? "bg-white text-ink shadow-sm" : "text-muted"
                  }`}
                >
                  {tr("step.written")}
                </button>
                <button
                  type="button"
                  onClick={() => setGuidanceMode("video")}
                  className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium ${
                    guidanceMode === "video" ? "bg-white text-ink shadow-sm" : "text-muted"
                  }`}
                >
                  {tr("step.video")}
                </button>
              </div>

              {(guidanceMode === "video" || !stepsMarkedDone) && (
                <TutorialCard
                  tutorial={activeTutorial}
                  onWatch={() => setVideoOpen(true)}
                  onRead={() => {
                    setGuidanceMode("written");
                    setShowFix(true);
                    if (activeTutorial.steps[0]) setExpandedStepId(activeTutorial.steps[0].id);
                  }}
                />
              )}

              <div className="rounded-2xl border border-line bg-white p-5">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h2 className="text-sm font-semibold text-ink">{tr("step.written")}</h2>
                  <p className="text-xs text-muted">
                    {tr("step.progress", { current: doneCount, total })}
                  </p>
                </div>
                <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-canvas">
                  <div
                    className="h-full bg-accent transition-all"
                    style={{ width: `${total ? (doneCount / total) * 100 : 0}%` }}
                  />
                </div>
                <ol className="space-y-2">
                  {activeTutorial.steps.map((step, index) => {
                    const open = expandedStepId === step.id;
                    const complete = completedSteps.includes(step.id);
                    return (
                      <li key={step.id} className="rounded-xl border border-line">
                        <button
                          type="button"
                          onClick={() => toggleStep(step.id)}
                          className="flex w-full items-center gap-3 px-3 py-3 text-left"
                          aria-expanded={open}
                        >
                          <span
                            className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                              complete ? "bg-accent text-white" : "bg-canvas text-muted"
                            }`}
                          >
                            {index + 1}
                          </span>
                          <span className="flex-1 text-sm font-medium text-ink">
                            {tr(step.titleKey)}
                          </span>
                        </button>
                        {open && (
                          <div className="space-y-2 border-t border-line px-3 py-3 text-sm text-muted">
                            <p>{tr(step.bodyKey)}</p>
                            <p className="rounded-lg bg-canvas px-3 py-2 text-xs">{tr(step.tipKey)}</p>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ol>
                <div className="mt-4 rounded-xl bg-accent-soft p-3">
                  <p className="text-sm font-semibold text-ink">{tr("step.whyTitle")}</p>
                  <p className="mt-1 text-sm text-muted">{tr("step.whyBody")}</p>
                </div>
                <button
                  type="button"
                  onClick={markStepsDone}
                  className="mt-4 w-full rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white hover:bg-accent-hover"
                >
                  {tr("step.done")}
                </button>
              </div>
            </>
          )}

          {stepsMarkedDone && (
            <div className="rounded-2xl border border-line bg-white p-5 shadow-sm">
              <h2 className="text-base font-semibold text-ink">{tr("verify.title")}</h2>
              <p className="mt-1 text-sm text-muted">{tr("verify.lead")}</p>
              <p className="mt-2 text-xs text-muted">{tr("verify.demoNote")}</p>

              {verifyPhase === "idle" && (
                <button
                  type="button"
                  onClick={runVerification}
                  className="mt-4 rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white"
                >
                  {tr("verify.testAgain")}
                </button>
              )}
              {verifyPhase === "checking" && (
                <p className="mt-4 text-sm text-muted">{tr("verify.checking")}</p>
              )}
              {verifyPhase === "success" && (
                <div className="mt-4 space-y-3">
                  <p className="rounded-xl bg-emerald-50 px-3 py-2 text-sm text-ok">
                    {tr("verify.success")}
                  </p>
                  <p className="text-sm font-medium text-ink">{tr("verify.ask")}</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={resolveYes}
                      className="rounded-xl bg-accent px-4 py-2 text-sm font-medium text-white"
                    >
                      {tr("verify.yes")}
                    </button>
                    <button
                      type="button"
                      onClick={resolveNo}
                      className="rounded-xl border border-line px-4 py-2 text-sm font-medium"
                    >
                      {tr("verify.no")}
                    </button>
                  </div>
                </div>
              )}
              {verifyPhase === "resolved" && (
                <div className="mt-4 rounded-xl bg-emerald-50 p-4">
                  <p className="font-semibold text-ok">{tr("verify.completeTitle")}</p>
                  <p className="mt-1 text-sm text-ink">{tr("verify.complete")}</p>
                </div>
              )}
              {verifyPhase === "fail" && (
                <div className="mt-4 space-y-3">
                  <p className="rounded-xl bg-amber-50 px-3 py-2 text-sm text-warn">{tr("verify.fail")}</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowFix(true);
                        setGuidanceMode("written");
                      }}
                      className="rounded-xl border border-line px-4 py-2 text-sm font-medium"
                    >
                      {tr("verify.review")}
                    </button>
                    <button
                      type="button"
                      onClick={beginEscalation}
                      className="rounded-xl bg-accent px-4 py-2 text-sm font-medium text-white"
                    >
                      {tr("verify.human")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      </div>

      {activeTutorial && (
        <Modal
          open={videoOpen}
          onClose={() => setVideoOpen(false)}
          title={tr(activeTutorial.titleKey)}
          wide
        >
          <div className="overflow-hidden rounded-xl bg-stone-900">
            <div className="relative">
              <img src={activeTutorial.thumbnail} alt="" className="h-64 w-full object-cover opacity-80" />
              <button
                type="button"
                onClick={() => setPlaying((value) => !value)}
                className="absolute inset-0 flex items-center justify-center text-white"
                aria-label={playing ? "Pause" : "Play"}
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/50">
                  {playing ? <IconPause className="h-7 w-7" /> : <IconPlay className="h-7 w-7" />}
                </span>
              </button>
              <p className="absolute left-3 top-3 rounded-full bg-black/70 px-2 py-1 text-xs text-white">
                {tr("tut.playing")} {activeTutorial.timestamp}
              </p>
            </div>
            <div className="space-y-2 p-3">
              <div className="h-1.5 overflow-hidden rounded-full bg-white/20">
                <div className="h-full w-[28%] bg-white" />
              </div>
              <p className="text-xs text-white/70">{tr("tut.playerHint")}</p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
