import { useState } from "react";
import { 
  CheckCircleIcon, 
  WarningCircleIcon, 
  FunnelIcon 
} from "@phosphor-icons/react";

interface KeywordAnalysisProps {
  missingKeywords: string[];
  strengths: string[];
}

type FilterType = "all" | "missing" | "matched";

export default function KeywordAnalysis({ missingKeywords = [], strengths = [] }: KeywordAnalysisProps) {
  const [filter, setFilter] = useState<FilterType>("all");

  const totalKeywordsCount = missingKeywords.length + strengths.length;

  return (
    <div className="w-full bg-white/60 backdrop-blur-xl border border-brand-border/40 p-8 sm:p-10 rounded-3xl shadow-xl space-y-8 animate-fade-in relative z-10">
      
      {/* Title & Filter Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pb-2">
        <div className="space-y-1">
          <h3 className="text-xl font-extrabold text-brand-text tracking-tight flex items-center gap-2">
            <FunnelIcon className="h-5 w-5 text-brand-primary" />
            Keyword Density Analysis
          </h3>
          <p className="text-sm font-normal text-brand-text-muted">
            Auditing corporate ATS keyword matching indexes across languages, frameworks, and job roles.
          </p>
        </div>

        {/* Dynamic Navigation Tabs */}
        <div className="flex bg-slate-100/80 p-1.5 rounded-xl border border-slate-200/50 w-full sm:w-auto">
          <button
            onClick={() => setFilter("all")}
            className={`flex-1 sm:flex-initial text-center px-4.5 py-2 text-xs font-extrabold rounded-lg tracking-wide transition-all duration-300 cursor-pointer ${
              filter === "all"
                ? "bg-white text-brand-primary shadow-sm"
                : "text-brand-text-muted hover:text-brand-text"
            }`}
          >
            All ({totalKeywordsCount})
          </button>
          <button
            onClick={() => setFilter("missing")}
            className={`flex-1 sm:flex-initial text-center px-4.5 py-2 text-xs font-extrabold rounded-lg tracking-wide transition-all duration-300 cursor-pointer ${
              filter === "missing"
                ? "bg-white text-brand-danger shadow-sm"
                : "text-brand-text-muted hover:text-brand-danger"
            }`}
          >
            Missing ({missingKeywords.length})
          </button>
          <button
            onClick={() => setFilter("matched")}
            className={`flex-1 sm:flex-initial text-center px-4.5 py-2 text-xs font-extrabold rounded-lg tracking-wide transition-all duration-300 cursor-pointer ${
              filter === "matched"
                ? "bg-white text-brand-success shadow-sm"
                : "text-brand-text-muted hover:text-brand-success"
            }`}
          >
            Matched ({strengths.length})
          </button>
        </div>
      </div>

      {/* Grid containing tags */}
      <div className="space-y-6">
        
        {/* Missing Keywords Box */}
        {(filter === "all" || filter === "missing") && missingKeywords.length > 0 && (
          <div className="space-y-3.5 animate-fade-in">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-brand-danger flex items-center gap-1.5 pl-0.5">
              <WarningCircleIcon className="w-4 h-4 shrink-0" />
              Critical Missing Keywords
            </h4>
            <div className="flex flex-wrap gap-2.5 p-5 border border-brand-danger/10 bg-brand-danger/5 rounded-2xl">
              {missingKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-brand-danger bg-white border border-brand-danger/25 rounded-xl shadow-xs hover:border-brand-danger/50 hover:shadow-sm hover:scale-[1.02] transition-all duration-200 cursor-default"
                >
                  <WarningCircleIcon className="w-3.5 h-3.5 text-brand-danger" />
                  {kw}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Matched Keywords Box */}
        {(filter === "all" || filter === "matched") && strengths.length > 0 && (
          <div className="space-y-3.5 animate-fade-in">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-brand-success flex items-center gap-1.5 pl-0.5">
              <CheckCircleIcon className="w-4 h-4 shrink-0" />
              Verified Strengths (Matched)
            </h4>
            <div className="flex flex-wrap gap-2.5 p-5 border border-brand-success/10 bg-brand-success/5 rounded-2xl">
              {strengths.map((kw, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-brand-success bg-white border border-brand-success/25 rounded-xl shadow-xs hover:border-brand-success/50 hover:shadow-sm hover:scale-[1.02] transition-all duration-200 cursor-default"
                >
                  <CheckCircleIcon className="w-3.5 h-3.5 text-brand-success" />
                  {kw}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Empty States */}
        {filter === "missing" && missingKeywords.length === 0 && (
          <div className="p-8 border border-dashed border-brand-border/80 rounded-2xl text-center space-y-2.5 animate-fade-in bg-slate-50/50">
            <CheckCircleIcon className="h-10 w-10 text-brand-success mx-auto" />
            <h4 className="text-base font-extrabold text-brand-text">Flawless Match!</h4>
            <p className="text-xs text-brand-text-muted max-w-sm mx-auto">
              Your resume contains all critical keywords found in the job description details.
            </p>
          </div>
        )}

        {filter === "matched" && strengths.length === 0 && (
          <div className="p-8 border border-dashed border-brand-border/80 rounded-2xl text-center space-y-2.5 animate-fade-in bg-slate-50/50">
            <WarningCircleIcon className="h-10 w-10 text-brand-danger mx-auto" />
            <h4 className="text-base font-extrabold text-brand-text">No Matches Found</h4>
            <p className="text-xs text-brand-text-muted max-w-sm mx-auto">
              There is currently no keyword overlap between your resume and the target job description. Add critical skills to proceed.
            </p>
          </div>
        )}

        {totalKeywordsCount === 0 && (
          <div className="p-8 border border-dashed border-brand-border/80 rounded-2xl text-center space-y-2 animate-fade-in bg-slate-50/50">
            <h4 className="text-base font-extrabold text-brand-text">No Keyword Data</h4>
            <p className="text-xs text-brand-text-muted max-w-sm mx-auto">
              The AI was unable to parse distinct skill keywords for this job description.
            </p>
          </div>
        )}

      </div>

    </div>
  );
}
