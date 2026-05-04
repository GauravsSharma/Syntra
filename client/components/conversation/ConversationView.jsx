"use client";

import { useEffect, useRef, useState } from "react";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";
import { ConversationHeader } from "./ConversationHeader";
import {
  useGetConversationById,
  useSendMessageToUser,
  useUpdateOcnversationStatus,
} from "../../hooks/useOrganization";
import { Loader2, MessageCircle, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import socket from "../../lib/socket";
import { useConversationStore } from "@/stores/useConversationStore";

export function ConversationView({
  selectedId,
  onSendMessage,
  showBackButton = false,
  onBack,
}) {
  const [isactive, setIsactive] = useState(false);
  const { data, isLoading } = useGetConversationById(selectedId);
  const [messages, setMessages] = useState([]);
  const { mutate, isPending } = useUpdateOcnversationStatus();
  const { mutate: sendMessage } = useSendMessageToUser();
  const scrollRef = useRef(null);
  const bottomRef = useRef(null);
  const queryClient = useQueryClient();
  const { decCount } = useConversationStore();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedId, messages]);

  const handleStatusUpdate = (status) => {
    if (status === "ACTIVE") {
      mutate(
        { data: { status }, id: selectedId },
        {
          onSuccess: () => {
            toast.success("Chat joined.");
            setIsactive(true);
            decCount();
            queryClient.invalidateQueries(["get-conversations"]);
          },
        }
      );
    }
    if (status === "RESOLVED") {
      mutate(
        { data: { status }, id: selectedId },
        {
          onSuccess: () => {
            toast.success("Chat Resolved.");
            setIsactive(false);
            queryClient.invalidateQueries(["get-conversations"]);
          },
        }
      );
    }
  };

  const handleSendMessage = (conversationId, content) => {
    setMessages((prev) => [...prev, { role: "agent", content }]);
    sendMessage({ message: content, id: conversationId });
  };

  useEffect(() => {
    socket.on("new:message", (data) => {
      if (data.role === "user") {
        setMessages((prev) => [...prev, { role: "user", content: data.content }]);
      }
    });
    return () => {
      socket.off("new:message");
    };
  }, []);

  useEffect(() => {
    if (!isactive || !socket) return;
    socket.emit("join:conversation", selectedId);
    return () => {
      socket.off("join:conversation");
    };
  }, [isactive]);

  useEffect(() => {
    setMessages(data ? data.messages : []);
  }, [data]);

  return (
    <div className="flex relative flex-col flex-1 h-full overflow-hidden">
      {/* Back button row — mobile only */}
      {showBackButton && (
        <div className="md:hidden flex items-center gap-2 px-3 pt-3 pb-1 shrink-0">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors py-1 px-1 -ml-1 rounded-lg hover:bg-white/[0.05] active:bg-white/[0.1]"
            aria-label="Back to conversations"
          >
            <ArrowLeft size={18} strokeWidth={2} />
            <span className="text-sm font-medium">Inbox</span>
          </button>
        </div>
      )}

      <ConversationHeader
        conversation={data}
        onResolve={() => handleStatusUpdate("RESOLVED")}
        isLoading={isPending}
      />

      {/* Escalated overlay */}
      {data && data.status === "ESCALATED" && (
        <div className="absolute inset-0 flex justify-center items-center z-20">
          <div className="absolute inset-0 backdrop-blur-md bg-black/20" />
          <button
            className="relative hover:scale-105 transition-all cursor-pointer z-10 px-6 flex justify-center items-center gap-2 py-3 rounded-xl
              bg-purple-500/70 text-white font-medium shadow-lg
              disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            onClick={() => handleStatusUpdate("ACTIVE")}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin h-4 w-4" />
                Taking over...
              </>
            ) : (
              <>
                <MessageCircle />
                Handover this chat
              </>
            )}
          </button>
        </div>
      )}

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 md:px-6 py-6 flex flex-col gap-4"
      >
        {messages.map((msg, idx) => (
          <MessageBubble key={idx + "@"} message={msg} />
        ))}
        <div ref={bottomRef} />
      </div>

      <MessageInput onSend={(content) => handleSendMessage(data.id, content)} />
    </div>
  );
}