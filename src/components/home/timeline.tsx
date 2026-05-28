import { SignInIcon, FileArrowUpIcon, MagicWandIcon } from "@phosphor-icons/react";

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
    <section className="relative w-full max-w-7xl mx-auto py-20 px-6 sm:px-12 bg-transparent overflow-hidden font-sans">
      {/* Ambient background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Heading block */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        {/* Micro-badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary/5 border border-brand-primary/20 text-xs font-semibold uppercase tracking-wider text-brand-primary">
          <span>Workflow</span>
        </div>

        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          How It{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-primary to-brand-secondary">
            Works
          </span>
        </h2>

        {/* Section Subtext */}
        <p className="text-base text-brand-text-muted max-w-xl mx-auto leading-relaxed">
          Get from onboarding to optimized, high-converting interview calls in three simple, frictionless steps.
        </p>
      </div>

      {/* Horizontal Sequence Grid */}
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 xl:gap-12 2xl:gap-16 items-stretch">

        {/* Horizontal Connection line (hidden on mobile) */}
        <div className="hidden md:block absolute top-5.5 left-[15%] right-[15%] h-0.5 bg-linear-to-r from-brand-primary/20 via-brand-secondary/30 to-brand-accent/20 -z-10" />

        {steps.map((step, idx) => (
          <div key={idx} className="group relative flex flex-col items-start text-left space-y-6 h-full">

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
    </section>
  );
}
