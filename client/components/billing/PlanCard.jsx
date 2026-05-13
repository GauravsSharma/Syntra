import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
    Check,
    Shield,
    Bolt,
    Crown,
    Loader2,
} from "lucide-react";
import { useUpgradePlan } from "@/hooks/usePlans";


export default function PlanCard({
    name,
    description,
    price,
    features,
    active,
    popular,
    pro,
    handleUpgrade,
    isPending
}) {

    const Icon = pro
        ? Crown
        : active
            ? Bolt
            : Shield;

    return (
        <Card
            className={`
        relative overflow-hidden rounded-2xl p-6 bg-zinc-950 border-zinc-900
        ${active ? "border-indigo-500/30 bg-indigo-500/[0.03]" : ""}
        ${pro ? "hover:border-amber-500/30" : ""}
      `}
        >

            {popular && (
                <Badge className="absolute top-4 right-4 bg-indigo-500/10 text-indigo-400 border-indigo-500/20">
                    Popular
                </Badge>
            )}

            {pro && (
                <Badge className="absolute top-4 right-4 bg-amber-500/10 text-amber-400 border-amber-500/20">
                    Best Value
                </Badge>
            )}

            <div
                className={`
          h-11 w-11 rounded-xl flex items-center justify-center border mb-5
          ${pro
                        ? "bg-amber-500/10 border-amber-500/20"
                        : active
                            ? "bg-indigo-500/10 border-indigo-500/20"
                            : "bg-zinc-900 border-zinc-800"
                    }
        `}
            >
                <Icon
                    className={`
            h-5 w-5
            ${pro
                            ? "text-amber-400"
                            : active
                                ? "text-indigo-400"
                                : "text-zinc-400"
                        }
          `}
                />
            </div>

            <h2 className="text-xl font-bold">
                {name}
            </h2>

            <p className="text-sm text-muted-foreground mt-1">
                {description}
            </p>

            <div className="mt-6">
                <span className="text-4xl font-bold">
                    {price}
                </span>

                {price !== "Free" && (
                    <span className="text-muted-foreground ml-1">
                        /mo
                    </span>
                )}
            </div>

            <div className="space-y-3 mt-6">
                {features.map((feature) => (
                    <div
                        key={feature}
                        className="flex items-center gap-3"
                    >
                        <div
                            className={`
                h-5 w-5 rounded-full flex items-center justify-center
                ${pro
                                    ? "bg-amber-500/10"
                                    : active
                                        ? "bg-indigo-500/10"
                                        : "bg-zinc-800"
                                }
              `}
                        >
                            <Check
                                className={`
                  h-3 w-3
                  ${pro
                                        ? "text-amber-400"
                                        : active
                                            ? "text-indigo-400"
                                            : "text-zinc-400"
                                    }
                `}
                            />
                        </div>

                        <span className="text-sm text-zinc-400">
                            {feature}
                        </span>
                    </div>
                ))}
            </div>

            <Button
                onClick={() => handleUpgrade(name)}
                disabled={active || name === "Free" || isPending}
                className={`
    w-full mt-8 rounded-xl
    ${active
                        ? "bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20"
                        : pro
                            ? "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
                            : ""
                    }
  `}
                variant={active || pro ? "secondary" : "outline"}
            >
                {isPending ? (
                    <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Creating Order...
                    </div>
                ) : active ? (
                    "Current Plan"
                ) : pro ? (
                    "Upgrade"
                ) : (
                    "Get Started"
                )}
            </Button>
        </Card>
    );
}