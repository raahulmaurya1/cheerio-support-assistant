export type Language = "en" | "hi";

export type PageId =
  | "home"
  | "assist"
  | "guides"
  | "tickets"
  | "autopilot"
  | "troubleshooting";

export type IssueId =
  | "assistant_whatsapp"
  | "whatsapp_connection"
  | "template_approval"
  | "workflow_trigger"
  | "integration"
  | "unclear"
  | "no_docs"
  | "permission";

export type ChannelOption = "whatsapp" | "instagram" | "other";
export type YesNo = "yes" | "no";
export type YesNoUnsure = "yes" | "no" | "unsure";
export type WhatsappStatusOption = "disconnected" | "qr_code" | "connected_silent";
export type TemplateStatusOption = "in_review" | "rejected" | "approved";
export type TemplateActionOption = "vars_tested" | "vars_missing" | "pending_meta";
export type WorkflowEventOption = "order_created" | "abandoned_cart" | "incoming_message";
export type IntegrationStatusOption = "oauth_error" | "store_url" | "sync_issue";

export interface DiagnosticAnswers {
  playgroundResponds: YesNo | null;
  channel: ChannelOption | null;
  workflowActive: YesNoUnsure | null;
  workflowEvent: WorkflowEventOption | null;
  whatsappStatus: WhatsappStatusOption | null;
  whatsappRelogin: YesNoUnsure | null;
  templateStatus: TemplateStatusOption | null;
  templateAction: TemplateActionOption | null;
  integrationStatus: IntegrationStatusOption | null;
  integrationAdmin: YesNoUnsure | null;
}

export type CheckStatus = "checked" | "needs_attention" | "not_verified" | "failed";

export interface DiagnosticCheck {
  id: string;
  labelKey: string;
  status: CheckStatus;
}

export interface ChatOption {
  id: string;
  labelKey: string;
}

export type MessageCta = "view_diagnosis" | "contact_support" | "view_guides";
export type QuestionId =
  | "playground"
  | "channel"
  | "workflow"
  | "workflow_event"
  | "clarify"
  | "whatsapp_status"
  | "whatsapp_relogin"
  | "template_status"
  | "template_action"
  | "integration_status"
  | "integration_admin";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  textKey?: string;
  text?: string;
  textVars?: Record<string, string>;
  options?: ChatOption[];
  questionId?: QuestionId;
  selectedOptionId?: string;
  attachmentName?: string;
  attachmentUrl?: string;
  createdAt: number;
  variant?: "default" | "warning" | "info";
  cta?: MessageCta;
}

export interface Attachment {
  name: string;
  url: string;
  sizeLabel: string;
}

export interface InstructionStep {
  id: string;
  titleKey: string;
  bodyKey: string;
  tipKey: string;
}

export interface Tutorial {
  id: string;
  titleKey: string;
  timestamp: string;
  duration: string;
  whyKey: string;
  thumbnail: string;
  issueIds: IssueId[];
  steps: InstructionStep[];
}

export interface DiagnosisResult {
  issueId: IssueId;
  titleKey: string;
  bodyKey: string;
  checks: DiagnosticCheck[];
  tutorialId: string | null;
  inconclusive: boolean;
  needsAdmin: boolean;
  noDocs: boolean;
}

export type TicketStatus = "open" | "in_progress" | "resolved";

export interface SupportTicket {
  id: string;
  createdAt: number;
  status: TicketStatus;
  problem: string;
  channelLabelKey: string;
  suspectedCauseKey: string;
  stepsAttemptedKeys: string[];
  diagnostics: DiagnosticCheck[];
  language: Language;
  screenshotName?: string;
  screenshotUrl?: string;
}

export interface EscalationDraft {
  problem: string;
  channelLabelKey: string;
  suspectedCauseKey: string;
  stepsAttemptedKeys: string[];
  diagnostics: DiagnosticCheck[];
  screenshotName?: string;
  screenshotUrl?: string;
}

export type AutopilotPhase =
  | "idle"
  | "review_request"
  | "preparing"
  | "proposal"
  | "executing"
  | "success"
  | "failure";

export type WorkflowNodeType = "trigger" | "condition" | "action";

export interface WorkflowNode {
  id: string;
  type: WorkflowNodeType;
  label: string;
}

export interface WorkflowProposal {
  name: string;
  triggerId: string;
  actionId: string;
  channelId: string;
  templateId: string;
  status: "draft" | "approved" | "executed" | "failed" | "cancelled";
  nodes: WorkflowNode[];
  requestText: string;
}

export interface SelectOption {
  id: string;
  labelKey: string;
}

export interface GuideCard {
  id: string;
  tutorialId: string;
  categoryKey: string;
}

export interface CommonIssue {
  id: IssueId;
  labelKey: string;
  descriptionKey: string;
  promptKey: string;
}

export interface ResolutionResult {
  success: boolean;
  messageKey: string;
}

export interface ValidationResult {
  valid: boolean;
  missing: string[];
}

export interface ExecutionResult {
  success: boolean;
  reasonKey?: string;
}
