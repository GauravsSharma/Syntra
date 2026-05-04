"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, Loader2 } from "lucide-react";
import { useAddMember } from "@/hooks/useOrganization";
import { toast } from "sonner";

export default function AddMemberDialog({ open, setOpen, onMemberAdded }) {
  const { mutate, isPending: loading } = useAddMember()
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim()) {
      setError("Both name and email are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    mutate({ ...form, member_email: form.email }, {
      onSuccess: () => {
        setForm({ user: "", email: "" })
        setOpen(false)
        toast.success("Member Invited successfully.")
      },
      onError: () => {
        toast.error("Error while inviting the member.")
      }
    })
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>

      <DialogContent className="bg-[#111111] border border-white/[0.07] rounded-lg text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white text-lg font-semibold">
            Add Team Member
          </DialogTitle>
          <p className="text-white/40 text-sm">
            Invite someone to join your workspace.
          </p>
        </DialogHeader>

        <div className="flex flex-col gap-5 py-2">
          {/* Name */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-white/70 text-sm">
              Full Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              className="bg-white/[0.04] border-white/10 rounded-lg text-white placeholder:text-white/20 focus-visible:ring-white/20"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="text-white/70 text-sm">
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={form.email}
              onChange={handleChange}
              className="bg-white/[0.04] border-white/10 text-white rounded-lg placeholder:text-white/20 focus-visible:ring-white/20"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
            className="text-white/50 hover:text-white hover:bg-white/[0.06] rounded-lg"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-white text-black hover:bg-white/90 font-medium rounded-lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Invite"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}