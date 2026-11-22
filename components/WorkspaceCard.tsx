
import Image from "next/image";
import Link from "next/link";
import { LayoutGrid, ArrowUpRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { WorkspaceStatus } from "@/lib/generated/prisma/enums";
import { statusTitle } from "@/lib/workspace-status";

export type WorkspaceCardData = {
  id: string;
  name: string;
  description: string | null;
  status: WorkspaceStatus;
  lastActivity: Date;
  creator: { name: string | null; imageUrl: string | null };
};

export function WorkspaceCard({
  workspace,
  showStatus = false,
  highlighted = false,
  actions,
}: {
  workspace: WorkspaceCardData;
  showStatus?: boolean;
  highlighted?: boolean;
  actions?: React.ReactNode;
}) {
  return (
    <div
      className={`group relative flex h-36 flex-col gap-1 overflow-hidden rounded-xl border bg-gradient-to-br from-[#102D20]/95 via-[#0C241A]/95 to-[#0A1C16]/95 p-3.5 shadow-[0_8px_25px_rgba(0,0,0,0.18)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-emerald-400/40 hover:shadow-[0_12px_35px_rgba(16,185,129,0.13)] ${
        highlighted
          ? "border-emerald-400/50 shadow-[0_0_25px_rgba(16,185,129,0.14)]"
          : "border-emerald-400/10"
      }`}
    >
      {/* Subtle emerald glow on hover */}
      <div className="pointer-events-none absolute -right-16 -top-20 size-44 rounded-full bg-emerald-400/[0.07] opacity-0 blur-[55px] transition-opacity duration-500 group-hover:opacity-100" />

      {/* Cyan accent */}
      <div className="pointer-events-none absolute -bottom-20 -left-12 size-40 rounded-full bg-cyan-400/[0.045] opacity-0 blur-[55px] transition-opacity duration-500 group-hover:opacity-100" />

      <Link
        href={`/workspace/${workspace.id}`}
        draggable={false}
        className="relative z-10 line-clamp-2 pr-7 text-sm leading-snug font-semibold text-emerald-50 transition-colors duration-300 after:absolute after:inset-0 group-hover:text-white"
      >
        {workspace.name}
      </Link>

      <ArrowUpRight className="pointer-events-none absolute right-3.5 top-3.5 size-4 text-emerald-400/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald-300" />

      {workspace.description && (
        <p className="relative z-10 line-clamp-2 text-xs leading-relaxed text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
          {workspace.description}
        </p>
      )}

      <div className="relative z-10 mt-auto flex items-center justify-between gap-2 text-[11px] text-slate-400">
        <span className="flex min-w-0 items-center gap-1.5" suppressHydrationWarning>
          <LayoutGrid className="size-3.5 shrink-0 text-emerald-400" />
          <span className="truncate" suppressHydrationWarning>
            {showStatus && `${statusTitle(workspace.status)} · `}
            {formatDistanceToNow(workspace.lastActivity, { addSuffix: true })}
          </span>
        </span>

        <CreatorAvatar creator={workspace.creator} />
      </div>

      {actions}
    </div>
  );
}

function CreatorAvatar({ creator }: { creator: WorkspaceCardData["creator"] }) {
  const name = creator.name ?? "Unknown";

  return creator.imageUrl ? (
    <Image
      src={creator.imageUrl}
      alt={name}
      title={name}
      width={20}
      height={20}
      className="size-5 shrink-0 rounded-full ring-1 ring-emerald-400/20"
    />
  ) : (
    <span
      title={name}
      className="flex size-5 shrink-0 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10 text-[10px] font-medium text-emerald-200"
    >
      {name.charAt(0).toUpperCase()}
    </span>
  );
}
