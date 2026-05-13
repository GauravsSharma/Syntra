// ─── APPEARANCE PANEL ─────────────────────────────────────────────────────────

import { Save } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { ColorSwatch } from "./ColorSwatch";
import { useUpdateChatbotConfig } from "@/hooks/useChatBot";
import { toast } from "sonner";

const COLORS = ["#7c3aed", "#6366f1", "#10b981", "#ef4444", "#f97316", "#22c55e"];
const PRESET_COLORS = [
  { name: 'Indigo', value: '#4f39f6' },
  { name: 'Blue', value: '#2563eb' },
  { name: 'Emerald', value: '#059669' },
  { name: 'Rose', value: '#e11d48' },
  { name: 'Orange', value: '#ea580c' },
];

export function AppearancePanel({
  primaryColor,
  setPrimaryColor,
  welcomeMessage,
  setWelcomeMessage,
  isChanged,
  setIsChangesSaved
  // isSaving = false
}) {
  const { mutate, isPending: isSaving } = useUpdateChatbotConfig()
  const handleSave = () => {
    mutate({ color: primaryColor, welcomeMessage }, {
      onSuccess: () => {
        setIsChangesSaved(false);
        toast.success("Changes saved.")
      },
      onError: () => {
        toast.error("Error while saving changes !")
      }
    })
  }
  return (
    <div className="space-y-4">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
        Appearance
      </p>

      <div>
        <p className="text-sm font-medium mb-3">Primary Color</p>
        <div className="flex gap-2 flex-wrap">
          {PRESET_COLORS.map((c) => (
            <ColorSwatch
              key={c.value}
              color={c.value}
              selected={primaryColor === c.value}
              onClick={setPrimaryColor}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium mb-2">Welcome Message</p>
        <Textarea
          value={welcomeMessage}
          onChange={(e) => setWelcomeMessage(e.target.value)}
          className="text-sm min-h-[80px] resize-none"
        />
      </div>
      {
        isChanged && <Button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full bg-white rounded-lg text-black hover:bg-zinc-200"
        >
          {isSaving ? (
            "Saving..."
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      }
    </div>
  );
}
