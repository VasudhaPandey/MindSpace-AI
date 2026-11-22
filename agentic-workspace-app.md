# MindSpace AI — Academic Project Documentation

## 1. Project Overview

**Project Name:** MindSpace AI  
**Project Category:** Agentic Workspace Application  
**Tagline:** Where ideas find their space to grow.

MindSpace AI is an AI-powered collaborative workspace that helps users organize ideas, create visual diagrams, and develop structured documentation through natural-language interaction.

The application combines two primary working environments:

- **Canvas:** An interactive, infinite whiteboard where users can create diagrams, flowcharts, entity-relationship diagrams, and other visual structures.
- **Documents:** A block-based document editor where users can write, organize, and refine structured content.

An integrated AI agent assists users across both environments. It can create and modify canvas elements, draft and update documents, and transfer information between the two surfaces.

The goal is to provide a unified workspace in which users can move from an initial idea to a visual representation and supporting documentation without switching between separate applications.

## 2. Problem Statement

Traditional productivity applications often separate visual planning, diagram creation, and document writing into different tools.

This separation can create several difficulties:

- Users must switch between applications to manage related information.
- Visual diagrams and written documentation can become disconnected.
- Manually creating and updating diagrams can be time-consuming.
- Users may need technical knowledge to create structured visual representations.
- Collaborating on multiple types of workspace content can require separate tools.

MindSpace AI addresses these problems by combining a collaborative canvas, document editor, and AI agent within one application.

## 3. Project Objectives

The primary objectives of MindSpace AI are:

1. Develop an integrated workspace containing both a visual canvas and a document editor.
2. Implement an AI agent that understands natural-language instructions.
3. Enable the agent to create and modify diagrams through individual canvas operations.
4. Allow the agent to generate, update, and summarize document content.
5. Support information transfer between the canvas and document editor.
6. Provide real-time collaboration and presence indicators.
7. Implement authentication and organization-based workspace access.
8. Provide workspace management, sharing, and document export.
9. Implement usage limits and subscription-based access control.
10. Develop a responsive and accessible user interface.

## 4. System Scope and Major Modules

### 4.1 Workspace Management

The application provides a centralized dashboard for managing workspaces.

Features include:

- Creating new workspaces.
- Renaming and deleting workspaces.
- Organizing workspaces by status.
- Viewing recently active workspaces.
- Managing personal and organization-based workspaces.
- Opening the canvas and document editor within a workspace.

Each workspace contains one document and one canvas.

### 4.2 Canvas Module

The canvas is an infinite visual workspace built using the tldraw SDK.

Features include:

- Creating rectangles, ellipses, text, and arrows.
- Drawing and editing visual elements.
- Connecting shapes.
- Creating flowcharts and architecture diagrams.
- Creating entity-relationship diagrams.
- Updating and deleting existing shapes.
- Saving canvas content.
- Supporting multiple collaborators and live cursors.

The AI agent can create diagrams from natural-language instructions. Instead of generating an entire diagram as a single image, it performs individual operations on the canvas, allowing users to observe and modify the resulting elements.

### 4.3 Document Module

The document editor is built using BlockNote.

Features include:

- Creating and editing structured documents.
- Adding headings, paragraphs, lists, checklists, tables, and code blocks.
- Drafting document content through AI instructions.
- Rewriting existing content.
- Summarizing documents.
- Updating or deleting individual document blocks.
- Real-time document collaboration.

The agent can also use information from the canvas to generate supporting written documentation.

### 4.4 AI Agent Module

The AI agent is the central intelligent component of MindSpace AI.

It accepts natural-language instructions and determines which workspace operations are required.

Examples include:

- Creating a marketing funnel diagram.
- Generating a software architecture diagram.
- Creating an entity-relationship diagram.
- Drafting a technical specification.
- Summarizing an existing document.
- Converting a canvas diagram into written documentation.
- Creating a diagram based on existing document content.

The agent can operate on the canvas, the document editor, or both, depending on the user's request.

### 4.5 Dashboard

The dashboard provides access to the user's workspaces.

It includes:

- A natural-language workspace prompt.
- Recently active workspaces.
- A workspace creation option.
- Navigation to the complete workspace board.
- Access to the user's account and subscription information.

Submitting a prompt creates a workspace and opens it with the agent ready to process the initial instruction.

### 4.6 Workspace Board

The workspace board provides a Kanban-style view of workspaces.

It contains four columns:

1. Planning
2. In Progress
3. In Review
4. Done

Users can move workspace cards between columns and reorder them within a column.

Each workspace stores its status, description, and position.

The board is intended for workspace organization rather than AI-managed task execution.

### 4.7 Collaboration Module

MindSpace AI supports collaboration between members of a workspace.

Features include:

- Real-time canvas synchronization.
- Live document synchronization.
- Collaborator cursors and presence indicators.
- Organization-based access.
- Public read-only workspace sharing.
- Shared document and canvas viewing.

Canvas synchronization uses tldraw sync, while document synchronization uses Yjs with Supabase Realtime.

### 4.8 Authentication and Subscription Management

The application uses Clerk for authentication and organization management.

The subscription module provides:

- Personal accounts.
- Organization-based accounts.
- Free and paid subscription plans.
- Usage tracking.
- Workspace limits.
- Public sharing restrictions.
- PDF export restrictions.
- Subscription management and upgrade options.

## 5. Application Routes

| Route | Description |
|---|---|
| `/` | Landing page |
| `/sign-in` | User authentication |
| `/sign-up` | User registration |
| `/dashboard` | Dashboard and recent workspaces |
| `/workspaces` | Workspace Kanban board |
| `/workspace/[id]` | Main workspace containing the document editor, canvas, and AI agent |
| `/shared/[token]` | Public read-only workspace view |
| `/api/agent` | AI agent API endpoint |

## 6. System Architecture

MindSpace AI follows a full-stack web application architecture.

### 6.1 Frontend

The frontend is developed using Next.js with the App Router and React.

It handles:

- User interface rendering.
- Authentication-aware navigation.
- Workspace interactions.
- Canvas and document editing.
- AI chat interactions.
- Real-time collaboration interfaces.
- Subscription and usage displays.

### 6.2 Backend

The backend functionality is implemented through Next.js Server Actions and API routes.

Responsibilities include:

- User synchronization.
- Workspace creation and management.
- Database operations.
- AI agent requests.
- Usage-limit verification.
- Subscription and entitlement checks.
- Saving document and canvas content.
- Public sharing validation.

### 6.3 Database

Supabase provides PostgreSQL database infrastructure.

Prisma ORM is used for database schema management and data access through the PostgreSQL adapter.

### 6.4 AI Integration

Gemini is integrated through the Vercel AI SDK.

The AI agent uses structured tools to interact with the canvas and document editor.

### 6.5 Real-Time Infrastructure

Two synchronization mechanisms are used:

- **Canvas:** tldraw sync through a Cloudflare Worker.
- **Documents:** Yjs collaboration through Supabase Realtime.

### 6.6 High-Level Architecture Flow

1. A user signs in through Clerk.
2. The application identifies the user's personal or organization workspace context.
3. Workspace information is retrieved from Supabase through Prisma.
4. The user interacts with the canvas, document editor, or AI agent.
5. AI requests are processed through the backend and Gemini.
6. The agent invokes structured operations on the appropriate editor.
7. Changes are synchronized with other collaborators.
8. Document and canvas data are persisted in PostgreSQL.

## 7. Technology Stack

| Layer | Technology |
|---|---|
| Frontend framework | Next.js (App Router) |
| UI library | React |
| Programming language | TypeScript |
| Canvas | tldraw SDK |
| Document editor | BlockNote |
| AI model | Google Gemini |
| AI integration | Vercel AI SDK |
| Authentication | Clerk |
| Organization management | Clerk Organizations |
| Database | Supabase PostgreSQL |
| ORM | Prisma |
| Database adapter | `@prisma/adapter-pg` |
| Canvas synchronization | tldraw sync |
| Canvas sync hosting | Cloudflare Workers |
| Document synchronization | Yjs |
| Real-time messaging | Supabase Realtime |
| File storage | Supabase Storage |
| Styling | Tailwind CSS |
| UI components | shadcn/ui |
| Notifications | Sonner |
| Payments | Clerk Billing |
| PDF generation | BlockNote PDF exporter and jsPDF |
| Deployment | Vercel |

## 8. AI Agent Architecture

### 8.1 Agent Design

The AI agent uses fine-grained tools rather than a single operation that generates an entire workspace.

Each tool represents an individual action, allowing the agent to build and modify workspace content incrementally.

The agent can:

- Inspect the current canvas state.
- Inspect the current document state.
- Create new shapes.
- Modify existing shapes.
- Delete shapes.
- Add or update document blocks.
- Convert information between the canvas and document editor.

### 8.2 Context Management

Before each agent invocation, the backend provides the current workspace context.

Canvas context includes:

- Shape identifiers.
- Shape types.
- Labels.
- Positions.
- Entity-table information and columns.

Document context includes:

- Block identifiers.
- Block types.
- Document content represented in Markdown.

This allows the agent to work with existing workspace content rather than relying on identifiers or information it has not received.

### 8.3 Canvas Tools

The canvas tools include:

- `createRectangle`
- `createEllipse`
- `createText`
- `createArrow`
- `updateShape`
- `deleteShape`
- `createEntityTable`
- `addColumn`
- `updateColumn`
- `removeColumn`
- `connectRelationship`

New shapes receive caller-assigned identifiers so that subsequent operations can reference them.

### 8.4 Document Tools

The document tools include:

- `insertDocContent`
- `updateDocBlock`
- `deleteDocBlocks`
- `replaceDoc`

The agent generates Markdown content, which is converted into BlockNote document blocks.

### 8.5 Tool Execution

The tool definitions and validation schemas are maintained in `lib/agent-tools.ts`.

The backend API route is `app/api/agent/route.ts`.

The browser executes editor operations through:

- `lib/agent-canvas.ts`
- `lib/agent-doc.ts`
- `hooks/use-workspace-agent-chat.ts`

The tool execution system returns success or error information to the agent.

### 8.6 Agent Cursor and Visual Feedback

A key interaction design is to make AI operations visible on the canvas.

The intended behavior is to display an agent identity and cursor while it performs diagram operations.

The cursor can communicate activity such as:

- Thinking.
- Drawing a rectangle.
- Creating a connection.
- Updating a diagram.

The objective is to make AI-assisted editing understandable and observable rather than presenting only the final generated result.

## 9. Canvas Synchronization Architecture

The canvas uses tldraw's synchronization system.

A dedicated Cloudflare Worker is maintained in the `tldraw-sync/` directory.

### 9.1 Synchronization Flow

The client connects to:

`/connect/[roomId]`

The Worker routes each room to a SQLite-backed Durable Object called `TldrawRoom`.

The Durable Object uses `TLSocketRoom` from `@tldraw/sync-core` to manage room synchronization and persistence.

### 9.2 Asset Handling

Canvas images are stored within the synchronized room using `inlineBase64AssetStore`.

This avoids requiring an additional R2 storage bucket for the current implementation.

### 9.3 Custom Shape Registration

The application includes a custom entity-table shape.

The synchronization server must register the corresponding shape properties and bindings so that custom shapes are validated correctly.

The server-side shape definition must remain consistent with:

`components/EntityTable/EntityTableShape.ts`

### 9.4 Version Compatibility

The following packages must remain compatible with the application's installed tldraw version:

- `@tldraw/sync-core`
- `@tldraw/tlschema`
- `@tldraw/validate`

### 9.5 Canvas Persistence

The application also saves canvas snapshots to PostgreSQL.

This provides a backup and allows the application to restore an empty synchronization room using the previously saved canvas content.

### 9.6 Access Control Consideration

Room access validation is an important security requirement.

The Worker should verify the user's Clerk session and organization membership before accepting a WebSocket connection.

Room identifiers should not be treated as a substitute for authorization.

## 10. Document Collaboration Architecture

The document editor uses BlockNote's Yjs collaboration capabilities.

### 10.1 Synchronization

`CollaborationExtension` from `@blocknote/core/yjs` manages collaborative document updates and cursor information.

A custom provider is implemented in:

`lib/supabase-yjs-provider.ts`

It uses Supabase Realtime broadcast channels.

Each document has its own channel:

`doc:[workspaceId]`

### 10.2 Persistence

Each client saves its own document changes after a debounce period.

The backend merges incoming Yjs state into `Doc.yjsState` inside a row-locked database transaction.

A readable JSON representation is also maintained in `Doc.content`.

This readable representation supports server-side functionality, including AI processing and shared workspace viewing.

### 10.3 Existing Documents

Documents created before Yjs collaboration support may contain only JSON content.

When such a document is opened, its existing content is imported into the collaborative document.

### 10.4 Security Consideration

Realtime collaboration channels must be protected.

For production use, private channels and Supabase Realtime Authorization should be implemented with appropriate policies on `realtime.messages`.

Users should authenticate their Supabase connections using their Clerk session identity.

## 11. Database Design

The application uses Supabase PostgreSQL with Prisma ORM.

Organization membership and roles are managed through Clerk Organizations rather than separate local membership tables.

### 11.1 Database Models

| Model | Important Fields | Purpose |
|---|---|---|
| `User` | `clerkId`, `email`, `name`, `imageUrl` | Local representation of an authenticated Clerk user |
| `Workspace` | `name`, `description`, `creatorId`, `clerkOrgId`, `status`, `position`, `shareToken` | Stores workspace information and ownership |
| `Doc` | `workspaceId`, `yjsState`, `content` | Stores document content and collaboration state |
| `Canvas` | `workspaceId`, `content` | Stores the latest canvas snapshot |
| `AgentPrompt` | `ownerId`, `userId`, `workspaceId`, `createdAt` | Tracks AI prompt usage |

### 11.2 Relationships

- A user can create multiple workspaces.
- A workspace belongs to its creator and may belong to a Clerk organization.
- Each workspace has one associated document.
- Each workspace has one associated canvas.
- Agent prompt records track usage by the relevant workspace owner.
- Deleting a workspace removes its associated document and canvas.
- Agent prompt records are retained so deleting a workspace cannot reset usage counts.

### 11.3 Workspace Status

The `WorkspaceStatus` enum contains:

- `PLANNING`
- `IN_PROGRESS`
- `IN_REVIEW`
- `DONE`

The `position` field determines the card's ordering within a board column.

### 11.4 Database Migrations

The database migration history includes:

1. Initial user and workspace tables.
2. Migration to Clerk organization-based workspaces.
3. Document and canvas workspace models.
4. Workspace board status and position.
5. Workspace review status and descriptions.
6. Yjs document state.
7. Workspace public-sharing tokens.
8. AI prompt usage tracking.
9. Removal of the unused local user plan field.

### 11.5 Migration Workflow

When interactive migration generation is unavailable, migration SQL can be generated using Prisma's migration diff functionality.

The generated SQL should be reviewed, saved in a new migration directory, and applied using `prisma migrate deploy`.

After schema changes, regenerate Prisma Client and restart the development server.

## 12. Data Access and Server Actions

The application follows a Server-Actions-first data access approach.

Server Components are used for server-side reads, while Server Actions handle mutations.

Examples include:

- Creating workspaces.
- Renaming workspaces.
- Deleting workspaces.
- Updating workspace status.
- Saving document content.
- Saving canvas snapshots.
- Inviting workspace members.

The application does not require a separate client-side fetching and caching library for these operations.

Streaming AI responses and real-time editor updates are handled through their respective synchronization mechanisms.

### 12.1 Mutation Handling

A reusable `useFetch` hook provides a consistent way to manage Server Action requests from client components.

It maintains:

- Response data.
- Loading state.
- Error state.
- An execution function.
- A data setter.

Errors are displayed through Sonner notifications.

This approach is intended for individual request-and-response operations rather than streaming AI or collaboration state.

## 13. Authentication and Subscription Management

Clerk handles user authentication and organization management.

Clerk Billing manages personal and organization subscriptions.

### 13.1 Subscription Plans

The planned subscription structure includes:

| Account Type | Plan | Pricing |
|---|---|---|
| Personal | Free | Free |
| Personal | Pro | $12/month |
| Organization | Free | Free |
| Organization | Team | $12/member/month |
| Organization | Enterprise | $25/member/month |

These are the configured design values and should be verified against the live Clerk Billing dashboard before production use.

### 13.2 Entitlements

Subscription entitlements include:

- `unlimited_workspaces`
- `public_sharing`
- `pdf_export`
- `agent_prompts_500`
- `agent_prompts_2000`

The free plans have display limits for workspace count and AI prompts.

### 13.3 Usage Limits

The planned limits include:

- 20 AI prompts per month on free plans.
- 500 prompts per member per month on eligible paid plans.
- 2,000 prompts per member per month on the Enterprise plan.
- Three workspaces on free plans.
- Unlimited workspaces on eligible paid plans.

AI prompt usage is recorded in the `AgentPrompt` table.

Usage is counted per calendar month in UTC.

A prompt is recorded after Gemini successfully completes its response. Failed requests do not consume the allowance.

The `/api/agent` endpoint checks usage before invoking Gemini and returns HTTP 402 when the prompt limit is reached.

### 13.4 Workspace Ownership

Subscription checks use the workspace owner's subscription context.

For organization workspaces, the organization subscription is used.

For personal workspaces, the creator's personal subscription is used.

This ensures access checks do not depend on which organization is currently selected in the user's account switcher.

## 14. Workspace Sharing and PDF Export

### 14.1 Public Sharing

The application provides a Share dialog that allows eligible users to enable or disable public read-only access.

Enabling sharing generates a `Workspace.shareToken`.

The shared page is accessible through:

`/shared/[token]`

The shared page does not require authentication and displays saved document and canvas content in read-only mode.

The shared page is marked `noindex`.

Resetting the sharing token invalidates previously generated links.

### 14.2 Document PDF Export

Document PDF export uses BlockNote's PDF exporter with React PDF.

The export provides selectable text rather than a screenshot of the document.

The exporter is loaded when the user requests an export.

### 14.3 Canvas PDF Export

Canvas export uses tldraw to render the canvas into an image.

The image is then placed into a PDF using jsPDF.

Custom entity-table shapes are included through the applicable rendering fallback.

### 14.4 Export Limitations

The shared page reads saved copies of document and canvas data.

Because saving is debounced, very recent edits may not immediately appear on the shared page.

PDF exports use the live editor instances and therefore include the latest editor content.

## 15. Licensing and Third-Party Dependencies

MindSpace AI uses several third-party libraries and services. Their licenses and usage requirements must be respected.

### 15.1 tldraw

The tldraw SDK is source-available and has separate licensing requirements for production use.

The project uses a hobby license where applicable.

A valid license key must be configured for the deployed domain using:

`NEXT_PUBLIC_TLDRAW_LICENSE_KEY`

The license conditions, including production watermark requirements, must be checked against the applicable tldraw license agreement.

### 15.2 BlockNote

The core BlockNote library is licensed under MPL 2.0.

Some extended packages, including the PDF exporter, are licensed separately under GPL-3.0 or require a commercial license.

The project includes GPL-3.0 licensing because of the use of applicable GPL-licensed dependencies.

The repository must retain its `LICENSE` file and required third-party notices.

Anyone redistributing or modifying the project must comply with the applicable licenses.

### 15.3 Other Dependencies

The application also uses libraries and services with their own licensing terms, including:

- Next.js
- React
- Prisma
- Supabase
- Clerk
- Google Gemini
- Vercel AI SDK
- Yjs
- Tailwind CSS
- shadcn/ui
- jsPDF

Their licenses and service terms should be reviewed before commercial distribution.

## 16. Security and Reliability Considerations

The following areas are important for a production-ready implementation:

1. Verify user authentication for protected routes and Server Actions.
2. Validate workspace ownership and organization membership before accessing data.
3. Enforce access restrictions on shared workspace links.
4. Protect tldraw synchronization rooms with server-side authorization.
5. Secure Supabase Realtime collaboration channels.
6. Validate AI tool inputs before applying editor operations.
7. Enforce subscription and usage limits on the server rather than relying only on frontend controls.
8. Keep secret API keys in server-side environment variables.
9. Avoid exposing database credentials or private service keys to the browser.
10. Handle AI failures and synchronization interruptions without losing existing workspace content.

## 17. Deployment and Environment Configuration

The Next.js application is deployed through Vercel.

The tldraw synchronization server is deployed separately through Cloudflare Workers.

The application requires environment configuration for its external services.

Important variables include:

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | PostgreSQL connection |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk frontend configuration |
| `CLERK_SECRET_KEY` | Clerk server authentication |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase public client key |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Gemini API access |
| `NEXT_PUBLIC_TLDRAW_SYNC_URL` | Cloudflare canvas sync server |
| `NEXT_PUBLIC_TLDRAW_LICENSE_KEY` | tldraw production license |

Actual secret values must be stored securely in environment configuration and must not be committed to the public repository.

### 17.1 Canvas Sync Deployment

The synchronization Worker is maintained in:

`tldraw-sync/`

Its deployment configuration is maintained in:

`tldraw-sync/wrangler.toml`

The Worker name is:

`mindspace-ai-tldraw-sync`

After deployment, its URL must be configured through `NEXT_PUBLIC_TLDRAW_SYNC_URL`.

The application can use tldraw's public demo server as a development fallback when the custom synchronization URL is not configured. The demo server is not suitable for production because rooms may be public and temporary.

## 18. Current Development Considerations

The following items require additional verification or implementation before the application can be considered production-ready:

- Verify authentication and organization membership in the Cloudflare synchronization Worker.
- Configure private Supabase Realtime channels and authorization policies.
- Verify Clerk Billing plans and entitlements in the production dashboard.
- Confirm the tldraw license is valid for the deployed domain.
- Test workspace and document persistence.
- Test canvas synchronization across multiple users.
- Test document collaboration across multiple users.
- Test AI operations across both workspace surfaces.
- Verify subscription limits and access restrictions.
- Test public sharing and PDF export.
- Validate the application across desktop and mobile screen sizes.
- Complete any remaining visual and accessibility improvements.

These items should be marked complete only after implementation and testing.

## 19. Conclusion

MindSpace AI brings AI-assisted diagram creation, document editing, and collaborative workspace management together in a single application.

Its central feature is an AI agent capable of working across both visual and written content. By combining natural-language interaction with structured editor operations, the application aims to make planning, documentation, and collaboration more accessible and efficient.

The project demonstrates the integration of modern full-stack web technologies, AI tool execution, real-time collaboration, database persistence, authentication, and subscription management in one unified workspace.

**MindSpace AI — Where ideas find their space to grow.**