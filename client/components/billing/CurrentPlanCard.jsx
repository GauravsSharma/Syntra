import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Bolt,
  Database,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

export default function CurrentPlanCard({ currentPlan }) {
  return (
    <Card className="bg-zinc-950 border-zinc-900 p-6 rounded-2xl">

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-4">

          <div className="h-12 w-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
            <Bolt className="h-5 w-5 text-indigo-400" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Active Plan
              </p>

              <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20">
                {currentPlan.subscription_status}
              </Badge>
            </div>

            <h2 className="text-xl font-bold mt-1">
              {currentPlan.name}
            </h2>

            <p className="text-sm text-muted-foreground">
              For growing teams
            </p>
          </div>
        </div>

        <div className="text-right">
          <h2 className="text-4xl font-bold">
            ${currentPlan.price}
          </h2>

          <p className="text-sm text-muted-foreground">
            per month
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3 mt-6">

        <div className="rounded-xl border border-indigo-500/10 bg-indigo-500/5 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4 text-indigo-400" />

            <span className="text-sm text-muted-foreground">
              AI Messages / mo
            </span>
          </div>

          <span className="font-semibold">
            {currentPlan.aiMessages}
          </span>
        </div>

        <div className="rounded-xl border border-indigo-500/10 bg-indigo-500/5 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-indigo-400" />

            <span className="text-sm text-muted-foreground">
              Knowledge Sources/section
            </span>
          </div>

          <span className="font-semibold">
            {currentPlan.knowledgeSources}
          </span>
        </div>

      </div>

      <div className="flex items-center justify-between border-t border-zinc-900 mt-6 pt-4">

        <p className="text-xs text-zinc-500">
          Next billing cycle: June 11, 2026
        </p>

        <Button
          variant="ghost"
          className="text-muted-foreground hover:text-white"
        >
          Manage subscription
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}