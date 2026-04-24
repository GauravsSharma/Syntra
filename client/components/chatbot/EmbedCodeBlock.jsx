import { AlertTriangle, Check, Copy } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

 
export function EmbedCodeBlock({ chatbotId }) {
  const [copied, setCopied] = useState(false);
  const code = `<script src="https://oneminute-support.vercel.app/widget.js"\n  data-id="${chatbotId}"\n  defer>\n</script>`;
 
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
 
  return (
    <div className="rounded-lg overflow-hidden border border-border bg-muted/30">
      <div className="flex items-start justify-between p-3 gap-2">
        <pre className="text-xs text-muted-foreground font-mono leading-relaxed whitespace-pre-wrap break-all flex-1">
          {code}
        </pre>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          className="h-7 w-7 shrink-0 text-muted-foreground hover:text-foreground"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
        </Button>
      </div>
      <div className="border-t border-amber-500/30 bg-amber-500/10 px-3 py-2 flex items-center gap-2">
        <AlertTriangle size={12} className="text-amber-400 shrink-0" />
        <span className="text-amber-400/90 text-[10px]">
          Paste this code before the closing &lt;/head&gt; tag on your website.
        </span>
      </div>
    </div>
  );
}
 