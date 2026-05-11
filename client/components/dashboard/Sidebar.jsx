"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  Layers,
  MessageSquare,
  Inbox,
  Settings,
  ChevronsUpDown,
  CreditCard,
} from "lucide-react";
import { useUserStore } from "@/stores/useUserStore";
import { useConversationStore } from "@/stores/useConversationStore";
import OrgSwitcher from "../OrgSwitcher";
// import {  } from "radix-ui";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Knowledge", icon: BookOpen, href: "/dashboard/knowledge" },
  { label: "Sections", icon: Layers, href: "/dashboard/sections" },
  { label: "Chatbot", icon: MessageSquare, href: "/dashboard/chatbot" },
  { label: "Conversations", icon: Inbox, href: "/dashboard/conversations" },
  { label: "Settings", icon: Settings, href: "/dashboard/settings" },
  { label: "Billing", icon: CreditCard, href: "/dashboard/billing" },
];
const mockOrgs = [
  {
    id: '1',
    name: 'Acme Corp',
    ownerEmail: 'gauravsharma16072001@gmail.com',
    logo: null,
  },
  {
    id: '2',
    name: 'Stark Industries',
    ownerEmail: 'tony@starkindustries.com',
    logo: null,
  },
  {
    id: '3',
    name: 'Wayne Enterprises',
    ownerEmail: 'bruce@wayne.com',
    logo: null,
  },
];


export default function Sidebar() {
  const { metadata } = useUserStore()
  const [open, setOpen] = useState(false);
  const [activeOrg, setActiveOrg] = useState();
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { count } = useConversationStore();
  const pathname = usePathname();
 const hideMobileNav = pathname === "/dashboard/conversations";
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setActiveOrg({
      id: metadata?.id,
    })
  }, [metadata])


  const getInitials = (name) => {
    if (!name) return "NA";
    return name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  // Render a lightweight shell on the server / before hydration to avoid mismatch
  if (!mounted) {
    return (
      <>
        {/* Desktop sidebar shell — same width so layout doesn't shift */}
        <aside className="hidden md:flex flex-col h-screen fixed top-0 left-0 border-r border-white/[0.06] shrink-0 overflow-hidden z-40 w-[220px]" />
        {/* Mobile nav shell — same height so content padding doesn't shift */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 h-[72px]" />
      </>
    );
  }

  const isActive = (href) =>
    href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname.startsWith(href);

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 68 : 220 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="hidden md:flex flex-col h-screen fixed top-0 left-0 border-r border-white/[0.06] shrink-0 overflow-hidden z-40"
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-4 py-5 border-b border-white/[0.06] min-h-[64px]">
          <div className="flex items-center justify-center w-7 h-7 rounded-md bg-white shrink-0">
            <div className="w-3.5 h-3.5 rounded-sm bg-[#0d0d10]" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.2 }}
                className="text-sm font-semibold text-white whitespace-nowrap tracking-tight"
              >
                SYNTRA
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-0.5 px-2 py-3 flex-1">
          {navItems.map(({ label, icon: Icon, href }) => {
            const active = isActive(href);
            return (
              <Link
                key={label}
                href={href}
                className={`group relative flex items-center gap-3 px-2.5 py-2 rounded-lg transition-all duration-150 ${active
                  ? "bg-white/[0.08] text-white"
                  : "text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.04]"
                  }`}
              >
                {active && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full bg-white"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                <div className="relative shrink-0">
                  <Icon
                    size={16}
                    strokeWidth={1.8}
                    className={`transition-colors ${active
                      ? "text-white"
                      : "text-zinc-500 group-hover:text-zinc-300"
                      }`}
                  />
                  {collapsed && label === "Conversations" && count > 0 && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full" />
                  )}
                </div>

                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -4 }}
                      transition={{ duration: 0.18 }}
                      className="text-[13px] font-medium whitespace-nowrap flex-1"
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {!collapsed && label === "Conversations" && count > 0 && (
                  <span className="ml-auto bg-amber-500 text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center leading-tight">
                    {count > 99 ? "99+" : count}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer - User */}
        <div className="border-t border-white/[0.06] px-3 py-3">
          <div className="flex items-center gap-2.5">
            <AnimatePresence>
              {!collapsed && (
                <button
                  onClick={() => setOpen(true)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition hover:bg-white/10"
                >
                  <Avatar className="size-8 shrink-0">
                    <AvatarImage src={activeOrg.logo} />
                    <AvatarFallback
                      className="bg-emerald-600 text-xs font-semibold text-white">
                      {getInitials(metadata?.business_name)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white">
                      {metadata?.business_name}
                    </p>
                    <p className="truncate text-xs text-white/50">{metadata?.owner_email}</p>
                  </div>

                  <ChevronsUpDown className="size-4 shrink-0 text-white/40" />
                </button>
              )}
            </AnimatePresence>
          </div>
        </div>
        <OrgSwitcher setActiveOrg={setActiveOrg} open={open} setOpen={setOpen} mockOrgs={mockOrgs} activeOrg={activeOrg} getInitials={getInitials} />
      </motion.aside>

      {/* ── Mobile Bottom Navigation ── */}
     { !hideMobileNav &&  <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-3 pb-4 pt-0">
        {/* Glass pill container */}
        <div
          className="relative flex items-center justify-around px-2 py-2 rounded-2xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.06) inset",
          }}
        >
          {/* Subtle top highlight line */}
          <div
            className="absolute inset-x-6 top-0 h-px rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
            }}
          />

          {navItems.map(({ label, icon: Icon, href }) => {
            const active = isActive(href);
            return (
              <Link
                key={label}
                href={href}
                className="relative flex flex-col items-center justify-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-[48px]"
              >
                {/* Active background blob */}
                {active && (
                  <motion.div
                    layoutId="mobileActiveBlob"
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)",
                      border: "1px solid rgba(255,255,255,0.10)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}

                {/* Icon wrapper */}
                <div className="relative">
                  <Icon
                    size={18}
                    strokeWidth={active ? 2 : 1.6}
                    className={`transition-all duration-200 ${active ? "text-white" : "text-zinc-500"
                      }`}
                  />
                  {/* Badge dot */}
                  {label === "Conversations" && count > 0 && (
                    <span
                      className="absolute -top-1 -right-1 flex items-center justify-center min-w-[14px] h-[14px] px-[3px] rounded-full bg-amber-500 text-black text-[8px] font-bold leading-none"
                    >
                      {count > 9 ? "9+" : count}
                    </span>
                  )}
                </div>

                {/* Label */}
                <span
                  className={`text-[9px] font-medium tracking-wide transition-all duration-200 leading-none ${active ? "text-white" : "text-zinc-600"
                    }`}
                >
                  {label}
                </span>

                {/* Active dot indicator */}
                {active && (
                  <motion.span
                    layoutId="mobileActiveDot"
                    className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/60"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

      </nav>}
    </>
  );
}