"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const initialMessages = [
  { id: 1, role: "user", text: "How do I reset my API key?" },
  {
    id: 2,
    role: "assistant",
    text: 'Head to Settings → API Keys, then click "Rotate". Want me to walk you through it?',
  },
];

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3 bg-[#1a1a1a] rounded-full w-fit">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full bg-white/60 animate-bounce"
          style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.9s" }}
        />
      ))}
    </div>
  );
}

export default function SyntraAssistant() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { id: Date.now(), role: "user", text }]);
    setInput("");
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 1400));

    const replies = [
      "Sure! Let me walk you through that step by step.",
      "Great question — here's what you need to know.",
      "I can help with that. Could you share a bit more context?",
      "That's covered in our docs under Settings → Advanced.",
    ];

    setIsTyping(false);
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        role: "assistant",
        text: replies[Math.floor(Math.random() * replies.length)],
      },
    ]);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <section className="w-full flex flex-col items-center justify-center py-10 px-4 bg-transparent">
      {/* Card */}
      <div className="w-full max-w-[540px] bg-white rounded-[20px] shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_32px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04)]">

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center shrink-0">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 2L11.8 8.2H18.2L13 11.8L14.8 18L10 14.4L5.2 18L7 11.8L1.8 8.2H8.2L10 2Z"
                  fill="white"
                  opacity="0.9"
                />
              </svg>
            </div>
            {/* Name + status */}
            <div>
              <p className="text-[15px] font-semibold text-[#1a1a1a] leading-tight">
                Syntra Assistant
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-[7px] h-[7px] rounded-full bg-[#3cb96a] inline-block" />
                <span className="text-[12.5px] text-[#666]">Online</span>
              </div>
            </div>
          </div>
          <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[#888]">
            Live
          </span>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#f0ede8] mx-6" />

        {/* Messages */}
        <div className="flex flex-col gap-3 px-6 pt-6 pb-4 min-h-[220px] max-h-[380px] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{ animation: "fadeSlideUp 0.22s ease forwards" }}
              className={`text-[14.5px] leading-[1.55] ${msg.role === "user"
                  ? "self-end bg-[#f2efe9] text-[#1a1a1a] px-4 py-3 rounded-[18px_18px_4px_18px] max-w-[78%]"
                  : "self-start bg-[#1a1a1a] text-white px-[18px] py-3.5 rounded-[18px_18px_18px_4px] max-w-[82%]"
                }`}
            >
              {msg.text}
            </div>
          ))}

          {isTyping && (
            <div className="self-start" style={{ animation: "fadeSlideUp 0.22s ease forwards" }}>
              <TypingIndicator />
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input row */}
        <div className="flex items-center gap-2.5 px-4 pb-4 pt-3">
          <input
            className="flex-1 bg-[#f5f2ed] rounded-full px-[18px] py-3 text-sm text-[#1a1a1a] placeholder:text-[#aaa] outline-none border-none"
            placeholder="Ask anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
          />
          <button
            onClick={handleSend}
            className="w-10 h-10 rounded-full bg-[#c0522a] flex items-center justify-center shrink-0 hover:bg-[#a8461f] active:scale-95 transition-all duration-150"
          >
            <ArrowUp size={17} color="white" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}