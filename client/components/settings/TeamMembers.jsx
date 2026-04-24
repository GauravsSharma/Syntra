"use client";

import { Plus } from "lucide-react";

export default function TeamMembers({ setOpen,members = [] }) {
  return (
    <section>
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 className="text-white text-base font-semibold">Team Members</h2>
          <p className="text-white/40 text-sm mt-0.5">
            Manage your team and their access.
          </p>
        </div>
        <button
        onClick={()=>setOpen(true)}
        className="flex items-center gap-1.5 bg-[#1a1a1a] hover:bg-[#222] border border-white/[0.1] text-white text-sm px-3.5 py-2 rounded-lg transition-colors">
          <Plus size={14} strokeWidth={2} />
          Add Member
        </button>
      </div>

      {members.length === 0 ? (
        <div className="flex items-center justify-center py-10 border border-white/[0.06] rounded-xl bg-[#141414]">
          <p className="text-white/30 text-sm">No team members found.</p>
        </div>
      ) : (
        <div className="flex flex-col divide-y divide-white/[0.06] border border-white/[0.06] rounded-xl overflow-hidden">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between px-4 py-3 bg-[#141414]"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 text-xs font-semibold uppercase">
                  {member.name[0]}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{member.name}</p>
                  <p className="text-white/40 text-xs">{member.email}</p>
                </div>
              </div>
              <span className="text-white/40 text-xs border border-white/10 px-2 py-0.5 rounded-md">
                {member.role}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}