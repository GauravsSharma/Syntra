"use client";

export default function WorkspaceSettings({ workspace }) {
  return (
    <section>
      <div className="mb-5">
        <h2 className="text-white text-base font-semibold">Workspace Settings</h2>
        <p className="text-white/40 text-sm mt-0.5">
          General settings for your organization. (Read Only)
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-white/60 text-xs font-medium">Workspace Name</label>
          <input
            readOnly
            value={workspace.name}
            className="bg-[#1a1a1a] border border-white/[0.08] rounded-lg px-3 py-2.5 text-white/80 text-sm outline-none cursor-default"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-white/60 text-xs font-medium">Primary Website</label>
          <input
            readOnly
            value={workspace.website}
            className="bg-[#1a1a1a] border border-white/[0.08] rounded-lg px-3 py-2.5 text-white/80 text-sm outline-none cursor-default"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-white/60 text-xs font-medium">Default Language</label>
          <input
            readOnly
            value={workspace.language}
            className="bg-[#1a1a1a] border border-white/[0.08] rounded-lg px-3 py-2.5 text-white/80 text-sm outline-none cursor-default"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-white/60 text-xs font-medium">Timezone</label>
          <input
            readOnly
            value={workspace.timezone}
            className="bg-[#1a1a1a] border border-white/[0.08] rounded-lg px-3 py-2.5 text-white/80 text-sm outline-none cursor-default"
          />
        </div>
      </div>
    </section>
  );
}