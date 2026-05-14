"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer({ playfair }) {
  const links = ["Features", "Pricing", "Docs", "Privacy", "Terms"];

  return (
    <footer className="w-full bg-transparent px-6 md:px-12 lg:px-20 pt-10 pb-8">
      <div className="max-w-6xl mx-auto">

        {/* Top row */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-8 border-b border-[#ddd8d0]">

          {/* Logo + tagline */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2.5">
              {/* Logo mark */}
               <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/syntra.png"
                            height={130}
                            width={130}
                            alt="Syntra Logo"
                            className="invert w-[110px] md:w-[130px] h-auto"
                            priority
                        />
                    </Link>
            </div>
            <p className={`${playfair?.className ?? ""} italic text-[15px] text-[#888]`}>
              AI support, built for humans.
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex items-center gap-6 sm:gap-8 flex-wrap">
            {links.map((link) => (
              <a
                key={link}
                href="#"
                className="text-[14px] text-[#555] hover:text-[#1a1a1a] transition-colors duration-150"
              >
                {link}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom row */}
        <div className="pt-6">
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#aaa]">
            © 2025 Syntra — All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}