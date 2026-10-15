import type {
  ExecutionResult,
  ValidationResult,
  WorkflowNode,
  WorkflowProposal,
} from "../types";

function nodesFor(proposal: Pick<WorkflowProposal, "triggerId" | "actionId">): WorkflowNode[] {
  const triggerLabel =
    proposal.triggerId === "abandoned_cart"
      ? "Abandoned Cart"
      : proposal.triggerId === "incoming_whatsapp"
        ? "Incoming WhatsApp"
        : proposal.triggerId === "payment_success"
          ? "Payment successful"
          : "New Order";

  const middle =
    proposal.actionId === "assign_assistant" ? "Route to assistant" : "Check Order Details";

  const actionLabel =
    proposal.actionId === "assign_assistant"
      ? "Assign AI Assistant"
      : proposal.actionId === "send_text"
        ? "Send text message"
        : "Send WhatsApp Confirmation";

  return [
    { id: "n1", type: "trigger", label: triggerLabel },
    { id: "n2", type: "condition", label: middle },
    { id: "n3", type: "action", label: actionLabel },
  ];
}

export function generateProposal(requestText: string): WorkflowProposal {
  const text = requestText.toLowerCase();
  let triggerId = "new_order";
  let actionId = "send_template";
  let channelId = "whatsapp";
  let templateId = "order_confirmation";
  let name = "Order Confirmation";

  if (text.includes("abandoned") || text.includes("cart") || text.includes("कार्ट")) {
    triggerId = "abandoned_cart";
    templateId = "order_confirmation";
    name = "Abandoned cart reminder";
  } else if (text.includes("assistant") || text.includes("असिस्टेंट")) {
    triggerId = "incoming_whatsapp";
    actionId = "assign_assistant";
    templateId = "order_confirmation";
    name = "WhatsApp assistant routing";
  } else if (text.includes("shipping") || text.includes("ship")) {
    templateId = "shipping_update";
    name = "Shipping update";
  } else if (text.includes("fail")) {
    templateId = "unapproved";
    name = "Order Confirmation";
  }

  if (text.includes("sms")) channelId = "sms";
  if (text.includes("email")) channelId = "email";
  if (text.includes("instagram")) channelId = "instagram";

  const draft: WorkflowProposal = {
    name,
    triggerId,
    actionId,
    channelId,
    templateId,
    status: "draft",
    nodes: [],
    requestText,
  };
  draft.nodes = nodesFor(draft);
  return draft;
}

export function refreshProposal(proposal: WorkflowProposal): WorkflowProposal {
  return { ...proposal, nodes: nodesFor(proposal), status: "draft" };
}

export function validateProposal(proposal: WorkflowProposal): ValidationResult {
  const missing: string[] = [];
  if (!proposal.name.trim()) missing.push("err.name");
  if (!proposal.triggerId) missing.push("err.trigger");
  if (!proposal.actionId) missing.push("err.action");
  if (!proposal.channelId) missing.push("err.channel");
  if (!proposal.templateId) missing.push("err.template");
  return { valid: missing.length === 0, missing };
}

export function simulateExecution(proposal: WorkflowProposal): ExecutionResult {
  const validation = validateProposal(proposal);
  if (!validation.valid) {
    return { success: false, reasonKey: "fail.invalid" };
  }
  if (proposal.templateId === "unapproved") {
    return { success: false, reasonKey: "fail.unapproved" };
  }
  return { success: true };
}
