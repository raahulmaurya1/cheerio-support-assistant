import { NO_DOCS_PATTERN, PERMISSION_PATTERN, UNCLEAR_PATTERN } from "../data/mockData";
import { getTutorialForIssue } from "./knowledgeService";
import type {
  ChannelOption,
  ChatMessage,
  ChatOption,
  CheckStatus,
  DiagnosticAnswers,
  DiagnosticCheck,
  DiagnosisResult,
  EscalationDraft,
  IntegrationStatusOption,
  IssueId,
  Language,
  QuestionId,
  ResolutionResult,
  SupportTicket,
  TemplateActionOption,
  TemplateStatusOption,
  WhatsappStatusOption,
  WorkflowEventOption,
  YesNo,
  YesNoUnsure,
} from "../types";

let ticketSerial = 4820;

export function createId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

export function classifyIssue(text: string): IssueId {
  const value = text.trim();
  if (PERMISSION_PATTERN.test(value)) return "permission";
  if (NO_DOCS_PATTERN.test(value)) return "no_docs";
  if (UNCLEAR_PATTERN.test(value) || value.length < 12) return "unclear";

  const lower = value.toLowerCase();
  if (
    lower.includes("playground") ||
    lower.includes("assistant") ||
    lower.includes("असिस्टेंट")
  ) {
    return "assistant_whatsapp";
  }
  if (lower.includes("template") || lower.includes("टेम्पलेट")) {
    return "template_approval";
  }
  if (
    lower.includes("shopify") ||
    lower.includes("integration") ||
    lower.includes("इंटीग्रेशन")
  ) {
    return "integration";
  }
  if (
    lower.includes("trigger") ||
    lower.includes("not triggering") ||
    lower.includes("ट्रिगर")
  ) {
    return "workflow_trigger";
  }
  if (
    (lower.includes("whatsapp") && (lower.includes("connect") || lower.includes("channel"))) ||
    lower.includes("कनेक्शन")
  ) {
    return "whatsapp_connection";
  }
  if (lower.includes("whatsapp") && (lower.includes("not respond") || lower.includes("जवाब"))) {
    return "assistant_whatsapp";
  }
  return "unclear";
}

export function issueNeedsQuestions(issueId: IssueId): boolean {
  return (
    issueId === "assistant_whatsapp" ||
    issueId === "workflow_trigger" ||
    issueId === "whatsapp_connection" ||
    issueId === "template_approval" ||
    issueId === "integration"
  );
}

export function emptyAnswers(): DiagnosticAnswers {
  return {
    playgroundResponds: null,
    channel: null,
    workflowActive: null,
    workflowEvent: null,
    whatsappStatus: null,
    whatsappRelogin: null,
    templateStatus: null,
    templateAction: null,
    integrationStatus: null,
    integrationAdmin: null,
  };
}

function check(id: string, labelKey: string, status: CheckStatus): DiagnosticCheck {
  return { id, labelKey, status };
}

export function buildDiagnosis(
  issueId: IssueId,
  answers: DiagnosticAnswers,
): DiagnosisResult {
  if (issueId === "no_docs") {
    return {
      issueId,
      titleKey: "nodocs.title",
      bodyKey: "nodocs.body",
      checks: [],
      tutorialId: null,
      inconclusive: true,
      needsAdmin: false,
      noDocs: true,
    };
  }

  if (issueId === "permission") {
    return {
      issueId,
      titleKey: "permission.title",
      bodyKey: "permission.body",
      checks: [
        check("permission", "check.permission", "needs_attention"),
        check("integration", "check.integration", "not_verified"),
      ],
      tutorialId: "store-integration",
      inconclusive: false,
      needsAdmin: true,
      noDocs: false,
    };
  }

  if (issueId === "unclear") {
    return {
      issueId,
      titleKey: "diag.unclear.title",
      bodyKey: "diag.unclear.body",
      checks: [],
      tutorialId: null,
      inconclusive: true,
      needsAdmin: false,
      noDocs: false,
    };
  }

  if (issueId === "whatsapp_connection") {
    const isQr = answers.whatsappStatus === "qr_code";
    return {
      issueId,
      titleKey: isQr ? "diag.whatsapp.qr.title" : "diag.whatsapp.title",
      bodyKey: isQr ? "diag.whatsapp.qr.body" : "diag.whatsapp.body",
      checks: [
        check("connection", "check.connection", "needs_attention"),
        check("trigger", "check.trigger", "not_verified"),
        check("active", "check.active", "not_verified"),
      ],
      tutorialId: getTutorialForIssue(issueId)?.id ?? null,
      inconclusive: false,
      needsAdmin: false,
      noDocs: false,
    };
  }

  if (issueId === "template_approval") {
    return {
      issueId,
      titleKey: "diag.template.title",
      bodyKey: "diag.template.body",
      checks: [
        check("template", "check.template", "needs_attention"),
        check("active", "check.active", "checked"),
        check("connection", "check.connection", "not_verified"),
      ],
      tutorialId: getTutorialForIssue(issueId)?.id ?? null,
      inconclusive: false,
      needsAdmin: false,
      noDocs: false,
    };
  }

  if (issueId === "integration") {
    return {
      issueId,
      titleKey: "diag.integration.title",
      bodyKey: "diag.integration.body",
      checks: [
        check("integration", "check.integration", "needs_attention"),
        check("permission", "check.permission", "needs_attention"),
        check("trigger", "check.trigger", "not_verified"),
      ],
      tutorialId: getTutorialForIssue(issueId)?.id ?? null,
      inconclusive: false,
      needsAdmin: true,
      noDocs: false,
    };
  }

  if (issueId === "workflow_trigger") {
    const activeStatus: CheckStatus =
      answers.workflowActive === "yes" ? "checked" : "needs_attention";
    return {
      issueId,
      titleKey: "diag.workflow.title",
      bodyKey: "diag.workflow.body",
      checks: [
        check("trigger", "check.trigger", "needs_attention"),
        check("active", "check.active", activeStatus),
        check("connection", "check.connection", "not_verified"),
      ],
      tutorialId: getTutorialForIssue(issueId)?.id ?? null,
      inconclusive: false,
      needsAdmin: false,
      noDocs: false,
    };
  }

  if (answers.playgroundResponds === "no") {
    return {
      issueId: "assistant_whatsapp",
      titleKey: "diag.assistant.playgroundNo.title",
      bodyKey: "diag.assistant.playgroundNo.body",
      checks: [
        check("playground", "check.playground", "needs_attention"),
        check("assistant", "check.assistant", "not_verified"),
        check("active", "check.active", "not_verified"),
      ],
      tutorialId: getTutorialForIssue("assistant_whatsapp")?.id ?? null,
      inconclusive: false,
      needsAdmin: false,
      noDocs: false,
    };
  }

  if (answers.channel === "instagram") {
    return {
      issueId: "assistant_whatsapp",
      titleKey: "diag.instagram.title",
      bodyKey: "diag.instagram.body",
      checks: [
        check("instagram", "check.instagram", "needs_attention"),
        check("assistant", "check.assistant", "needs_attention"),
        check("active", "check.active", answers.workflowActive === "yes" ? "checked" : "not_verified"),
      ],
      tutorialId: getTutorialForIssue("assistant_whatsapp")?.id ?? null,
      inconclusive: false,
      needsAdmin: false,
      noDocs: false,
    };
  }

  if (answers.channel === "other") {
    return {
      issueId: "no_docs",
      titleKey: "nodocs.title",
      bodyKey: "nodocs.body",
      checks: [
        check("connection", "check.connection", "not_verified"),
        check("trigger", "check.trigger", "not_verified"),
      ],
      tutorialId: null,
      inconclusive: true,
      needsAdmin: false,
      noDocs: true,
    };
  }

  const activeStatus: CheckStatus =
    answers.workflowActive === "yes" ? "checked" : "needs_attention";

  return {
    issueId: "assistant_whatsapp",
    titleKey: "diag.assistant.title",
    bodyKey: "diag.assistant.body",
    checks: [
      check("assistant", "check.assistant", "needs_attention"),
      check("trigger", "check.trigger", "not_verified"),
      check("active", "check.active", activeStatus),
      check("connection", "check.connection", "not_verified"),
    ],
    tutorialId: getTutorialForIssue("assistant_whatsapp")?.id ?? null,
    inconclusive: false,
    needsAdmin: false,
    noDocs: false,
  };
}

export function applyAnswer(
  answers: DiagnosticAnswers,
  questionId: QuestionId,
  optionId: string,
): DiagnosticAnswers {
  if (questionId === "playground") {
    return { ...answers, playgroundResponds: optionId as YesNo };
  }
  if (questionId === "channel") {
    return { ...answers, channel: optionId as ChannelOption };
  }
  if (questionId === "workflow") {
    return { ...answers, workflowActive: optionId as YesNoUnsure };
  }
  if (questionId === "workflow_event") {
    return { ...answers, workflowEvent: optionId as WorkflowEventOption };
  }
  if (questionId === "whatsapp_status") {
    return { ...answers, whatsappStatus: optionId as WhatsappStatusOption };
  }
  if (questionId === "whatsapp_relogin") {
    return { ...answers, whatsappRelogin: optionId as YesNoUnsure };
  }
  if (questionId === "template_status") {
    return { ...answers, templateStatus: optionId as TemplateStatusOption };
  }
  if (questionId === "template_action") {
    return { ...answers, templateAction: optionId as TemplateActionOption };
  }
  if (questionId === "integration_status") {
    return { ...answers, integrationStatus: optionId as IntegrationStatusOption };
  }
  if (questionId === "integration_admin") {
    return { ...answers, integrationAdmin: optionId as YesNoUnsure };
  }
  return answers;
}

export function nextQuestionId(
  issueId: IssueId,
  answers: DiagnosticAnswers,
): QuestionId | null {
  if (!issueNeedsQuestions(issueId)) return null;
  if (issueId === "whatsapp_connection") {
    if (!answers.whatsappStatus) return "whatsapp_status";
    if (!answers.whatsappRelogin) return "whatsapp_relogin";
    return null;
  }
  if (issueId === "template_approval") {
    if (!answers.templateStatus) return "template_status";
    if (!answers.templateAction) return "template_action";
    return null;
  }
  if (issueId === "integration") {
    if (!answers.integrationStatus) return "integration_status";
    if (!answers.integrationAdmin) return "integration_admin";
    return null;
  }
  if (issueId === "assistant_whatsapp") {
    if (!answers.playgroundResponds) return "playground";
    if (answers.playgroundResponds === "no") return null;
    if (!answers.channel) return "channel";
    if (!answers.workflowActive) return "workflow";
    return null;
  }
  if (issueId === "workflow_trigger") {
    if (!answers.workflowActive) return "workflow";
    if (!answers.workflowEvent) return "workflow_event";
    return null;
  }
  return null;
}

export function assistantText(
  textKey: string,
  extra?: Partial<ChatMessage>,
): ChatMessage {
  return {
    id: createId("msg"),
    role: "assistant",
    textKey,
    createdAt: Date.now(),
    ...extra,
  };
}

export function clarifyingMessage(): ChatMessage {
  return assistantText("clarify.body", {
    questionId: "clarify",
    options: [
      { id: "assistant_whatsapp", labelKey: "clarify.assistant" },
      { id: "template_approval", labelKey: "clarify.templates" },
      { id: "integration", labelKey: "clarify.integrations" },
      { id: "no_docs", labelKey: "clarify.other" },
    ],
  });
}

export function questionMessage(questionId: QuestionId): ChatMessage {
  let options: ChatOption[] = [];
  if (questionId === "playground") {
    options = [
      { id: "yes", labelKey: "opt.yes" },
      { id: "no", labelKey: "opt.no" },
    ];
  } else if (questionId === "channel") {
    options = [
      { id: "whatsapp", labelKey: "opt.whatsapp" },
      { id: "instagram", labelKey: "opt.instagram" },
      { id: "other", labelKey: "opt.other" },
    ];
  } else if (questionId === "workflow") {
    options = [
      { id: "yes", labelKey: "opt.yes" },
      { id: "no", labelKey: "opt.no" },
      { id: "unsure", labelKey: "opt.unsure" },
    ];
  } else if (questionId === "workflow_event") {
    options = [
      { id: "order_created", labelKey: "opt.workflow.order" },
      { id: "abandoned_cart", labelKey: "opt.workflow.cart" },
      { id: "incoming_message", labelKey: "opt.workflow.incoming" },
    ];
  } else if (questionId === "whatsapp_status") {
    options = [
      { id: "disconnected", labelKey: "opt.whatsapp.disconnected" },
      { id: "qr_code", labelKey: "opt.whatsapp.qr" },
      { id: "connected_silent", labelKey: "opt.whatsapp.connectedSilent" },
    ];
  } else if (questionId === "whatsapp_relogin") {
    options = [
      { id: "yes", labelKey: "opt.yes" },
      { id: "no", labelKey: "opt.no" },
      { id: "unsure", labelKey: "opt.unsure" },
    ];
  } else if (questionId === "template_status") {
    options = [
      { id: "in_review", labelKey: "opt.template.inReview" },
      { id: "rejected", labelKey: "opt.template.rejected" },
      { id: "approved", labelKey: "opt.template.approved" },
    ];
  } else if (questionId === "template_action") {
    options = [
      { id: "vars_tested", labelKey: "opt.template.tested" },
      { id: "vars_missing", labelKey: "opt.template.missing" },
      { id: "pending_meta", labelKey: "opt.template.pending" },
    ];
  } else if (questionId === "integration_status") {
    options = [
      { id: "oauth_error", labelKey: "opt.integration.oauth" },
      { id: "store_url", labelKey: "opt.integration.storeUrl" },
      { id: "sync_issue", labelKey: "opt.integration.sync" },
    ];
  } else if (questionId === "integration_admin") {
    options = [
      { id: "yes", labelKey: "opt.integration.owner" },
      { id: "no", labelKey: "opt.integration.staff" },
      { id: "unsure", labelKey: "opt.integration.unsure" },
    ];
  }

  return {
    id: createId("msg"),
    role: "assistant",
    textKey: `q.${questionId}`,
    options,
    questionId,
    createdAt: Date.now(),
  };
}

export function getAcknowledgmentKey(
  questionId: QuestionId,
  optionId: string,
): string | null {
  if (questionId === "playground") {
    return optionId === "yes" ? "ack.playground.yes" : "ack.playground.no";
  }
  if (questionId === "channel") {
    if (optionId === "whatsapp") return "ack.channel.whatsapp";
    if (optionId === "instagram") return "ack.channel.instagram";
    return "ack.channel.other";
  }
  if (questionId === "workflow") {
    if (optionId === "yes") return "ack.workflow.yes";
    if (optionId === "no") return "ack.workflow.no";
    return "ack.workflow.unsure";
  }
  if (questionId === "workflow_event") {
    if (optionId === "order_created") return "ack.workflow.order";
    if (optionId === "abandoned_cart") return "ack.workflow.cart";
    return "ack.workflow.incoming";
  }
  if (questionId === "whatsapp_status") {
    if (optionId === "qr_code") return "ack.whatsapp.qr";
    if (optionId === "disconnected") return "ack.whatsapp.disconnected";
    if (optionId === "connected_silent") return "ack.whatsapp.connectedSilent";
  }
  if (questionId === "whatsapp_relogin") {
    if (optionId === "yes") return "ack.whatsapp.reloginYes";
    if (optionId === "no") return "ack.whatsapp.reloginNo";
  }
  if (questionId === "template_status") {
    if (optionId === "in_review") return "ack.template.inReview";
    if (optionId === "rejected") return "ack.template.rejected";
    return "ack.template.approved";
  }
  if (questionId === "template_action") {
    if (optionId === "vars_tested") return "ack.template.tested";
    if (optionId === "vars_missing") return "ack.template.missing";
    return "ack.template.pending";
  }
  if (questionId === "integration_status") {
    if (optionId === "oauth_error") return "ack.integration.oauth";
    if (optionId === "store_url") return "ack.integration.storeUrl";
    return "ack.integration.sync";
  }
  if (questionId === "integration_admin") {
    if (optionId === "yes") return "ack.integration.owner";
    if (optionId === "no") return "ack.integration.staff";
    return "ack.integration.unsure";
  }
  return null;
}

export function checkResolution(stepsDone: number, stepsTotal: number): ResolutionResult {
  if (stepsTotal > 0 && stepsDone >= stepsTotal) {
    return { success: true, messageKey: "verify.success" };
  }
  return { success: false, messageKey: "verify.incomplete" };
}

export function causeKeyFor(diagnosis: DiagnosisResult | null): string {
  if (!diagnosis) return "cause.unknown";
  if (diagnosis.noDocs) return "cause.nodocs";
  if (diagnosis.needsAdmin && diagnosis.issueId === "permission") return "cause.permission";
  if (diagnosis.issueId === "whatsapp_connection") return "cause.whatsapp";
  if (diagnosis.issueId === "template_approval") return "cause.template";
  if (diagnosis.issueId === "workflow_trigger") return "cause.workflow";
  if (diagnosis.issueId === "integration") return "cause.integration";
  if (diagnosis.issueId === "assistant_whatsapp") return "cause.assistant";
  return "cause.unknown";
}

export function channelKeyFor(answers: DiagnosticAnswers): string {
  if (answers.channel === "whatsapp") return "channel.whatsapp";
  if (answers.channel === "instagram") return "channel.instagram";
  if (answers.channel === "other") return "channel.other";
  return "channel.unknown";
}

export function createTicket(
  draft: EscalationDraft,
  language: Language,
): SupportTicket {
  ticketSerial += 1;
  return {
    id: `CA-${ticketSerial}`,
    createdAt: Date.now(),
    status: "open",
    problem: draft.problem,
    channelLabelKey: draft.channelLabelKey,
    suspectedCauseKey: draft.suspectedCauseKey,
    stepsAttemptedKeys: draft.stepsAttemptedKeys,
    diagnostics: draft.diagnostics,
    language,
    screenshotName: draft.screenshotName,
    screenshotUrl: draft.screenshotUrl,
  };
}

export function buildEscalationDraft(input: {
  problem: string;
  answers: DiagnosticAnswers;
  diagnosis: DiagnosisResult | null;
  completedStepCount: number;
  watchedVideo: boolean;
  ranCheck: boolean;
  screenshotName?: string;
  screenshotUrl?: string;
}): EscalationDraft {
  const stepsAttemptedKeys: string[] = [];
  if (input.completedStepCount > 0) stepsAttemptedKeys.push("steps.guided");
  if (input.watchedVideo) stepsAttemptedKeys.push("steps.video");
  if (input.ranCheck) stepsAttemptedKeys.push("steps.verified");
  if (stepsAttemptedKeys.length === 0) stepsAttemptedKeys.push("steps.none");

  return {
    problem: input.problem,
    channelLabelKey: channelKeyFor(input.answers),
    suspectedCauseKey: causeKeyFor(input.diagnosis),
    stepsAttemptedKeys,
    diagnostics: input.diagnosis?.checks ?? [],
    screenshotName: input.screenshotName,
    screenshotUrl: input.screenshotUrl,
  };
}
