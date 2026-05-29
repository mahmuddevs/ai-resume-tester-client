import { useState } from "react";
import { ShieldCheckIcon, LightningIcon, ChartBarIcon } from "@phosphor-icons/react";
import { FAQItem } from "./faq-item";
import SectionHeading from "./section-heading";

interface FAQData {
  question: string;
  answer: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
}

export default function FAQAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs: FAQData[] = [
    {
      question: "How secure is my data?",
      answer: "Completely secure. We enforce zero-file persistence on our servers. Your resumes are parsed entirely within temporary, volatile RAM memory buffers via standard streams and are instantly destroyed once your analysis is compiled.",
      icon: ShieldCheckIcon,
      iconBg: "bg-brand-primary/10 text-brand-primary",
    },
    {
      question: "How fast is the resume processing?",
      answer: "Thanks to our multithreaded backend running decoupled, native Node.js background worker processes, deep semantic text extractions and AI model transactions are fully finalized in under 4 seconds.",
      icon: LightningIcon,
      iconBg: "bg-brand-secondary/10 text-brand-secondary",
    },
    {
      question: "Can I keep track of my scores?",
      answer: "Yes! Your authenticated dashboard securely tracks and aggregates your full scanning history, allowing you to monitor your score improvements over time across different job roles.",
      icon: ChartBarIcon,
      iconBg: "bg-brand-accent/10 text-brand-accent",
    },
  ];

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-white border-t border-brand-border/30 sec-padding relative overflow-hidden">
      {/* Background blurs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="cont relative z-10">
        {/* Heading Block */}
        <SectionHeading
          badge="Engine Internals"
          title={
            <>
              Technical{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-primary to-brand-secondary">
                FAQ
              </span>
            </>
          }
          subtitle="Frequently asked system questions addressing security, performance, and analytical longevity."
          align="center"
        />

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeIndex === idx;

            return (
              <FAQItem key={idx} isOpen={isOpen}>
                <FAQItem.Header
                  isOpen={isOpen}
                  question={faq.question}
                  onClick={() => toggleAccordion(idx)}
                  icon={faq.icon}
                  iconBg={faq.iconBg}
                />
                <FAQItem.Body isOpen={isOpen}>
                  {faq.answer}
                </FAQItem.Body>
              </FAQItem>
            );
          })}
        </div>
      </div>
    </section>
  );
}
