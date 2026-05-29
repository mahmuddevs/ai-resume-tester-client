import { useEffect, useState } from "react";
import { SparkleIcon } from "@phosphor-icons/react";

const LOADING_STATUSES = [
  "Securing payload transport layer...",
  "Uploading resume PDF document...",
  "Initializing deep-parse parser...",
  "Extracting resume experience nodes...",
  "Vectorizing job requirements stack...",
  "Analyzing semantic match densities...",
  "Isolating missing technical keywords...",
  "Scouring skill-gap alignments...",
  "Refactoring passive experience bullet-points...",
  "Simulating applicant tracking system (ATS) filters...",
  "Generating final match metrics...",
  "Polishing actionable improvements report..."
];

export default function LoadingScreen() {
  const [statusIndex, setStatusIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Status updates interval
  useEffect(() => {
    const statusInterval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % LOADING_STATUSES.length);
    }, 1800);

    return () => clearInterval(statusInterval);
  }, []);

  // Progress bar simulation (smooth curve with a logarithmic crawl so it never freezes)
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 40) {
          // Fast start
          return prev + Math.random() * 4 + 1.5;
        } else if (prev < 70) {
          // Mid-range smooth slow down
          return prev + Math.random() * 1.5 + 0.5;
        } else if (prev < 90) {
          // Advanced processing
          return prev + Math.random() * 0.4 + 0.1;
        } else if (prev < 97) {
          // Final miles
          return prev + 0.05;
        } else if (prev < 99.8) {
          // Logarithmic crawl (never fully stops, keeping visual interest alive!)
          return prev + 0.01;
        }
        return prev;
      });
    }, 150);

    return () => clearInterval(progressInterval);
  }, []);

  // Prevent background scrolling while loading screen is active
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-slate-950/65 backdrop-blur-xl animate-fade-in p-6">
      {/* Tech grid mesh overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-size-[4rem_4rem] opacity-10 pointer-events-none" />

      {/* Decorative colored glow spheres */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-87.5 h-87.5 bg-brand-primary/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-87.5 h-87.5 bg-brand-secondary/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Loading Card Container (Unified Premium Light Theme Glassmorphism) */}
      <div className="w-full max-w-lg bg-white/95 border border-brand-border/40 p-8 sm:p-10 rounded-3xl shadow-2xl relative overflow-hidden backdrop-blur-2xl flex flex-col items-center text-center space-y-8">
        <div className="absolute inset-0 bg-linear-to-b from-slate-500/5 to-transparent pointer-events-none" />

        {/* Circular Scanning radar layout */}
        <div className="relative h-32 w-32 flex items-center justify-center">
          {/* Animated pulsing outer rings */}
          <div className="absolute inset-0 rounded-full border border-brand-primary/20 animate-ping [animation-duration:3s]" />
          <div className="absolute inset-2 rounded-full border border-brand-secondary/30 animate-pulse [animation-duration:2s]" />
          <div className="absolute inset-4 rounded-full border border-dashed border-slate-200 animate-spin [animation-duration:20s]" />
          <div className="absolute inset-6 rounded-full border border-indigo-500/20 animate-spin [animation-duration:8s] [animation-direction:reverse]" />

          {/* Central Logo/Icon Core with Rotating Glowing Ring */}
          <div className="relative h-16 w-16 rounded-2xl bg-linear-to-tr from-brand-primary to-brand-secondary text-white shadow-xl shadow-brand-primary/30 flex items-center justify-center">
            <SparkleIcon className="h-8 w-8 animate-spin [animation-duration:6s] fill-white" />
          </div>
        </div>

        {/* Loading text blocks */}
        <div className="space-y-3 w-full">
          <h2 className="text-xl sm:text-2xl font-extrabold text-brand-text tracking-tight">
            Refactoring Your Resume
          </h2>

          <div className="h-6 flex items-center justify-center overflow-hidden">
            <p
              key={statusIndex}
              className="text-sm font-extrabold text-brand-primary tracking-wider animate-slide-in-left uppercase"
            >
              {LOADING_STATUSES[statusIndex]}
            </p>
          </div>
        </div>

        {/* Futuristic progress indicator bar */}
        <div className="w-full space-y-2">
          <div className="flex justify-between text-[11px] font-extrabold uppercase tracking-wider text-brand-text-muted">
            <span>ATS Screening Alignment</span>
            <span className="text-brand-primary font-black">{Math.round(progress)}%</span>
          </div>
          <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/50 p-0.5">
            <div
              style={{ width: `${progress}%` }}
              className="h-full bg-linear-to-r from-brand-primary via-indigo-500 to-brand-secondary rounded-full shadow-xs transition-all duration-300"
            />
          </div>
        </div>

        {/* Underlines info */}
        <p className="text-[11px] font-bold text-brand-text-muted/70 leading-relaxed max-w-sm">
          Please do not close this window. Our AI model is performing sentence-level calculations to audit technical keyword matches.
        </p>
      </div>
    </div>
  );
}
