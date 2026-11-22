# MindSpace AI

### Where ideas find their space to grow.

**MindSpace AI** is an AI-powered collaborative workspace that helps turn ideas into structured work. It brings together an AI workspace agent, an interactive visual canvas, a rich-text document editor, and real-time collaboration in one connected environment.

Instead of switching between separate tools, users can describe what they want to create and let the AI agent help organize and develop their ideas across the canvas and document.

## ✨ Features

- **AI Workspace Agent** — Use natural language to create, update, and organize content across your workspace.
- **Interactive Canvas** — Build diagrams, flowcharts, and visual representations on an interactive infinite canvas.
- **Entity Relationship Diagrams** — Create database entity tables, manage columns, mark primary and foreign keys, and connect relationships.
- **Rich-text Documents** — Create and edit structured documents using a block-based editor.
- **Real-time Collaboration** — Work together with synchronized document updates, canvas changes, and live cursors.
- **AI-assisted Workspace Creation** — Describe your idea using text or voice to get started with a workspace.
- **Workspace Dashboard** — Organize workspaces using a dashboard and drag-and-drop Kanban board.
- **Team Collaboration** — Collaborate through Clerk Organizations and workspace access controls.
- **Workspace Sharing** — Share read-only workspace views through shareable links.
- **PDF Export** — Export documents and canvases as PDF files.
- **Usage and Subscription Management** — Track AI prompt usage and manage plan-based feature limits.

## 🛠️ Tech Stack

| Area | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Frontend | React 19, TypeScript |
| Authentication | Clerk |
| Database | PostgreSQL (Supabase) |
| ORM | Prisma |
| AI Integration | Google Gemini, Vercel AI SDK |
| Interactive Canvas | tldraw |
| Document Editor | BlockNote |
| Real-time Collaboration | Yjs, Supabase Realtime |
| UI and Styling | Tailwind CSS, shadcn/ui |
| Canvas Synchronization | Cloudflare Workers, tldraw Sync |

## 🚀 Getting Started

Follow these steps to run MindSpace AI locally.

### Prerequisites

- Node.js 22 or later
- npm
- A [Clerk](https://clerk.com/) account
- A [Supabase](https://supabase.com/) project
- A [Google AI Studio](https://aistudio.google.com/) API key

### 1. Clone the repository

```bash
git clone https://github.com/VasudhaPandey/MindSpace-AI.git
cd MindSpace-AI
```

### 2. Install dependencies

```bash
npm install
```

The post-install script generates the Prisma Client.

### 3. Configure environment variables

Create a `.env` file in the root directory of the project.

Add the following variables and replace the placeholder values with your own credentials:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Supabase PostgreSQL Database
DATABASE_URL=
DIRECT_URL=

# Supabase Realtime
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=

# Google Gemini API
GOOGLE_GENERATIVE_AI_API_KEY=

# tldraw
NEXT_PUBLIC_TLDRAW_SYNC_URL=
NEXT_PUBLIC_TLDRAW_LICENSE_KEY=
```

**Where to find the credentials:**

| Variable | Source |
|---|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk Dashboard → API Keys |
| `CLERK_SECRET_KEY` | Clerk Dashboard → API Keys |
| `DATABASE_URL` | Supabase → Connect → Pooled connection |
| `DIRECT_URL` | Supabase → Connect → Direct connection |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase → Project Settings → API |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Google AI Studio → API Keys |
| `NEXT_PUBLIC_TLDRAW_SYNC_URL` | URL of your deployed tldraw synchronization worker |
| `NEXT_PUBLIC_TLDRAW_LICENSE_KEY` | tldraw production license; optional during local development |

Keep your `.env` file private. Never commit API keys, database credentials, or other secrets to GitHub.

### 4. Set up the database

After configuring your Supabase database connection, apply the Prisma migrations:

```bash
npx prisma migrate deploy
```

### 5. Configure Clerk

In your [Clerk Dashboard](https://dashboard.clerk.com/):

1. Enable Organizations.
2. Allow organization membership to be optional if users should also be able to work with personal accounts.
3. Configure Clerk Billing if you want to enable subscriptions.
4. Configure the subscription plans and feature keys used by the application.

The application uses these feature keys:

| Feature Key | Purpose |
|---|---|
| `unlimited_workspaces` | Removes the default workspace limit |
| `public_sharing` | Enables public read-only sharing |
| `pdf_export` | Enables PDF export |
| `agent_prompts_500` | Allows 500 AI prompts per seat per month |
| `agent_prompts_2000` | Allows 2,000 AI prompts per seat per month |

Review the billing configuration before enabling real payments.

### 6. Configure Supabase Realtime

Document collaboration uses Supabase Realtime broadcast channels.

Make sure your Supabase project allows the public, non-private Realtime channels required by the application.

### 7. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To test collaboration, sign in with two different accounts in separate browser windows.

## 🖥️ Canvas Synchronization Server

MindSpace AI includes a separate tldraw synchronization service in the `tldraw-sync` directory.

For collaborative canvas functionality in a deployed environment, deploy this service using Cloudflare Workers.

```bash
cd tldraw-sync
npm install
npx wrangler login
npm run deploy
```

Configure `NEXT_PUBLIC_TLDRAW_SYNC_URL` in the main application's environment with the deployed worker URL.

## 📁 Project Structure

```text
MindSpace-AI/
├── actions/              # Server actions
├── app/                  # Next.js application routes
│   ├── (auth)/            # Authentication pages
│   ├── (main)/            # Dashboard and workspace pages
│   ├── api/               # API routes
│   └── shared/            # Shared workspace views
├── components/            # Reusable UI components
├── hooks/                 # Custom React hooks
├── lib/                   # AI tools and application logic
├── prisma/                # Database schema and migrations
├── public/                # Static assets
├── tldraw-sync/            # Canvas synchronization service
├── package.json
└── README.md
```

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npm run seed -- user@email.com` | Seed demo workspaces |

After modifying `prisma/schema.prisma`, create and apply the appropriate database migration, regenerate the Prisma Client, and restart the development server.

## ☁️ Deployment

The application and canvas synchronization service are deployed separately.

**Next.js application**
1. Deploy the application using [Vercel](https://vercel.com/).
2. Configure the required environment variables.
3. Connect your Supabase database and Clerk application.
4. Configure the deployed canvas synchronization URL.
5. Set up the required tldraw production license.

**Canvas synchronization**
1. Deploy the `tldraw-sync` service using Cloudflare Workers.
2. Configure the worker URL in the main application's environment variables.

Configure your own Clerk Billing and payment provider before accepting real payments.

## 🙌 Credits

MindSpace AI builds upon an existing open-source workspace project and its implementation concepts.

Original tutorial by **Roadside Coder**:

[Watch the original tutorial](https://youtu.be/vNXrFMSAsOA)

The original project and its dependencies retain their applicable licenses and attribution.

## 📄 License

This project is licensed under the **GNU General Public License v3.0 (GPL-3.0)**.

See the [LICENSE](LICENSE) file for details.
