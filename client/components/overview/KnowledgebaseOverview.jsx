import { Globe, FileText, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const sources = [
  { icon: Globe, label: "Pages", count: 2, iconColor: "text-blue-400" },
  { icon: FileText, label: "Manual Texts", count: 1, iconColor: "text-purple-400" },
  { icon: Upload, label: "Uploads", count: 2, iconColor: "text-emerald-400" },
];

export function KnowledgeBase({knowledgeBaseCount={website:0,text:0,file:0}}) {
  for(const source of sources) {
    if(source.label === "Pages") {
      source.count = knowledgeBaseCount.website;
    }
    if(source.label === "Manual Texts") {
      source.count = knowledgeBaseCount.text;
    }
    if(source.label === "Uploads") {
      source.count = knowledgeBaseCount.file;
    }
  }
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-white">Knowledge Base</h2>
       <Link 
       href={'/dashboard/knowledge'}
       >
          <Button
          variant="outline"
          size="sm"
          className="h-8 text-xs border-white/15 bg-transparent text-white/70 hover:bg-white/5 hover:text-white"
        >
          Manage sources
        </Button>
       </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {sources.map(({ icon: Icon, label, count, iconColor }) => (
          <div
            key={label}
            className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <Icon className={`size-4 ${iconColor}`} />
              <span className="text-sm text-white/60">{label}</span>
            </div>
            <p className="text-2xl font-semibold text-white">{count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}