
// ─── CHAT SIMULATOR ───────────────────────────────────────────────────────────

import { Bot, RefreshCw, Send } from "lucide-react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { TypingIndicator } from "./TypingIndicator";
import { cn } from "@/lib/utils";

 
export function ChatSimulator({
  messages,
  primaryColor,
  sections,
  input,
  setInput,
  handleSend,
  handleKeyDown,
  handleSectionClick,
  activeSection,
  isTyping,
  handleReset,
  scrollRef,
}) {
  
  return (
    <div className="flex flex-col h-[90%] min-h-0 rounded-xl border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full bg-emerald-500"
            style={{ animation: "statusPulse 2s ease-in-out infinite" }}
          />
          <span className="text-sm font-medium text-foreground/80">
            Test Environment
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="text-muted-foreground hover:text-foreground gap-1.5 text-xs h-7 px-2"
        >
          <RefreshCw size={12} />
          Reset
        </Button>
      </div>
 
      {/* Messages */}
      <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto px-4 py-4">
        <div className="flex flex-col gap-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                "flex gap-2",
                msg.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {msg.role === "assistant" && (
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ backgroundColor: primaryColor }}
                >
                  <Bot size={15} color="white" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[75%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed",
                  msg.role === "user"
                    ? "bg-muted text-foreground rounded-br-sm"
                    : "bg-background text-foreground rounded-bl-sm border border-border shadow-sm"
                )}
              >
                {msg.content}
              </div>
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
  );
}