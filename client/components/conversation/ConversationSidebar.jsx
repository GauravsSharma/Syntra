import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";


export function ConversationSidebar({
  conversations,
  selectedId,
  onSelect,
}) {
  const totalCount = conversations.length;

  return (
    <div className="w-full md:w-[310px] shrink-0 flex flex-col border-r border-zinc-800 bg-zinc-950 h-full">
      {/* Header */}
      <div className="px-5 pt-5 pb-3 flex items-center justify-between shrink-0">
        <h1 className="text-white font-semibold text-[15px] tracking-tight">
          Inbox
        </h1>
        <span className="text-zinc-400 text-xs">
          {totalCount} conversation{totalCount !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Search */}
      <div className="px-4 pb-3 shrink-0">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            size={14}
          />
          <Input
            placeholder="Search..."
            className="pl-8 bg-zinc-900 border-zinc-800 text-zinc-300 placeholder:text-zinc-600 text-sm h-9 rounded-lg focus-visible:ring-zinc-700"
          />
        </div>
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-2 pb-20">
            <span className="text-zinc-700 text-sm">No conversations yet</span>
          </div>
        )}
       {conversations.map((conv) => {
  const isResolved = conv.status === "RESOLVED";

  const statusStyles = {
    ESCALATED:
      "bg-red-500/15 text-red-400 border-red-500/20 hover:bg-red-500/15",
    RESOLVED:
      "bg-green-500/15 text-green-400 border-green-500/20 hover:bg-green-500/15",
    ACTIVE:
      "bg-blue-500/15 text-blue-400 border-blue-500/20 hover:bg-blue-500/15",
    OPEN:
      "bg-yellow-500/15 text-yellow-400 border-yellow-500/20 hover:bg-yellow-500/15",
  };

  return (
    <button
      key={conv.id}
      disabled={isResolved}
      onClick={() => !isResolved && onSelect(conv.id)}
      className={cn(
        "w-full text-left px-5 py-3.5 border-b border-zinc-800/60 transition-colors",
        
        selectedId === conv.id
          ? "bg-zinc-800/60"
          : "hover:bg-zinc-900/80 active:bg-zinc-800/40",

        isResolved &&
          "opacity-60 cursor-not-allowed hover:bg-transparent active:bg-transparent"
      )}
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarFallback className="bg-zinc-700 text-zinc-300 text-xs font-medium">
            {conv.name?.slice(0, 2).toUpperCase() ?? "??"}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-zinc-200 text-sm font-medium truncate">
                {conv.name}
              </span>

              <Badge
                variant="outline"
                className={cn(
                  "text-[10px] px-1.5 py-0 h-5 rounded-md border",
                  statusStyles[conv.status]
                )}
              >
                {conv.status}
              </Badge>
            </div>

            <span className="text-zinc-600 text-xs shrink-0">
              {conv.timeAgo}
            </span>
          </div>

          <p className="text-zinc-500 text-xs truncate leading-relaxed">
            {conv?.messages[0]?.content},
          </p>
        </div>

        <svg
          className="md:hidden shrink-0 text-zinc-700"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </div>
    </button>
  );
})}
      </div>
    </div>
  );
}