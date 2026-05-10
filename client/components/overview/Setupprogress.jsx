import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { label: "Website Scanned" },
  { label: "Knowledge Added" },
  { label: "Sections Configured" },
  { label: "Widget Installed" },
];

export function SetupProgress({ completedSteps = [] }) {
console.log(completedSteps);

  return (
    <div className="mb-6">
      <h1 className="text-xl sm:text-lg  font-semibold text-white mb-4">Setup Progress</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
        {steps.map((step, i) => {
          const isDone = completedSteps.includes(i);
          return (
            <div
              key={step.label}
              className={cn(
                "flex items-center justify-between rounded-lg border px-3 sm:px-4 py-3",
                isDone
                  ? "border-white/10 bg-white/5 text-white/70"
                  : "border-white/5 bg-white/[0.02] text-white/30"
              )}
            >
              <span className="text-xs sm:text-sm leading-snug">{step.label}</span>
              {isDone && (
                <Check className="size-3.5 sm:size-4 text-white/50 shrink-0 ml-2" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}