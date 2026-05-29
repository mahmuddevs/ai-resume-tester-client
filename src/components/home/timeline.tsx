import { SignInIcon, FileArrowUpIcon, MagicWandIcon } from "@phosphor-icons/react";
import SectionHeading from "./section-heading";

export default function Timeline() {
  const steps = [
    {
      number: "01",
      title: "Authenticate Instantly",
      body: "Sign in securely with a single click using Google Identity services. No password configuration required.",
      Icon: SignInIcon,
      color: "from-brand-primary to-indigo-600",
      glow: "shadow-brand-primary/20",
    },
    {
      number: "02",
      title: "Define Your Target",
      body: "Drop your resume PDF into our secure upload drop-zone and paste the text of the job description you are targeting.",
      Icon: FileArrowUpIcon,
      color: "from-brand-secondary to-blue-600",
      glow: "shadow-brand-secondary/20",
    },
    {
      number: "03",
      title: "Refactor & Apply",
      body: "Instantly view your ATS match score, clear out keyword gaps, and apply the AI-powered bullet-point rewrites.",
      Icon: MagicWandIcon,
      color: "from-brand-accent to-orange-600",
      glow: "shadow-brand-accent/20",
    },
  ];

  return (
    <section className="w-full bg-brand-bg sec-padding relative overflow-hidden">
      {/* Ambient background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="cont relative z-10">
        {/* Heading block */}
        <SectionHeading
          badge="Workflow"
          title={
            <>
              How It{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-primary to-brand-secondary">
                Works
              </span>
            </>
          }
          subtitle="Get from onboarding to optimized, high-converting interview calls in three simple, frictionless steps."
          align="center"
        />

        {/* Horizontal Sequence Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 xl:gap-12 2xl:gap-16 items-stretch">

          {steps.map((step, idx) => (
            <div key={idx} className="group relative flex flex-col items-start text-left space-y-6 h-full">
              {/* Connecting line (desktop only) */}
              <div
                className={`hidden md:block absolute top-5.5 left-5.5 h-0.75 bg-linear-to-r -z-10 animate-pulse-subtle ${idx === 0
                  ? "w-[calc(100%+2rem)] xl:w-[calc(100%+3rem)] 2xl:w-[calc(100%+4rem)] from-brand-primary/60 to-brand-secondary/75"
                  : idx === 1
                    ? "w-[calc(100%+2rem)] xl:w-[calc(100%+3rem)] 2xl:w-[calc(100%+4rem)] from-brand-secondary/75 to-brand-accent/60"
                    : "w-[calc(100%-1.375rem)] from-brand-accent/60 to-transparent"
                  }`}
              />

              {/* Step bubble header */}
              <div className="flex items-center justify-between w-full md:w-auto relative z-10">
                {/* Circular Step Number Badge */}
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-tr from-brand-primary to-brand-secondary text-white text-sm font-extrabold tracking-tight shadow-md shadow-brand-primary/20 group-hover:scale-110 transition-transform duration-300">
                  {step.number}
                </div>

                {/* Connecting line on mobile */}
                <div className="md:hidden flex-1 h-0.5 bg-brand-border/40 ml-4" />
              </div>

              {/* Step Card */}
              <div className="w-full grow rounded-2xl bg-white/60 backdrop-blur-md border border-brand-border/40 p-6 shadow-xs hover:shadow-lg hover:border-brand-primary/20 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 flex flex-col items-start text-left justify-start">

                {/* Icon Bubble */}
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-tr ${step.color} text-white shadow-lg ${step.glow} mb-5 group-hover:scale-105 transition-transform duration-300`}>
                  <step.Icon className="h-6 w-6" />
                </div>

                {/* Step Title */}
                <h3 className="text-lg font-bold text-brand-text mb-2 tracking-tight group-hover:text-brand-primary transition-colors duration-300">
                  {step.title}
                </h3>

                {/* Step Body */}
                <p className="text-sm font-normal text-brand-text-muted leading-relaxed">
                  {step.body}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
