"use client";

import { useState } from "react";
import { Globe, Upload, FileText, Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AddKnowledgeModal from "./AddKnowledge";


const sourceCards = [
  {
    icon: Globe,
    title: "Add Website",
    description:
      "Crawl your website or specific pages to automatically keep your knowledge base in sync.",
    iconBg: "bg-indigo-500/20",
    iconColor: "text-indigo-400",
  },
  {
    icon: Upload,
    title: "Upload File",
    description:
      "Upload CSV files to instantly train your assistant with existing documents.",
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
  },
  {
    icon: FileText,
    title: "Manual Text",
    description:
      "Manually copy-paste FAQs, internal notes, or policies directly into the editor for quick updates.",
    iconBg: "bg-slate-500/20",
    iconColor: "text-slate-400",
  },
];

export default function KnowledgeBase() {
  const [modalOpen, setModalOpen] = useState(false);
  const [tab, setTab] = useState("website");
  const map = {
    "Add Website": "website",
    "Upload File": "file",
    "Manual Text": "qa"
  }
  const handleTabChange = (title) => {
    const newTab = map[title];
    if (newTab) {
      setTab(newTab);
      setModalOpen(true);
    }
  }
  return (
    <div className="w-full min-h-screen p-6 md:p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-white mb-1">Knowledge Base</h1>
          <p className="text-xs text-zinc-400">
            Manage your website sources, documents, and uploads here.
          </p>
        </div>
        <Button
          onClick={() => setModalOpen(true)}
          className="bg-white text-black hover:bg-zinc-200 text-xs font-medium px-4 py-2 rounded-lg flex items-center gap-2 shrink-0"
        >
          <span className="text-lg leading-none">+</span>
          Add Knowledge
        </Button>
      </div>

      {/* Source Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {sourceCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              onClick={() => handleTabChange(card.title)}
              key={card.title}
              className="bg-[#131313] border border-zinc-800 rounded-xl p-6 flex flex-col items-center text-center gap-3 hover:border-zinc-600 transition-colors cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-full ${card.iconBg} flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${card.iconColor}`} />
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">{card.title}</h3>
                <p className="text-zinc-400 text-xs leading-relaxed">{card.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sources Table */}
      <div className="bg-[#131313] border border-zinc-800 rounded-xl overflow-hidden">
        {/* Table Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <h2 className="text-white font-medium">Sources</h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <Input
                placeholder="Search sources..."
                className="pl-9 bg-[#0f0f0f] border-zinc-700 text-zinc-300 placeholder:text-zinc-600 h-9 w-48 md:w-64 text-xs focus-visible:ring-zinc-600"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-700"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Column Headers */}
        <div className="grid grid-cols-4 md:grid-cols-5 px-6 py-3 border-b border-zinc-800">
          <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider col-span-1">Name</span>
          <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider hidden md:block">Type</span>
          <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Status</span>
          <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider hidden sm:block">Last Updated</span>
          <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider text-right">Actions</span>
        </div>

        {/* Empty State */}
        <div className="flex items-center justify-center py-16 px-6">
          <p className="text-zinc-500 text-xs">No knowledge sources added yet.</p>
        </div>
      </div>

      {/* Modal */}
      <AddKnowledgeModal open={modalOpen} onClose={() => setModalOpen(false)} tab={tab} />
    </div>
  );
}