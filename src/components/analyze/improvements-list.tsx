import { useState } from "react";
import {
  WrenchIcon,
  WarningOctagonIcon,
  SparkleIcon,
  CopyIcon,
  CheckIcon,
  LightningIcon
} from "@phosphor-icons/react";

interface ImprovementsListProps {
  weaknesses: string[];
  improvements: string[];
}

export default function ImprovementsList({ weaknesses = [], improvements = [] }: ImprovementsListProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Helper to parse suggestions that might contain structured passive vs active comparisons
  const renderImprovementItem = (item: string, index: number) => {
    return (
      <div
        key={index}
        className="group relative bg-white border border-brand-border/40 hover:border-brand-primary/20 p-5 rounded-2xl hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
      >
        <div className="space-y-3.5">
          {/* Header indicator */}
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-brand-primary uppercase bg-brand-primary/5 px-2.5 py-1 rounded-lg">
              <LightningIcon className="w-3.5 h-3.5" />
              Rewrite Suggestion #{index + 1}
            </span>

            <button
              onClick={() => handleCopy(item, index)}
              className="text-slate-400 hover:text-brand-primary bg-slate-50 hover:bg-brand-primary/5 p-2 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-1.5 text-xs font-bold"
              title="Copy to clipboard"
            >
              {copiedIndex === index ? (
                <>
                  <CheckIcon className="w-3.5 h-3.5 text-brand-success" />
                  <span className="text-[10px] text-brand-success font-bold">Copied</span>
                </>
              ) : (
                <>
                  <CopyIcon className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold">Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Actual content of rewrite */}
          <p className="text-sm font-semibold text-brand-text leading-relaxed pl-0.5">
            {item}
          </p>
        </div>

        {/* Decorative subtle ambient card dot */}
        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-brand-primary/10 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    );
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

      {/* WEAKNESSES COLUMN (Column span 5) */}
      <div className="lg:col-span-5 bg-white/60 backdrop-blur-xl border border-brand-border/40 p-8 sm:p-10 rounded-3xl shadow-xl space-y-6 flex flex-col justify-start relative overflow-hidden items-start self-start">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-20 h-20 bg-brand-danger/5 rounded-full blur-xl pointer-events-none " />

        <div className="space-y-1">
          <h3 className="text-lg font-extrabold text-brand-text tracking-tight flex items-center gap-2">
            <WarningOctagonIcon className="h-5 w-5 text-brand-danger" />
            Friction Points & Flaws
          </h3>
          <p className="text-xs font-normal text-brand-text-muted">
            Audited structural bottlenecks, missing metrics, or formatting bugs flagged by screening parsers.
          </p>
        </div>

        <div className="space-y-4 grow">
          {weaknesses.length > 0 ? (
            weaknesses.map((wk, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3.5 p-4 bg-brand-danger/5 border border-brand-danger/10 hover:border-brand-danger/20 rounded-2xl transition-colors duration-200"
              >
                <div className="h-6 w-6 rounded-full bg-brand-danger/10 flex items-center justify-center text-brand-danger shrink-0 mt-0.5">
                  <span className="text-[10px] font-black">{idx + 1}</span>
                </div>
                <p className="text-sm font-semibold text-brand-text-muted leading-relaxed">
                  {wk}
                </p>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-2 border border-dashed border-brand-border rounded-2xl bg-slate-50/50">
              <CheckIcon className="h-10 w-10 text-brand-success" />
              <h4 className="text-sm font-bold text-brand-text">Zero Flaws Isolated!</h4>
              <p className="text-xs text-brand-text-muted max-w-50">
                Screening algorithms detected no major structural flaws or passive pacing in your resume profile.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* IMPROVEMENTS COLUMN (Column span 7) */}
      <div className="lg:col-span-7 bg-white/60 backdrop-blur-xl border border-brand-border/40 p-8 sm:p-10 rounded-3xl shadow-xl space-y-6 flex flex-col justify-start relative overflow-hidden h-full">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-20 h-20 bg-brand-primary/5 rounded-full blur-xl pointer-events-none" />

        <div className="space-y-1">
          <h3 className="text-lg font-extrabold text-brand-text tracking-tight flex items-center gap-2">
            <WrenchIcon className="h-5 w-5 text-brand-primary" />
            AI-Powered Bullet-Point Refactorings
          </h3>
          <p className="text-xs font-normal text-brand-text-muted">
            Transform passive and responsibilities-based text into metric-driven and success-oriented bullet points.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 grow">
          {improvements.length > 0 ? (
            improvements.map((imp, idx) => renderImprovementItem(imp, idx))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-2 border border-dashed border-brand-border rounded-2xl bg-slate-50/50">
              <SparkleIcon className="h-10 w-10 text-brand-primary animate-pulse" />
              <h4 className="text-sm font-bold text-brand-text">No Refactorings Needed</h4>
              <p className="text-xs text-brand-text-muted max-w-60">
                Your resume experience items are already highly optimized and metric-driven.
              </p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
