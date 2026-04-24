
// ─── TYPING INDICATOR ─────────────────────────────────────────────────────────
 
export function TypingIndicator() {
  return (
    <div className="flex gap-1 items-center py-0.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60"
          style={{ animation: `chatDot 1.2s ease-in-out ${i * 0.2}s infinite` }}
        />
      ))}
    </div>
  );
}
 