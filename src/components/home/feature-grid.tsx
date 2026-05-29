import type { ReactNode } from "react";
import {
  MagnifyingGlassIcon,
  TargetIcon,
  PencilSimpleLineIcon,
  CheckIcon,
  XIcon,
  WarningCircleIcon,
  ArrowDownIcon
} from "@phosphor-icons/react";
import { FeatureCard } from "./feature-card";
import SectionHeading from "./section-heading";

interface FeatureItem {
  tag: string;
  tagColor: string;
  title: string;
  titleHoverColor: string;
  borderColor: string;
  icon: React.ComponentType<{ className?: string }>;
  iconGradient: string;
  body: string;
  preview: ReactNode;
}

const FEATURES_DATA: FeatureItem[] = [
  {
    tag: "Gap Analyzer",
    tagColor: "text-brand-primary",
    title: "Keyword Gap Analysis",
    titleHoverColor: "group-hover:text-brand-primary",
    borderColor: "hover:border-brand-primary/30",
    icon: MagnifyingGlassIcon,
    iconGradient: "from-brand-primary to-indigo-600 shadow-brand-primary/20",
    body: "Our engine scans the job description to pinpoint exactly which missing libraries, frameworks, languages, or agile methodologies are filtering you out.",
    preview: (
      <div className="w-full rounded-2xl bg-slate-950 border border-slate-900 p-5 shadow-inner space-y-4">
        <div className="flex justify-between items-center text-[10px] font-extrabold text-slate-400 tracking-wider uppercase border-b border-slate-900 pb-2">
          <span>SCAN RESULT</span>
          <span className="text-brand-danger">4 Gaps Identified</span>
        </div>

        {/* Keyword tags */}
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-success bg-brand-success/10 border border-brand-success/20 px-2.5 py-1 rounded-lg">
            <CheckIcon className="w-3 h-3 text-brand-success stroke-3" />
            React
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-success bg-brand-success/10 border border-brand-success/20 px-2.5 py-1 rounded-lg">
            <CheckIcon className="w-3 h-3 text-brand-success stroke-3" />
            TypeScript
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-danger bg-brand-danger/10 border border-brand-danger/20 px-2.5 py-1 rounded-lg animate-pulse-subtle">
            <XIcon className="w-3 h-3 text-brand-danger stroke-3" />
            Docker
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-danger bg-brand-danger/10 border border-brand-danger/20 px-2.5 py-1 rounded-lg animate-pulse-subtle">
            <XIcon className="w-3 h-3 text-brand-danger stroke-3" />
            Next.js
          </span>
        </div>

        {/* Critical alert banner */}
        <div className="rounded-lg bg-brand-danger/5 border border-brand-danger/15 p-2.5 flex items-start gap-2">
          <WarningCircleIcon className="w-4 h-4 text-brand-danger shrink-0 mt-0.5" />
          <p className="text-[10px] text-brand-danger font-semibold leading-relaxed">
            <strong className="font-extrabold uppercase">Critical Alert:</strong> Next.js is heavily prioritized in the JD but absent in your experience.
          </p>
        </div>
      </div>
    )
  },
  {
    tag: "Scoring Core",
    tagColor: "text-brand-secondary",
    title: "Semantic Match Scoring",
    titleHoverColor: "group-hover:text-brand-secondary",
    borderColor: "hover:border-brand-secondary/30",
    icon: TargetIcon,
    iconGradient: "from-brand-secondary to-blue-600 shadow-brand-secondary/20",
    body: "Receive an immediate overall compatibility percentage score calculating how closely your experience matches the recruiter's ideal candidate profile.",
    preview: (
      <div className="w-full rounded-2xl bg-slate-950 border border-slate-900 p-5 shadow-inner flex gap-5 items-center justify-between">
        {/* Score donut progress ring */}
        <div className="relative flex items-center justify-center w-22 h-22 rounded-full bg-slate-900 border border-indigo-500/20 shadow-inner shrink-0">
          {/* Spinning active ring */}
          <div className="absolute inset-1 rounded-full border border-dashed border-cyan-400/25 animate-spin [animation-duration:20s]" />

          <div className="flex flex-col items-center">
            <span className="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-indigo-400">84%</span>
            <span className="text-[7px] uppercase font-extrabold tracking-widest text-slate-400">COMPATIBLE</span>
          </div>
        </div>

        {/* Visual Progress bar stats */}
        <div className="flex-1 space-y-2.5">
          <div className="space-y-1">
            <div className="flex justify-between text-[9px] font-extrabold tracking-wider text-slate-400 uppercase">
              <span>Role Fit</span>
              <span className="text-cyan-400">88%</span>
            </div>
            <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
              <div className="h-full w-[88%] bg-linear-to-r from-cyan-400 to-blue-500 rounded-full" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[9px] font-extrabold tracking-wider text-slate-400 uppercase">
              <span>Skills Alignment</span>
              <span className="text-cyan-400">79%</span>
            </div>
            <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
              <div className="h-full w-[79%] bg-linear-to-r from-cyan-400 to-blue-500 rounded-full" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[9px] font-extrabold tracking-wider text-slate-400 uppercase">
              <span>Experience Depth</span>
              <span className="text-cyan-400">92%</span>
            </div>
            <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
              <div className="h-full w-[92%] bg-linear-to-r from-cyan-400 to-blue-500 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    tag: "Refactoring Matrix",
    tagColor: "text-brand-accent",
    title: "Actionable Suggestions",
    titleHoverColor: "group-hover:text-brand-accent",
    borderColor: "hover:border-brand-accent/30",
    icon: PencilSimpleLineIcon,
    iconGradient: "from-brand-accent to-orange-600 shadow-brand-accent/20",
    body: "Get tailored, sentence-level rewrites for your experience section, turning passive bullet points into metrics-driven achievements.",
    preview: (
      <div className="w-full rounded-2xl bg-slate-950 border border-slate-900 p-4 shadow-inner space-y-3">
        {/* Original Block */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[8px] font-extrabold tracking-widest text-slate-500 bg-slate-900/60 border border-slate-900 px-1.5 py-0.5 rounded uppercase">
              Original
            </span>
          </div>
          <p className="text-[10.5px] font-medium text-slate-400 line-through decoration-brand-danger/50 decoration-1 bg-brand-danger/5 rounded-md px-2 py-1.5 border border-brand-danger/10 leading-relaxed">
            ❌ Responsible for maintaining the legacy code and updating dashboard features.
          </p>
        </div>

        {/* Separation/Arrow indicator */}
        <div className="flex justify-center -my-1 relative">
          <div className="bg-brand-accent/10 border border-brand-accent/30 rounded-full p-1 shadow-xs animate-float">
            <ArrowDownIcon className="w-3 h-3 text-brand-accent stroke-3" />
          </div>
        </div>

        {/* AI Suggestion Block */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[8px] font-extrabold tracking-widest text-brand-accent bg-brand-accent/10 border border-brand-accent/25 px-1.5 py-0.5 rounded uppercase">
              AI Optimized
            </span>
            <span className="text-[8px] font-extrabold text-brand-success bg-brand-success/10 px-1.5 py-0.5 rounded uppercase">
              +18% Score Lift
            </span>
          </div>
          <p className="text-[10.5px] font-medium text-slate-200 bg-brand-success/5 rounded-md px-2 py-1.5 border border-brand-success/15 leading-relaxed">
            ✨ <strong className="text-white font-bold">Refactored 3 critical legacy modules</strong>, reducing load latency by <strong className="text-brand-success font-bold">32%</strong> and increasing user engagement metrics.
          </p>
        </div>
      </div>
    )
  }
];

export default function FeatureGrid() {
  return (
    <section className="w-full bg-white border-y border-brand-border/30 sec-padding relative overflow-hidden">
      {/* Ambient background blurs for depth */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-96 h-96 bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 right-1/4 translate-x-1/2 w-96 h-96 bg-brand-secondary/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="cont relative z-10">
        {/* Heading Block */}
        <SectionHeading
          badge="Powerful Capabilities"
          title={
            <>
              What You{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-primary to-brand-secondary">
                Get
              </span>
            </>
          }
          subtitle="Our state-of-the-art backend analytics API delivers deep, metrics-driven insights to transform your application success."
          align="center"
        />

        {/* The 3-Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {FEATURES_DATA.map((feature, idx) => (
            <FeatureCard key={idx} borderColor={feature.borderColor}>
              <FeatureCard.Header
                icon={feature.icon}
                iconGradient={feature.iconGradient}
                tag={feature.tag}
                tagColor={feature.tagColor}
                title={feature.title}
                titleHoverColor={feature.titleHoverColor}
              />
              <FeatureCard.Body>
                {feature.body}
              </FeatureCard.Body>
              <FeatureCard.Preview>
                {feature.preview}
              </FeatureCard.Preview>
            </FeatureCard>
          ))}
        </div>
      </div>
    </section>
  );
}
