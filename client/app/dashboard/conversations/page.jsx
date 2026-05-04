"use client";
import { useEffect, useState } from "react";
import { ConversationSidebar } from "@/components/conversation/ConversationSidebar";
import { ConversationView } from "@/components/conversation/ConversationView";
import { useGetConversation } from "@/hooks/useOrganization";
import { useGetChatBotMetaData } from "@/hooks/useChatBot";

export default function InboxPage() {
  const { data: metadata } = useGetChatBotMetaData();
  const { data, isLoading } = useGetConversation(metadata?.id);
  const [conversations, setConversations] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  // Controls mobile view: "list" | "chat"
  const [mobileView, setMobileView] = useState("list");

  useEffect(() => {
    setConversations(data ? data : []);
  }, [data]);

  const handleSelect = (id) => {
    setSelectedId(id);
    setMobileView("chat"); // slide to chat on mobile
  };

  const handleBack = () => {
    setMobileView("list"); // slide back to list on mobile
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full bg-zinc-950 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 border-2 border-zinc-700 border-t-zinc-400 rounded-full animate-spin" />
          <span className="text-zinc-600 text-xs tracking-wide">Loading inbox…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[100dvh] w-full bg-zinc-950 overflow-hidden">

      {/* ── Desktop: both panels side by side ── */}
      <div className="hidden md:flex w-full h-full">
        <ConversationSidebar
          conversations={conversations}
          selectedId={selectedId}
          onSelect={handleSelect}
        />
        {selectedId ? (
          <ConversationView selectedId={selectedId} />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-zinc-600 text-sm">Select a conversation</p>
          </div>
        )}
      </div>

      {/* ── Mobile: slide between list and chat ── */}
      <div className="md:hidden relative w-full h-full overflow-hidden">
        {/* List panel — slides out left when chat is open */}
        <div
          className="absolute inset-0 w-full h-full transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform"
          style={{
            transform: mobileView === "chat" ? "translateX(-100%)" : "translateX(0)",
          }}
        >
          <ConversationSidebar
            conversations={conversations}
            selectedId={selectedId}
            onSelect={handleSelect}
          />
        </div>

        {/* Chat panel — slides in from right */}
        <div
          className="absolute inset-0 w-full h-full transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform"
          style={{
            transform: mobileView === "chat" ? "translateX(0)" : "translateX(100%)",
          }}
        >
          {selectedId ? (
            <ConversationView
              selectedId={selectedId}
              onBack={handleBack}
              showBackButton
            />
          ) : (
            <div className="flex-1 flex items-center justify-center h-full">
              <p className="text-zinc-600 text-sm">Select a conversation</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}