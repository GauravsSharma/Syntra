import { MoreHorizontal, Circle, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ConversationHeader({ conversation, onResolve,isLoading }) {
  return (
    <div className="h-14 px-5 flex items-center justify-between border-b border-zinc-800 bg-zinc-950 shrink-0">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center">
          <span className="text-zinc-300 text-xs font-medium">V</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-zinc-200 text-sm font-medium">
            {conversation?.name}
          </span>
          <div className="flex items-center gap-1">
            <Circle size={6} className="fill-zinc-600 text-zinc-600" />
            <Circle size={6} className="fill-zinc-600 text-zinc-600" />
            <Circle size={6} className="fill-zinc-600 text-zinc-600" />
          </div>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
          >
            <MoreHorizontal size={18} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44 relative bg-zinc-900 border-zinc-800 text-zinc-200">
          <DropdownMenuItem
            onClick={onResolve}
            className="cursor-pointer hover:bg-zinc-800 focus:bg-zinc-800 focus:text-zinc-200"
          >
            <CheckCircle size={15} className="mr-2 text-green-500" />
            Resolve this chat
          </DropdownMenuItem>
      {isLoading && <DropdownMenuItem
            className="absolute top-0 left-0 bg-zinc-800 flex justify-center items-center h-full w-full"
          >
           <Loader2 className="animate-spin"/>
          </DropdownMenuItem>}
          
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}