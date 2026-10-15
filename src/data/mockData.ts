import type {
  CommonIssue,
  GuideCard,
  InstructionStep,
  SelectOption,
  Tutorial,
} from "../types";
import assistantThumb from "../assets/tutorial-assistant-whatsapp.jpg?inline";
import templatesThumb from "../assets/tutorial-templates.jpg?inline";
import whatsappThumb from "../assets/tutorial-whatsapp-connect.jpg?inline";
import workflowThumb from "../assets/tutorial-workflow.jpg?inline";
import integrationThumb from "../assets/tutorial-integration.jpg?inline";

export const commonIssues: CommonIssue[] = [
  {
    id: "whatsapp_connection",
    labelKey: "issue.whatsapp",
    descriptionKey: "issue.whatsappDesc",
    promptKey: "prompt.whatsapp",
  },
  {
    id: "template_approval",
    labelKey: "issue.template",
    descriptionKey: "issue.templateDesc",
    promptKey: "prompt.template",
  },
  {
    id: "assistant_whatsapp",
    labelKey: "issue.assistant",
    descriptionKey: "issue.assistantDesc",
    promptKey: "prompt.assistant",
  },
  {
    id: "workflow_trigger",
    labelKey: "issue.workflow",
    descriptionKey: "issue.workflowDesc",
    promptKey: "prompt.workflow",
  },
  {
    id: "integration",
    labelKey: "issue.integration",
    descriptionKey: "issue.integrationDesc",
    promptKey: "prompt.integration",
  },
];

const assistantSteps: InstructionStep[] = [
  { id: "a1", titleKey: "step.a1.title", bodyKey: "step.a1.body", tipKey: "step.a1.tip" },
  { id: "a2", titleKey: "step.a2.title", bodyKey: "step.a2.body", tipKey: "step.a2.tip" },
  { id: "a3", titleKey: "step.a3.title", bodyKey: "step.a3.body", tipKey: "step.a3.tip" },
  { id: "a4", titleKey: "step.a4.title", bodyKey: "step.a4.body", tipKey: "step.a4.tip" },
  { id: "a5", titleKey: "step.a5.title", bodyKey: "step.a5.body", tipKey: "step.a5.tip" },
  { id: "a6", titleKey: "step.a6.title", bodyKey: "step.a6.body", tipKey: "step.a6.tip" },
];

const whatsappSteps: InstructionStep[] = [
  { id: "w1", titleKey: "step.w1.title", bodyKey: "step.w1.body", tipKey: "step.w1.tip" },
  { id: "w2", titleKey: "step.w2.title", bodyKey: "step.w2.body", tipKey: "step.w2.tip" },
  { id: "w3", titleKey: "step.w3.title", bodyKey: "step.w3.body", tipKey: "step.w3.tip" },
];

const templateSteps: InstructionStep[] = [
  { id: "t1", titleKey: "step.t1.title", bodyKey: "step.t1.body", tipKey: "step.t1.tip" },
  { id: "t2", titleKey: "step.t2.title", bodyKey: "step.t2.body", tipKey: "step.t2.tip" },
  { id: "t3", titleKey: "step.t3.title", bodyKey: "step.t3.body", tipKey: "step.t3.tip" },
];

const workflowSteps: InstructionStep[] = [
  { id: "f1", titleKey: "step.f1.title", bodyKey: "step.f1.body", tipKey: "step.f1.tip" },
  { id: "f2", titleKey: "step.f2.title", bodyKey: "step.f2.body", tipKey: "step.f2.tip" },
  { id: "f3", titleKey: "step.f3.title", bodyKey: "step.f3.body", tipKey: "step.f3.tip" },
];

const integrationSteps: InstructionStep[] = [
  { id: "i1", titleKey: "step.i1.title", bodyKey: "step.i1.body", tipKey: "step.i1.tip" },
  { id: "i2", titleKey: "step.i2.title", bodyKey: "step.i2.body", tipKey: "step.i2.tip" },
  { id: "i3", titleKey: "step.i3.title", bodyKey: "step.i3.body", tipKey: "step.i3.tip" },
];

export const tutorials: Tutorial[] = [
  {
    id: "connect-assistant-whatsapp",
    titleKey: "tut.assistant.title",
    timestamp: "02:15",
    duration: "08:40",
    whyKey: "tut.assistant.why",
    thumbnail: assistantThumb,
    issueIds: ["assistant_whatsapp"],
    steps: assistantSteps,
  },
  {
    id: "reconnect-whatsapp",
    titleKey: "tut.whatsapp.title",
    timestamp: "01:05",
    duration: "05:20",
    whyKey: "tut.whatsapp.why",
    thumbnail: whatsappThumb,
    issueIds: ["whatsapp_connection"],
    steps: whatsappSteps,
  },
  {
    id: "template-approval",
    titleKey: "tut.template.title",
    timestamp: "00:48",
    duration: "04:10",
    whyKey: "tut.template.why",
    thumbnail: templatesThumb,
    issueIds: ["template_approval"],
    steps: templateSteps,
  },
  {
    id: "workflow-trigger",
    titleKey: "tut.workflow.title",
    timestamp: "01:32",
    duration: "06:05",
    whyKey: "tut.workflow.why",
    thumbnail: workflowThumb,
    issueIds: ["workflow_trigger"],
    steps: workflowSteps,
  },
  {
    id: "store-integration",
    titleKey: "tut.integration.title",
    timestamp: "00:55",
    duration: "04:45",
    whyKey: "tut.integration.why",
    thumbnail: integrationThumb,
    issueIds: ["integration", "permission"],
    steps: integrationSteps,
  },
];

export const guideCards: GuideCard[] = [
  { id: "g1", tutorialId: "connect-assistant-whatsapp", categoryKey: "guides.cat.assistant" },
  { id: "g2", tutorialId: "reconnect-whatsapp", categoryKey: "guides.cat.channel" },
  { id: "g3", tutorialId: "template-approval", categoryKey: "guides.cat.templates" },
  { id: "g4", tutorialId: "workflow-trigger", categoryKey: "guides.cat.workflows" },
  { id: "g5", tutorialId: "store-integration", categoryKey: "guides.cat.apps" },
];

export const triggerOptions: SelectOption[] = [
  { id: "new_order", labelKey: "field.trigger.new_order" },
  { id: "abandoned_cart", labelKey: "field.trigger.abandoned_cart" },
  { id: "payment_success", labelKey: "field.trigger.payment_success" },
  { id: "incoming_whatsapp", labelKey: "field.trigger.incoming_whatsapp" },
];

export const actionOptions: SelectOption[] = [
  { id: "send_template", labelKey: "field.action.send_template" },
  { id: "send_text", labelKey: "field.action.send_text" },
  { id: "assign_assistant", labelKey: "field.action.assign_assistant" },
];

export const channelOptions: SelectOption[] = [
  { id: "whatsapp", labelKey: "field.channel.whatsapp" },
  { id: "sms", labelKey: "field.channel.sms" },
  { id: "email", labelKey: "field.channel.email" },
  { id: "instagram", labelKey: "field.channel.instagram" },
];

export const templateOptions: SelectOption[] = [
  { id: "order_confirmation", labelKey: "field.template.order_confirmation" },
  { id: "shipping_update", labelKey: "field.template.shipping_update" },
  { id: "payment_failed", labelKey: "field.template.payment_failed" },
  { id: "unapproved", labelKey: "field.template.unapproved" },
];

export const NO_DOCS_PATTERN =
  /\b(sip|dtmf|carrier|rcs registration|airtel|jio sip|voice trunk)\b/i;

export const PERMISSION_PATTERN =
  /\b(permission|access denied|admin only|don't have access|do not have access|can't edit|cannot edit|अनुमति|एक्सेस नहीं)\b/i;

export const UNCLEAR_PATTERN =
  /^(help|not working|issue|problem|fix this|कुछ गड़बड़|काम नहीं|मदद)[\s!.]*$/i;
