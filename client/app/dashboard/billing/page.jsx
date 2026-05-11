"use client"
import CurrentPlanCard from "@/components/billing/CurrentPlanCard";
import PlanCard from "@/components/billing/PlanCard";
import { Separator } from "@/components/ui/separator";
import { useGetCurrentPlan, useUpgradePlan } from "@/hooks/usePlans";


export default function BillingPage() {
    const { data: currentPlan, isLoading } = useGetCurrentPlan()
    const {mutate,isPending} = useUpgradePlan()
    if (isLoading) {
        return (
            <div className="min-h-screen bg-black text-white p-8">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold">
                            Loading...
                        </h1>
                    </div>
                </div>
            </div>
        )
    }
  const handleUpgrade = (plan) => {
     mutate(plan.toUpperCase(),{
        onSuccess:()=>{

        }
     })
  }
    console.log(currentPlan);
    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-6xl mx-auto">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold">
                        Billing
                    </h1>

                    <p className="text-sm text-muted-foreground mt-1">
                        Manage your subscription and usage limits.
                    </p>
                </div>

                {/* Current Plan */}
                <div className="flex items-center gap-4 mb-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                        Current Plan
                    </p>

                    <Separator className="flex-1 bg-zinc-900" />
                </div>

                <CurrentPlanCard currentPlan={currentPlan} />

                {/* All Plans */}
                <div className="flex items-center gap-4 mt-10 mb-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                        All Plans
                    </p>

                    <Separator className="flex-1 bg-zinc-900" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <PlanCard
                    active={currentPlan.name ==="Free"}
                        name="Free"
                        description="Get started for free"
                        price="Free"
                        features={[
                            "100 AI messages",
                            "1 knowledge source",
                            "Analytics dashboard",
                        ]}
                        handleUpgrade={handleUpgrade}
                        
                    />

                    <PlanCard
                        active={currentPlan.name === "Ninja"}
                        popular
                        name="Ninja"
                        description="For growing teams"
                        price="$9.99"
                        features={[
                            "2,000 AI messages",
                            "2 knowledge sources",
                            "Analytics dashboard",
                        ]}
                        handleUpgrade={handleUpgrade}
                        isPending={isPending}
                    />

                    <PlanCard
                        pro
                            active={currentPlan.name === "Ninja Pro"}
                        name="Ninja Pro"
                        description="Unlimited power"
                        price="$29.99"
                        features={[
                            "10,000 AI messages",
                            "5 knowledge sources",
                            "Analytics dashboard",
                        ]}
                        handleUpgrade={handleUpgrade}
                        isPending={isPending}
                    />
                </div>

                <p className="text-center text-xs text-zinc-600 mt-6">
                    All plans include SSL security, 99.9% uptime SLA,
                    and email support.
                </p>
            </div>
        </div>
    );
}