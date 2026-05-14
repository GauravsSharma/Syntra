// app/page.jsx

import Footer from "@/components/footer";
import SyntraAssistant from "@/components/landing/ChatbotExp";
import CTASection from "@/components/landing/CTASection";
import EscalationSection from "@/components/landing/Escalationsection";
import FeaturesSection from "@/components/landing/Featuressection";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/Howitworks";
import PricingSection from "@/components/landing/Pricingsection";
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

       <Hero playfair={playfair}/>
       <SyntraAssistant/>
       <FeaturesSection playfair={playfair}/>
       <HowItWorks playfair={playfair}/>
       <EscalationSection playfair={playfair}/>
       <PricingSection playfair={playfair}/>
       <CTASection playfair={playfair}/>
       <Footer playfair={playfair}/>
      </div>
    </div>
  );
}