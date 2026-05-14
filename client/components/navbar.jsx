'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useUserStore } from '@/stores/useUserStore';
import { useGetUser } from '@/hooks/useUser';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useGetUser();

    const pathname = usePathname();
    const { user } = useUserStore();

    const loginInUser = () => {
        window.location.href = 'http://localhost:5000/api/auth/login';
    };

    const links = [
        { name: 'Features', href: '#features' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'Docs', href: '#docs' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 30);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [pathname]);

    return (
        <>
            <nav
                className={`
                    fixed top-4 left-1/2 -translate-x-1/2
                    w-[95%] max-w-7xl z-50
                    transition-all duration-300 ease-out
                    rounded-2xl

                    ${isScrolled
                        ? `
                            bg-white/10
                            backdrop-blur-2xl
                            backdrop-saturate-150
                            border border-white/20
                            shadow-[0_8px_32px_rgba(0,0,0,0.12)]
                          `
                        : `
                            bg-transparent
                            border border-transparent
                          `
                    }
                `}
            >
                <div className="flex items-center justify-between px-6 md:px-8 py-4">
                    {/* Logo */}
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

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-10">
                        {links.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="
                                    text-[15px]
                                    font-medium
                                    text-black/70
                                    hover:text-black
                                    transition-colors
                                "
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        {!user && (
                            <>
                            <button
                                onClick={loginInUser}
                                className="
                                    px-5 py-2.5
                                    rounded-full
                                    border border-white/20
                                    bg-white/20
                                    backdrop-blur-xl
                                    text-sm
                                    font-semibold
                                    text-black
                                    hover:bg-white/30
                                    transition-all
                                    active:scale-95
                                    "
                                    >
                                Login
                            </button>
                              <button
                            className="
                                px-5 py-2.5
                                rounded-full
                                bg-black
                                text-white
                                text-sm
                                font-semibold
                                hover:opacity-90
                                transition-all
                                active:scale-95
                            "
                        >
                            Get Started Free
                        </button>
                                </>
                        )}
{user &&
                        <Link
                        href={"/dashboard"}
                            className="
                                px-5 py-2.5
                                rounded-full
                                bg-black
                                text-white
                                text-sm
                                font-semibold
                                hover:opacity-90
                                transition-all
                                active:scale-95
                            "
                        >
                            Dashboard
                        </Link>}
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden text-black"
                    >
                        {menuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div
                        className="
                            md:hidden
                            border-t border-white/10
                            bg-white/10
                            backdrop-blur-2xl
                            rounded-b-2xl
                        "
                    >
                        <div className="px-6 py-6 flex flex-col gap-5">
                            {links.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setMenuOpen(false)}
                                    className="
                                        text-[15px]
                                        font-medium
                                        text-black/75
                                        hover:text-black
                                        transition-colors
                                    "
                                >
                                    {item.name}
                                </Link>
                            ))}

                            <div className="flex flex-col gap-3 pt-2">
                                {!user && (
                                    <button
                                        onClick={loginInUser}
                                        className="
                                            w-full
                                            py-3
                                            rounded-full
                                            border border-white/20
                                            bg-white/20
                                            backdrop-blur-xl
                                            text-sm
                                            font-semibold
                                            text-black
                                        "
                                    >
                                        Login
                                    </button>
                                )}

                                <button
                                    className="
                                        w-full
                                        py-3
                                        rounded-full
                                        bg-black
                                        text-white
                                        text-sm
                                        font-semibold
                                    "
                                >
                                    Get Started Free
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Spacer */}
            <div className="h-[110px]" />
        </>
    );
}