import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function TeamMemberCard({
  name,
  email,
  role = "Member",
  status = "active", // "active" | "pending"
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const isActive = status === "active";

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors">
      {/* Left: Avatar + Info */}
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8 rounded-md">
          <AvatarFallback className="rounded-md bg-zinc-700 text-zinc-200 text-xs font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-zinc-100">{name}</span>
            <Badge
              className={
                isActive
                  ? "h-4 px-1.5 text-[10px] font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/15 rounded-sm"
                  : "h-4 px-1.5 text-[10px] font-medium bg-amber-500/15 text-amber-400 border border-amber-500/30 hover:bg-amber-500/15 rounded-sm"
              }
            >
              {isActive ? "Active" : "Pending"}
            </Badge>
          </div>
          <span className="text-xs text-zinc-500">{email}</span>
        </div>
      </div>

      {/* Right: Role */}
      <span className="text-xs text-zinc-500">{role}</span>
    </div>
  );
}