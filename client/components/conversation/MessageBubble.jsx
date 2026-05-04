import { cn } from "@/lib/utils";


export function MessageBubble({ message, agentAvatar }) {
  const isAgent = message.role === "assistant" || message.role === "agent";

  return (
    <div
      className={cn(
        "flex items-end gap-2.5 max-w-[75%]",
        isAgent ? "self-end flex-row-reverse" : "self-start flex-row"
      )}
    >
      {/* Avatar — only for visitor (left side) */}
      {!isAgent && (
        <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center shrink-0 mb-1 overflow-hidden">
          {agentAvatar ? (
            <img src={agentAvatar} alt="visitor" className="w-full h-full object-cover" />
          ) : (
            <span className="text-zinc-300 text-xs font-medium">V</span>
          )}
        </div>
      )}

      <div className={cn("flex flex-col gap-1", isAgent ? "items-end" : "items-start")}>
        <div
          className={cn(
            "px-4 py-2.5 rounded-2xl text-sm leading-relaxed",
            isAgent
              ? "bg-zinc-700 text-zinc-100 rounded-br-sm"
              : "bg-zinc-800 text-zinc-200 rounded-bl-sm"
          )}
        >
          {message.content}
        </div>
        <span className="text-zinc-600 text-[11px] px-1">{message.timestamp}</span>
      </div>

      {/* Avatar — only for agent (right side) */}
      {isAgent && (
        <div className="w-8 h-8 rounded-full bg-zinc-600 flex items-center justify-center shrink-0 mb-1 overflow-hidden">
          <span className="text-zinc-200 text-xs font-medium">A</span>
        </div>
      )}
    </div>
  );
}
