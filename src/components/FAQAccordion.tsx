import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SectionTitle from "./SectionTitle";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "How long does a project take?",
    answer:
      "Most projects run between 4–10 weeks depending on scope. We'll give you a clear timeline after our discovery call.",
  },
  {
    question: "What technologies do you use?",
    answer: "We choose the right stack per project — commonly React, Node, PHP, and modern cloud infrastructure.",
  },
  {
    question: "Do you provide ongoing support?",
    answer: "Yes. Every project includes a support window, and we offer flexible maintenance plans after launch.",
  },
  {
    question: "How do we start a project?",
    answer: "Book a call or send us a brief. We'll follow up with a proposal and estimated timeline within 48 hours.",
  },
];

function AccordionRow({
  item,
  open,
  onToggle,
}: {
  item: FAQItem;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-border">
      <button
        type="button"
        className="w-full flex items-center justify-between py-6 text-left"
        onClick={onToggle}
        aria-expanded={open}
      >
        <span className="text-base font-semibold pr-6 text-heading">{item.question}</span>
        <ChevronDown
          size={18}
          className="flex-shrink-0 text-azure transition-transform duration-250"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      <div className="overflow-hidden transition-all duration-250 ease-in-out" style={{ maxHeight: open ? 200 : 0 }}>
        <p className="pb-6 text-sm leading-relaxed text-muted">{item.answer}</p>
      </div>
    </div>
  );
}

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section id="faq" className="py-24 bg-canvas">
      <div className="max-w-3xl mx-auto px-6">
        <SectionTitle eyebrow="FAQ" title="Common questions" />
        <div>
          {FAQS.map((item, i) => (
            <AccordionRow
              key={item.question}
              item={item}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
