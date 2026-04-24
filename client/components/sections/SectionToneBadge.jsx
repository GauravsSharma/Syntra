import { Badge } from "@/components/ui/badge";

const toneMap = {
  strict: "border-red-500/30 text-red-500 bg-red-500/5",
  neutral: "border-blue-500/30 text-blue-500 bg-blue-500/5",
  friendly: "border-indigo-500/30 text-indigo-500 bg-indigo-500/5",
  empathetic: "border-purple-500/30 text-purple-500 bg-purple-500/5",
};

export function ToneBadge({ tone }) {
  const styles = toneMap[tone?.toLowerCase()] || "";

  return (
    <Badge
      variant="outline"
      className={`${styles} capitalize px-2 py-1`}
    >
      {tone}
    </Badge>
  );
}