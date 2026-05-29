import type { ReactNode } from "react";

interface SectionHeadingProps {
  badge: string;
  title: ReactNode;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = "center",
  className = ""
}: SectionHeadingProps) {
  
  // Alignment mapping flags
  const alignmentClasses = {
    left: "text-left mr-auto items-start",
    center: "text-center mx-auto items-center",
    right: "text-right ml-auto items-end",
  };

  const subtitleAlignmentClasses = {
    left: "mr-auto",
    center: "mx-auto",
    right: "ml-auto",
  };

  return (
    <div className={`max-w-3xl flex flex-col mb-16 space-y-4 ${alignmentClasses[align]} ${className}`}>
      {/* Micro-badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary/5 border border-brand-primary/20 text-xs font-semibold uppercase tracking-wider text-brand-primary w-fit">
        <span>{badge}</span>
      </div>

      {/* Section Title */}
      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-0 mb-0 leading-tight">
        {title}
      </h2>

      {/* Section Subtext */}
      {subtitle && (
        <p className={`text-base text-brand-text-muted max-w-xl leading-relaxed mt-0 ${subtitleAlignmentClasses[align]}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
