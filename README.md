# Cheerio Assist

Clickable frontend prototype of an AI-powered support and setup assistant for Cheerio.

**Tagline:** Get unstuck. Fix it step by step.

This is a Product Intern assessment prototype. Diagnoses, tutorials, tickets, and Autopilot execution are simulated in the browser. Nothing inspects a live Cheerio account or sends a real WhatsApp message.

## Project structure

```text
src/
  App.tsx                  Application shell wiring
  context/AppContext.tsx   Shared session, language, tickets, Autopilot
  pages/                   Home/Assist, Troubleshooting, Tickets, Autopilot, Guides
  components/              Sidebar, chat, checklist, tutorial, workflow, modal
  services/                Troubleshooting, knowledge, Autopilot logic
  data/                    Demo content and English / Hindi copy
  types/                   Shared TypeScript types
```

UI components do not own business rules. Issue classification, diagnosis, tickets, and workflow proposals live in `src/services`.

## Main interactions

- Start from Home with text, a common issue, a screenshot, or simulated voice input
- Answer diagnostic questions as a conversation, and change previous answers
- View a labelled demo diagnosis and checklist
- Open a tutorial from a relevant timestamp and follow written steps
- Run a simulated resolution check, mark resolved, or escalate
- Create a support ticket with session context and a ticket ID
- Use Autopilot to draft, edit, reject, approve, and simulate a workflow
- Switch English / Hindi without resetting the conversation

## Known limitations

- No live Cheerio, WhatsApp, MCP, or speech APIs
- Tutorial timestamps and thumbnails are illustrative demo assets
- Tickets and Autopilot results exist only in this browser session
- Autopilot is proposed functionality, shown as a simulation

## Build

```bash
npm install
npm run build
```
# cheerio-support-assistant
