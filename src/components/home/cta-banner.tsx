import { Link } from "react-router";
import { ArrowRightIcon, SparkleIcon } from "@phosphor-icons/react";

export default function ClosingCTABanner() {
  return (
    <section className="relative w-full sec-padding bg-slate-950 border-t border-slate-900/60 overflow-hidden">
      {/* Mesh grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-size-[3rem_3rem] opacity-25 pointer-events-none" />

      {/* Radiant glow spheres */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-150 h-87.5 bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute -bottom-40 left-1/4 w-96 h-96 bg-brand-secondary/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Content Container */}
      <div className="relative cont text-center space-y-8 z-10">

        {/* Floating Sparkle Micro-badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold tracking-wider uppercase animate-float">
          <SparkleIcon weight="fill" color="#818cf8" className="w-4 h-4" />
          <span className="text-slate-200">Optimize in Minutes</span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white! leading-tight">
          Ready to land your next <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-primary via-indigo-400 to-brand-secondary">
            technical interview?
          </span>
        </h2>

        {/* Subtext */}
        <p className="max-w-xl mx-auto text-base sm:text-lg text-slate-400 font-normal leading-relaxed">
          Join other developers optimizing their resumes for modern engineering roles.
        </p>

        {/* Call to Action Button */}
        <div className="pt-4">
          <Link
            to="/auth/login"
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-primary text-white font-extrabold text-lg rounded-xl shadow-lg shadow-brand-primary/25 hover:bg-brand-primary-hover hover:shadow-xl hover:shadow-brand-primary/35 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all duration-300 transform cursor-pointer"
          >
            <span>Get Started Instantly</span>
            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

      </div>
    </section>
  );
}
