
// ─── CHATBOT PAGE ─────────────────────────────────────────────────────────────
"use client"

import { AppearancePanel } from "@/components/chatbot/AppearancePanel";
import { ChatSimulator } from "@/components/chatbot/ChatBotSimulator";
import { EmbedPanel } from "@/components/chatbot/EmbedPanel";
import { Separator } from "@/components/ui/separator";
import { useGetChatBotMetaData, useTestChatbot } from "@/hooks/useChatBot";
import { useGetKnowledgeSources } from "@/hooks/useKnowledge";
import { useGetSections } from "@/hooks/useSections";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const SECTION_REPLIES = {
  FAQ: "Great question! You can find our frequently asked questions in the knowledge base. Is there something specific you'd like to know?",
  Billing: "I can help with billing inquiries. Please provide your account email and I'll look into your billing details.",
  Technical: "Sure! Tell me more about the technical issue you're experiencing and I'll do my best to help.",
  General: "Thanks for reaching out! How can I assist you today?",
};

export default function ChatbotPage() {
  const [primaryColor, setPrimaryColor] = useState("#4f39f6");
  const { metadata } = useUserStore()
  const [welcomeMessage, setWelcomeMessage] = useState(
    "Hi there, How can I help you today?"
  );
  const [sections, setSections] = useState([]);
  const { data: metaData, isLoading } = useGetChatBotMetaData(metadata)
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi there, How can I help you today?" },
  ]);
  const { mutate, isPending: isTyping } = useTestChatbot()
  const [input, setInput] = useState("");
  const [activeSection, setActiveSection] = useState(null);
  const scrollRef = useRef(null);
  const [isChangesSaved, setIsChangesSaved] = useState(false);
  const { data, isLoading: knowLoading } = useGetSections()

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleReset = () => {
    setMessages([{ role: "assistant", content: welcomeMessage }]);
    setInput("");
    setActiveSection(null);
  };

  const handleSectionClick = (sectionId) => {
    setActiveSection((prev) => (prev === sectionId ? null : sectionId));
  };

  const handleSend = () => {
    if (!input.trim() || !activeSection){
      toast.error("Please add or select section")
      return;
    } 

    const userMsg = input.trim();

    const updatedMessages = [
      ...messages,
      { role: "user", content: userMsg }
    ];

    // Update UI immediately (optimistic update)
    setMessages(updatedMessages);
    setInput("");

    mutate(
      {
        messages: updatedMessages,
        sectionId: activeSection
      },
      {
        onSuccess: (mssg) => {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: mssg }
          ]);
        },
        onError: () => {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: "Can't respond at a moment."
            }
          ]);
        }
      }
    );
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  console.log();
  
  useEffect(() => {
    if (!metaData) return
    if (metaData.color) {
      setPrimaryColor(metaData.color);
    }
    if (metaData.welcome_message) {
      setWelcomeMessage(metaData.welcome_message)
      messages[0].content = metaData.welcome_message
    }
  }, [metaData])

  useEffect(() => {
    if (!data) return;

    const secs = data.map((s) => {
      return { name: s.name, id: s.id }
    })
    setSections(secs);
  }, [data])
  useEffect(()=>{
      const isChanged = metaData && metaData?.color !== primaryColor || metaData?.welcome_message !== welcomeMessage
    setIsChangesSaved(isChanged);
  },[primaryColor,welcomeMessage])
  if (isLoading) {
    return <div className="h-60 w-full flex justify-center items-center text-sm text-zinc-400">Loading...</div>
  }
  return (
    <>
      <style>{`
        @keyframes chatDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
        @keyframes statusPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>

      <div className="flex flex-col min-h-screen bg-background overflow-hidden">
        {/* Page Header */}
        <div className="px-4 py-4 sm:px-6 lg:px-8 border-b border-border shrink-0">
          <h1 className="text-lg sm:text-xl font-semibold tracking-tight">
            Chatbot Playground
          </h1>

          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Test your assistant, customize appearance, and deploy it.
          </p>
        </div>

        {/* Page Body */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden p-4 sm:p-5 lg:p-6 gap-5">

          {/* Chat Simulator */}
          <div className="flex-1 min-w-0 min-h-[400px] lg:min-h-0">
            <ChatSimulator
              messages={messages}
              primaryColor={primaryColor}
              sections={sections}
              input={input}
              setInput={setInput}
              handleSend={handleSend}
              handleKeyDown={handleKeyDown}
              handleSectionClick={handleSectionClick}
              activeSection={activeSection}
              isTyping={isTyping}
              handleReset={handleReset}
              scrollRef={scrollRef}
            />
          </div>

          {/* Right Panel */}
          <div className="w-full lg:w-[40%] xl:w-[35%] shrink-0 flex flex-col gap-4 overflow-y-auto">
            <div className="rounded-xl border border-border bg-card p-4">
              <AppearancePanel
                primaryColor={primaryColor}
                setPrimaryColor={setPrimaryColor}
                welcomeMessage={welcomeMessage}
                setWelcomeMessage={setWelcomeMessage}
                isChanged={isChangesSaved}
                setIsChangesSaved={setIsChangesSaved}
              />
            </div>

            <Separator />

            <div className="rounded-xl border border-border bg-card p-4">
              <EmbedPanel chatbotId={metaData.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}