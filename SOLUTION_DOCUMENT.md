# Assignment Name: Cheerio Assist – AI-Powered Support & Setup Assistant Prototype
**Role / Context:** Cheerio Product Intern Assessment Solution  
**Author:** Raahul Maurya  
**Date:** October 2026  

---

## 🔗 Important Submission Links

> **Note on Permissions:** Please ensure all external documents and sheets have access permissions configured to **"Anyone with the link can view"**.

* **GitHub Repository:** [https://github.com/raahulmaurya1/cheerio-support-assistant](https://github.com/raahulmaurya1/cheerio-support-assistant)
* **Google Sheet Link (User Research, Test Cases & Diagnostic Rules):**  
  👉 `https://docs.google.com/spreadsheets/d/1_YOUR_GOOGLE_SHEET_ID_HERE/edit?usp=sharing`  
  *(Replace with your public Google Sheet containing test cases, rule matrices, and research data)*
* **Live Demo / Deployment Link:**  
  👉 `http://localhost:5173/` *(Local)* · `[https://your-deployment-url.vercel.app](https://your-deployment-url.vercel.app)` *(Optional Cloud Deployment)*
* **Loom / Video Walkthrough (Optional):**  
  👉 `[Insert Loom Walkthrough Link - Anyone with link can view]`

---

## 1. Executive Summary & Product Vision

### 1.1 The Challenge
Modern D2C brands and growing SMBs rely heavily on conversational commerce and customer engagement platforms like **Cheerio** to automate WhatsApp marketing, customer support, and sales notifications. However, configuring and maintaining WhatsApp Business API integrations, Meta message templates, and multi-step triggers involves high operational complexity:
1. **Setup Friction:** D2C founders and non-technical marketing operators struggle with Meta Business Manager verifications, webhook synchronization, and message template rejections.
2. **Support Load:** Small support teams are bombarded with repetitive, vague tickets (e.g., *"My WhatsApp bot is not working"*), requiring multiple round-trips of discovery.
3. **Escalation Context Void:** When users escalate issues to human agents, they often start from zero—re-explaining the problem without sharing diagnostic traces or previous attempts.

### 1.2 The Solution: Cheerio Assist
**Cheerio Assist** is an AI-powered diagnostic and setup assistant built directly into the Cheerio dashboard. Guided by the motto:
> **"Get unstuck. Fix it step by step."**

Cheerio Assist acts as a patient, tier-1 technical co-pilot that:
- **Intakes problems multi-modally** (natural language, pre-set issue chips, screenshots, and simulated voice).
- **Runs dynamic diagnostic triage** via an interactive conversational state machine.
- **Provides targeted, timestamped video tutorials** and interactive checklists.
- **Simulates resolution verifications** so merchants can confirm fixes before closing.
- **Packages context-rich escalation tickets** with full diagnostic telemetry when human intervention is needed.
- **Introduces "Cheerio Autopilot"**, enabling users to generate, inspect, customize, and simulate automated workflows from plain language requests.
- **Supports seamless English / Hindi (हिन्दी)** switching without losing session state.

---

## 2. Target Personas & Core Problem Space

| Persona | Role & Background | Pain Points | How Cheerio Assist Helps |
| :--- | :--- | :--- | :--- |
| **Arjun (D2C Brand Founder)** | Non-technical merchant running a Shopify apparel brand; operates late nights. | Has no developer on staff; cannot parse webhook failures or WhatsApp Cloud API error codes. | Step-by-step interactive checklists, timestamped video guidance, Hindi language support. |
| **Pooja (Growth Marketer)** | Executes broadcast campaigns and abandoned cart reminders. | Frustrated by delayed Meta template approvals and silent workflow trigger failures. | Plain English workflow generator ("Autopilot"), pre-flight template approval checks. |
| **Rohan (Cheerio Support Agent)** | Tier-1 support specialist handling 60+ tickets daily. | Spends 70% of his time asking *"Did you test in playground?"* and *"What channel are you on?"*. | Contextual escalation tickets pre-populated with diagnostic checks, screenshots, and steps already attempted. |

---

## 3. System Architecture & Architectural Principles

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Cheerio Assist Frontend                         │
│              (React 19 + TypeScript + Tailwind CSS v4)                 │
├───────────────────────────────┬────────────────────────────────────────┤
│          UI Layer             │             State & Logic              │
│  • AppShell & Sidebar         │  • AppContext (Global Store)           │
│  • SupportPage / Assist       │  • Language Provider (i18n En/Hi)      │
│  • TroubleshootingPage        │  • Modal & Navigation Controllers      │
│  • AutopilotPage & Preview    │                                        │
│  • TicketsPage & Checklist    │                                        │
├───────────────────────────────┴────────────────────────────────────────┤
│                       Decoupled Service Layer                          │
│  src/services/                                                         │
│  ├── supportService.ts    ──> Issue classification, diagnostic state   │
│  │                            machine, ticket generator, escalation    │
│  ├── knowledgeService.ts  ──> Tutorial indexing, timestamp mapping     │
│  └── autopilotService.ts  ──> Workflow NLP parser, node generator,     │
│                               rule validation, sandbox executor        │
├────────────────────────────────────────────────────────────────────────┤
│                         Data & Mock Assets                             │
│  src/data/mockData.ts     ──> Curated tutorials, issues, regex rules   │
│  src/data/i18n.ts         ──> Complete English & Hindi dictionary      │
│  src/assets/              ──> Inlined tutorial preview assets          │
└────────────────────────────────────────────────────────────────────────┘
```

### 3.1 Key Architectural Decision: Separation of Concerns
In accordance with production product standards, **UI components do not own business rules or diagnostic logic**:
- **`src/services/supportService.ts`**: Contains pure business functions for classifying inputs, generating dynamic follow-up questions, building diagnostic checklists, and serializing tickets.
- **`src/services/autopilotService.ts`**: Contains workflow node graph generation, syntax/configuration validation, and simulated workflow execution.
- **`src/context/AppContext.tsx`**: Provides single-source-of-truth state management. If a user toggles between English and Hindi, edits previous diagnostic answers, or navigates between pages, zero state is lost.

---

## 4. Comprehensive Feature Breakdown

### 4.1 Multi-Modal Issue Intake
Users can initiate assistance through four intuitive modalities:
1. **Natural Language Text:** Users can type questions in conversational English, Hindi, or Hinglish (e.g., *"Mera WhatsApp assistant reply nahi de raha"*).
2. **One-Tap Quick Chips:** Common issues are displayed prominently on the Home screen (WhatsApp Connection, Template Approval, Assistant Inactivity, Workflow Triggers, Shopify Integration).
3. **Screenshot Upload:** Users can attach error screenshots (JPEG/PNG). The assistant attaches the image to the diagnostic session and references it in escalation tickets.
4. **Simulated Voice Input:** A microphone toggle provides hands-free accessibility for mobile and busy store owners.

### 4.2 Intelligent Diagnostic Engine & Conversational Branching
Rather than providing a generic FAQ link, Cheerio Assist runs a targeted diagnostic session:
- **Regex & Keyword Classification:** Categorizes inquiries into `assistant_whatsapp`, `whatsapp_connection`, `template_approval`, `workflow_trigger`, `integration`, `permission`, `no_docs`, or `unclear`.
- **Dynamic Branching Questions:**
  - *Question 1:* "Does the assistant respond in the Cheerio Playground?" (Isolates Cheerio AI logic from channel connection).
  - *Question 2:* "Which channel is experiencing the issue?" (WhatsApp, Instagram, Other).
  - *Question 3:* "Is the automation workflow active?" (Verifies toggle state).
- **Edit Previous Answers:** Users can jump back to any previous question at any point to update their answers without resetting the entire session.

### 4.3 Labelled Diagnosis & Diagnostic Checklist
Once classified, the system presents a **Labelled Demo Diagnosis**:
- Highlights clear status indicators:
  - 🟢 **Verified / Checked**
  - 🟡 **Needs Attention**
  - ⚪ **Not Verified**
  - 🔴 **Failed**
- Clear explanation of suspected root cause in plain merchant language.
- Explicit callout if the issue requires **Admin Permissions** or is an external limitation.

### 4.4 Timestamped Interactive Tutorials & Step-by-Step Guidance
To maximize self-serve resolution:
- **Timestamped Video Cards:** Each tutorial starts at the exact relevant timestamp (e.g., jump straight to `02:15` for WhatsApp Assistant routing rather than watching an 8-minute video).
- **Interactive Checklist:** Merchants check off actionable steps (e.g., *"Verify WhatsApp Cloud API Access Token"*, *"Confirm Webhook URL"*).
- **Pro Tips:** Inline collapsible hints explaining *why* each step matters.

### 4.5 Resolution Verification & Context-Rich Escalation
- **"Run Resolution Check":** Users click to simulate a live ping to Cheerio's service.
- **Self-Serve Resolution:** If all steps are completed, the merchant marks the issue resolved, celebrating instant recovery.
- **Context-Rich Support Tickets:** If self-serve fails, clicking "Escalate to Human Support" creates a ticket (e.g., `CA-4821`):
  - Pre-fills problem description.
  - Attaches all attempted diagnostic steps.
  - Attaches screenshot proof.
  - Identifies channel and suspected cause.
  - Transmits merchant language preference.
  - **Result:** Reduces support agent discovery time from 15 minutes to under 30 seconds.

### 4.6 Cheerio Autopilot (AI Workflow Creation)
Cheerio Autopilot demonstrates the next generation of conversational automation setup:
1. **Input:** Operator types a prompt (e.g., *"Send a WhatsApp confirmation when a new order arrives"* or *"Send an abandoned cart reminder after 1 hour"*).
2. **Review & Parsing:** Autopilot extracts the Trigger, Conditions, Channel, and Meta Template.
3. **Interactive Node Preview:** Renders an interactive visual flowchart showing Trigger ➔ Condition ➔ Action.
4. **Customization & Editing:** Operators can fine-tune triggers, action types, templates, and channels using dropdowns.
5. **Pre-flight Validation & Simulation:**
   - Validates missing attributes.
   - Detects unapproved Meta templates (e.g., blocks execution if template status is unapproved).
   - Simulates end-to-end execution with success confirmation.

### 4.7 Seamless Bilingual Experience (English & Hindi)
India is Cheerio’s key market. Cheerio Assist features a complete localization dictionary (`src/data/i18n.ts`):
- Full UI, diagnostic questions, buttons, checklists, and Autopilot steps translated.
- Switchable at any time from the top bar or sidebar without losing current troubleshooting progress.

---

## 5. Edge Cases & Safety Guardrails

| Edge Case | User Input Example | System Handling & Guardrail |
| :--- | :--- | :--- |
| **Vague / Incomplete Input** | *"Help"*, *"Not working"*, *"Fix this"* | Detected via `UNCLEAR_PATTERN`. System does not guess; offers structured clarifying chips (Assistant, Templates, Integration, Other). |
| **Unsupported / Undocumented Features** | *"Connect Jio SIP trunk"*, *"DTMF dialer"* | Detected via `NO_DOCS_PATTERN`. Assistant gracefully explains that Cheerio does not currently support custom carrier SIP trunks, avoiding hallucination, and offers human escalation. |
| **Permission Barriers** | *"I don't have access to Shopify app settings"* | Detected via `PERMISSION_PATTERN`. Flags `needsAdmin: true`. Explains that Workspace Admin access is required to authorize API scopes. |
| **Unapproved Meta Templates** | Autopilot proposal with unapproved template | Autopilot simulation fails with a clear warning: *"Cannot execute workflow with unapproved WhatsApp template. Please request Meta approval first."* |

---

## 6. Key Metrics & Business Impact

If rolled out to production, Cheerio Assist directly influences core SaaS customer support and onboarding KPIs:

1. **Ticket Deflection Rate (Target: +35%):**
   - By guiding users through playground checks and webhook re-authorizations, ~35% of tier-1 issues resolve without agent interaction.
2. **First Contact Resolution (FCR) (Target: +45%):**
   - When escalation is unavoidable, agents receive tickets with verified diagnostics and screenshots, eliminating back-and-forth discovery.
3. **Time to Setup First Automation (TTR) (Target: -60%):**
   - With Autopilot, non-technical users configure multi-step WhatsApp flows in under 2 minutes instead of navigating complex menu hierarchies.
4. **Merchant Onboarding Retention (Target: +22%):**
   - Addressing early integration hurdles in the merchant's native language (Hindi/English) drastically reduces trial drop-offs.

---

## 7. Production Roadmap & Future Enhancements

- [ ] **Live Meta Cloud API & Cheerio Webhooks:** Replace mock verifications with live API health checks and webhook event inspection.
- [ ] **RAG-Powered Documentation Search:** Connect an embedding-based vector database (e.g., Pinecone / pgvector) to Cheerio’s live GitBook docs for automated FAQ synthesis.
- [ ] **Real WebRTC Voice Interaction:** Integrate live OpenAI Whisper / Bhashini speech-to-text for authentic voice troubleshooting in Indian regional dialects.
- [ ] **Multi-Agent Orchestration:** Implement tool-calling agents capable of programmatically fixing customer webhook URLs upon merchant confirmation.

---

## 8. Codebase Structure Summary

```text
cheerio-support-assistant/
├── public/images/              # Tutorial thumbnails & visual assets
├── src/
│   ├── assets/                 # Inlined bundle assets for single-file builds
│   ├── components/             # Reusable UI components
│   │   ├── AppShell.tsx        # Responsive navigation & layout wrapper
│   │   ├── ChatInput.tsx       # Multi-modal input (text, file, mic)
│   │   ├── ChatMessage.tsx     # Message bubbles, options, action CTAs
│   │   ├── DiagnosticChecklist # Interactive status checklist with badges
│   │   ├── Icons.tsx           # Handcrafted SVG icons
│   │   ├── Modal.tsx           # Accessible video player modal
│   │   ├── Sidebar.tsx         # Sidebar navigation with language toggle
│   │   ├── StatusBadge.tsx     # Status pill indicators
│   │   ├── TutorialCard.tsx    # Timestamped video tutorial card
│   │   └── WorkflowPreview.tsx # Interactive visual workflow pipeline
│   ├── context/
│   │   └── AppContext.tsx      # Global store for chat, diagnostics, tickets, autopilot
│   ├── data/
│   │   ├── i18n.ts             # Complete English & Hindi dictionary
│   │   └── mockData.ts         # Tutorial catalog, regex patterns, form options
│   ├── pages/                  # Page views
│   │   ├── SupportPage.tsx     # Home & conversational assist interface
│   │   ├── TroubleshootingPage # Diagnosis result, checklist, verification
│   │   ├── AutopilotPage.tsx   # 5-step workflow builder & simulator
│   │   ├── TicketsPage.tsx     # Escalated tickets & detailed inspection
│   │   └── GuidesPage.tsx      # Video guide library & category filters
│   ├── services/               # Pure business logic layer
│   │   ├── supportService.ts   # Diagnostic triage & ticket creation
│   │   ├── knowledgeService.ts # Guide & tutorial retrieval
│   │   └── autopilotService.ts # Workflow generation & validation
│   ├── types/
│   │   └── index.ts            # Shared TypeScript interfaces & types
│   ├── utils/
│   │   └── cn.ts               # Classname merge utility
│   ├── App.tsx                 # Root application wrapper
│   ├── main.tsx                # React DOM entry point
│   └── index.css               # Tailwind CSS styles
├── package.json                # Dependencies and build scripts
├── vite.config.ts              # Vite config with Tailwind & Singlefile plugins
├── tsconfig.json               # TypeScript configuration
├── README.md                   # Quickstart instructions
└── SOLUTION_DOCUMENT.md        # Comprehensive Solution Document (This file)
```
