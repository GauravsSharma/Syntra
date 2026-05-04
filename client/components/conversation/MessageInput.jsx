"use client";

import { useState, useRef, useEffect } from "react";
import { SendHorizonal } from "lucide-react";
import { cn } from "@/lib/utils";


export function MessageInput({ onSend, disabled }) {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [value]);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="px-4 py-3 border-t border-zinc-800 bg-zinc-950">
      <div className="flex items-end gap-3 bg-zinc-900 border border-zinc-700/60 rounded-xl px-4 py-3 focus-within:border-zinc-600 transition-colors">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your reply..."
          rows={1}
          className="flex-1 bg-transparent text-sm text-zinc-200 placeholder:text-zinc-600 outline-none resize-none leading-relaxed min-h-[22px]"
        />
        <button
          onClick={handleSend}
          disabled={!value.trim() || disabled}
          className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center transition-all shrink-0",
            value.trim() && !disabled
              ? "bg-indigo-600 hover:bg-indigo-500 text-white"
              : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
          )}
        >
          <SendHorizonal size={15} />
        </button>
      </div>
    </div>
  );
}
