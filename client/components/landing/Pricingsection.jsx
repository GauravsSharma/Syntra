"use client"
import { useUserStore } from "@/stores/useUserStore";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const PLANS = {
  FREE: {
    name: "Free",
    subtitle: "Get started in seconds",
    price: 0,
    priceLabel: "Free",
    aiMessages: 100,
    knowledgeSources: 1,
    conversations: "100 / mo",
    features: [
      "1 chatbot",
      "1 knowledge source/section",
      "100 AI messages / mo",
      "Basic customisation",
      "Email support",
    ],
    cta: "Start free",
    popular: false,
    dark: false,
  },
  NINJA: {
    name: "Ninja",
    subtitle: "For growing teams",
    price: 9.99,
    priceLabel: "$9.99",
    aiMessages: 2000,
    knowledgeSources: 2,
    conversations: "2,000 / mo",
    features: [
      "2 chatbots",
      "Upto 2 knowledge sources/section",
      "2,000 AI messages / mo",
      "Custom branding",
      "Priority email support",
      "Analytics dashboard",
    ],
    cta: "Buy now",
    popular: true,
    dark: true,
  },
  NINJA_PRO: {
    name: "Ninja Pro",
    subtitle: "For scale & compliance",
    price: 29.99,
    priceLabel: "$29.99",
    aiMessages: 10000,
    knowledgeSources: 5,
    conversations: "10,000 / mo",
    features: [
      "Unlimited chatbots",
      "Upto 5 knowledge sources/section",
      "10,000 AI messages / mo",
      "Custom integrations",
      "Priority support",
      "SLA & compliance",
    ],
    cta: "Buy now",
    popular: false,
    dark: false,
  },
};

export default function PricingSection({ playfair }) {
  const plans = Object.values(PLANS);
  const {user} = useUserStore()
  const router = useRouter()
  const handleClick = ()=>{
    if(user){
     router.push("/dashboard/billing")
    }
    else{
      toast.error("Please login first.")
    }
  }
  return (
    <section id="pricing" className="w-full bg-transparent px-6 py-20 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="flex items-center gap-2 mb-5">
            <span className="w-2 h-2 rounded-full bg-[#c0522a] inline-block" />
            <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#555]">
              Pricing
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a1a] leading-tight mb-4">
            Simple,{" "}
            <span className={`${playfair?.className ?? ""} italic font-normal`}>
              honest
            </span>{" "}
            pricing.
          </h2>
          <p className="text-[16px] text-[#777]">
            Start free. Scale when you're ready.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl flex flex-col ${
                plan.dark
                  ? "bg-[#1a1a1a] text-white"
                  : "bg-[#f0ece4] text-[#1a1a1a] border border-[#e0dbd2]"
              }`}
            >
              {/* Most popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <span className="bg-[#c0522a] text-white text-[10.5px] font-bold tracking-[0.12em] uppercase px-4 py-1.5 rounded-full whitespace-nowrap">
                    Most popular
                  </span>
                </div>
              )}

              <div className="p-7 flex flex-col gap-6">
                {/* Plan name */}
                <div>
                  <h3 className={`text-[20px] font-bold mb-1 ${plan.dark ? "text-white" : "text-[#1a1a1a]"}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-[13.5px] ${plan.dark ? "text-white/50" : "text-[#888]"}`}>
                    {plan.subtitle}
                  </p>
                </div>

                {/* Price */}
                <div className="flex items-end gap-1">
                  <span className={`text-5xl font-extrabold leading-none ${plan.dark ? "text-white" : "text-[#1a1a1a]"}`}>
                    {plan.priceLabel}
                  </span>
                  {plan.price > 0 && plan.name !== "Ninja Pro" && (
                    <span className={`text-[13px] mb-1.5 ${plan.dark ? "text-white/50" : "text-[#999]"}`}>
                      /mo
                    </span>
                  )}
                </div>

                {/* CTA */}
                <button
                onClick={handleClick}
                  className={`w-full py-3.5 rounded-xl text-[15px] font-semibold transition-all duration-150 active:scale-95 ${
                    plan.popular
                      ? "bg-[#c0522a] hover:bg-[#a8461f] text-white"
                      : plan.dark
                      ? "bg-white text-[#1a1a1a] hover:bg-white/90"
                      : "bg-[#1a1a1a] text-white hover:bg-[#333]"
                  }`}
                >
                  {plan.cta}
                </button>

                {/* Divider */}
                <div className={`h-px ${plan.dark ? "bg-white/10" : "bg-[#ddd8d0]"}`} />

                {/* Features */}
                <ul className="flex flex-col gap-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <Check
                        size={14}
                        strokeWidth={2.5}
                        className={plan.dark ? "text-[#c0522a]" : "text-[#888]"}
                      />
                      <span className={`text-[13.5px] ${plan.dark ? "text-white/75" : "text-[#555]"}`}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}