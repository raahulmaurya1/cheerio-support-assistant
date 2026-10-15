import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { t } from "../data/i18n";
import {
  applyAnswer,
  assistantText,
  buildDiagnosis,
  buildEscalationDraft,
  checkResolution,
  clarifyingMessage,
  createTicket,
  emptyAnswers,
  getAcknowledgmentKey,
  issueNeedsQuestions,
  nextQuestionId,
  questionMessage,
  classifyIssue,
} from "../services/supportService";
import { getTutorialById, getTutorialForIssue } from "../services/knowledgeService";
import {
  generateProposal,
  refreshProposal,
  simulateExecution,
  validateProposal,
} from "../services/autopilotService";
import type {
  Attachment,
  AutopilotPhase,
  ChatMessage,
  DiagnosticAnswers,
  DiagnosisResult,
  EscalationDraft,
  ExecutionResult,
  IssueId,
  Language,
  PageId,
  SupportTicket,
  Tutorial,
  ValidationResult,
  WorkflowProposal,
} from "../types";

export type VerifyPhase = "idle" | "checking" | "success" | "fail" | "resolved";
export type GuidanceMode = "written" | "video";

interface AutopilotState {
  phase: AutopilotPhase;
  requestText: string;
  proposal: WorkflowProposal | null;
  editing: boolean;
  execution: ExecutionResult | null;
  attachment: Attachment | null;
}

interface AppContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  tr: (key: string, vars?: Record<string, string | number>) => string;
  page: PageId;
  setPage: (page: PageId) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  messages: ChatMessage[];
  thinking: boolean;
  issueId: IssueId | null;
  answers: DiagnosticAnswers;
  problemText: string;
  diagnosis: DiagnosisResult | null;
  sessionAttachment: Attachment | null;
  showFix: boolean;
  setShowFix: (value: boolean) => void;
  completedSteps: string[];
  toggleStep: (stepId: string) => void;
  expandedStepId: string | null;
  setExpandedStepId: (id: string | null) => void;
  guidanceMode: GuidanceMode;
  setGuidanceMode: (mode: GuidanceMode) => void;
  videoOpen: boolean;
  setVideoOpen: (open: boolean) => void;
  watchedVideo: boolean;
  stepsMarkedDone: boolean;
  markStepsDone: () => void;
  verifyPhase: VerifyPhase;
  runVerification: () => void;
  resolveYes: () => void;
  resolveNo: () => void;
  tickets: SupportTicket[];
  selectedTicketId: string | null;
  setSelectedTicketId: (id: string | null) => void;
  ticketJustCreated: boolean;
  escalationDraft: EscalationDraft | null;
  beginEscalation: () => void;
  submitTicket: () => void;
  startConversation: (text: string, issue?: IssueId, attachment?: Attachment | null) => void;
  sendChatMessage: (text: string, attachment?: Attachment | null) => void;
  selectOption: (messageId: string, optionId: string) => void;
  rewindToQuestion: (messageId: string) => void;
  activeTutorial: Tutorial | null;
  autopilot: AutopilotState;
  setAutopilotRequest: (text: string) => void;
  setAutopilotAttachment: (file: Attachment | null) => void;
  continueAutopilotRequest: () => void;
  prepareAutopilot: () => void;
  updateProposal: (patch: Partial<WorkflowProposal>) => void;
  approveAutopilot: () => void;
  rejectAutopilot: () => void;
  cancelAutopilot: () => void;
  proposalValidation: ValidationResult;
  startIssueFromGuide: (issueId: IssueId) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

const initialAutopilot: AutopilotState = {
  phase: "idle",
  requestText: "",
  proposal: null,
  editing: false,
  execution: null,
  attachment: null,
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [page, setPage] = useState<PageId>("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [thinking, setThinking] = useState(false);
  const [issueId, setIssueId] = useState<IssueId | null>(null);
  const [answers, setAnswers] = useState<DiagnosticAnswers>(emptyAnswers());
  const [problemText, setProblemText] = useState("");
  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null);
  const [sessionAttachment, setSessionAttachment] = useState<Attachment | null>(null);
  const [showFix, setShowFix] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [expandedStepId, setExpandedStepId] = useState<string | null>(null);
  const [guidanceMode, setGuidanceMode] = useState<GuidanceMode>("written");
  const [videoOpen, setVideoOpen] = useState(false);
  const [watchedVideo, setWatchedVideo] = useState(false);
  const [stepsMarkedDone, setStepsMarkedDone] = useState(false);
  const [verifyPhase, setVerifyPhase] = useState<VerifyPhase>("idle");
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [ticketJustCreated, setTicketJustCreated] = useState(false);
  const [escalationDraft, setEscalationDraft] = useState<EscalationDraft | null>(null);
  const [autopilot, setAutopilot] = useState<AutopilotState>(initialAutopilot);
  const timers = useRef<number[]>([]);

  const tr = useCallback(
    (key: string, vars?: Record<string, string | number>) => t(language, key, vars),
    [language],
  );

  useEffect(() => {
    document.documentElement.lang = language === "hi" ? "hi" : "en";
  }, [language]);

  useEffect(() => {
    return () => {
      timers.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const later = useCallback((ms: number, fn: () => void) => {
    const id = window.setTimeout(fn, ms);
    timers.current.push(id);
  }, []);

  const resetFixState = useCallback(() => {
    setShowFix(false);
    setCompletedSteps([]);
    setExpandedStepId(null);
    setGuidanceMode("written");
    setVideoOpen(false);
    setWatchedVideo(false);
    setStepsMarkedDone(false);
    setVerifyPhase("idle");
  }, []);

  const finishDiagnosis = useCallback(
    (nextIssue: IssueId, nextAnswers: DiagnosticAnswers) => {
      const result = buildDiagnosis(nextIssue, nextAnswers);
      setDiagnosis(result);
      setIssueId(result.issueId);
      resetFixState();
      const cta: ChatMessage["cta"] = result.noDocs || result.inconclusive
        ? "contact_support"
        : "view_diagnosis";
      const textKey = result.noDocs
        ? "nodocs.body"
        : result.needsAdmin && result.issueId === "permission"
          ? "permission.body"
          : result.inconclusive
            ? "diag.unclear.body"
            : result.titleKey;
      setMessages((prev) => [...prev, assistantText(textKey, { cta, variant: result.noDocs ? "warning" : "info" })]);
      later(450, () => {
        setThinking(false);
      });
    },
    [later, resetFixState],
  );

  const pushAssistantFollowUp = useCallback(
    (nextIssue: IssueId, nextAnswers: DiagnosticAnswers) => {
      if (nextIssue === "unclear") {
        setMessages((prev) => [...prev, clarifyingMessage()]);
        setThinking(false);
        return;
      }
      if (nextIssue === "no_docs" || nextIssue === "permission" || !issueNeedsQuestions(nextIssue)) {
        finishDiagnosis(nextIssue, nextAnswers);
        return;
      }
      const q = nextQuestionId(nextIssue, nextAnswers);
      if (!q) {
        finishDiagnosis(nextIssue, nextAnswers);
        return;
      }
      setMessages((prev) => [...prev, questionMessage(q)]);
      setThinking(false);
    },
    [finishDiagnosis],
  );

  const startConversation = useCallback(
    (text: string, issue?: IssueId, attachment?: Attachment | null) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      const nextIssue = issue ?? classifyIssue(trimmed);
      setProblemText(trimmed);
      setIssueId(nextIssue);
      setAnswers(emptyAnswers());
      setDiagnosis(null);
      resetFixState();
      setTicketJustCreated(false);
      if (attachment) setSessionAttachment(attachment);
      const userMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        role: "user",
        text: trimmed,
        createdAt: Date.now(),
        attachmentName: attachment?.name,
        attachmentUrl: attachment?.url,
      };
      setMessages([userMessage]);
      setPage("assist");
      setThinking(true);
      later(650, () => {
        setMessages((prev) => {
          const ackKey =
            nextIssue === "unclear"
              ? "clarify.title"
              : nextIssue === "no_docs"
                ? "nodocs.title"
                : nextIssue === "permission"
                  ? "permission.title"
                  : "assist.ack";
          return [...prev, assistantText(ackKey)];
        });
        later(500, () => pushAssistantFollowUp(nextIssue, emptyAnswers()));
      });
    },
    [later, pushAssistantFollowUp, resetFixState],
  );

  const selectOption = useCallback(
    (messageId: string, optionId: string) => {
      const target = messages.find((item) => item.id === messageId);
      if (!target || target.selectedOptionId) return;

      setMessages((prev) =>
        prev.map((item) =>
          item.id === messageId ? { ...item, selectedOptionId: optionId } : item,
        ),
      );

      const labelKey = target.options?.find((opt) => opt.id === optionId)?.labelKey;
      const userMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        role: "user",
        textKey: labelKey,
        createdAt: Date.now(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setThinking(true);

      if (target.questionId === "clarify") {
        const nextIssue = optionId as IssueId;
        setIssueId(nextIssue);
        later(500, () => {
          if (nextIssue === "no_docs") {
            finishDiagnosis(nextIssue, answers);
            return;
          }
          if (nextIssue === "assistant_whatsapp") {
            setMessages((prev) => [...prev, assistantText("assist.ack"), questionMessage("playground")]);
            setThinking(false);
            return;
          }
          finishDiagnosis(nextIssue, answers);
        });
        return;
      }

      if (!target.questionId) return;
      const questionId = target.questionId;
      const nextAnswers = applyAnswer(answers, questionId, optionId);
      setAnswers(nextAnswers);
      const currentIssue = issueId ?? "whatsapp_connection";
      const ackKey = getAcknowledgmentKey(questionId, optionId);

      if (ackKey) {
        later(400, () => {
          setMessages((prev) => [...prev, assistantText(ackKey)]);
          later(600, () => pushAssistantFollowUp(currentIssue, nextAnswers));
        });
      } else {
        later(500, () => pushAssistantFollowUp(currentIssue, nextAnswers));
      }
    },
    [answers, finishDiagnosis, issueId, later, messages, pushAssistantFollowUp],
  );

  const rewindToQuestion = useCallback((messageId: string) => {
    setMessages((prev) => {
      const index = prev.findIndex((item) => item.id === messageId);
      if (index < 0) return prev;
      const kept = prev.slice(0, index + 1).map((item, idx) =>
        idx === index ? { ...item, selectedOptionId: undefined } : item,
      );
      return kept;
    });
    const target = messages.find((item) => item.id === messageId);
    setDiagnosis(null);
    resetFixState();
    setThinking(false);
    setAnswers((prev) => {
      if (target?.questionId === "playground") {
        return emptyAnswers();
      }
      if (target?.questionId === "channel") {
        return { ...prev, channel: null, workflowActive: null };
      }
      if (target?.questionId === "workflow") {
        return { ...prev, workflowActive: null, workflowEvent: null };
      }
      if (target?.questionId === "workflow_event") {
        return { ...prev, workflowEvent: null };
      }
      if (target?.questionId === "whatsapp_status") {
        return { ...prev, whatsappStatus: null, whatsappRelogin: null };
      }
      if (target?.questionId === "whatsapp_relogin") {
        return { ...prev, whatsappRelogin: null };
      }
      if (target?.questionId === "template_status") {
        return { ...prev, templateStatus: null, templateAction: null };
      }
      if (target?.questionId === "template_action") {
        return { ...prev, templateAction: null };
      }
      if (target?.questionId === "integration_status") {
        return { ...prev, integrationStatus: null, integrationAdmin: null };
      }
      if (target?.questionId === "integration_admin") {
        return { ...prev, integrationAdmin: null };
      }
      if (target?.questionId === "clarify") {
        return emptyAnswers();
      }
      return prev;
    });
    setPage("assist");
  }, [messages, resetFixState]);

  const sendChatMessage = useCallback(
    (text: string, attachment?: Attachment | null) => {
      const trimmed = text.trim();
      if (!trimmed && !attachment) return;

      if (messages.length === 0) {
        startConversation(trimmed, undefined, attachment);
        return;
      }

      // Check if there is an active unanswered question
      const activeQuestion = [...messages]
        .reverse()
        .find((m) => m.questionId && !m.selectedOptionId);

      if (activeQuestion && activeQuestion.questionId) {
        const lower = trimmed.toLowerCase();
        const matchedOption =
          activeQuestion.options?.find((opt) => {
            const label = tr(opt.labelKey).toLowerCase();
            return (
              lower.includes(opt.id.toLowerCase()) ||
              lower.includes(label) ||
              (opt.id === "yes" &&
                (lower.includes("yes") ||
                  lower.includes("yeah") ||
                  lower.includes("ha") ||
                  lower.includes("haan") ||
                  lower.includes("हाँ"))) ||
              (opt.id === "no" &&
                (lower.includes("no") ||
                  lower.includes("nope") ||
                  lower.includes("nahi") ||
                  lower.includes("nah") ||
                  lower.includes("नहीं"))) ||
              (opt.id === "qr_code" &&
                (lower.includes("qr") ||
                  lower.includes("scan") ||
                  lower.includes("barcode") ||
                  lower.includes("क्यूआर"))) ||
              (opt.id === "disconnected" &&
                (lower.includes("disconnect") ||
                  lower.includes("red") ||
                  lower.includes("off") ||
                  lower.includes("बंद"))) ||
              (opt.id === "connected_silent" &&
                (lower.includes("silent") ||
                  lower.includes("no chat") ||
                  lower.includes("आ नहीं रहे"))) ||
              (opt.id === "in_review" &&
                (lower.includes("review") ||
                  lower.includes("pending") ||
                  lower.includes("wait") ||
                  lower.includes("पेंडिंग"))) ||
              (opt.id === "rejected" &&
                (lower.includes("reject") ||
                  lower.includes("denied") ||
                  lower.includes("खारिज"))) ||
              (opt.id === "approved" &&
                (lower.includes("approved") ||
                  lower.includes("स्वीकृत"))) ||
              (opt.id === "vars_tested" &&
                (lower.includes("test") ||
                  lower.includes("filled") ||
                  lower.includes("भरे"))) ||
              (opt.id === "vars_missing" &&
                (lower.includes("miss") ||
                  lower.includes("empty") ||
                  lower.includes("खाली"))) ||
              (opt.id === "order_created" &&
                (lower.includes("order") ||
                  lower.includes("ऑर्डर"))) ||
              (opt.id === "abandoned_cart" &&
                (lower.includes("cart") ||
                  lower.includes("abandon") ||
                  lower.includes("कार्ट"))) ||
              (opt.id === "incoming_message" &&
                (lower.includes("incoming") ||
                  lower.includes("message") ||
                  lower.includes("मैसेज"))) ||
              (opt.id === "oauth_error" &&
                (lower.includes("admin") ||
                  lower.includes("perm") ||
                  lower.includes("oauth") ||
                  lower.includes("अनुमति"))) ||
              (opt.id === "store_url" &&
                (lower.includes("url") ||
                  lower.includes("store") ||
                  lower.includes("पहचान"))) ||
              (opt.id === "sync_issue" &&
                (lower.includes("sync") ||
                  lower.includes("सिंक")))
            );
          }) ?? activeQuestion.options?.[0];

        if (matchedOption) {
          selectOption(activeQuestion.id, matchedOption.id);
          return;
        }
      }

      // User sends message when diagnosis or conversation already progressed
      const userMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        role: "user",
        text: trimmed || (attachment ? attachment.name : ""),
        createdAt: Date.now(),
        attachmentName: attachment?.name,
        attachmentUrl: attachment?.url,
      };
      setMessages((prev) => [...prev, userMessage]);
      setThinking(true);

      const lower = trimmed.toLowerCase();
      later(700, () => {
        setThinking(false);
        if (
          lower.includes("human") ||
          lower.includes("agent") ||
          lower.includes("support") ||
          lower.includes("person") ||
          lower.includes("मदद")
        ) {
          setMessages((prev) => [
            ...prev,
            assistantText("assist.contactSupport", { cta: "contact_support" }),
          ]);
        } else if (diagnosis) {
          setMessages((prev) => [
            ...prev,
            assistantText("assist.postDiagReply", { cta: "view_diagnosis" }),
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            assistantText("assist.thinking"),
          ]);
        }
      });
    },
    [diagnosis, later, messages, selectOption, startConversation, tr],
  );

  const activeTutorial = useMemo(() => {
    if (diagnosis?.tutorialId) {
      return getTutorialById(diagnosis.tutorialId) ?? null;
    }
    if (issueId) return getTutorialForIssue(issueId);
    return null;
  }, [diagnosis, issueId]);

  const toggleStep = useCallback((stepId: string) => {
    setCompletedSteps((prev) => (prev.includes(stepId) ? prev : [...prev, stepId]));
    setExpandedStepId((current) => (current === stepId ? null : stepId));
  }, []);

  const markStepsDone = useCallback(() => {
    if (activeTutorial) {
      setCompletedSteps(activeTutorial.steps.map((step) => step.id));
    }
    setStepsMarkedDone(true);
    setVerifyPhase("idle");
  }, [activeTutorial]);

  const runVerification = useCallback(() => {
    setVerifyPhase("checking");
    later(1100, () => {
      const total = activeTutorial?.steps.length ?? 0;
      const result = checkResolution(completedSteps.length, total);
      setVerifyPhase(result.success ? "success" : "fail");
    });
  }, [activeTutorial, completedSteps.length, later]);

  const resolveYes = useCallback(() => {
    setVerifyPhase("resolved");
  }, []);

  const resolveNo = useCallback(() => {
    setVerifyPhase("fail");
  }, []);

  const beginEscalation = useCallback(() => {
    const draft = buildEscalationDraft({
      problem: problemText,
      answers,
      diagnosis,
      completedStepCount: completedSteps.length,
      watchedVideo,
      ranCheck: verifyPhase === "success" || verifyPhase === "fail" || verifyPhase === "resolved",
      screenshotName: sessionAttachment?.name,
      screenshotUrl: sessionAttachment?.url,
    });
    setEscalationDraft(draft);
    setTicketJustCreated(false);
    setSelectedTicketId(null);
    setPage("tickets");
  }, [
    answers,
    completedSteps.length,
    diagnosis,
    problemText,
    sessionAttachment,
    verifyPhase,
    watchedVideo,
  ]);

  const submitTicket = useCallback(() => {
    if (!escalationDraft) return;
    const ticket = createTicket(escalationDraft, language);
    setTickets((prev) => [ticket, ...prev]);
    setSelectedTicketId(ticket.id);
    setTicketJustCreated(true);
    setEscalationDraft(null);
  }, [escalationDraft, language]);

  const openVideo = useCallback((open: boolean) => {
    setVideoOpen(open);
    if (open) setWatchedVideo(true);
  }, []);

  const setAutopilotRequest = useCallback((text: string) => {
    setAutopilot((prev) => ({ ...prev, requestText: text }));
  }, []);

  const setAutopilotAttachment = useCallback((file: Attachment | null) => {
    setAutopilot((prev) => ({ ...prev, attachment: file }));
  }, []);

  const continueAutopilotRequest = useCallback(() => {
    if (!autopilot.requestText.trim()) return;
    setAutopilot((prev) => ({ ...prev, phase: "review_request", execution: null }));
  }, [autopilot.requestText]);

  const prepareAutopilot = useCallback(() => {
    setAutopilot((prev) => ({ ...prev, phase: "preparing" }));
    later(1200, () => {
      setAutopilot((prev) => ({
        ...prev,
        phase: "proposal",
        editing: true,
        proposal: generateProposal(prev.requestText),
        execution: null,
      }));
    });
  }, [later]);

  const updateProposal = useCallback((patch: Partial<WorkflowProposal>) => {
    setAutopilot((prev) => {
      if (!prev.proposal) return prev;
      return {
        ...prev,
        proposal: refreshProposal({ ...prev.proposal, ...patch }),
        execution: null,
        phase: "proposal",
      };
    });
  }, []);

  const approveAutopilot = useCallback(() => {
    setAutopilot((prev) => {
      if (!prev.proposal) return prev;
      const validity = validateProposal(prev.proposal);
      if (!validity.valid) {
        return { ...prev, execution: { success: false, reasonKey: "fail.invalid" } };
      }
      return { ...prev, phase: "executing", editing: false };
    });
    later(1400, () => {
      setAutopilot((prev) => {
        if (prev.phase !== "executing" || !prev.proposal) return prev;
        const result = simulateExecution(prev.proposal);
        return {
          ...prev,
          phase: result.success ? "success" : "failure",
          execution: result,
          proposal: {
            ...prev.proposal,
            status: result.success ? "executed" : "failed",
          },
        };
      });
    });
  }, [later]);

  const rejectAutopilot = useCallback(() => {
    setAutopilot((prev) => ({
      ...prev,
      phase: "proposal",
      editing: true,
      execution: null,
      proposal: prev.proposal
        ? { ...prev.proposal, status: "draft" }
        : prev.proposal,
    }));
  }, []);

  const cancelAutopilot = useCallback(() => {
    setAutopilot(initialAutopilot);
  }, []);

  const proposalValidation = useMemo(
    () =>
      autopilot.proposal
        ? validateProposal(autopilot.proposal)
        : { valid: false, missing: [] },
    [autopilot.proposal],
  );

  const startIssueFromGuide = useCallback(
    (nextIssue: IssueId) => {
      const promptKey =
        nextIssue === "whatsapp_connection"
          ? "prompt.whatsapp"
          : nextIssue === "template_approval"
            ? "prompt.template"
            : nextIssue === "workflow_trigger"
              ? "prompt.workflow"
              : nextIssue === "integration" || nextIssue === "permission"
                ? "prompt.integration"
                : "prompt.assistant";
      startConversation(t(language, promptKey), nextIssue === "permission" ? "integration" : nextIssue);
    },
    [language, startConversation],
  );

  const value = useMemo<AppContextValue>(
    () => ({
      language,
      setLanguage,
      tr,
      page,
      setPage,
      sidebarOpen,
      setSidebarOpen,
      messages,
      thinking,
      issueId,
      answers,
      problemText,
      diagnosis,
      sessionAttachment,
      showFix,
      setShowFix,
      completedSteps,
      toggleStep,
      expandedStepId,
      setExpandedStepId,
      guidanceMode,
      setGuidanceMode,
      videoOpen,
      setVideoOpen: openVideo,
      watchedVideo,
      stepsMarkedDone,
      markStepsDone,
      verifyPhase,
      runVerification,
      resolveYes,
      resolveNo,
      tickets,
      selectedTicketId,
      setSelectedTicketId,
      ticketJustCreated,
      escalationDraft,
      beginEscalation,
      submitTicket,
      startConversation,
      sendChatMessage,
      selectOption,
      rewindToQuestion,
      activeTutorial,
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
      startIssueFromGuide,
    }),
    [
      language,
      tr,
      page,
      sidebarOpen,
      messages,
      thinking,
      issueId,
      answers,
      problemText,
      diagnosis,
      sessionAttachment,
      showFix,
      completedSteps,
      expandedStepId,
      guidanceMode,
      videoOpen,
      watchedVideo,
      stepsMarkedDone,
      verifyPhase,
      tickets,
      selectedTicketId,
      ticketJustCreated,
      escalationDraft,
      activeTutorial,
      autopilot,
      proposalValidation,
      toggleStep,
      openVideo,
      markStepsDone,
      runVerification,
      resolveYes,
      resolveNo,
      beginEscalation,
      submitTicket,
      startConversation,
      sendChatMessage,
      selectOption,
      rewindToQuestion,
      setAutopilotRequest,
      setAutopilotAttachment,
      continueAutopilotRequest,
      prepareAutopilot,
      updateProposal,
      approveAutopilot,
      rejectAutopilot,
      cancelAutopilot,
      startIssueFromGuide,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
