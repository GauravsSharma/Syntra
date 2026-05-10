import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export function Sections({sections}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
      <div className="flex items-start justify-between mb-1">
        <div>
          <h2 className="text-base font-semibold text-white">Sections</h2>
          <p className="text-xs text-white/40 mt-0.5">
            configure behavior for different topics
          </p>
        </div>
       <Link
       href={"/dashboard/sections"}
       >
         <Button
          size="sm"
          className="h-8 text-xs bg-white text-black hover:bg-white/90 font-medium shrink-0 ml-3"
        >
          <Plus className="size-3.5 mr-1" />
          Create Section
        </Button>
       </Link>
      </div>

      <div className="mt-4">
        <div className="grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_140px_120px] text-[10px] sm:text-[11px] font-medium tracking-widest text-white/30 uppercase px-1 pb-2 border-b border-white/5 gap-4">
          <span>Name</span>
          <span>Sources</span>
          <span>Tone</span>
        </div>

        {sections.map((section) => (
          <div
            key={section.name}
            className="grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_140px_120px] items-center px-1 py-4 border-b border-white/5 last:border-0 gap-4"
          >
            <span className="text-sm font-medium text-white">{section.name}</span>
            <span className="text-sm text-white/50 whitespace-nowrap">
              {section.sourceIds.length} sources
            </span>
            <Badge
              variant="outline"
              className="w-fit text-xs border-white/15 text-white/60 bg-transparent"
            >
              {section.tone}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}