// app/page.jsx

import Navbar from "@/components/navbar";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Poppins, Playfair_Display } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
});

export default function SyntraLanding() {
  return (
    <div className={`${poppins.className} min-h-screen w-full`}>
      {/* Background */}
      <div
        className="min-h-screen w-full relative overflow-hidden"
        style={{
          background: `
            radial-gradient(
              circle at 15% 45%,
              #e7c6b4 0%,
              #ead9cb 28%,
              #f2eadf 52%,
              #f5edd6 72%,
              #f6efcb 100%
            )
          `,
        }}
      >
        {/* Noise Texture */}
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Soft Right Glow */}
        <div className="absolute right-[-180px] top-[80px] h-[520px] w-[520px] rounded-full bg-[#f4dd8b]/40 blur-3xl" />

        {/* Navbar */}
        <Navbar />

        {/* Hero */}
        <main className="relative z-10 flex flex-col items-center text-center px-6 pt-20 pb-24 md:pt-20 md:pb-32">
          {/* Badge */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[#d96a3a]" />

            <span className="text-[11px] md:text-xs font-medium tracking-[0.35em] uppercase text-black/50">
              AI-Powered Support Platform
            </span>
          </div>

          {/* Heading */}
      <h1
  className="
    text-5xl
    md:text-6xl
    lg:text-7xl
    font-semibold
    leading-[0.95]
    tracking-[-0.06em]
    text-black/90
    max-w-6xl
    mb-8
  "
>
  Your smartest customer
  <br />
  support agent,{" "}

  {/* Overlay Text */}
  <span className="relative inline-block">
    {/* underline / overlay */}
    <span
      className="
        absolute
        left-0
        bottom-[12%]
        w-full
        h-[10px]
        md:h-[14px]
        bg-[#c98d63]
        opacity-55
        -z-10
        rounded-full
      "
    />

    <span
      className={`
        ${playfair.className}
        italic
        font-normal
        tracking-[-0.03em]
        relative
        z-10
      `}
    >
      always on
    </span>
  </span>
  .
</h1>

          {/* Subtext */}
          <p
            className="
              text-[17px]
              leading-[1.7]
              text-black/55
              max-w-xl
              mb-8
              font-medium
            "
          >
            Syntra lets you build AI chatbots trained on your own
            knowledge — with real-time human escalation when it
            matters most.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
            {/* Primary */}
            <button
              className="
                flex items-center gap-2
                px-8 py-4
                rounded-full
                bg-black
                text-white
                text-[15px]
                font-semibold
                transition-all
                hover:opacity-90
                active:scale-[0.98]
                shadow-sm
              "
            >
              Start for free
              <ArrowRight size={16} />
            </button>

            {/* Secondary */}
            <button
              className="
                flex items-center gap-2
                px-8 py-4
                rounded-full
                border border-black/10
                bg-white/30
                backdrop-blur-md
                text-black/80
                text-[15px]
                font-medium
                transition-all
                hover:bg-white/50
                active:scale-[0.98]
              "
            >
              See how it works
              <ArrowUpRight size={16} />
            </button>
          </div>

          {/* Bottom Text */}
          <p className="text-[11px] uppercase tracking-[0.35em] text-black/40 font-medium">
            Trusted by teams at 50+ companies
          </p>
        </main>
      </div>
    </div>
  );
}