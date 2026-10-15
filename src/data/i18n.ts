import type { Language } from "../types";

export const translations = {
  en: {
    "brand.product": "Cheerio Assist",
    "brand.tagline": "Get unstuck. Fix it step by step.",
    "brand.demo": "Demo prototype",
    "brand.workspace": "Bloom & Co.",
    "brand.user": "Priya Sharma",
    "brand.role": "Store owner",

    "nav.home": "Home",
    "nav.assist": "Ask Cheerio Assist",
    "nav.guides": "Setup Guides",
    "nav.tickets": "My Support Tickets",
    "nav.autopilot": "Autopilot",
    "nav.language": "Language",
    "nav.openMenu": "Open navigation",
    "nav.closeMenu": "Close navigation",
    "lang.en": "English",
    "lang.hi": "Hindi",

    "home.welcome": "Hi! What can we help you fix today?",
    "home.subtitle":
      "Describe the problem in your own words, attach a screenshot, or pick a common issue. Cheerio Assist will walk you through it.",
    "home.commonIssues": "Common issues",
    "home.continueTitle": "Continue where you left off",
    "home.continueBody": "You have an open troubleshooting session.",
    "home.continueCta": "Resume conversation",
    "home.autopilotTitle": "Prefer us to prepare it for you?",
    "home.autopilotBody":
      "Autopilot can draft a workflow configuration. You review and approve it before anything is applied — nothing runs on its own.",
    "home.autopilotCta": "Try Autopilot",
    "home.privacyNote":
      "Screenshots may contain sensitive customer information. Remove anything you do not want to share.",
    "home.demoNote":
      "This is a clickable prototype. Diagnoses, video timestamps, and fixes are simulated and do not inspect a live Cheerio account.",

    "issue.assistant": "AI assistant not responding",
    "issue.assistantDesc": "Works in the playground, not on WhatsApp",
    "issue.whatsapp": "WhatsApp connection",
    "issue.whatsappDesc": "Channel status, phone number, or API setup",
    "issue.template": "Template approval",
    "issue.templateDesc": "Message templates stuck in review",
    "issue.workflow": "Workflow not triggering",
    "issue.workflowDesc": "Orders or events are not starting a flow",
    "issue.integration": "Integration setup",
    "issue.integrationDesc": "Shopify or other apps not connected",

    "prompt.assistant":
      "My AI assistant replies in the testing playground, but it is not responding to customers on WhatsApp. Please help me fix it.",
    "prompt.whatsapp":
      "My WhatsApp channel does not look connected. Incoming chats are not reaching Cheerio.",
    "prompt.template":
      "My WhatsApp message template is stuck in review and I cannot use it in a workflow.",
    "prompt.workflow":
      "My workflow is not triggering when a new order is received.",
    "prompt.integration":
      "I am trying to connect Shopify but I cannot finish the integration setup.",

    "input.placeholder": "Describe what you are trying to fix…",
    "input.send": "Send",
    "input.attach": "Attach screenshot",
    "input.voice": "Voice input",
    "input.remove": "Remove attachment",
    "input.recording": "Recording…",
    "input.processing": "Transcribing…",
    "input.voiceHint":
      "Simulated transcription — no real speech recognition is connected.",
    "input.useTranscription": "Use this text",
    "input.cancel": "Cancel",
    "input.voiceExample":
      "My AI assistant replies in the testing playground, but it is not responding to customers on WhatsApp. Please help me fix it.",
    "input.uploading": "Uploading screenshot…",
    "input.attached": "Screenshot attached",

    "assist.title": "Ask Cheerio Assist",
    "assist.subtitle": "Plain-language help for setup and troubleshooting.",
    "assist.thinking": "Checking your notes…",
    "assist.ack":
      "I can help with that. I will ask a few short questions so we do not guess.",
    "assist.changeAnswer": "Change answer",
    "assist.editAnswers": "Edit previous answers",
    "assist.viewDiagnosis": "See diagnosis",
    "assist.contactSupport": "Contact human support",
    "assist.viewGuides": "Browse setup guides",
    "assist.emptyHint": "Send a message or pick a common issue to begin.",

    "q.playground": "Does your assistant respond in the testing playground?",
    "q.channel": "Where is the problem happening?",
    "q.workflow": "Have you checked whether your workflow is active?",
    "opt.yes": "Yes",
    "opt.no": "No",
    "opt.unsure": "I'm not sure",
    "opt.whatsapp": "WhatsApp",
    "opt.instagram": "Instagram",
    "opt.other": "Another channel",

    "clarify.title": "I need a little more detail",
    "clarify.body":
      "I am not sure I have the full picture yet. Which of these is closest to the problem?",
    "clarify.assistant": "AI assistant / WhatsApp replies",
    "clarify.templates": "Message templates",
    "clarify.integrations": "Integrations",
    "clarify.other": "Something else",

    "nodocs.title": "No reliable guide found",
    "nodocs.body":
      "I couldn't find a sufficiently reliable guide for this issue. A teammate can take it from here with the details you already shared.",
    "permission.title": "An administrator may be needed",
    "permission.body":
      "This setting can only be changed by an authorized account administrator. If you do not have that access, we can open a support ticket for your workspace owner.",

    "diagnosis.title": "Potential issue identified",
    "diagnosis.demoLabel":
      "Simulated demo diagnosis — Cheerio Assist has not inspected a live account.",
    "diagnosis.ctaFix": "Show me how to fix it",
    "diagnosis.ctaHuman": "Contact human support",
    "diagnosis.checklist": "Configuration checks",
    "diagnosis.empty":
      "Start a conversation from Home or Ask Cheerio Assist to generate a diagnosis.",
    "diagnosis.startCta": "Ask Cheerio Assist",
    "diagnosis.fixHint":
      "Open the matching tutorial step and written instructions when you are ready. This does not change a live workflow.",

    "diag.assistant.title":
      "Your AI assistant may not be connected to the incoming WhatsApp workflow.",
    "diag.assistant.body":
      "If the workflow does not direct incoming WhatsApp messages to your assistant, the assistant may work in the testing playground but not respond to real conversations.",
    "diag.assistant.playgroundNo.title":
      "The assistant may not be fully configured yet.",
    "diag.assistant.playgroundNo.body":
      "If it does not reply in the testing playground either, the knowledge, model, or fallback settings may need a review before channel routing will help.",
    "diag.instagram.title":
      "The Instagram event may not be assigned to your assistant.",
    "diag.instagram.body":
      "Instagram and WhatsApp need separate workflows. An assistant that works in the playground still has to be assigned on the Instagram incoming event.",
    "diag.whatsapp.title": "Your WhatsApp channel connection may be incomplete.",
    "diag.whatsapp.body":
      "If the phone number or Cloud API connection is not active, incoming customer messages never reach a workflow or assistant.",
    "diag.template.title": "The message template may still be waiting for approval.",
    "diag.template.body":
      "Workflows cannot send a WhatsApp template until it is approved. You can keep building the flow, but the send step will wait.",
    "diag.workflow.title":
      "The incoming-message trigger may not be active.",
    "diag.workflow.body":
      "If the workflow is off, or the trigger does not match the event you expect, the assistant never receives the conversation.",
    "diag.integration.title": "The integration may not be connected with the right access.",
    "diag.integration.body":
      "Order events only reach Cheerio when the store app is connected by someone with admin permission.",
    "diag.unclear.title": "We still need a clearer description.",
    "diag.unclear.body":
      "There is not enough detail to recommend a safe fix. Human support can continue with the notes from this session.",

    "check.assistant": "Assistant selected in workflow",
    "check.trigger": "Incoming-message trigger",
    "check.active": "Workflow active",
    "check.connection": "WhatsApp connection",
    "check.playground": "Playground replies",
    "check.template": "Template approval status",
    "check.instagram": "Instagram event assignment",
    "check.integration": "Store integration",
    "check.permission": "Admin permission",

    "status.needs_attention": "Needs attention",
    "status.not_verified": "Not verified",
    "status.checked": "Checked",
    "status.failed": "Failed",

    "tut.sampleSource":
      "Sample tutorial preview — illustrative demo, not an official Cheerio video URL.",
    "tut.watch": "Watch from this step",
    "tut.read": "Read instructions",
    "tut.relevant": "Relevant timestamp",
    "tut.whyLabel": "Why this is relevant",
    "tut.close": "Close preview",
    "tut.playerHint": "Simulated player. Starts at the suggested step.",
    "tut.playing": "Playing from",

    "tut.assistant.title": "Connect an AI assistant to a WhatsApp workflow",
    "tut.assistant.why":
      "Learn how to select an assistant and connect it to the incoming WhatsApp workflow.",
    "tut.whatsapp.title": "Reconnect a WhatsApp Business channel",
    "tut.whatsapp.why":
      "Confirm the phone number, Cloud API status, and inbound routing.",
    "tut.template.title": "Check WhatsApp template approval",
    "tut.template.why":
      "See how to read template status and what to do while a template is in review.",
    "tut.workflow.title": "Turn on an incoming-message workflow",
    "tut.workflow.why":
      "Find the trigger, confirm it is active, and match it to the event you expect.",
    "tut.integration.title": "Connect a store integration",
    "tut.integration.why":
      "See which admin permission is required before order events can start a workflow.",

    "step.progress": "Step {current} of {total} completed.",
    "step.whyTitle": "Why this matters",
    "step.whyBody":
      "The playground tests the assistant on its own. Customer conversations only reach that assistant when an active workflow assigns it to the incoming channel event.",
    "step.done": "I've completed these steps",
    "step.written": "Written instructions",
    "step.video": "Video guidance",
    "step.expand": "Show details",
    "step.collapse": "Hide details",

    "step.a1.title": "Open the appropriate workflow",
    "step.a1.body":
      "Go to Automation → Workflows and open the flow that should handle customer WhatsApp messages. Use the one named for support or inbound chat, not a campaign blast.",
    "step.a1.tip": "If you have several flows, pick the one with an Incoming WhatsApp trigger.",
    "step.a2.title": "Check its incoming-message trigger",
    "step.a2.body":
      "The first node should be Incoming WhatsApp (or the matching channel event). If the trigger is a campaign send or an order event, this flow will never see customer replies.",
    "step.a2.tip": "WhatsApp and Instagram cannot share the same incoming trigger. Each channel needs its own workflow.",
    "step.a3.title": "Select the intended AI assistant",
    "step.a3.body":
      "Add or open the Assign AI Assistant step. Choose the same assistant you tested in the playground so customers get the replies you already approved.",
    "step.a3.tip": "A blank assistant field is the most common reason playground tests work and live chat does not.",
    "step.a4.title": "Review the workflow configuration",
    "step.a4.body":
      "Confirm there is no extra condition that blocks all chats, and that fallback messages are set if the assistant cannot answer.",
    "step.a4.tip": "Leave internal test numbers out of any exclusion list while you verify.",
    "step.a5.title": "Save the changes",
    "step.a5.body":
      "Save the workflow and make sure its status is Active. A draft or paused flow will not respond to customers.",
    "step.a5.tip": "Saving as draft is not the same as activating.",
    "step.a6.title": "Test the assistant again",
    "step.a6.body":
      "Send a WhatsApp message from a customer-like number, not only from the playground. You should see the assistant reply in the inbox.",
    "step.a6.tip": "Use a short test phrase you will recognise in the conversation history.",

    "step.w1.title": "Open Channel settings",
    "step.w1.body": "Go to Channels and select WhatsApp. Check that the business phone number matches the one customers message.",
    "step.w1.tip": "A mismatched number is easy to miss after a WABA migration.",
    "step.w2.title": "Review Cloud API status",
    "step.w2.body": "Confirm the connection shows as active. If it is pending or expired, reconnect before editing workflows.",
    "step.w2.tip": "Reconnecting does not delete existing templates.",
    "step.w3.title": "Save and send a test inbound message",
    "step.w3.body": "After the status is active, send a WhatsApp message to the business number and confirm it appears in the inbox.",
    "step.w3.tip": "If nothing arrives, stop here and contact support rather than changing unrelated workflows.",

    "step.t1.title": "Open the template library",
    "step.t1.body": "Go to Templates and find the WhatsApp template your workflow uses.",
    "step.t1.tip": "Names must match exactly, including underscores.",
    "step.t2.title": "Read the approval status",
    "step.t2.body": "Approved templates can be sent. In review or rejected templates will silently block the send step.",
    "step.t2.tip": "Do not duplicate a template while it is still in review.",
    "step.t3.title": "Use an approved template or wait",
    "step.t3.body": "Point the workflow at an already approved template, or wait for review to finish before testing live sends.",
    "step.t3.tip": "You can keep drafting the rest of the flow in the meantime.",

    "step.f1.title": "Open the workflow that should fire",
    "step.f1.body": "Find the flow you expect to run when the event happens.",
    "step.f1.tip": "Check you are not looking at a duplicate draft.",
    "step.f2.title": "Confirm the trigger matches the event",
    "step.f2.body": "New order, abandoned cart, and inbound chat are different triggers. Pick the one that matches your case.",
    "step.f2.tip": "Prepaid and COD orders can be separate events.",
    "step.f3.title": "Switch the workflow to Active",
    "step.f3.body": "Save and turn the flow on. Draft workflows never run.",
    "step.f3.tip": "The Active toggle is independent of Autopilot proposals.",

    "step.i1.title": "Open Integrations",
    "step.i1.body": "Go to Integrations and select the store app you want to connect.",
    "step.i1.tip": "Shopify connections must be created by a store admin.",
    "step.i2.title": "Check you have admin permission",
    "step.i2.body": "If Connect is disabled, your user role cannot finish this step. Ask a workspace administrator.",
    "step.i2.tip": "Support can still collect the details while you wait for access.",
    "step.i3.title": "Complete the connection and map events",
    "step.i3.body": "After connecting, map order events to the workflow trigger you plan to use.",
    "step.i3.tip": "Come back to Cheerio Assist if events still do not appear.",

    "verify.title": "Resolution check",
    "verify.lead":
      "When you are ready, run a simulated check. This does not message a real customer.",
    "verify.testAgain": "Test again",
    "verify.checking": "Running a simulated check…",
    "verify.success":
      "Demo check passed. Your WhatsApp workflow is now responding in the simulated environment.",
    "verify.ask": "Did this solve your problem?",
    "verify.yes": "Yes, resolved.",
    "verify.no": "I still need help.",
    "verify.completeTitle": "All set",
    "verify.complete":
      "Glad this is sorted. You can return to Cheerio Assist any time something else gets stuck.",
    "verify.fail":
      "The issue is still unresolved. Let's collect the diagnostic details for support.",
    "verify.review": "Review troubleshooting steps",
    "verify.human": "Contact human support",
    "verify.demoNote":
      "Simulated verification only. No live WhatsApp conversation was tested.",
    "verify.incomplete":
      "A few steps are still open. You can finish them, or contact human support if you are stuck.",

    "ticket.title": "My Support Tickets",
    "ticket.subtitle": "Simulated tickets stay in this browser session only.",
    "ticket.summary": "Ticket summary",
    "ticket.summaryLead":
      "We will send this snapshot to a teammate. Nothing is submitted to a live support queue.",
    "ticket.create": "Create support ticket",
    "ticket.created": "Support ticket created",
    "ticket.createdBody":
      "A teammate would normally pick this up next. In this prototype the ticket is stored locally so you can review it.",
    "ticket.id": "Ticket ID",
    "ticket.status": "Status",
    "ticket.problem": "Problem description",
    "ticket.channel": "Selected channel",
    "ticket.cause": "Suspected cause",
    "ticket.steps": "Steps already attempted",
    "ticket.diagnostics": "Diagnostic checklist",
    "ticket.screenshot": "Screenshot",
    "ticket.language": "Preferred language",
    "ticket.back": "Return to conversation",
    "ticket.view": "View ticket",
    "ticket.empty": "No support tickets yet.",
    "ticket.emptyHint": "If Cheerio Assist cannot finish a fix, you can escalate from the diagnosis screen.",
    "ticket.open": "Open",
    "ticket.in_progress": "In progress",
    "ticket.resolved": "Resolved",
    "ticket.none": "None",
    "ticket.newFromSession": "Create from current session",
    "ticket.noSession": "Start troubleshooting first so the ticket can include diagnosis details.",
    "ticket.list": "All tickets",
    "channel.whatsapp": "WhatsApp",
    "channel.instagram": "Instagram",
    "channel.other": "Another channel",
    "channel.unknown": "Not specified",
    "cause.assistant": "Assistant not assigned to the incoming WhatsApp workflow",
    "cause.whatsapp": "WhatsApp channel connection incomplete",
    "cause.template": "Template not yet approved",
    "cause.workflow": "Workflow trigger inactive or mismatched",
    "cause.integration": "Store integration missing or lacking permission",
    "cause.unknown": "Needs a human review",
    "cause.permission": "Missing administrator permission",
    "cause.nodocs": "No reliable documented fix",
    "steps.none": "No guided steps completed yet",
    "steps.guided": "Followed in-product guided steps",
    "steps.video": "Opened the suggested tutorial segment",
    "steps.verified": "Ran the simulated resolution check",

    "guides.title": "Setup Guides",
    "guides.subtitle": "Short, labelled walkthroughs. Open a guide, or jump into Assist with it.",
    "guides.open": "Open guide",
    "guides.useAssist": "Troubleshoot this",
    "guides.cat.assistant": "AI assistants",
    "guides.cat.channel": "Channels",
    "guides.cat.templates": "Templates",
    "guides.cat.workflows": "Workflows",
    "guides.cat.apps": "Integrations",

    "auto.title": "Autopilot",
    "auto.subtitle":
      "Propose a configuration, edit it, and approve it before any simulated execution.",
    "auto.badge": "Proposed functionality — simulated only",
    "auto.step1": "Understand the request",
    "auto.step2": "Prepare the configuration",
    "auto.step3": "Preview and edit",
    "auto.step4": "Approval",
    "auto.step5": "Simulated execution",
    "auto.placeholder":
      "Describe the workflow you want. Example: Create a WhatsApp workflow that sends an order-confirmation message when a new order is received.",
    "auto.example":
      "Create a WhatsApp workflow that sends an order-confirmation message when a new order is received.",
    "auto.useExample": "Use example request",
    "auto.continue": "Continue",
    "auto.editRequest": "Edit request",
    "auto.preparing": "Preparing your workflow proposal…",
    "auto.proposalTitle": "Proposed configuration",
    "auto.draft": "Draft proposal",
    "auto.notLive":
      "This is a proposal, not a saved or activated workflow. Nothing has been applied to a Cheerio account.",
    "auto.name": "Workflow name",
    "auto.trigger": "Trigger",
    "auto.action": "Action",
    "auto.channel": "Channel",
    "auto.template": "Required template",
    "auto.status": "Status",
    "auto.missing": "Missing required information",
    "auto.editProposal": "Edit proposal",
    "auto.approve": "Approve and continue",
    "auto.cancel": "Cancel proposal",
    "auto.reject": "Reject and keep editing",
    "auto.executing": "Applying the approved proposal in the demo environment…",
    "auto.successTitle": "Demo configuration completed and verified.",
    "auto.successBody":
      "The proposal was marked as executed in this prototype only. No live Cheerio workflow was created.",
    "auto.failureTitle": "Configuration could not be completed.",
    "auto.failureBody": "Nothing was activated. You can fix the proposal and try again.",
    "auto.another": "Start another proposal",
    "auto.attachHint": "Optional reference screenshot",
    "auto.lastState": "Last known simulated state",
    "auto.preview": "Workflow preview",
    "auto.done": "Done",
    "auto.needApproval":
      "Approve and continue is required. Enabling Autopilot is not permission to run this later.",

    "field.trigger.new_order": "New order received",
    "field.trigger.abandoned_cart": "Abandoned cart",
    "field.trigger.payment_success": "Payment successful",
    "field.trigger.incoming_whatsapp": "Incoming WhatsApp message",
    "field.action.send_template": "Send an order-confirmation message",
    "field.action.send_text": "Send a text message",
    "field.action.assign_assistant": "Assign AI assistant",
    "field.channel.whatsapp": "WhatsApp",
    "field.channel.sms": "SMS",
    "field.channel.email": "Email",
    "field.channel.instagram": "Instagram",
    "field.template.order_confirmation": "Order confirmation",
    "field.template.shipping_update": "Shipping update",
    "field.template.payment_failed": "Payment failed",
    "field.template.unapproved": "Order confirmation (pending approval)",

    "node.new_order": "New Order",
    "node.check": "Check Order Details",
    "node.send": "Send WhatsApp Confirmation",
    "node.abandoned": "Abandoned Cart",
    "node.incoming": "Incoming WhatsApp",
    "node.assistant": "Assign AI Assistant",

    "err.name": "Workflow name",
    "err.trigger": "Trigger",
    "err.action": "Action",
    "err.channel": "Channel",
    "err.template": "Template",
    "fail.unapproved":
      "The selected WhatsApp template is not approved yet. Choose an approved template or wait for review.",
    "fail.invalid": "Required fields are missing. Update the proposal and approve it again.",

    "modal.close": "Close",
    "common.back": "Back",
    "common.next": "Next",
    "common.save": "Save",
    "common.optional": "Optional",
    "common.simulated": "Simulated",
    "common.required": "Required",
  },
  hi: {
    "brand.product": "Cheerio Assist",
    "brand.tagline": "अटकें नहीं। कदम दर कदम ठीक करें।",
    "brand.demo": "डेमो प्रोटोटाइप",
    "brand.workspace": "Bloom & Co.",
    "brand.user": "प्रिया शर्मा",
    "brand.role": "स्टोर ओनर",

    "nav.home": "होम",
    "nav.assist": "Cheerio Assist से पूछें",
    "nav.guides": "सेटअप गाइड",
    "nav.tickets": "मेरे सपोर्ट टिकट",
    "nav.autopilot": "Autopilot",
    "nav.language": "भाषा",
    "nav.openMenu": "नेविगेशन खोलें",
    "nav.closeMenu": "नेविगेशन बंद करें",
    "lang.en": "English",
    "lang.hi": "हिन्दी",

    "home.welcome": "नमस्ते! आज हम आपकी क्या मदद कर सकते हैं?",
    "home.subtitle":
      "अपनी भाषा में समस्या बताएँ, स्क्रीनशॉट जोड़ें, या आम समस्या चुनें। Cheerio Assist आपको चरणों में आगे बढ़ाएगा।",
    "home.commonIssues": "आम समस्याएँ",
    "home.continueTitle": "जहाँ छोड़ा था, वहीं से जारी रखें",
    "home.continueBody": "आपका ट्रबलशूटिंग सेशन अभी खुला है।",
    "home.continueCta": "बातचीत जारी रखें",
    "home.autopilotTitle": "क्या हम इसे आपके लिए तैयार करें?",
    "home.autopilotBody":
      "Autopilot एक वर्कफ़्लो कॉन्फ़िगरेशन का ड्राफ्ट बना सकता है। लागू करने से पहले आप उसे देखकर मंज़ूरी देते हैं — खुद से कुछ नहीं चलता।",
    "home.autopilotCta": "Autopilot आज़माएँ",
    "home.privacyNote":
      "स्क्रीनशॉट में ग्राहक की संवेदनशील जानकारी हो सकती है। जो साझा नहीं करना चाहते, उसे हटा दें।",
    "home.demoNote":
      "यह क्लिक करने योग्य प्रोटोटाइप है। निदान, वीडियो टाइमस्टैम्प और सुधार सिम्युलेटेड हैं, और किसी लाइव Cheerio खाते की जाँच नहीं करते।",

    "issue.assistant": "AI असिस्टेंट जवाब नहीं दे रहा",
    "issue.assistantDesc": "Playground में चलता है, WhatsApp पर नहीं",
    "issue.whatsapp": "WhatsApp कनेक्शन",
    "issue.whatsappDesc": "चैनल स्टेटस, फ़ोन नंबर या API सेटअप",
    "issue.template": "टेम्पलेट अप्रूवल",
    "issue.templateDesc": "मैसेज टेम्पलेट रिव्यू में अटका है",
    "issue.workflow": "वर्कफ़्लो ट्रिगर नहीं हो रहा",
    "issue.workflowDesc": "ऑर्डर या इवेंट से फ्लो शुरू नहीं होता",
    "issue.integration": "इंटीग्रेशन सेटअप",
    "issue.integrationDesc": "Shopify या अन्य ऐप जुड़े नहीं हैं",

    "prompt.assistant":
      "मेरा AI असिस्टेंट टेस्टिंग playground में जवाब देता है, लेकिन WhatsApp पर ग्राहकों को जवाब नहीं दे रहा। कृपया ठीक करने में मदद करें।",
    "prompt.whatsapp":
      "मेरा WhatsApp चैनल जुड़ा हुआ नहीं लग रहा। आने वाले चैट Cheerio तक नहीं पहुँच रहे।",
    "prompt.template":
      "मेरा WhatsApp मैसेज टेम्पलेट रिव्यू में अटका है और मैं उसे वर्कफ़्लो में नहीं चला पा रहा/पा रही।",
    "prompt.workflow":
      "नया ऑर्डर आने पर मेरा वर्कफ़्लो ट्रिगर नहीं हो रहा।",
    "prompt.integration":
      "मैं Shopify जोड़ना चाहता/चाहती हूँ, लेकिन इंटीग्रेशन पूरा नहीं हो पा रहा।",

    "input.placeholder": "बताएँ कि आप क्या ठीक करना चाहते हैं…",
    "input.send": "भेजें",
    "input.attach": "स्क्रीनशॉट जोड़ें",
    "input.voice": "वॉइस इनपुट",
    "input.remove": "अटैचमेंट हटाएँ",
    "input.recording": "रिकॉर्डिंग…",
    "input.processing": "ट्रांस्क्राइब हो रहा है…",
    "input.voiceHint":
      "सिम्युलेटेड ट्रांस्क्रिप्शन — असली स्पीच रिकग्निशन जुड़ा नहीं है।",
    "input.useTranscription": "यह टेक्स्ट इस्तेमाल करें",
    "input.cancel": "रद्द करें",
    "input.voiceExample":
      "मेरा AI असिस्टेंट टेस्टिंग playground में जवाब देता है, लेकिन WhatsApp पर ग्राहकों को जवाब नहीं दे रहा। कृपया ठीक करने में मदद करें।",
    "input.uploading": "स्क्रीनशॉट अपलोड हो रहा है…",
    "input.attached": "स्क्रीनशॉट जुड़ गया",

    "assist.title": "Cheerio Assist से पूछें",
    "assist.subtitle": "सेटअप और ट्रबलशूटिंग के लिए साधारण भाषा में मदद।",
    "assist.thinking": "आपके नोट्स देख रहे हैं…",
    "assist.ack":
      "मैं इसमें मदद कर सकता हूँ। गलत अनुमान से बचने के लिए कुछ छोटे सवाल पूछूँगा।",
    "assist.changeAnswer": "जवाब बदलें",
    "assist.editAnswers": "पिछले जवाब संपादित करें",
    "assist.viewDiagnosis": "निदान देखें",
    "assist.contactSupport": "मानव सपोर्ट से संपर्क करें",
    "assist.viewGuides": "सेटअप गाइड देखें",
    "assist.emptyHint": "शुरू करने के लिए संदेश भेजें या आम समस्या चुनें।",

    "q.playground": "क्या आपका असिस्टेंट टेस्टिंग playground में जवाब देता है?",
    "q.channel": "समस्या कहाँ हो रही है?",
    "q.workflow": "क्या आपने जाँचा है कि आपका वर्कफ़्लो सक्रिय है?",
    "opt.yes": "हाँ",
    "opt.no": "नहीं",
    "opt.unsure": "मुझे पक्का नहीं है",
    "opt.whatsapp": "WhatsApp",
    "opt.instagram": "Instagram",
    "opt.other": "कोई अन्य चैनल",

    "clarify.title": "थोड़ी और जानकारी चाहिए",
    "clarify.body":
      "अभी पूरी तस्वीर साफ़ नहीं है। इनमें से समस्या किसके सबसे करीब है?",
    "clarify.assistant": "AI असिस्टेंट / WhatsApp जवाब",
    "clarify.templates": "मैसेज टेम्पलेट",
    "clarify.integrations": "इंटीग्रेशन",
    "clarify.other": "कुछ और",

    "nodocs.title": "कोई विश्वसनीय गाइड नहीं मिली",
    "nodocs.body":
      "इस समस्या के लिए पर्याप्त विश्वसनीय गाइड नहीं मिली। आपके दिए विवरण के साथ कोई साथी आगे बढ़ा सकता है।",
    "permission.title": "एडमिनिस्ट्रेटर की ज़रूरत हो सकती है",
    "permission.body":
      "यह सेटिंग केवल अधिकृत अकाउंट एडमिनिस्ट्रेटर बदल सकते हैं। अगर आपके पास यह एक्सेस नहीं है, तो हम वर्कस्पेस ओनर के लिए सपोर्ट टिकट खोल सकते हैं।",

    "diagnosis.title": "संभावित समस्या मिली",
    "diagnosis.demoLabel":
      "सिम्युलेटेड डेमो निदान — Cheerio Assist ने किसी लाइव अकाउंट की जाँच नहीं की है।",
    "diagnosis.ctaFix": "ठीक करने का तरीका दिखाएँ",
    "diagnosis.ctaHuman": "मानव सपोर्ट से संपर्क करें",
    "diagnosis.checklist": "कॉन्फ़िगरेशन जाँच",
    "diagnosis.empty":
      "निदान के लिए होम या Cheerio Assist से बातचीत शुरू करें।",
    "diagnosis.startCta": "Cheerio Assist से पूछें",
    "diagnosis.fixHint":
      "जब तैयार हों, मेल खाता ट्यूटोरियल चरण और लिखित निर्देश खोलें। इससे कोई लाइव वर्कफ़्लो नहीं बदलता।",

    "diag.assistant.title":
      "आपका AI असिस्टेंट आने वाले WhatsApp वर्कफ़्लो से जुड़ा नहीं हो सकता।",
    "diag.assistant.body":
      "अगर वर्कफ़्लो आने वाले WhatsApp संदेश आपके असिस्टेंट तक नहीं भेजता, तो असिस्टेंट playground में चल सकता है, लेकिन असली बातचीत का जवाब नहीं देगा।",
    "diag.assistant.playgroundNo.title":
      "असिस्टेंट अभी पूरी तरह सेट नहीं हुआ हो सकता है।",
    "diag.assistant.playgroundNo.body":
      "अगर playground में भी जवाब नहीं मिलता, तो पहले ज्ञान, मॉडल या फ़ॉलबैक सेटिंग देखें। उसके बाद चैनल रूटिंग मदद करेगी।",
    "diag.instagram.title":
      "Instagram इवेंट आपके असिस्टेंट को असाइन नहीं किया गया हो सकता है।",
    "diag.instagram.body":
      "Instagram और WhatsApp के लिए अलग वर्कफ़्लो चाहिए। Playground में चलने वाला असिस्टेंट Instagram के incoming इवेंट पर भी असाइन होना चाहिए।",
    "diag.whatsapp.title": "आपका WhatsApp चैनल कनेक्शन अधूरा हो सकता है।",
    "diag.whatsapp.body":
      "अगर फ़ोन नंबर या Cloud API कनेक्शन सक्रिय नहीं है, तो ग्राहक के संदेश वर्कफ़्लो या असिस्टेंट तक पहुँचते ही नहीं।",
    "diag.template.title": "मैसेज टेम्पलेट अभी अप्रूवल का इंतज़ार कर रहा हो सकता है।",
    "diag.template.body":
      "अप्रूव होने तक वर्कफ़्लो WhatsApp टेम्पलेट नहीं भेज सकता। फ्लो बना सकते हैं, लेकिन भेजने वाला चरण रुकेगा।",
    "diag.workflow.title":
      "Incoming-message ट्रिगर सक्रिय नहीं हो सकता।",
    "diag.workflow.body":
      "अगर वर्कफ़्लो बंद है, या ट्रिगर आपके इवेंट से मेल नहीं खाता, तो असिस्टेंट को बातचीत मिलती ही नहीं।",
    "diag.integration.title": "इंटीग्रेशन सही एक्सेस के साथ जुड़ा नहीं हो सकता।",
    "diag.integration.body":
      "ऑर्डर इवेंट तभी Cheerio तक पहुँचते हैं जब स्टोर ऐप किसी एडमिन अनुमति वाले व्यक्ति ने जोड़ा हो।",
    "diag.unclear.title": "अभी और साफ़ विवरण चाहिए।",
    "diag.unclear.body":
      "सुरक्षित सुधार सुझाने के लिए जानकारी कम है। इस सेशन के नोट्स के साथ मानव सपोर्ट आगे बढ़ सकता है।",

    "check.assistant": "वर्कफ़्लो में असिस्टेंट चुना गया",
    "check.trigger": "Incoming-message ट्रिगर",
    "check.active": "वर्कफ़्लो सक्रिय",
    "check.connection": "WhatsApp कनेक्शन",
    "check.playground": "Playground जवाब",
    "check.template": "टेम्पलेट अप्रूवल स्थिति",
    "check.instagram": "Instagram इवेंट असाइनमेंट",
    "check.integration": "स्टोर इंटीग्रेशन",
    "check.permission": "एडमिन अनुमति",

    "status.needs_attention": "ध्यान ज़रूरी",
    "status.not_verified": "सत्यापित नहीं",
    "status.checked": "जाँचा गया",
    "status.failed": "असफल",

    "tut.sampleSource":
      "नमूना ट्यूटोरियल पूर्वावलोकन — डेमो के लिए, आधिकारिक Cheerio वीडियो URL नहीं।",
    "tut.watch": "इसी चरण से देखें",
    "tut.read": "निर्देश पढ़ें",
    "tut.relevant": "संबंधित टाइमस्टैम्प",
    "tut.whyLabel": "यह प्रासंगिक क्यों है",
    "tut.close": "पूर्वावलोकन बंद करें",
    "tut.playerHint": "सिम्युलेटेड प्लेयर। सुझाए चरण से शुरू होता है।",
    "tut.playing": "यहाँ से चल रहा है",

    "tut.assistant.title": "AI असिस्टेंट को WhatsApp वर्कफ़्लो से जोड़ें",
    "tut.assistant.why":
      "असिस्टेंट चुनना और उसे incoming WhatsApp वर्कफ़्लो से जोड़ना सीखें।",
    "tut.whatsapp.title": "WhatsApp Business चैनल फिर से जोड़ें",
    "tut.whatsapp.why":
      "फ़ोन नंबर, Cloud API स्थिति और इनबाउंड रूटिंग की पुष्टि करें।",
    "tut.template.title": "WhatsApp टेम्पलेट अप्रूवल जाँचें",
    "tut.template.why":
      "टेम्पलेट स्थिति कैसे पढ़ें, और रिव्यू के दौरान क्या करें।",
    "tut.workflow.title": "Incoming-message वर्कफ़्लो चालू करें",
    "tut.workflow.why":
      "ट्रिगर खोजें, सक्रिय होने की पुष्टि करें, और उसे सही इवेंट से मिलाएँ।",
    "tut.integration.title": "स्टोर इंटीग्रेशन जोड़ें",
    "tut.integration.why":
      "ऑर्डर इवेंट शुरू होने से पहले कौन सी एडमिन अनुमति चाहिए।",

    "step.progress": "चरण {current} / {total} पूरा।",
    "step.whyTitle": "यह क्यों ज़रूरी है",
    "step.whyBody":
      "Playground असिस्टेंट को अकेले टेस्ट करता है। ग्राहक की बातचीत तभी पहुँचती है जब सक्रिय वर्कफ़्लो उसे incoming चैनल इवेंट पर असाइन करे।",
    "step.done": "मैंने ये चरण पूरे कर लिए हैं",
    "step.written": "लिखित निर्देश",
    "step.video": "वीडियो गाइड",
    "step.expand": "विवरण दिखाएँ",
    "step.collapse": "विवरण छिपाएँ",

    "step.a1.title": "सही वर्कफ़्लो खोलें",
    "step.a1.body":
      "Automation → Workflows में जाएँ और वह फ्लो खोलें जो ग्राहक के WhatsApp संदेश संभाले। कैंपेन ब्लास्ट वाला फ्लो नहीं, सपोर्ट या inbound चैट वाला चुनें।",
    "step.a1.tip": "अगर कई फ्लो हैं, Incoming WhatsApp ट्रिगर वाला चुनें।",
    "step.a2.title": "Incoming-message ट्रिगर जाँचें",
    "step.a2.body":
      "पहला नोड Incoming WhatsApp (या मेल खाता चैनल इवेंट) होना चाहिए। अगर ट्रिगर कैंपेन या ऑर्डर इवेंट है, तो यह फ्लो ग्राहक के जवाब नहीं देखेगा।",
    "step.a2.tip": "WhatsApp और Instagram एक ही incoming ट्रिगर साझा नहीं कर सकते। हर चैनल का अपना वर्कफ़्लो चाहिए।",
    "step.a3.title": "इच्छित AI असिस्टेंट चुनें",
    "step.a3.body":
      "Assign AI Assistant चरण जोड़ें या खोलें। वही असिस्टेंट चुनें जिसे आपने playground में टेस्ट किया, ताकि ग्राहकों को वही जवाब मिलें।",
    "step.a3.tip": "खाली असिस्टेंट फ़ील्ड सबसे आम कारण है कि playground चलता है और लाइव चैट नहीं।",
    "step.a4.title": "वर्कफ़्लो कॉन्फ़िगरेशन देखें",
    "step.a4.body":
      "पुष्टि करें कि कोई ऐसी शर्त तो नहीं जो सभी चैट रोक दे, और असिस्टेंट न जवाब दे तो फ़ॉलबैक सेट हो।",
    "step.a4.tip": "जाँच के दौरान टेस्ट नंबरों को exclusion लिस्ट से बाहर रखें।",
    "step.a5.title": "बदलाव सेव करें",
    "step.a5.body":
      "वर्कफ़्लो सेव करें और स्थिति Active हो। ड्राफ्ट या रुका फ्लो ग्राहकों को जवाब नहीं देगा।",
    "step.a5.tip": "ड्राफ्ट के रूप में सेव करना सक्रिय करने जैसा नहीं है।",
    "step.a6.title": "असिस्टेंट को फिर से टेस्ट करें",
    "step.a6.body":
      "केवल playground से नहीं, ग्राहक जैसे नंबर से WhatsApp संदेश भेजें। इनबॉक्स में असिस्टेंट का जवाब दिखना चाहिए।",
    "step.a6.tip": "ऐसा छोटा टेस्ट वाक्य चुनें जिसे आप इतिहास में पहचान सकें।",

    "step.w1.title": "चैनल सेटिंग खोलें",
    "step.w1.body": "Channels में WhatsApp चुनें। बिज़नेस फ़ोन नंबर वही हो जिस पर ग्राहक लिखते हैं।",
    "step.w1.tip": "WABA माइग्रेशन के बाद गलत नंबर रह जाना आसान है।",
    "step.w2.title": "Cloud API स्थिति देखें",
    "step.w2.body": "कनेक्शन सक्रिय दिखे। अगर लंबित या समाप्त है, तो वर्कफ़्लो बदलने से पहले फिर जोड़ें।",
    "step.w2.tip": "फिर से जोड़ने से मौजूदा टेम्पलेट नहीं हटते।",
    "step.w3.title": "सेव करें और एक टेस्ट inbound संदेश भेजें",
    "step.w3.body": "स्थिति सक्रिय होने के बाद बिज़नेस नंबर पर WhatsApp संदेश भेजें और इनबॉक्स में आने की पुष्टि करें।",
    "step.w3.tip": "अगर कुछ न आए, तो अन्य वर्कफ़्लो बदलने के बजाय यहीं रुककर सपोर्ट से संपर्क करें।",

    "step.t1.title": "टेम्पलेट लाइब्रेरी खोलें",
    "step.t1.body": "Templates में जाकर वह WhatsApp टेम्पलेट खोजें जो वर्कफ़्लो इस्तेमाल करता है।",
    "step.t1.tip": "नाम बिल्कुल मेल खाने चाहिए, underscore सहित।",
    "step.t2.title": "अप्रूवल स्थिति पढ़ें",
    "step.t2.body": "Approved टेम्पलेट भेजे जा सकते हैं। In review या rejected टेम्पलेट भेजने वाले चरण को चुपचाप रोक देते हैं।",
    "step.t2.tip": "रिव्यू के दौरान टेम्पलेट की नकल न बनाएँ।",
    "step.t3.title": "अप्रूव्ड टेम्पलेट इस्तेमाल करें या प्रतीक्षा करें",
    "step.t3.body": "वर्कफ़्लो को पहले से अप्रूव्ड टेम्पलेट पर लगाएँ, या लाइव भेजने से पहले रिव्यू पूरा होने दें।",
    "step.t3.tip": "इस बीच बाकी फ्लो ड्राफ्ट कर सकते हैं।",

    "step.f1.title": "वह वर्कफ़्लो खोलें जो चलना चाहिए",
    "step.f1.body": "जिस फ्लो के चलने की उम्मीद है, उसे खोजें।",
    "step.f1.tip": "डुप्लिकेट ड्राफ्ट तो नहीं देख रहे, यह जाँचें।",
    "step.f2.title": "ट्रिगर इवेंट से मेल खाता हो",
    "step.f2.body": "नया ऑर्डर, abandoned cart और inbound चैट अलग ट्रिगर हैं। अपने मामले वाला चुनें।",
    "step.f2.tip": "Prepaid और COD ऑर्डर अलग इवेंट हो सकते हैं।",
    "step.f3.title": "वर्कफ़्लो को Active करें",
    "step.f3.body": "सेव करें और फ्लो चालू करें। ड्राफ्ट वर्कफ़्लो कभी नहीं चलते।",
    "step.f3.tip": "Active टॉगल Autopilot प्रस्ताव से अलग है।",

    "step.i1.title": "Integrations खोलें",
    "step.i1.body": "Integrations में जाकर वह स्टोर ऐप चुनें जिसे जोड़ना है।",
    "step.i1.tip": "Shopify कनेक्शन स्टोर एडमिन को बनाना होता है।",
    "step.i2.title": "एडमिन अनुमति जाँचें",
    "step.i2.body": "अगर Connect बंद है, तो आपकी भूमिका यह चरण पूरा नहीं कर सकती। वर्कस्पेस एडमिनिस्ट्रेटर से कहें।",
    "step.i2.tip": "एक्सेस का इंतज़ार करते हुए भी सपोर्ट विवरण इकट्ठा कर सकता है।",
    "step.i3.title": "कनेक्शन पूरा करें और इवेंट मैप करें",
    "step.i3.body": "जुड़ने के बाद ऑर्डर इवेंट को उस वर्कफ़्लो ट्रिगर से मैप करें जो आप चलाना चाहते हैं।",
    "step.i3.tip": "अगर इवेंट फिर भी न दिखें, तो Cheerio Assist पर वापस आएँ।",

    "verify.title": "रिज़ॉल्यूशन जाँच",
    "verify.lead":
      "जब तैयार हों, सिम्युलेटेड जाँच चलाएँ। इससे किसी असली ग्राहक को संदेश नहीं जाता।",
    "verify.testAgain": "फिर से टेस्ट करें",
    "verify.checking": "सिम्युलेटेड जाँच चल रही है…",
    "verify.success":
      "डेमो जाँच सफल रही। सिम्युलेटेड वातावरण में आपका WhatsApp वर्कफ़्लो अब जवाब दे रहा है।",
    "verify.ask": "क्या इससे आपकी समस्या हल हुई?",
    "verify.yes": "हाँ, हल हो गई।",
    "verify.no": "मुझे अभी भी मदद चाहिए।",
    "verify.completeTitle": "हो गया",
    "verify.complete":
      "अच्छा लगा कि यह सुलझ गया। कुछ और अटके तो Cheerio Assist पर वापस आ सकते हैं।",
    "verify.fail":
      "समस्या अभी हल नहीं हुई। सपोर्ट के लिए निदान विवरण इकट्ठा करते हैं।",
    "verify.review": "ट्रबलशूटिंग चरण फिर देखें",
    "verify.human": "मानव सपोर्ट से संपर्क करें",
    "verify.demoNote":
      "केवल सिम्युलेटेड सत्यापन। कोई लाइव WhatsApp बातचीत टेस्ट नहीं हुई।",
    "verify.incomplete":
      "कुछ चरण अभी खुले हैं। उन्हें पूरा करें, या अटकने पर मानव सपोर्ट से संपर्क करें।",

    "ticket.title": "मेरे सपोर्ट टिकट",
    "ticket.subtitle": "सिम्युलेटेड टिकट केवल इस ब्राउज़र सेशन में रहते हैं।",
    "ticket.summary": "टिकट सारांश",
    "ticket.summaryLead":
      "यह स्नैपशॉट एक साथी को भेजा जाएगा। किसी लाइव सपोर्ट कतार में नहीं जाता।",
    "ticket.create": "सपोर्ट टिकट बनाएँ",
    "ticket.created": "सपोर्ट टिकट बन गया",
    "ticket.createdBody":
      "असली उत्पाद में अब कोई साथी इसे उठाता। इस प्रोटोटाइप में टिकट स्थानीय रूप से सहेजा गया है ताकि आप देख सकें।",
    "ticket.id": "टिकट ID",
    "ticket.status": "स्थिति",
    "ticket.problem": "समस्या का विवरण",
    "ticket.channel": "चुना हुआ चैनल",
    "ticket.cause": "संभावित कारण",
    "ticket.steps": "पहले किए गए चरण",
    "ticket.diagnostics": "निदान चेकलिस्ट",
    "ticket.screenshot": "स्क्रीनशॉट",
    "ticket.language": "पसंदीदा भाषा",
    "ticket.back": "बातचीत पर लौटें",
    "ticket.view": "टिकट देखें",
    "ticket.empty": "अभी कोई सपोर्ट टिकट नहीं।",
    "ticket.emptyHint": "अगर Cheerio Assist सुधार पूरा न कर सके, तो निदान स्क्रीन से आगे बढ़ा सकते हैं।",
    "ticket.open": "खुला",
    "ticket.in_progress": "प्रगति पर",
    "ticket.resolved": "हल हुआ",
    "ticket.none": "कोई नहीं",
    "ticket.newFromSession": "वर्तमान सेशन से बनाएँ",
    "ticket.noSession": "पहले ट्रबलशूटिंग शुरू करें ताकि टिकट में निदान विवरण आ सके।",
    "ticket.list": "सभी टिकट",
    "channel.whatsapp": "WhatsApp",
    "channel.instagram": "Instagram",
    "channel.other": "कोई अन्य चैनल",
    "channel.unknown": "निर्दिष्ट नहीं",
    "cause.assistant": "Incoming WhatsApp वर्कफ़्लो में असिस्टेंट असाइन नहीं",
    "cause.whatsapp": "WhatsApp चैनल कनेक्शन अधूरा",
    "cause.template": "टेम्पलेट अभी अप्रूव नहीं",
    "cause.workflow": "वर्कफ़्लो ट्रिगर निष्क्रिय या मेल नहीं खाता",
    "cause.integration": "स्टोर इंटीग्रेशन नहीं है या अनुमति कम है",
    "cause.unknown": "मानव समीक्षा की ज़रूरत",
    "cause.permission": "एडमिनिस्ट्रेटर अनुमति नहीं है",
    "cause.nodocs": "कोई विश्वसनीय दस्तावेज़ी सुधार नहीं",
    "steps.none": "अभी कोई गाइडेड चरण पूरे नहीं हुए",
    "steps.guided": "इन-प्रॉडक्ट गाइडेड चरण पूरे किए",
    "steps.video": "सुझाया ट्यूटोरियल खंड खोला",
    "steps.verified": "सिम्युलेटेड रिज़ॉल्यूशन जाँच चलाई",

    "guides.title": "सेटअप गाइड",
    "guides.subtitle": "छोटे, लेबल वाले वॉकथ्रू। गाइड खोलें, या Assist में जाएँ।",
    "guides.open": "गाइड खोलें",
    "guides.useAssist": "इसकी ट्रबलशूटिंग करें",
    "guides.cat.assistant": "AI असिस्टेंट",
    "guides.cat.channel": "चैनल",
    "guides.cat.templates": "टेम्पलेट",
    "guides.cat.workflows": "वर्कफ़्लो",
    "guides.cat.apps": "इंटीग्रेशन",

    "auto.title": "Autopilot",
    "auto.subtitle":
      "कॉन्फ़िगरेशन प्रस्तावित करें, संपादित करें, और किसी सिम्युलेटेड निष्पादन से पहले मंज़ूरी दें।",
    "auto.badge": "प्रस्तावित क्षमता — केवल सिम्युलेटेड",
    "auto.step1": "अनुरोध समझें",
    "auto.step2": "कॉन्फ़िगरेशन तैयार करें",
    "auto.step3": "पूर्वावलोकन और संपादन",
    "auto.step4": "मंज़ूरी",
    "auto.step5": "सिम्युलेटेड निष्पादन",
    "auto.placeholder":
      "जो वर्कफ़्लो चाहिए, वह बताएँ। उदाहरण: नया ऑर्डर आने पर WhatsApp पर ऑर्डर-कन्फ़र्मेशन संदेश भेजने वाला वर्कफ़्लो बनाएँ।",
    "auto.example":
      "नया ऑर्डर आने पर WhatsApp पर ऑर्डर-कन्फ़र्मेशन संदेश भेजने वाला वर्कफ़्लो बनाएँ।",
    "auto.useExample": "उदाहरण अनुरोध इस्तेमाल करें",
    "auto.continue": "जारी रखें",
    "auto.editRequest": "अनुरोध संपादित करें",
    "auto.preparing": "आपका वर्कफ़्लो प्रस्ताव तैयार हो रहा है…",
    "auto.proposalTitle": "प्रस्तावित कॉन्फ़िगरेशन",
    "auto.draft": "ड्राफ्ट प्रस्ताव",
    "auto.notLive":
      "यह प्रस्ताव है, सेव या सक्रिय वर्कफ़्लो नहीं। किसी Cheerio अकाउंट पर कुछ लागू नहीं हुआ।",
    "auto.name": "वर्कफ़्लो नाम",
    "auto.trigger": "ट्रिगर",
    "auto.action": "कार्रवाई",
    "auto.channel": "चैनल",
    "auto.template": "आवश्यक टेम्पलेट",
    "auto.status": "स्थिति",
    "auto.missing": "ज़रूरी जानकारी अधूरी है",
    "auto.editProposal": "प्रस्ताव संपादित करें",
    "auto.approve": "मंज़ूर करें और आगे बढ़ें",
    "auto.cancel": "प्रस्ताव रद्द करें",
    "auto.reject": "अस्वीकार करें और संपादन जारी रखें",
    "auto.executing": "डेमो वातावरण में स्वीकृत प्रस्ताव लागू हो रहा है…",
    "auto.successTitle": "डेमो कॉन्फ़िगरेशन पूरा और सत्यापित।",
    "auto.successBody":
      "इस प्रोटोटाइप में प्रस्ताव को निष्पादित चिह्नित किया गया। कोई लाइव Cheerio वर्कफ़्लो नहीं बना।",
    "auto.failureTitle": "कॉन्फ़िगरेशन पूरा नहीं हो सका।",
    "auto.failureBody": "कुछ सक्रिय नहीं हुआ। प्रस्ताव ठीक करके फिर कोशिश कर सकते हैं।",
    "auto.another": "एक और प्रस्ताव शुरू करें",
    "auto.attachHint": "वैकल्पिक संदर्भ स्क्रीनशॉट",
    "auto.lastState": "अंतिम ज्ञात सिम्युलेटेड स्थिति",
    "auto.preview": "वर्कफ़्लो पूर्वावलोकन",
    "auto.done": "हो गया",
    "auto.needApproval":
      "मंज़ूर करें और आगे बढ़ें आवश्यक है। Autopilot चालू करना बाद में चलाने की अनुमति नहीं है।",

    "field.trigger.new_order": "नया ऑर्डर प्राप्त",
    "field.trigger.abandoned_cart": "Abandoned cart",
    "field.trigger.payment_success": "भुगतान सफल",
    "field.trigger.incoming_whatsapp": "Incoming WhatsApp संदेश",
    "field.action.send_template": "ऑर्डर-कन्फ़र्मेशन संदेश भेजें",
    "field.action.send_text": "टेक्स्ट संदेश भेजें",
    "field.action.assign_assistant": "AI असिस्टेंट असाइन करें",
    "field.channel.whatsapp": "WhatsApp",
    "field.channel.sms": "SMS",
    "field.channel.email": "Email",
    "field.channel.instagram": "Instagram",
    "field.template.order_confirmation": "Order confirmation",
    "field.template.shipping_update": "Shipping update",
    "field.template.payment_failed": "Payment failed",
    "field.template.unapproved": "Order confirmation (अप्रूवल लंबित)",

    "node.new_order": "नया ऑर्डर",
    "node.check": "ऑर्डर विवरण जाँचें",
    "node.send": "WhatsApp कन्फ़र्मेशन भेजें",
    "node.abandoned": "Abandoned Cart",
    "node.incoming": "Incoming WhatsApp",
    "node.assistant": "AI असिस्टेंट असाइन करें",

    "err.name": "वर्कफ़्लो नाम",
    "err.trigger": "ट्रिगर",
    "err.action": "कार्रवाई",
    "err.channel": "चैनल",
    "err.template": "टेम्पलेट",
    "fail.unapproved":
      "चुना हुआ WhatsApp टेम्पलेट अभी अप्रूव नहीं है। कोई अप्रूव्ड टेम्पलेट चुनें या रिव्यू का इंतज़ार करें।",
    "fail.invalid": "ज़रूरी फ़ील्ड अधूरे हैं। प्रस्ताव अपडेट कर फिर मंज़ूर करें।",

    "modal.close": "बंद करें",
    "common.back": "वापस",
    "common.next": "आगे",
    "common.save": "सेव करें",
    "common.optional": "वैकल्पिक",
    "common.simulated": "सिम्युलेटेड",
    "common.required": "आवश्यक",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

export function t(
  lang: Language,
  key: string,
  vars?: Record<string, string | number>,
): string {
  const table = translations[lang] as Record<string, string>;
  const fallback = translations.en as Record<string, string>;
  let value = table[key] ?? fallback[key] ?? key;
  if (vars) {
    for (const [name, raw] of Object.entries(vars)) {
      value = value.split(`{${name}}`).join(String(raw));
    }
  }
  return value;
}
