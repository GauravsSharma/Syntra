"use client";

import { useState } from "react";
import { Globe, Upload, FileText, Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AddKnowledgeModal from "./AddKnowledge";
import KnowledgeTable from "./KnowledgeTable";
import { useGetKnowledgeSources } from "@/hooks/useKnowledge";
import { useKnowledgeStore } from "@/stores/useKnowledgeStore";
import SourceDetailSheet from "./SourceDetailSheet";


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
  const {isLoading} = useGetKnowledgeSources()
  const {sources} = useKnowledgeStore()
  const [activeSource, setActiveSource] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
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

      <KnowledgeTable isLoading={isLoading} sources={sources} setActiveSource={setActiveSource} setIsSheetOpen={setIsSheetOpen} />
      {/* Modal */}
      <AddKnowledgeModal open={modalOpen} onClose={() => setModalOpen(false)} tab={tab} />
        <SourceDetailSheet isSheetOpen={isSheetOpen} setIsSheetOpen={setIsSheetOpen} activeSource={activeSource} />
    </div>
  );
}