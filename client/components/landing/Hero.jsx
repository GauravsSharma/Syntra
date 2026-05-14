"use client"
import { useUserStore } from '@/stores/useUserStore';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'

const Hero = ({ playfair }) => {
    const { user } = useUserStore()
    const router = useRouter()
    const handleClick = () => {
        if (user) {
            router.push("/dashboard")
        }
        else {
            window.location.href = 'http://localhost:5000/api/auth/login';
        }
    }
    return (
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
        h-[16px]
        md:h-[25px]
        bg-[#e0aa83]
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
                    onClick={handleClick}
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
    )
}

export default Hero
