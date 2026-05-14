"use client";

import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";
import { useDeleteOrg } from "@/hooks/useOrganization";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useUserStore } from "@/stores/useUserStore";

export default function DangerZone() {
  const router = useRouter();
  const { mutate, isPending } = useDeleteOrg();
  const {setUser} = useUserStore()
  const handleDelete = () => {
    mutate(undefined, {
      onSuccess: () => {
        setUser(null);
        router.push("/");
      },
    });
  };

  return (
    <section>
      <div className="mb-4">
        <h2 className="text-red-500 text-base font-semibold">Danger Zone</h2>
        <p className="text-white/30 text-sm mt-0.5">
          Irreversible actions for this workspace.
        </p>
      </div>

      <div className="border border-red-500/20 rounded-lg bg-red-500/[0.03] px-4 sm:px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
        <div>
          <p className="text-white text-sm font-medium">Delete Workspace</p>
          <p className="text-white/40 text-xs mt-0.5">
            Permanently delete all knowledge, conversations, and settings.
          </p>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="flex items-center justify-center gap-1.5 bg-red-600/80 hover:bg-red-600 text-white text-sm px-3.5 py-1.5 rounded-sm transition-colors w-full sm:w-auto shrink-0">
              <Trash2 size={13} />
              Delete
            </button>
          </AlertDialogTrigger>

          <AlertDialogContent className="bg-[#111] rounded-lg border border-white/10 text-white">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">
                Delete Workspace?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-white/50">
                This will permanently delete all knowledge sources,
                conversations, and settings. This action{" "}
                <span className="text-red-400 font-medium">cannot be undone</span>.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel
                disabled={isPending}
                className="bg-transparent border border-white/10 rounded-lg text-white/60 hover:bg-white/5 hover:text-white transition-colors"
              >
                Cancel
              </AlertDialogCancel>

              <AlertDialogAction
                disabled={isPending}
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete();
                }}
                className="bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors disabled:opacity-60"
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <Loader2 size={13} className="animate-spin" />
                    Deleting...
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <Trash2 size={13} />
                    Confirm Delete
                  </span>
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </section>
  );
}