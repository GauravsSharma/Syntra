import { ArrowRight } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

export function RecentChats({ conversations }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:p-5 flex-1 min-w-0">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-white">
          Recent Chats
        </h2>

        <button className="flex items-center gap-1 text-xs text-white/40 hover:text-white/70 transition-colors whitespace-nowrap">
          View all
          <ArrowRight className="size-3" />
        </button>
      </div>

      <div className="flex flex-col gap-1">
        {conversations.length === 0 && (
          <div className="text-center text-zinc-500 py-6">
            No conversations available.
          </div>
        )}

        {conversations.map((chat, i) => (
          <div
            key={i}
            className="rounded-lg px-3 py-3 hover:bg-white/5 transition-colors cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <Avatar className="size-10 border border-white/10">
                <AvatarImage src="" />
                <AvatarFallback className="bg-zinc-800 text-white text-xs">
                  {chat?.name
                    ?.split(" ")
                    ?.map((word) => word[0])
                    ?.join("")
                    ?.slice(0, 2)
                    ?.toUpperCase() || "VS"}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1 gap-2">
                  <span className="text-sm font-medium text-white truncate">
                    {chat.name || "Visitor"}
                  </span>

                  <span className="text-xs text-white/30 shrink-0">
                    {chat.time}
                  </span>
                </div>

                <p className="text-xs text-white/40 truncate">
                  {chat?.messages?.[0]?.content ||
                    "No messages yet"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}