import {
  SparkleIcon,
  ArrowClockwiseIcon,
  ListChecksIcon,
  WarningCircleIcon,
  ThumbsUpIcon
} from "@phosphor-icons/react";

interface ResultOverviewProps {
  score: number;
  totalMissing: number;
  totalStrengths: number;
  totalWeaknesses: number;
  totalImprovements: number;
  resumeName: string;
  onReset: () => void;
}

export default function ResultOverview({
  score,
  totalMissing,
  totalStrengths,
  totalWeaknesses,
  totalImprovements,
  resumeName,
  onReset
}: ResultOverviewProps) {
  // Score color determinations
  const getScoreColor = (val: number) => {
    if (val >= 80) return "text-brand-success border-brand-success/20 bg-brand-success/5";
    if (val >= 50) return "text-brand-accent border-brand-accent/20 bg-brand-accent/5";
    return "text-brand-danger border-brand-danger/20 bg-brand-danger/5";
  };

  const getStrokeColor = (val: number) => {
    if (val >= 80) return "#10b981"; // success
    if (val >= 50) return "#f59e0b"; // accent
    return "#ef4444"; // danger
  };

  const strokeColor = getStrokeColor(score);
  const circ = 2 * Math.PI * 72; // 2 * pi * r (r = 72)
  const strokeDashoffset = circ - (score / 100) * circ;

  return (
    <div className="w-full bg-white/60 backdrop-blur-xl border border-brand-border/40 p-8 sm:p-10 rounded-3xl shadow-xl space-y-8 animate-fade-in relative z-10">

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-brand-border/40 pb-6">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-primary bg-brand-primary/10 border border-brand-primary/20 px-3 py-1 rounded-full block w-fit mb-2">
            Analysis Report
          </span>
          <h2 className="text-2xl font-extrabold text-brand-text">
            ATS Screening Audit Complete
          </h2>
          <p className="text-xs font-semibold text-brand-text-muted flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-success animate-pulse" />
            File audited: <strong className="text-brand-text font-bold">{resumeName}</strong>
          </p>
        </div>

        <button
          onClick={onReset}
          className="group flex items-center gap-2 px-5 py-3 border border-brand-border text-brand-text hover:text-brand-primary hover:border-brand-primary/40 font-bold text-sm rounded-xl shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 transform cursor-pointer bg-white"
        >
          <ArrowClockwiseIcon className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
          <span>Upload Another</span>
        </button>
      </div>

      {/* Main Grid: Circle progress and quick stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

        {/* LEFT GAUGE BLOCK (Column span 4) */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-6 border border-brand-border/20 rounded-2xl bg-slate-50/30">
          <div className="relative h-44 w-44 flex items-center justify-center">
            {/* SVG Ring */}
            <svg className="absolute transform -rotate-90 w-full h-full">
              {/* Secondary grey background line */}
              <circle
                cx="88"
                cy="88"
                r="72"
                strokeWidth="10"
                stroke="#e2e8f0"
                fill="transparent"
                className="opacity-70"
              />
              {/* Dynamic primary fill line */}
              <circle
                cx="88"
                cy="88"
                r="72"
                strokeWidth="10"
                stroke={strokeColor}
                fill="transparent"
                strokeDasharray={circ}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            {/* Absolute Text overlay */}
            <div className="flex flex-col items-center justify-center relative z-10">
              <span className="text-5xl font-black text-brand-text tracking-tight">{score}</span>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-text-muted mt-1">
                ATS SCORE
              </span>
            </div>
          </div>

          <div className="text-center mt-6 space-y-2">
            <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-full border ${getScoreColor(score)}`}>
              <SparkleIcon className="w-4 h-4 fill-current" />
              <span>
                {score >= 80 ? "Highly Compatible" : score >= 50 ? "Moderate Gaps" : "High Risk Filters"}
              </span>
            </span>
            <p className="text-xs text-brand-text-muted font-semibold max-w-50 leading-relaxed">
              {score >= 80
                ? "Your resume has a strong overlap with the job parameters."
                : score >= 50
                  ? "Moderate adjustments can increase compatibility rates."
                  : "Critical missing keywords are triggering automated screen filters."
              }
            </p>
          </div>
        </div>

        {/* RIGHT STATS CARDS BLOCK (Column span 7) */}
        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Missing Keywords counter card */}
          <div className="bg-brand-danger/5 border border-brand-danger/20 rounded-2xl p-5 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-extrabold uppercase text-brand-danger tracking-wider">
                Missing Keywords
              </span>
              <div className="h-8 w-8 rounded-lg bg-brand-danger/10 flex items-center justify-center text-brand-danger">
                <WarningCircleIcon className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-brand-text tracking-tight">
                {totalMissing}
              </span>
              <span className="text-xs font-bold text-brand-text-muted uppercase">
                critical items
              </span>
            </div>
          </div>

          {/* Strengths counter card */}
          <div className="bg-brand-success/5 border border-brand-success/20 rounded-2xl p-5 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-extrabold uppercase text-brand-success tracking-wider">
                Verified Strengths
              </span>
              <div className="h-8 w-8 rounded-lg bg-brand-success/10 flex items-center justify-center text-brand-success">
                <ThumbsUpIcon className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-brand-text tracking-tight">
                {totalStrengths}
              </span>
              <span className="text-xs font-bold text-brand-text-muted uppercase">
                matched keywords
              </span>
            </div>
          </div>

          {/* Weaknesses counter card */}
          <div className="bg-slate-50 border border-brand-border/40 rounded-2xl p-5 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-extrabold uppercase text-brand-text-muted tracking-wider">
                Audited Flaws
              </span>
              <div className="h-8 w-8 rounded-lg bg-slate-200/50 flex items-center justify-center text-brand-text-muted">
                <WarningCircleIcon className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-brand-text tracking-tight">
                {totalWeaknesses}
              </span>
              <span className="text-xs font-bold text-brand-text-muted uppercase">
                points flag
              </span>
            </div>
          </div>

          {/* Actionable Suggestions counter card */}
          <div className="bg-brand-primary/5 border border-brand-primary/20 rounded-2xl p-5 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-extrabold uppercase text-brand-primary tracking-wider">
                AI Bullet Refactors
              </span>
              <div className="h-8 w-8 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                <ListChecksIcon className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-brand-text tracking-tight">
                {totalImprovements}
              </span>
              <span className="text-xs font-bold text-brand-text-muted uppercase">
                tailored suggestions
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
