"use client"
import { TypingIndicator } from '../../components/chatbot/TypingIndicator';
import EscalationOverlay from '@/components/embed/EscalationTimeLayer';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useChatToBot } from '@/hooks/useChatBot';
import { useGetChatbotConfig } from '@/hooks/useChatBotConfig';
import { useExpireConversation, useGetClientConversationById, useSendMessageToAgent } from '@/hooks/useOrganization';
import {widgetSocket} from '@/lib/widgetSocket';
import { cn } from '@/lib/utils';
import { AlertCircle, Bot, Loader2, MessageCircle, RefreshCw, Send, UserRound, X } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'

const page = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [primaryColor, setPrimaryColor] = useState("#4f39f6")
  const [metadata, setMetadata] = useState(null);
  const [sections, setSections] = useState([]);
  const [agentName, setAgentName] = useState("Chat Support")
  // const [loading, setLoading] = useState(true);
  const [escalated, setEscalated] = useState(false);
  const [agentJoined, setAgentJoined] = useState(false);
  const { data, isLoading, error } = useGetChatbotConfig(token);
  const { data: conversation, isLoading: conversationLoading } = useGetClientConversationById(token)
  const [isOpen, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [activeSection, setActiveSection] = useState(null);
  const scrollViewportRef = useRef(null);
  const [userEmail, setUserEmail] = useState(null)
  const { mutate, isPending: isTyping } = useChatToBot()
  const { mutate: sendMssgToAgent, isPending } = useSendMessageToAgent()
  const { mutate: expireChat, isPending: isExpiring } = useExpireConversation()
  useEffect(() => {
    document.body.style.backgroundColor = "transparent";
    document.documentElement.style.backgroundColor = "transparent";

    if (typeof window !== undefined) {
      window.parent.postMessage(
        {
          type: "resize",
          width: "100px",
          height: "100px",
          borderRadius: "30px",
        },
        "*"
      );
    }
  }, []);

  const toggleOpen = () => {
    const newState = !isOpen;
    setOpen(newState);

    if (newState) {
      window.parent.postMessage(
        {
          type: "resize",
          width: "380px",
          height: "520px",
          borderRadius: "12px",

        },
        "*"
      );
    }
    else {
      window.parent.postMessage(
        {
          type: "resize",
          width: "100px",
          height: "100px",
          borderRadius: "30px",
        },
        "*"
      );
    }
  };
  useEffect(() => {

    if (data) {

      setMetadata(data.metadata)
      setSections(data.sections)
      setMessages([{
        role: "assistant",
        content: data.metadata.welcome_message || "Hi!, How can I help you today ?",
        isWelcome: true,
        sections: null
      }])
      setPrimaryColor(data.metadata.color)
    }
  }, [data])

  useEffect(() => {
    if (scrollViewportRef.current) {
      scrollViewportRef.current.scrollTop = scrollViewportRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]); // Scroll when opened too


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
    const data = {
      messages: updatedMessages,
      sectionId: activeSection
    }
    if (agentJoined && !escalated) {
      sendMssgToAgent({ message: userMsg, token })
      return;
    }

    mutate({
      data,
      token
    },
      {
        onSuccess: (data) => {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: data.message }
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
  const handleSectionClick = (section_id) => {
    setActiveSection(section_id)
  }

  useEffect(() => {
    if (!token) return;
    widgetSocket.connect()
    widgetSocket.emit("conversation:join", token);
    widgetSocket.on("chat:escalated", () => {
      setEscalated(true);
    })
    widgetSocket.on("agent:joined", ({ status, user_name }) => {
      if (status === "active") {
        setEscalated(false);
        setAgentName(user_name)
        setAgentJoined(true);
      }
    })
    widgetSocket.on("new:message", (data) => {
      if (data.role === "agent") {
        setMessages((prev) => [...prev, {
          role: "agent",
          content: data.content
        }])
      }
    })
    widgetSocket.on("chat:resolved", () => {
      setAgentJoined(false);
      setAgentName("Chat Support");
    })
    widgetSocket.on("chat:expired", (data) => {
      setMessages((prev) => [
        ...prev,
        data
      ]);
    })
    return () => {
      widgetSocket.disconnect()
    }
  }, [])

  if (isLoading) {
    return <div className='flex justify-center items-center w-full h-[100px]'>
      <Loader2 size={20} className='animate-spin' />
    </div>
  }
  if (error && isOpen) {
    return <Alert variant="destructive" className="mt-3">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {error.message}.
      </AlertDescription>
    </Alert>
  }
  if (!isOpen) {
    console.log("return chaticon");

    return (
      <div className="w-full h-[100px] flex items-center justify-center">
        {/* your chat icon */}
        <button
          onClick={toggleOpen}
          style={{ backgroundColor: primaryColor }}
          className="relative w-14 h-14 rounded-full flex items-center justify-center 
                 shadow-lg transition-transform duration-200 ease-out
                 hover:scale-105 active:scale-95 focus:outline-none"
        >
          {/* Pulse ring */}
          <span
            className="absolute inset-0 rounded-full opacity-25"
            style={{ backgroundColor: primaryColor }}
          />

          <MessageCircle
            className="w-6 h-6 text-white relative z-10"
            strokeWidth={1.75}
            fill="rgba(255,255,255,0.15)"
          />
        </button>
      </div>

    );
  }
  const handleTimeOut = () => {
    setEscalated(false)
  }
  return (
    <div className="flex flex-col h-[520px] mih-h-0 rounded-xl border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
        <div className="flex items-center gap-3">
          {/* Avatar with online dot */}
          <div className="relative shrink-0">
            {agentJoined ? <>
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                <UserRound size={15} color="white" />
              </div>
            </> : <div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ backgroundColor: primaryColor }}
            >
              <Bot size={16} color="white" />
            </div>}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-card rounded-full" />
          </div>

          {/* Name + status */}
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground leading-tight">
              {agentName || "Chat Support "}
            </span>
            <span className="text-xs text-green-500 font-medium leading-tight">
              Online
            </span>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={toggleOpen}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
        >
          <X size={15} />
        </button>
      </div>
      {/* Messages */}
      <div ref={scrollViewportRef} className="flex-1 relative  min-h-0 overflow-y-auto px-4 py-4">
        {agentJoined && <div className={`w-full p-0.5 text-xs text-center absolute top-0 left-0  text-white/75`}
          style={{ backgroundColor: primaryColor }}
        >
          Now you are talking with {agentName}
        </div>}
        <div className="flex flex-col gap-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                "flex gap-2",
                msg.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {/* User message — no avatar, right side */}
              {msg.role === "user" && (
                <div className="max-w-[75%] px-3.5 py-2.5 rounded-2xl rounded-br-sm text-sm leading-relaxed bg-muted text-foreground">
                  {msg.content}
                </div>
              )}

              {/* Assistant */}
              {msg.role === "assistant" && (
                <>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <Bot size={15} color="white" />
                  </div>
                  <div className="max-w-[75%] px-3.5 py-2.5 rounded-2xl rounded-bl-sm text-sm leading-relaxed bg-background text-foreground border border-border shadow-sm">
                    {msg.content}
                  </div>
                </>
              )}

              {/* Agent */}
              {msg.role === "agent" && (
                <>
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <UserRound size={15} color="white" />
                  </div>
                  <div className="flex flex-col gap-1 max-w-[75%]">  {/* max-w yahan */}
                    <span className="text-blue-500 text-[11px] font-medium px-1">
                      {msg.agentName || "Agent"}
                    </span>
                    <div className="px-3.5 py-2.5 rounded-2xl rounded-bl-sm text-sm leading-relaxed bg-blue-950/40 text-blue-100 border border-blue-800/50 shadow-sm">
                      {msg.content}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-2 justify-start">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: primaryColor }}
              >
                <Bot size={15} color="white" />
              </div>
              <div className="bg-background border border-border px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm">
                <TypingIndicator />
              </div>
            </div>
          )}
        </div>
      </div>
      <EscalationOverlay escalated={escalated} onTimeout={handleTimeOut} />
      {/* Section Pills */}
      {sections.length > 0 && (
        <div className="px-4 pb-2 flex flex-wrap gap-2 shrink-0">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={cn(
                "text-xs px-3 py-1.5 rounded-full border transition-all font-medium",
                activeSection === section.id
                  ? "text-white border-transparent"
                  : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground/80"
              )}
              style={
                activeSection === section.id
                  ? { backgroundColor: primaryColor, borderColor: primaryColor }
                  : {}
              }
            >
              {section.name}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="px-3 pb-3 shrink-0">
        <div className="flex items-center gap-2 bg-muted/40 border border-border rounded-xl px-3 py-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              activeSection
                ? "Type your message..."
                : "Please select a category above to start..."
            }
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none disabled:cursor-not-allowed"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || !activeSection}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all disabled:opacity-30"
            style={{
              backgroundColor:
                input.trim() && activeSection ? primaryColor : "transparent",
            }}
          >
            <Send
              size={13}
              className={cn(
                input.trim() && activeSection
                  ? "text-white"
                  : "text-muted-foreground"
              )}
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default page
