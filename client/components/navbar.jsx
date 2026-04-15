'use client';

import { MenuIcon, XIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { useUserStore } from '@/stores/useUserStore';

export default function Navbar() {
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    const {user} = useUserStore();
    const loginInUser = () => {
        window.location.href = "http://localhost:5000/api/auth/login";
    };
    const links = [
        { name: 'Home', href: '/' },
        { name: 'Integrations', href: '#integrations' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'test', href: '/test' },

    ];

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [pathname]);
console.log("Rendering Navbar");
    return (
        <>
            <motion.nav className={`sticky top-0 z-50 flex w-full items-center justify-between px-4 py-3.5 md:px-16 lg:px-24 transition-colors ${isScrolled ? 'bg-white/15 backdrop-blur-lg' : ''}`}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
            >
                <Link href={"/"} className="flex justify-center items-center gap-2">
                    <Image
                        src="/syntra.png"
                        width={120}
                        height={120}
                        alt='syntra'
                    ></Image>
                </Link>

                <div className='hidden items-center space-x-10 md:flex'>
                    {links.map((link) => (
                        <Link key={link.name} href={link.href} className='transition hover:text-gray-300'>
                            {link.name}
                        </Link>
                    ))}
                    {
                        !user && <>
                            <div onClick={loginInUser} className='text-lg font-medium'>
                                Sign In
                            </div>
                            <div onClick={loginInUser} className='btn glass'>
                                Get Started
                            </div>
                        </>
                    }

                  { user && <Link href="/dashboard" className=' btn glass'>
                       Dashboard
                    </Link>
                    }

                </div>

                <button onClick={() => setIsOpen(true)} className='transition active:scale-90 md:hidden'>
                    <MenuIcon className='size-6.5' />
                </button>
            </motion.nav>

            <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-black/20 text-lg font-medium backdrop-blur-2xl transition duration-300 md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {links.map((link) => (
                    <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)}>
                        {link.name}
                    </Link>
                ))}

                {
                    !user && <>
                        <div onClick={loginInUser} className='text-lg font-medium'>
                            Sign In
                        </div>
                        <div onClick={loginInUser} className='btn glass'>
                            Get Started
                        </div>
                    </>
                }
                { user && <Link href="/dashboard" className=''>
                       Dashboard
                    </Link>}

                <button onClick={() => setIsOpen(false)} className='rounded-md p-2 glass'>
                    <XIcon />
                </button>
            </div >
        </>
    );
}
