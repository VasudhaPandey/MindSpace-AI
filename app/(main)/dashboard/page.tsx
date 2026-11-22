
import { redirect } from "next/navigation";
import Link from "next/link";
import { KanbanSquare, Plus } from "lucide-react";
import { compareDesc } from "date-fns";
import { checkUser } from "@/actions/check-user";
import { prisma } from "@/lib/prisma";
import { getWorkspaceScope } from "@/lib/workspace-scope";
import { withLastActivity, workspaceCardSelect } from "@/lib/workspace-status";
import { Button } from "@/components/ui/button";
import { WorkspaceDialog } from "@/components/WorkspaceDialog";
import { RecentWorkspaces } from "./_components/RecentWorkspaces";
import { DashboardPrompt } from "./_components/DashboardPrompt";

const RECENT_COUNT = 4;

export default async function DashboardPage() {
  const user = await checkUser();
  if (!user) redirect("/sign-in");

  const { orgName, where } = await getWorkspaceScope(user.id);
  const workspaces = await prisma.workspace.findMany({
    where,
    select: workspaceCardSelect,
  });

  const recent = workspaces
    .map(withLastActivity)
    .sort((a, b) => compareDesc(a.lastActivity, b.lastActivity))
    .slice(0, RECENT_COUNT);

  return (
    <main className="relative isolate min-h-full overflow-hidden bg-transparent">
      {/* Additional ambient lighting */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 left-[15%] size-[480px] rounded-full bg-emerald-500/[0.09] blur-[130px]" />
        <div className="absolute right-[-10%] top-[20%] size-[420px] rounded-full bg-teal-400/[0.07] blur-[140px]" />
        <div className="absolute bottom-[-15%] left-[30%] size-[400px] rounded-full bg-cyan-500/[0.045] blur-[130px]" />
      </div>

      <div className="relative z-10 space-y-12 px-6 py-8 md:px-8 md:py-10">
        <DashboardPrompt />

        <section className="mx-auto max-w-6xl">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
                {orgName}
              </p>

              <h2 className="text-2xl font-semibold tracking-tight text-white">
                Recent workspaces
              </h2>

              <p className="text-sm text-slate-400">
                Pick up where you left off.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {workspaces.length > 0 && (
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="gap-2 rounded-lg border border-emerald-400/15 text-emerald-200 transition-all duration-300 hover:border-emerald-400/40 hover:bg-emerald-400/10 hover:text-emerald-100"
                >
                  <Link href="/workspaces">
                    <KanbanSquare className="size-4" />
                    View board ({workspaces.length})
                  </Link>
                </Button>
              )}

              <WorkspaceDialog
                trigger={
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 rounded-lg border-emerald-400/30 bg-emerald-400/[0.08] text-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.08)] transition-all duration-300 hover:border-emerald-300/60 hover:bg-emerald-400/15 hover:shadow-[0_0_22px_rgba(16,185,129,0.18)]"
                  >
                    <Plus className="size-4" />
                    New workspace
                  </Button>
                }
              />
            </div>
          </div>

          {workspaces.length === 0 ? (
            <div className="relative overflow-hidden rounded-2xl border border-dashed border-emerald-400/20 bg-gradient-to-br from-[#122B20]/80 via-[#10251C]/70 to-[#0D2119]/80 px-6 py-16 text-center shadow-[0_10px_40px_rgba(0,0,0,0.15)]">
              <div className="pointer-events-none absolute -right-16 -top-24 size-64 rounded-full bg-emerald-400/[0.07] blur-[70px]" />

              <div className="relative mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.08] shadow-[0_0_25px_rgba(16,185,129,0.12)]">
                <KanbanSquare className="size-6 text-emerald-300" />
              </div>

              <p className="relative text-base font-medium text-slate-200">
                Your workspace journey starts here.
              </p>

              <p className="relative mt-2 text-sm text-slate-400">
                Describe what you want to plan above to create your first
                workspace.
              </p>
            </div>
          ) : (
            <RecentWorkspaces workspaces={recent} />
          )}
        </section>
      </div>
    </main>
  );
}
