
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MapAnnotations } from "./_components/MapAnnotations";
import { PricingPlans } from "@/components/PricingPlans";
import { AUDIENCES, STEPS, SURFACES } from "./_data/landing";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-[#091610]">

      {/* HERO SECTION */}
      <section className="topo-bg relative isolate overflow-hidden border-b border-emerald-400/10 bg-gradient-to-b from-[#10271C] via-[#0C1D15] to-[#091610] px-6 pb-24 pt-10 md:px-10 md:pt-16">

        <div className="pointer-events-none absolute -left-40 top-0 -z-0 size-[500px] rounded-full bg-emerald-500/15 blur-[140px]" />
        <div className="pointer-events-none absolute -right-32 top-20 -z-0 size-[450px] rounded-full bg-teal-400/10 blur-[130px]" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 -z-0 h-64 w-[700px] -translate-x-1/2 rounded-full bg-green-500/10 blur-[110px]" />

        <div className="relative z-10">
          <MapAnnotations />

          <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
            <SectionLabel>Early access</SectionLabel>

            <h1 className="mt-2 max-w-3xl text-4xl font-semibold tracking-tight text-[#EAF5ED] md:text-6xl">
              An{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-green-300 to-teal-300 bg-clip-text text-transparent">
                outpost
              </span>{" "}
              for whatever you&apos;re building
            </h1>

            <p className="mt-6 max-w-xl text-lg text-[#B3C8B9]">
              Chat with an AI agent that draws on your canvas and writes your
              docs, while your whole team works alongside it in real time.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="gap-2 border border-emerald-300/20 bg-gradient-to-r from-[#087F5B] via-[#0B9B6A] to-[#20A879] text-base text-white shadow-lg shadow-emerald-900/40 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-xl hover:shadow-emerald-500/25"
              >
                <Link href="/sign-up">
                  Start building free <ArrowRight className="size-4" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-emerald-300/25 bg-[#163125]/70 text-base text-emerald-50 transition-all duration-300 hover:border-teal-300/50 hover:bg-[#204735] hover:text-white"
              >
                <Link href="#how-it-works">See how it works</Link>
              </Button>
            </div>
          </div>

          {/* PRODUCT WALKTHROUGH */}
          <div className="survey-frame scroll-tilt relative mx-auto mt-16 max-w-5xl rounded-2xl bg-gradient-to-br from-emerald-400/30 via-teal-400/15 to-green-500/20 p-px shadow-2xl shadow-emerald-950/40">
            <div className="aspect-16/9.25 overflow-hidden rounded-2xl border border-emerald-200/10 bg-[#101D16] shadow-[0_0_45px_rgba(16,185,129,0.10)]">
              <video
                autoPlay
                muted
                loop
                playsInline
                poster="/videos/hero-poster.jpg"
                aria-label="Outpost walkthrough: the agent draws an architecture diagram and writes the spec"
                className="size-full object-cover"
              >
                <source src="/videos/hero.webm" type="video/webm" />
                <source src="/videos/hero.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="relative border-b border-emerald-300/10 bg-gradient-to-r from-[#0D1D15] via-[#14291D] to-[#0D1D15] px-6 py-10 md:px-10">
        <div className="pointer-events-none absolute left-1/2 top-0 h-20 w-2/3 -translate-x-1/2 rounded-full bg-emerald-500/5 blur-3xl" />

        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-sm text-[#B2C7B8]">
            Built for teams who sketch first and write specs second
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm text-[#88A997]">
            {AUDIENCES.map((audience) => (
              <span key={audience} className="transition-colors hover:text-emerald-300">
                {audience}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT FEATURES */}
      <section
        id="product"
        className="relative isolate overflow-hidden border-b border-emerald-300/10 bg-gradient-to-b from-[#10251A] via-[#0D1D15] to-[#11281D] px-6 py-24 md:px-10"
      >
        <div className="pointer-events-none absolute -left-48 top-32 size-[500px] rounded-full bg-green-500/10 blur-[140px]" />
        <div className="pointer-events-none absolute -right-48 bottom-0 size-[500px] rounded-full bg-teal-400/10 blur-[150px]" />

        <div className="relative mx-auto max-w-5xl">
          <div className="max-w-xl">
            <SectionLabel>01 · Surfaces</SectionLabel>

            <h2 className="text-3xl font-semibold tracking-tight text-[#EAF5ED] md:text-4xl">
              One agent, one workspace, your whole team
            </h2>

            <p className="mt-4 text-[#AFC4B5]">
              Outpost isn&apos;t another AI diagram generator. The same agent
              reasons across your canvas and your docs, turning a rough sketch
              into a written spec without you copying anything by hand. And your
              team is right there with you.
            </p>
          </div>

          <div className="mt-16 flex flex-col gap-16 md:gap-20">
            {SURFACES.map(({ icon: Icon, visual: Visual, ...surface }, i) => (
              <SurfaceRow
                key={surface.title}
                reverse={i % 2 === 1}
                icon={<Icon className="size-5" />}
                visual={<Visual />}
                {...surface}
              />
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="relative isolate overflow-hidden border-b border-emerald-300/10 bg-gradient-to-br from-[#142D20] via-[#0F2118] to-[#102A24] px-6 py-24 md:px-10"
      >
        <div className="pointer-events-none absolute -right-32 top-0 size-[450px] rounded-full bg-teal-400/10 blur-[130px]" />
        <div className="pointer-events-none absolute -left-40 bottom-0 size-[400px] rounded-full bg-emerald-500/10 blur-[130px]" />

        <div className="relative mx-auto max-w-5xl">
          <SectionLabel>02 · The route</SectionLabel>

          <h2 className="text-3xl font-semibold tracking-tight text-[#EAF5ED] md:text-4xl">
            Watch it think, not just the result
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <Step
                key={step.title}
                number={String(i + 1).padStart(2, "0")}
                title={step.title}
              >
                {step.body}
              </Step>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section
        id="pricing"
        className="relative isolate overflow-hidden border-b border-emerald-300/10 bg-gradient-to-b from-[#0B1B13] via-[#142B20] to-[#0B1B13] px-6 py-24 md:px-10"
      >
        <div className="pointer-events-none absolute left-1/2 top-20 h-64 w-[600px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 size-80 rounded-full bg-teal-500/10 blur-[120px]" />

        <div className="relative mx-auto mb-12 max-w-5xl text-center">
          <SectionLabel>03 · Pricing</SectionLabel>

          <h2 className="text-3xl font-semibold tracking-tight text-[#EAF5ED] md:text-4xl">
            Start free, upgrade when it clicks
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-[#AFC4B5]">
            Upgrade just yourself, or your whole team, billed per member.
          </p>
        </div>

        <div className="relative mx-auto max-w-5xl">
          <PricingPlans />
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="topo-bg relative isolate overflow-hidden border-b border-emerald-300/10 bg-gradient-to-br from-[#10271C] via-[#0B1D14] to-[#10251B] px-6 py-28 md:px-10">
        <div className="pointer-events-none absolute -left-32 top-0 size-[400px] rounded-full bg-emerald-500/15 blur-[130px]" />
        <div className="pointer-events-none absolute -right-32 bottom-0 size-[400px] rounded-full bg-teal-400/10 blur-[130px]" />

        <MapAnnotations />

        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <div className="rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-4 shadow-xl shadow-emerald-950/30">
            <Image
              src="/brand/mascot-dark.png"
              alt=""
              width={40}
              height={40}
              className="opacity-90"
            />
          </div>

          <h2 className="text-3xl font-semibold tracking-tight text-[#EAF5ED] md:text-4xl">
            Give your workspace a collaborator
          </h2>

          <Button
            asChild
            size="lg"
            className="gap-2 bg-gradient-to-r from-[#087F5B] to-[#20A879] text-base text-white shadow-lg shadow-emerald-900/40 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-xl hover:shadow-emerald-500/25"
          >
            <Link href="/sign-up">
              Get started free <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-emerald-300/10 bg-[#08140E] px-6 py-8 text-center text-sm text-[#8EA697] md:px-10">
        MindSpace AI - Where ideas find their space to grow!
      </footer>
    </div>
  );
}

function SurfaceRow({
  icon,
  title,
  description,
  bullets,
  reverse,
  visual,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  bullets: string[];
  reverse?: boolean;
  visual: React.ReactNode;
}) {
  return (
    <div
      className={`flex flex-col gap-10 md:flex-row md:items-center ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="flex-1">
        <div className="flex size-11 items-center justify-center rounded-xl border border-emerald-300/20 bg-gradient-to-br from-emerald-400/20 to-teal-400/5 text-emerald-300 shadow-lg shadow-emerald-950/20">
          {icon}
        </div>

        <h3 className="mt-4 text-xl font-semibold text-[#EAF5ED]">
          {title}
        </h3>

        <p className="mt-2 text-[#AFC4B5]">{description}</p>

        <ul className="mt-5 space-y-3">
          {bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex items-start gap-2.5 text-sm text-[#AFC4B5]"
            >
              <span className="mt-1.5 size-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]" />
              {bullet}
            </li>
          ))}
        </ul>
      </div>

      {/* Feature card with stronger emerald hover glow */}
      <div className="group relative flex-1 rounded-2xl border border-emerald-300/15 bg-gradient-to-br from-[#1B3828]/80 via-[#142A20]/90 to-[#102219]/95 p-3 shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-all duration-500 hover:-translate-y-1 hover:border-emerald-300/50 hover:shadow-[0_0_18px_rgba(32,168,121,0.22),0_0_45px_rgba(32,168,121,0.16),0_15px_40px_rgba(0,0,0,0.3)] md:p-5">
        <div className="overflow-hidden rounded-xl">
          {visual}
        </div>
      </div>
    </div>
  );
}

// Map-legend style section label
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-300">
      <span className="size-1.5 rotate-45 border border-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
      {children}
    </p>
  );
}

function Step({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-emerald-300/15 bg-gradient-to-br from-[#1B3A2A] via-[#142B20] to-[#102119] p-6 shadow-[0_8px_25px_rgba(0,0,0,0.2)] transition-all duration-500 hover:-translate-y-1.5 hover:border-emerald-300/50 hover:bg-[#1B3828] hover:shadow-[0_0_20px_rgba(32,168,121,0.25),0_0_50px_rgba(32,168,121,0.15),0_15px_40px_rgba(0,0,0,0.35)]">

      {/* Waypoint */}
      <div className="flex items-center gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-emerald-300/40 bg-emerald-400/10 font-mono text-xs text-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.10)] transition-all group-hover:bg-emerald-400/20 group-hover:shadow-[0_0_18px_rgba(52,211,153,0.25)]">
          {number}
        </span>

        <span className="h-px flex-1 border-t border-dashed border-emerald-300/25" />
      </div>

      <h3 className="mt-5 font-semibold text-[#EAF5ED]">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-[#AFC4B5]">
        {children}
      </p>
    </div>
  );
}
