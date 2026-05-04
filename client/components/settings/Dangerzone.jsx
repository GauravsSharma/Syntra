"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

export default function DangerZone({ onDelete }) {
  const [confirming, setConfirming] = useState(false);

  return (
    <section>
      <div className="mb-4">
        <h2 className="text-red-500 text-base font-semibold">Danger Zone</h2>
        <p className="text-white/30 text-sm mt-0.5">
          Irreversible actions for this workspace.
        </p>
      </div>

      {/* Stack on mobile → row on sm+ */}
      <div className="border border-red-500/20 rounded-xl bg-red-500/[0.03] px-4 sm:px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
        <div>
          <p className="text-white text-sm font-medium">Delete Workspace</p>
          <p className="text-white/40 text-xs mt-0.5">
            Permanently delete all knowledge, conversations, and settings.
          </p>
        </div>

        {confirming ? (
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setConfirming(false)}
              className="flex-1 sm:flex-none text-white/50 hover:text-white text-sm px-3 py-1.5 rounded-sm border border-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setConfirming(false);
                onDelete?.();
              }}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-red-600 hover:bg-red-500 text-white text-sm px-3.5 py-1.5 rounded-md transition-colors"
            >
              <Trash2 size={13} />
              Confirm Delete
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirming(true)}
            className="flex items-center justify-center gap-1.5 bg-red-600/80 hover:bg-red-600 text-white text-sm px-3.5 py-1.5 rounded-lg transition-colors w-full sm:w-auto shrink-0"
          >
            <Trash2 size={13} />
            Delete
          </button>
        )}
      </div>
    </section>
  );
}