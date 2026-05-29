import type { ReactNode } from "react";
import { CaretDownIcon } from "@phosphor-icons/react";

interface FAQItemProps {
  children: ReactNode;
  isOpen: boolean;
}

export function FAQItem({ children, isOpen }: FAQItemProps) {
  return (
    <div
      className={`group w-full rounded-2xl bg-white/60 backdrop-blur-md border border-brand-border/40 p-1.5 shadow-xs transition-all duration-300 hover:shadow-md ${
        isOpen ? "bg-white/80 shadow-lg border-brand-primary/30" : "hover:border-brand-primary/20"
      }`}
    >
      {children}
    </div>
  );
}

interface FAQItemHeaderProps {
  isOpen: boolean;
  question: string;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
}

FAQItem.Header = function FAQItemHeader({
  isOpen,
  question,
  onClick,
  icon: Icon,
  iconBg
}: FAQItemHeaderProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between text-left p-4 cursor-pointer focus:outline-hidden"
      aria-expanded={isOpen}
    >
      <div className="flex items-center gap-4">
        {/* Circular Icon Wrapper */}
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconBg} transition-transform duration-300 group-hover:scale-105`}>
          <Icon className="h-5.5 w-5.5" />
        </div>
        
        {/* Question */}
        <span className={`text-base sm:text-lg font-bold text-brand-text transition-colors duration-300 ${isOpen ? "text-brand-primary" : "group-hover:text-brand-primary"}`}>
          {question}
        </span>
      </div>

      {/* Dropdown Chevron */}
      <div className={`flex items-center justify-center h-8 w-8 rounded-full bg-brand-border/20 group-hover:bg-brand-border/40 transition-colors duration-300`}>
        <CaretDownIcon
          className={`w-4 h-4 text-brand-text-muted transition-transform duration-300 ${
            isOpen ? "rotate-180 text-brand-primary" : ""
          }`}
        />
      </div>
    </button>
  );
};

interface FAQItemBodyProps {
  isOpen: boolean;
  children: ReactNode;
}

FAQItem.Body = function FAQItemBody({ isOpen, children }: FAQItemBodyProps) {
  return (
    <div
      className={`transition-all duration-300 ease-in-out overflow-hidden ${
        isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
      }`}
    >
      <div className="pl-18 pr-6 pb-5 pt-1">
        <p className="text-sm sm:text-base font-normal text-brand-text-muted leading-relaxed">
          {children}
        </p>
      </div>
    </div>
  );
};
