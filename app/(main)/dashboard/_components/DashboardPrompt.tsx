
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUp, Sparkles } from "lucide-react";
import { createWorkspace } from "@/actions/workspace";
import { useFetch } from "@/hooks/use-fetch";
import { Button } from "@/components/ui/button";
import { MicButton } from "@/components/MicButton";
import { useUpgradeDialog } from "@/components/UpgradeDialog";
import { UPGRADE_REASONS } from "@/lib/plan-limits";
import { submitOnEnter } from "@/lib/utils";

const MAX_NAME_LENGTH = 48;

const EXAMPLE_PROMPTS = [
  "Design a blog database and document each table",
  "Map out a user onboarding flow",
  "Plan the architecture for a chat app",
];

// "design a blog schema: users, posts..." -> "Design a blog schema: users, posts", cut on a word.
function nameFromPrompt(prompt: string) {
  const firstLine = prompt.trim().split("\n")[0];
  const name =
    firstLine.length <= MAX_NAME_LENGTH
      ? firstLine
      : firstLine.slice(0, MAX_NAME_LENGTH).replace(/\s+\S*$/, "");
  const clean = name.replace(/[\s.,:;!?-]+$/, "");
  return clean.charAt(0).toUpperCase() + clean.slice(1);
}

// Creates a workspace from the prompt and opens it; the workspace's agent sends the prompt
// as its first message (see AgentToggleButton).
export function DashboardPrompt() {
  const [prompt, setPrompt] = useState("");
  const router = useRouter();
  const { fn: createWorkspaceFn, loading } = useFetch(createWorkspace);
  const openUpgrade = useUpgradeDialog();
  const busy = loading ?? false;

  const handleSubmit = async () => {
    const trimmed = prompt.trim();
    if (!trimmed || busy) return;
    const result = await createWorkspaceFn(nameFromPrompt(trimmed), trimmed);
    if (!result) return;
    if ("limit" in result) return openUpgrade(UPGRADE_REASONS[result.limit]);
    router.push(`/workspace/${result.workspace.id}?prompt=${encodeURIComponent(trimmed)}`);
  };

  return (
    <section className="topo-bg relative isolate mx-auto mb-14 w-full max-w-5xl overflow-hidden rounded-[2rem] border border-emerald-400/15 bg-gradient-to-br from-[#173A29] via-[#102B20] to-[#0B2018] px-5 py-14 text-center shadow-[0_20px_70px_rgba(0,0,0,0.25)] md:px-10 md:py-16">

      {/* Ambient emerald and cyan lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-24 -top-32 size-80 rounded-full bg-emerald-400/[0.13] blur-[100px]" />
        <div className="absolute -right-20 top-0 size-80 rounded-full bg-cyan-400/[0.09] blur-[110px]" />
        <div className="absolute bottom-[-180px] left-[35%] size-96 rounded-full bg-teal-400/[0.08] blur-[110px]" />
      </div>

      <div className="relative mx-auto max-w-3xl">

        {/* Small label */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/[0.08] px-3.5 py-1.5 shadow-[0_0_20px_rgba(16,185,129,0.08)]">
          <Sparkles className="size-3.5 text-emerald-300" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-200">
            Your AI workspace starts here
          </span>
        </div>

        <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
          What are we{" "}
          <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent">
            planning today?
          </span>
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-300/80 md:text-base">
          Describe your idea, and let your AI agent turn it into structured
          documents and an interactive canvas.
        </p>

        {/* Prompt input */}
        <div className="group mx-auto mt-9 max-w-3xl rounded-[1.4rem] border border-emerald-300/20 bg-[#091A13]/90 p-3 text-left shadow-[0_15px_45px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-500 hover:border-emerald-300/35 hover:shadow-[0_0_25px_rgba(16,185,129,0.10),0_15px_45px_rgba(0,0,0,0.3)] focus-within:border-emerald-300/55 focus-within:shadow-[0_0_30px_rgba(16,185,129,0.13),0_15px_45px_rgba(0,0,0,0.3)]">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={submitOnEnter(handleSubmit)}
            placeholder="Describe what you'd like to create..."
            rows={2}
            disabled={busy}
            autoFocus
            className="field-sizing-content max-h-60 min-h-16 w-full resize-none bg-transparent px-3 pt-2 text-base leading-7 text-slate-100 outline-none placeholder:text-slate-500"
          />

          <div className="mt-2 flex items-center justify-between gap-2 border-t border-white/[0.07] pt-3">
            <span className="pl-2 text-[11px] text-slate-500">
              Shift + Enter for a new line
            </span>

            <div className="flex items-center gap-2">
              <MicButton
                value={prompt}
                onChange={setPrompt}
                disabled={busy}
                className="rounded-full border border-emerald-300/15 bg-emerald-300/[0.06] text-emerald-200 transition-all hover:border-emerald-300/40 hover:bg-emerald-300/10"
              />

              <Button
                size="icon"
                onClick={handleSubmit}
                disabled={!prompt.trim() || busy}
                aria-label="Create workspace"
                className="size-10 rounded-full border border-emerald-200/30 bg-gradient-to-br from-emerald-400 to-teal-500 text-[#062015] shadow-[0_0_18px_rgba(16,185,129,0.25)] transition-all duration-300 hover:scale-105 hover:from-emerald-300 hover:to-cyan-400 hover:shadow-[0_0_28px_rgba(16,185,129,0.4)] disabled:opacity-40"
              >
                <ArrowUp className="size-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Example prompts */}
        <div className="mx-auto mt-5 flex max-w-3xl flex-wrap justify-center gap-2">
          {EXAMPLE_PROMPTS.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => setPrompt(example)}
              disabled={busy}
              className="rounded-full border border-emerald-200/10 bg-white/[0.035] px-3.5 py-2 text-xs text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-300/40 hover:bg-emerald-300/[0.09] hover:text-emerald-100 hover:shadow-[0_0_18px_rgba(16,185,129,0.12)] disabled:opacity-40"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
