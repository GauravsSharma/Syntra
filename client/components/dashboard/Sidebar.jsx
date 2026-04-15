"use client";

import { useState } from "react";
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/stores/useUserStore";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Knowledge", icon: BookOpen, href: "/dashboard/knowledge" },
  { label: "Sections", icon: Layers, href: "/dashboard/sections" },
  { label: "Chatbot", icon: MessageSquare, href: "/dashboard/chatbot" },
  { label: "Conversations", icon: Inbox, href: "/dashboard/conversations" },
  { label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const {metadata,user} = useUserStore()
  const pathname = usePathname();
console.log(metadata,user);

  const isActive = (href) =>
    href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname.startsWith(href);

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 68 : 220 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="relative flex flex-col h-screen border-r border-white/[0.06] shrink-0 overflow-hidden"
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
              <Icon
                size={16}
                strokeWidth={1.8}
                className={`shrink-0 transition-colors ${
                  active ? "text-white" : "text-zinc-500 group-hover:text-zinc-300"
                }`}
              />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -4 }}
                    transition={{ duration: 0.18 }}
                    className="text-[13px] font-medium whitespace-nowrap"
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      {/* Footer - User */}
      <div className="border-t border-white/[0.06] px-3 py-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-[11px] font-bold text-white shrink-0">
            ON
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -4 }}
                transition={{ duration: 0.18 }}
                className="flex flex-col min-w-0"
              >
                <span className="text-[12px] font-medium text-zinc-200 truncate leading-tight">
                  {metadata?.business_name}
                </span>
                <span className="text-[11px] text-zinc-600 truncate leading-tight">
                {user?.email}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Collapse toggle */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setCollapsed((p) => !p)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="absolute -right-3 top-[72px] z-10 h-6 w-6 rounded-full bg-[#1a1a20] border-white/[0.1] text-zinc-400 hover:text-white hover:bg-[#232329] shadow-md p-0"
      >
        {collapsed ? <ChevronRight size={11} /> : <ChevronLeft size={11} />}
      </Button>
    </motion.aside>
  );
}