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
   useGetUser()
    const pathname = usePathname();
    const { user } = useUserStore();

    const loginInUser = () => {
        window.location.href = "http://localhost:5000/api/auth/login";
    };

    const links = [
        { name: 'Features', href: '#features' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'Docs', href: '#docs' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
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
                    fixed top-0 left-0 w-full z-50
                    transition-all duration-300
                    ${isScrolled
                        ? 'backdrop-blur-xl bg-[#f5f1ea]/80 border-b border-black/5'
                        : 'bg-transparent'
                    }
                    `}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-5">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src={"/syntra.png"}
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
                                    text-black/65
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
                            <button
                                onClick={loginInUser}
                                className="
                                    px-5 py-2.5
                                    rounded-full
                                    border border-black/10
                                    bg-white/50
                                    text-sm
                                    font-semibold
                                    text-black
                                    hover:bg-white
                                    transition-all
                                    active:scale-95
                                "
                            >
                                Login
                            </button>
                        )}

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
                            border-t border-black/5
                            bg-[#f5f1ea]/95
                            backdrop-blur-xl
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
                                            border border-black/10
                                            text-sm
                                            font-semibold
                                            bg-white
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

            {/* Spacer because navbar is fixed */}
            <div className="h-[90px]" />
        </>
    );
}