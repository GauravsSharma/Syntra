// ─── EMBED PANEL ─────────────────────────────────────────────────────────────

import { Code2 } from "lucide-react";
import { EmbedCodeBlock } from "./EmbedCodeBlock";

 
export function EmbedPanel({ chatbotId }) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
        <Code2 size={12} />
        Embed Code
      </p>
      <EmbedCodeBlock chatbotId={chatbotId} />
    </div>
  );
}
 