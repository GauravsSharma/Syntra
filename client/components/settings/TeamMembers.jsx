"use client";

import { Plus } from "lucide-react";
import { TeamMemberCard } from "./TeamMemberCard";
import { useTeamMemberStore } from "@/stores/useTeamMemberStore";
import { useGetMembers } from "@/hooks/useOrganization";

export default function TeamMembers({ setOpen }) {
  const { isLoading } = useGetMembers();
  const { members } = useTeamMemberStore();

  return (
    <section>
      {/* Header: stack on mobile, row on sm+ */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
        <div>
          <h2 className="text-white text-base font-semibold">Team Members</h2>
          <p className="text-white/40 text-sm mt-0.5">
            Manage your team and their access.
          </p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center justify-center gap-1.5 bg-[#1a1a1a] hover:bg-[#222] border border-white/[0.1] text-white text-sm px-3.5 py-2 rounded-lg transition-colors shrink-0 w-full sm:w-auto"
        >
          <Plus size={14} strokeWidth={2} />
          Add Member
        </button>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center text-zinc-400 h-40">
          Loading...
        </div>
      )}

      {!isLoading && members.length === 0 ? (
        <div className="flex items-center justify-center py-10 border border-white/[0.06] rounded-xl bg-[#141414]">
          <p className="text-white/30 text-sm">No team members found.</p>
        </div>
      ) : (
        <div className="flex flex-col divide-y divide-white/[0.06] rounded-xl overflow-hidden gap-3">
          {members?.map((member) => (
            <TeamMemberCard
              key={member.id}
              name={member.name}
              email={member.user_email}
              status={member.status}
            />
          ))}
        </div>
      )}
    </section>
  );
}