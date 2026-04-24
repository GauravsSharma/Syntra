
// ─── CHATBOT PAGE ─────────────────────────────────────────────────────────────
"use client"

import { AppearancePanel } from "@/components/chatbot/AppearancePanel";
import { ChatSimulator } from "@/components/chatbot/ChatBotSimulator";
import { EmbedPanel } from "@/components/chatbot/EmbedPanel";
import { Separator } from "@/components/ui/separator";
import { useGetChatBotMetaData, useTestChatbot } from "@/hooks/useChatBot";
import { useGetKnowledgeSources } from "@/hooks/useKnowledge";
import { div, metadata } from "framer-motion/client";
import { useEffect, useRef, useState } from "react";


const SECTIONS = ["FAQ", "Billing", "Technical", "General"];
const CHATBOT_ID = "1eecd3e5-485d-4a82-950c-ef573d03cc6e";


const SECTION_REPLIES = {
  FAQ: "Great question! You can find our frequently asked questions in the knowledge base. Is there something specific you'd like to know?",
  Billing: "I can help with billing inquiries. Please provide your account email and I'll look into your billing details.",
  Technical: "Sure! Tell me more about the technical issue you're experiencing and I'll do my best to help.",
  General: "Thanks for reaching out! How can I assist you today?",
};

export default function ChatbotPage() {
  const [primaryColor, setPrimaryColor] = useState("#4f39f6");
  const [welcomeMessage, setWelcomeMessage] = useState(
    "Hi there, How can I help you today?"
  );
  const [sections, setSections] = useState([]);
  const { data: metaData, isLoading } = useGetChatBotMetaData()
  const [messages, setMessages]  = useState([
    { role: "assistant", content: "Hi there, How can I help you today?" },
  ]);
  const { mutate, isPending: isTyping } = useTestChatbot()
  const [input, setInput] = useState("");
  const [activeSection, setActiveSection] = useState(null);
  const scrollRef = useRef(null);

  const { data, isLoading: knowLoading } = useGetKnowledgeSources()

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

  const simulateReply = (currentSection) => {
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: SECTION_REPLIES[currentSection] ?? "How can I help further?",
        },
      ]);
    }, 1500);
  };

const handleSend = () => {
  if (!input.trim() || !activeSection) return;

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
      knowledgeSourcsIds: [activeSection]
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
  const isChanged = metaData && metaData?.color !== primaryColor || metaData?.welcome_message !== welcomeMessage
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

      <div className="flex flex-col h-screen bg-background overflow-hidden">
        {/* Page Header */}
        <div className="px-8 py-5 border-b border-border shrink-0">
          <h1 className="text-xl font-semibold tracking-tight">
            Chatbot Playground
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Test your assistant, customize appearance, and deploy it.
          </p>
        </div>

        {/* Page Body */}
        <div className="flex-1 flex overflow-hidden p-6 gap-5">
          {/* Chat Simulator */}
          <div className="flex-1 min-w-0 ">
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
          <div className="w-[40%] shrink-0 flex flex-col gap-2 overflow-y-auto">
            <div className="rounded-xl border border-border bg-card p-4">
              <AppearancePanel
                primaryColor={primaryColor}
                setPrimaryColor={setPrimaryColor}
                welcomeMessage={welcomeMessage}
                setWelcomeMessage={setWelcomeMessage}
                isChanged={isChanged}
              />
            </div>

            <Separator />

            <div className="rounded-xl border border-border bg-card p-4">
              <EmbedPanel chatbotId={CHATBOT_ID} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}