import type { ReactNode } from "react";

interface FeatureCardProps {
  children: ReactNode;
  borderColor: string;
}

export function FeatureCard({ children, borderColor }: FeatureCardProps) {
  return (
    <div className={`group relative flex flex-col rounded-3xl bg-white/60 backdrop-blur-md border border-brand-border/40 p-8 shadow-xs hover:shadow-2xl ${borderColor} hover:-translate-y-1.5 transition-all duration-300`}>
      {children}
    </div>
  );
}

interface FeatureCardHeaderProps {
  icon: React.ComponentType<{ className?: string }>;
  iconGradient: string;
  tag: string;
  tagColor: string;
  title: string;
  titleHoverColor: string;
}

FeatureCard.Header = function FeatureCardHeader({
  icon: Icon,
  iconGradient,
  tag,
  tagColor,
  title,
  titleHoverColor
}: FeatureCardHeaderProps) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-tr ${iconGradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <span className={`text-xs font-bold ${tagColor} uppercase tracking-wider`}>{tag}</span>
        <h3 className={`text-xl font-extrabold text-brand-text tracking-tight ${titleHoverColor} transition-colors duration-300`}>
          {title}
        </h3>
      </div>
    </div>
  );
};

interface FeatureCardBodyProps {
  children: ReactNode;
}

FeatureCard.Body = function FeatureCardBody({ children }: FeatureCardBodyProps) {
  return (
    <p className="text-sm font-normal text-brand-text-muted leading-relaxed mb-8 grow">
      {children}
    </p>
  );
};

interface FeatureCardPreviewProps {
  children: ReactNode;
}

FeatureCard.Preview = function FeatureCardPreview({ children }: FeatureCardPreviewProps) {
  return (
    <div className="w-full">
      {children}
    </div>
  );
};
