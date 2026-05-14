
import { Upload, SlidersHorizontal, Headphones } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Add knowledge",
    description: "Upload docs, paste URLs, or write custom content.",
  },
  {
    number: "02",
    icon: SlidersHorizontal,
    title: "Configure your bot",
    description: "Set tone, style, and embed on your site.",
  },
  {
    number: "03",
    icon: Headphones,
    title: "Support at scale",
    description: "AI handles queries, humans step in when needed.",
  },
];

export default function HowItWorks({ playfair }) {
  return (
    <section className="w-full bg-transparent px-6 py-20 md:px-12 lg:px-20">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="flex items-center gap-2 mb-5">
            <span className="w-2 h-2 rounded-full bg-[#c0522a] inline-block" />
            <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#555]">
              How it works
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-[#1a1a1a] leading-tight">
            Up and running in{" "}
            <span className={`${playfair?.className ?? ""} italic font-normal`}>
              minutes
            </span>
            .
          </h2>
        </div>

        {/* Steps */}
     {/* Steps */}
<div className="relative flex flex-col sm:flex-row items-center sm:items-start justify-between gap-16 sm:gap-0">

  {/* Connector lines — desktop only */}
  <div className="hidden sm:block absolute top-[36px] left-[calc(16.66%+36px)] right-[calc(16.66%+36px)] h-px bg-[#d8d2c8] z-0" />

  {steps.map((step) => {
    const Icon = step.icon;
    return (
      <div
        key={step.number}
        className="relative z-10 flex flex-col items-center text-center flex-1 px-4 w-full sm:w-auto"
      >
        {/* Circle icon */}
        <div className="w-[72px] h-[72px] rounded-full border border-[#d0cbc2] bg-white flex items-center justify-center mb-5 shadow-sm">
          <Icon size={22} color="#1a1a1a" strokeWidth={1.6} />
        </div>

        {/* Number */}
        <span className="text-[13px] font-semibold text-[#c0522a] tracking-wide mb-2">
          {step.number}
        </span>

        {/* Title */}
        <h3 className="text-[17px] font-semibold text-[#1a1a1a] mb-2 leading-snug">
          {step.title}
        </h3>

        {/* Description */}
        <p className="text-[14px] text-[#777] leading-relaxed max-w-[220px]">
          {step.description}
        </p>
      </div>
    );
  })}
</div>
      </div>
    </section>
  );
}