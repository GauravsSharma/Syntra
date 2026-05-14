"use client";

import { useUserStore } from "@/stores/useUserStore";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CTASection({ playfair }) {
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
    <section className="w-full bg-transparent px-4 py-16 sm:px-6 sm:py-20 md:px-10 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <div
          className="
            relative
            overflow-hidden
            rounded-[28px]
            sm:rounded-[34px]
            min-h-[280px]
            sm:min-h-[340px]
            flex
            flex-col
            items-center
            justify-center
            text-center
            px-5
            py-14
            sm:px-8
          "
          style={{
            background:
              "radial-gradient(circle at 50% 28%, rgba(120,40,10,0.95) 0%, rgba(20,12,8,0.98) 38%, #090909 100%)",
            boxShadow: "0 28px 60px rgba(0,0,0,0.12)",
          }}
        >
          {/* Glow */}
          <div
            className="
              absolute
              inset-0
              opacity-60
              bg-[radial-gradient(circle_at_center,rgba(192,82,42,0.22),transparent_42%)]
            "
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center">
            <h2
              className="
                text-[34px]
                leading-[1]
                tracking-[-0.05em]
                font-semibold
                text-[#f5f1ea]

                sm:text-[48px]
                md:text-[58px]
                lg:text-5xl

                max-w-[320px]
                sm:max-w-3xl
                lg:max-w-5xl
              "
            >
              Ready to transform your{" "}
              <span
                className={`
                  ${playfair?.className ?? ""}
                  italic
                  font-normal
                  tracking-[-0.03em]
                `}
              >
                support
              </span>
              ?
            </h2>

            <p
              className="
                mt-5
                text-[14px]
                leading-relaxed
                text-[#b8aaa0]
                font-medium

                sm:mt-6
                sm:text-[15px]

                max-w-[290px]
                sm:max-w-xl
              "
            >
              Join hundreds of teams using Syntra to deliver faster,
              smarter support.
            </p>

            <button
              onClick={handleClick}
              className="
                group
                mt-8
                inline-flex
                items-center
                justify-center
                gap-2

                h-[48px]
                px-7

                sm:h-[52px]
                sm:px-8

                rounded-full
                bg-[#d4550b]

                text-[14px]
                sm:text-[15px]
                font-semibold
                text-white

                transition-all
                duration-300
                hover:bg-[#e05c10]
                hover:scale-[1.02]
                active:scale-[0.98]
              "
              style={{
                boxShadow: "0 10px 30px rgba(212,85,11,0.32)",
              }}
            >
              Get Started Free

              <ArrowRight
                size={16}
                strokeWidth={2.4}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-0.5
                "
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}