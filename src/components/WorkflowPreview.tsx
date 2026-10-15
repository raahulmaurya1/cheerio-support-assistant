import { useApp } from "../context/AppContext";
import type { WorkflowProposal } from "../types";

export function WorkflowPreview({ proposal }: { proposal: WorkflowProposal }) {
  const { tr } = useApp();

  return (
    <div className="rounded-2xl border border-line bg-white p-4">
      <h3 className="mb-4 text-sm font-semibold text-ink">{tr("auto.preview")}</h3>
      <ol className="flex flex-col items-stretch gap-0">
        {proposal.nodes.map((node, index) => (
          <li key={node.id} className="flex flex-col items-center">
            <div
              className={`w-full max-w-xs rounded-xl border px-4 py-3 text-center text-sm font-medium ${
                node.type === "trigger"
                  ? "border-teal-200 bg-accent-soft text-accent"
                  : node.type === "action"
                    ? "border-line bg-ink text-white"
                    : "border-line bg-canvas text-ink"
              }`}
            >
              {node.label}
            </div>
            {index < proposal.nodes.length - 1 && (
              <div className="flex h-8 flex-col items-center justify-center text-muted" aria-hidden>
                <span className="h-6 w-px bg-line" />
                <span className="text-xs">↓</span>
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
