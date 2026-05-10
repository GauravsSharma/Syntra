"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";

const snippet = `<script src="http://localhost:3000/widget.js"
  data-id="a6afa329-a3c5-4104-b71b-e2371792904B"
  defer>
</script>`;

export function InstallWidget() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:p-5 flex-1 min-w-0">
      <h2 className="text-base font-semibold text-white mb-1">Install Widget</h2>
      <p className="text-xs text-white/40 mb-4">
        Add this snippet to your website appropriate page.
      </p>

      <div className="relative rounded-lg border border-white/10 bg-black/40 px-4 py-3 pr-10 font-mono text-[11px] text-white/50 leading-relaxed whitespace-pre overflow-x-auto">
        {snippet}
        <button
          onClick={handleCopy}
          className="absolute top-2.5 right-2.5 p-1 rounded text-white/30 hover:text-white/70 hover:bg-white/5 transition-colors"
          aria-label="Copy snippet"
        >
          {copied ? (
            <Check className="size-3.5 text-emerald-400" />
          ) : (
            <Copy className="size-3.5" />
          )}
        </button>
      </div>
    </div>
  );
}