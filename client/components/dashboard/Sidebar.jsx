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
  Menu,
  X,
} from "lucide-react";
import { useUserStore } from "@/stores/useUserStore";
import { useConversationStore } from "@/stores/useConversationStore";
import OrgSwitcher from "../OrgSwitcher";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";

const bottomNavItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Knowledge", icon: BookOpen, href: "/dashboard/knowledge" },
  { label: "Sections", icon: Layers, href: "/dashboard/sections" },
  { label: "Chatbot", icon: MessageSquare, href: "/dashboard/chatbot" },
  { label: "Conversations", icon: Inbox, href: "/dashboard/conversations" },
];

const drawerItems = [
  { label: "Settings", icon: Settings, href: "/dashboard/settings" },
  { label: "Billing", icon: CreditCard, href: "/dashboard/billing" },
];

const allNavItems = [...bottomNavItems, ...drawerItems];

const mockOrgs = [
  { id: "1", name: "Acme Corp", ownerEmail: "gauravsharma16072001@gmail.com", logo: null },
  { id: "2", name: "Stark Industries", ownerEmail: "tony@starkindustries.com", logo: null },
  { id: "3", name: "Wayne Enterprises", ownerEmail: "bruce@wayne.com", logo: null },
];

export default function Sidebar() {
  const { metadata } = useUserStore();
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeOrg, setActiveOrg] = useState();
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { count } = useConversationStore();
  const pathname = usePathname();
  const hideMobileNav = pathname === "/dashboard/conversations";

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { setActiveOrg({ id: metadata?.id }); }, [metadata]);

  const getInitials = (name) => {
    if (!name) return "NA";
    return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
  };

  if (!mounted) {
    return (
      <>
        <aside className="hidden md:flex flex-col h-screen fixed top-0 left-0 border-r border-white/[0.06] shrink-0 overflow-hidden z-40 w-[220px]" />
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 h-[72px]" />
      </>
    );
  }

  const isActive = (href) =>
    href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);

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
          <Image src={"/syntra.png"} width={100} height={100} alt="Syntra AI" className=""/>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-0.5 px-2 py-3 flex-1">
          {allNavItems.map(({ label, icon: Icon, href }) => {
            const active = isActive(href);
            return (
              <Link
                key={label}
                href={href}
                className={`group relative flex items-center gap-3 px-2.5 py-2 rounded-lg transition-all duration-150 ${
                  active
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
                    className={`transition-colors ${active ? "text-white" : "text-zinc-500 group-hover:text-zinc-300"}`}
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

        {/* Footer */}
        <div className="border-t border-white/[0.06] px-3 py-3">
          <div className="flex items-center gap-2.5">
            <AnimatePresence>
              {!collapsed && (
                <button
                  onClick={() => setOpen(true)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition hover:bg-white/10"
                >
                  <Avatar className="size-8 shrink-0">
                    <AvatarImage src={activeOrg?.logo} />
                    <AvatarFallback className="bg-emerald-600 text-xs font-semibold text-white">
                      {getInitials(metadata?.business_name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white">{metadata?.business_name}</p>
                    <p className="truncate text-xs text-white/50">{metadata?.owner_email}</p>
                  </div>
                  <ChevronsUpDown className="size-4 shrink-0 text-white/40" />
                </button>
              )}
            </AnimatePresence>
          </div>
        </div>

        <OrgSwitcher
          setActiveOrg={setActiveOrg}
          open={open}
          setOpen={setOpen}
          mockOrgs={mockOrgs}
          activeOrg={activeOrg}
          getInitials={getInitials}
        />
      </motion.aside>

      {/* ── Mobile: Top-right Menu Button ── */}
      <div className="md:hidden fixed top-4 right-4 z-[60]">
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 100%)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.06) inset",
          }}
        >
          <Menu size={18} className="text-white" strokeWidth={1.8} />
        </button>
      </div>

      {/* ── Mobile: Drawer Overlay ── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 z-[70] bg-black/50"
              onClick={() => setDrawerOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.96 }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              className="md:hidden fixed top-16 right-4 z-[80] w-64 rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(145deg, rgba(30,30,35,0.97) 0%, rgba(18,18,22,0.97) 100%)",
                backdropFilter: "blur(32px) saturate(180%)",
                WebkitBackdropFilter: "blur(32px) saturate(180%)",
                border: "1px solid rgba(255,255,255,0.10)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.06) inset",
              }}
            >
              {/* Close button */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
                <span className="text-xs font-semibold text-white/40 uppercase tracking-widest">
                  Menu
                </span>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-white/10 transition"
                >
                  <X size={14} className="text-white/50" />
                </button>
              </div>

              {/* Drawer nav items */}
              <div className="flex flex-col gap-0.5 p-2">
                {drawerItems.map(({ label, icon: Icon, href }) => {
                  const active = isActive(href);
                  return (
                    <Link
                      key={label}
                      href={href}
                      onClick={() => setDrawerOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 ${
                        active
                          ? "bg-white/[0.10] text-white"
                          : "text-zinc-400 hover:text-white hover:bg-white/[0.06]"
                      }`}
                    >
                      <Icon size={16} strokeWidth={1.8} className={active ? "text-white" : "text-zinc-500"} />
                      <span className="text-[13.5px] font-medium">{label}</span>
                      {active && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60" />
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="h-px bg-white/[0.06] mx-3" />

              {/* Org switcher row */}
              <button
                onClick={() => { setOpen(true); setDrawerOpen(false); }}
                className="flex w-full items-center gap-3 px-4 py-3.5 hover:bg-white/[0.06] transition-all duration-150"
              >
                <Avatar className="size-8 shrink-0">
                  <AvatarImage src={activeOrg?.logo} />
                  <AvatarFallback className="bg-emerald-600 text-xs font-semibold text-white">
                    {getInitials(metadata?.business_name)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1 text-left">
                  <p className="truncate text-sm font-medium text-white">{metadata?.business_name}</p>
                  <p className="truncate text-[11px] text-white/40">{metadata?.owner_email}</p>
                </div>
                <ChevronsUpDown className="size-4 shrink-0 text-white/30" />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Mobile Bottom Navigation ── */}
      {!hideMobileNav && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-3 pb-4 pt-0">
          <div
            className="relative flex items-center justify-around px-2 py-2 rounded-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)",
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
              border: "1px solid rgba(255,255,255,0.10)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.06) inset",
            }}
          >
            <div
              className="absolute inset-x-6 top-0 h-px rounded-full"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)" }}
            />

            {bottomNavItems.map(({ label, icon: Icon, href }) => {
              const active = isActive(href);
              return (
                <Link
                  key={label}
                  href={href}
                  className="relative flex flex-col items-center justify-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-[48px]"
                >
                  {active && (
                    <motion.div
                      layoutId="mobileActiveBlob"
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)",
                        border: "1px solid rgba(255,255,255,0.10)",
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <div className="relative">
                    <Icon
                      size={18}
                      strokeWidth={active ? 2 : 1.6}
                      className={`transition-all duration-200 ${active ? "text-white" : "text-zinc-500"}`}
                    />
                    {label === "Conversations" && count > 0 && (
                      <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[14px] h-[14px] px-[3px] rounded-full bg-amber-500 text-black text-[8px] font-bold leading-none">
                        {count > 9 ? "9+" : count}
                      </span>
                    )}
                  </div>
                  <span className={`text-[9px] font-medium tracking-wide transition-all duration-200 leading-none ${active ? "text-white" : "text-zinc-600"}`}>
                    {label}
                  </span>
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
        </nav>
      )}

      <OrgSwitcher
        setActiveOrg={setActiveOrg}
        open={open}
        setOpen={setOpen}
        mockOrgs={mockOrgs}
        activeOrg={activeOrg}
        getInitials={getInitials}
      />
    </>
  );
}