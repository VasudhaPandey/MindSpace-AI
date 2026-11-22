# MindSpace AI

### Where ideas find their space to grow.

**MindSpace AI** is an AI-powered collaborative workspace where ideas turn into structured work. Interact with an AI agent that can create and edit content across an interactive canvas and document editor, while collaborating with your team in real time.

## Overview

MindSpace AI brings AI assistance, visual planning, documentation, and real-time collaboration together in one workspace.

Instead of switching between multiple tools, users can describe what they want to create and let the AI agent help organize their ideas across the canvas and document.

## Features

- **AI-powered workspace:** Interact with an AI agent that works across the canvas and document editor.
- **Interactive canvas:** Create and edit diagrams, including ERD tables with editable columns, primary and foreign key badges, and connecting arrows.
- **Collaborative documents:** Write and edit documents using a block-based editor with real-time collaboration.
- **Live collaboration:** Work alongside other users with synchronized canvas updates, document edits, and live cursors.
- **AI-assisted workspace creation:** Describe what you want to work on using text or voice and create a new workspace.
- **Workspace dashboard:** Organize and access your workspaces through a dashboard and Kanban board with drag-and-drop functionality.
- **Team workspaces:** Collaborate through Clerk Organizations.
- **Sharing and export:** Share read-only workspace links and export documents and canvases as PDFs.
- **Subscription management:** Support for plans, usage tracking, and feature limits through Clerk Billing.

## Tech Stack

| Area | Technology |
|---|---|
| Framework | Next.js (App Router, Server Actions) |
| Frontend | React, TypeScript |
| Authentication and Organizations | Clerk |
| Database and Realtime | Supabase (PostgreSQL and Realtime) |
| ORM | Prisma |
| AI Integration | Vercel AI SDK and Google Gemini |
| Interactive Canvas | tldraw |
| Document Editor | BlockNote |
| Real-time Document Sync | Yjs |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |

## Getting Started

### Prerequisites

- Node.js 22 or later
- npm
- A Clerk account
- A Supabase account
- A Google AI Studio account

### 1. Clone the repository

Replace `YOUR-GITHUB-USERNAME` with your GitHub username.

```bash
git clone https://github.com/YOUR-GITHUB-USERNAME/MindSpace-AI.git
cd MindSpace-AI
```

### 2. Install dependencies

```bash
npm install
```

This also generates the Prisma client.

### 3. Configure environment variables

Create your local environment file from the example:

**Windows PowerShell:**
```powershell
Copy-Item .env.example .env
```

**macOS / Linux:**
```bash
cp .env.example .env
```

Add your credentials to `.env`.

| Variable | Source |
|---|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk Dashboard → API Keys |
| `CLERK_SECRET_KEY` | Clerk Dashboard → API Keys |
| `DATABASE_URL` | Supabase → Connect → Pooled connection (port 6543) |
| `DIRECT_URL` | Supabase → Connect → Direct connection (port 5432) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase → Project Settings → API |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Google AI Studio → API Keys |
| `NEXT_PUBLIC_TLDRAW_LICENSE_KEY` | Optional during development; see deployment instructions |

Never commit your `.env` file or expose your API keys.

### 4. Set up the database

Create and apply the database tables using Prisma migrations:

```bash
npx prisma migrate deploy
```

### 5. Configure Clerk

In your [Clerk Dashboard](https://dashboard.clerk.com):

1. Enable Organizations.
2. Set organization membership to optional so users can work with personal accounts.
3. Configure Clerk Billing if you intend to use subscriptions.
4. Configure the subscription plans and feature keys used by the application.

The application uses the following feature keys:

| Feature key | Purpose |
|---|---|
| `unlimited_workspaces` | Removes the three-workspace limit |
| `public_sharing` | Enables public read-only sharing |
| `pdf_export` | Enables PDF export |
| `agent_prompts_500` | 500 agent prompts per seat per month |
| `agent_prompts_2000` | 2,000 agent prompts per seat per month |

The original plan configuration uses Free, Pro, Team, and Enterprise plans. Review the application's billing configuration before enabling real payments.

### 6. Configure Supabase Realtime

Document collaboration uses public Supabase Realtime broadcast channels.

Make sure public, non-private Realtime channels are allowed in your Supabase project settings.

### 7. Run the application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To test collaboration, sign in using two different accounts in separate browser windows.

## Project Structure

```text
app/
  page.tsx
  (main)/dashboard/
  (main)/workspaces/
  (main)/workspace/[id]/
  shared/[token]/
  api/agent/

actions/
components/
hooks/
lib/
prisma/
tldraw-sync/
```

- `app/` — Application routes and pages.
- `actions/` — Server Actions for workspace, document, canvas, and usage operations.
- `components/` — Shared UI components.
- `hooks/` — Custom hooks for AI chat and collaboration.
- `lib/` — AI agent tools, canvas and document operations, billing, and plan limits.
- `prisma/` — Database schema and migrations.
- `tldraw-sync/` — Canvas synchronization server.

## How the AI Agent Works

The AI agent uses Google Gemini through the Vercel AI SDK.

It can work across the canvas and document editor using tools selected by the model. These tools execute in the browser against the active editors, allowing collaborators to see changes in real time.

Each request includes a compact summary of both surfaces so the agent can work with existing content.

## Deployment

### Canvas synchronization server

Deploy the canvas synchronization server and configure `NEXT_PUBLIC_TLDRAW_SYNC_URL` with the deployed URL.

```bash
cd tldraw-sync
npm install
npx wrangler login
npm run deploy
```

### Next.js application

1. Deploy the application using [Vercel](https://vercel.com).
2. Add the required environment variables to your deployment settings.
3. Configure the deployed canvas synchronization URL.
4. Obtain a tldraw production license from [tldraw.dev](https://tldraw.dev/pricing) and configure `NEXT_PUBLIC_TLDRAW_LICENSE_KEY`.
5. Connect your own Stripe account through Clerk Billing before accepting real payments.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npm run seed -- you@email.com [org_id]` | Add demo workspaces |

After modifying `prisma/schema.prisma`, create and apply a migration, run `npx prisma generate`, and restart the development server.

## Credits

MindSpace AI builds upon the original open-source workspace project and its implementation concepts.

Original tutorial by **Roadside Coder**:

[Watch the original tutorial](https://youtu.be/vNXrFMSAsOA)

The original project and its dependencies retain their applicable licenses and attribution.

## License

This project is licensed under the **GNU General Public License v3.0 (GPL-3.0)**.

See the [LICENSE](LICENSE) file for details.

The original project includes the BlockNote PDF exporter, which is GPL-3.0 licensed. Review the applicable licensing terms before distributing modified versions or using the project in a closed-source product.