import { Link } from "react-router";
import { ArrowRightIcon, SparkleIcon, ShieldCheckIcon, FilePdfIcon } from "@phosphor-icons/react";

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden w-full max-w-7xl mx-auto py-16 px-6 sm:px-12 md:py-24 bg-brand-bg flex items-center justify-center">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/3 w-87.5 sm:w-125 h-87.5 sm:h-125 bg-linear-to-tr from-brand-primary/10 via-brand-secondary/8 to-transparent rounded-full blur-[90px] -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-75 h-75 bg-brand-accent/5 rounded-full blur-[80px] -z-10 pointer-events-none" />
      
      {/* Responsive Grid Panel */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* LEFT COLUMN - Clear value statement, subtext, actions */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 relative z-10">
          
          {/* Micro-badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-card shadow-xs border border-brand-border text-xs font-semibold tracking-wider text-brand-primary uppercase animate-float">
            <SparkleIcon className="w-4 h-4 fill-brand-primary" />
            <span>Next-Gen ATS Scanner</span>
          </div>

          {/* Heading */}
          <h1 className="max-w-xl text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-brand-text leading-[1.1] sm:leading-[1.05]">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-primary via-indigo-600 to-brand-secondary">Optimized Resumes.</span>
            <br />
            <span>Instant Interview Calls.</span>
          </h1>

          {/* Subtext */}
          <p className="max-w-xl text-base sm:text-lg text-brand-text-muted font-normal leading-relaxed">
            Stop guessing why your applications are hitting a wall. Securely scan your resume PDF against corporate job screening algorithms to isolate missing technical keywords and fix critical gaps in seconds.
          </p>

          {/* Call to Action & Trust Indicators */}
          <div className="w-full flex flex-col items-center lg:items-start gap-5 pt-2">
            <Link
              to="/analyze"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-primary text-white font-bold text-lg rounded-xl shadow-lg shadow-brand-primary/25 hover:bg-brand-primary-hover hover:shadow-xl hover:shadow-brand-primary/35 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all duration-300 transform cursor-pointer"
            >
              <span>Scan Your Resume — It’s Free</span>
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs font-semibold text-brand-text-muted">
              <span className="flex items-center gap-1.5">
                <ShieldCheckIcon className="w-4 h-4 text-brand-success" />
                100% Secure & Confidential
              </span>
              <span className="hidden sm:inline w-1.5 h-1.5 rounded-full bg-brand-border" />
              <span className="flex items-center gap-1.5">
                <FilePdfIcon className="w-4 h-4 text-brand-danger" />
                PDF Format Only
              </span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN - Beautiful Interactive Mockup Showcase */}
        <div className="lg:col-span-5 relative flex justify-center items-center w-full z-10">
          
          {/* Subtle glow sphere behind card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-primary/15 rounded-full blur-[80px] -z-10 pointer-events-none" />

          {/* Premium ATS Mockup Card */}
          <div className="w-full max-w-sm rounded-3xl bg-slate-950 border border-slate-900 p-6 shadow-2xl relative overflow-hidden backdrop-blur-xl animate-float">
            
            {/* Tech grid mesh overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-size-[2rem_2rem] opacity-25 pointer-events-none" />

            {/* Mock Header */}
            <div className="flex justify-between items-center mb-6 relative z-10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-danger" />
                <span className="w-2.5 h-2.5 rounded-full bg-brand-accent" />
                <span className="w-2.5 h-2.5 rounded-full bg-brand-success" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 bg-slate-900 border border-slate-800/80 px-3 py-1 rounded-full">
                LIVE ATS FEEDBACK
              </span>
            </div>

            {/* Circular Gauge Score */}
            <div className="flex flex-col items-center justify-center py-6 border-b border-slate-900/60 relative z-10">
              <div className="relative flex items-center justify-center w-28 h-28 rounded-full bg-slate-900/40 border border-indigo-500/20 shadow-inner">
                {/* Dashed outer spinner */}
                <div className="absolute inset-1.5 rounded-full border border-dashed border-indigo-500/25 animate-spin [animation-duration:16s]" />
                
                {/* Score numbers */}
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-cyan-400">88</span>
                  <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400">ATS Score</span>
                </div>
              </div>
              
              {/* Prediction result */}
              <span className="mt-4 text-xs font-bold text-brand-success bg-brand-success/10 border border-brand-success/20 px-3.5 py-1.5 rounded-full flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-success animate-pulse" />
                OPTIMIZED FOR HIRING
              </span>
            </div>

            {/* Mini analysis report items */}
            <div className="mt-6 space-y-5 relative z-10">
              
              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                  <span>Keyword Match Density</span>
                  <span className="text-indigo-400">92%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full w-[92%] bg-linear-to-r from-indigo-500 to-cyan-400 rounded-full" />
                </div>
              </div>

              {/* Badges for missing keywords */}
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase block">Missing Technical Keywords</span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-bold text-brand-danger bg-brand-danger/10 border border-brand-danger/20 px-2.5 py-1 rounded-lg">Cloud Architect</span>
                  <span className="text-[10px] font-bold text-brand-danger bg-brand-danger/10 border border-brand-danger/20 px-2.5 py-1 rounded-lg">GraphQL</span>
                  <span className="text-[10px] font-bold text-brand-danger bg-brand-danger/10 border border-brand-danger/20 px-2.5 py-1 rounded-lg">Docker</span>
                </div>
              </div>

              {/* Badges for strengths */}
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase block">Verified Strengths</span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-bold text-brand-success bg-brand-success/10 border border-brand-success/20 px-2.5 py-1 rounded-lg">TypeScript Core</span>
                  <span className="text-[10px] font-bold text-brand-success bg-brand-success/10 border border-brand-success/20 px-2.5 py-1 rounded-lg">Async Operations</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

    </section>
  );
}
