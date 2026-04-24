
// ─── COLOR SWATCH ─────────────────────────────────────────────────────────────

import { cn } from "@/lib/utils";

 
export function ColorSwatch({ color, selected, onClick }) {
  return (
    <button
      onClick={() => onClick(color)}
      className={cn(
        "w-6 h-6 rounded-full transition-all ring-offset-2 ring-offset-background focus-visible:outline-none",
        selected && "ring-2 ring-foreground scale-110"
      )}
      style={{ backgroundColor: color }}
      aria-label={`Select color ${color}`}
    />
  );
}