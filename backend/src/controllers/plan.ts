import { Request, Response } from "express";

import { prisma } from "../lib/prisma.js";
import { PLANS } from "../data/pricing.js";
import { rozarPayInstance } from "../config/razorpay.js";

export const upgradePlan = async (req: Request, res: Response) => {
    try {
        const { plan } = req.body as { plan: keyof typeof PLANS };
        const selectedPlan = PLANS[plan];
        if (!selectedPlan) {
            return res.status(400).json({
                success: false,
                message: "Invalid plan selected."
            });
        }
        //plan price in dollar
        const organizationId = (req as any).user.organizationId;
        const options = {
            amount: selectedPlan.price * 100,
            currency: "USD",

            notes: {
                organizationId,
                plan,
            }
        }
        const razorpayOrder = await rozarPayInstance.orders.create(options);
        return res.json({
            success: true,
            order: razorpayOrder,
        })
    } catch (error) {
        console.log(error);

        res.status(500).json({ error: "Internal server error" });
    }
}
export const getOrgCurrentPlan = async (req: Request, res: Response) => {
    try {
        const organizationId = (req as any).user.organizationId;
     const organization = await prisma.organization.findUnique({
    where: {
        id: organizationId,
    },

    select: {
        plan: true,

        subscription: {
            select: {
                current_period_start: true,
                current_period_end: true,
                status: true,
            },
        },
    },
});
        if (!organization) {
            return res.status(404).json({
                success: false,
                message: "Organization not found"
            })
        }
        let plan = PLANS[organization.plan]
        const currentPlan = {
            ...plan,
            current_period_start: organization.subscription?.current_period_start,
            current_period_end: organization.subscription?.current_period_end,
            subscription_status: organization.subscription?.status,
        }
        return res.status(200).json({
            success: true,
            plan: currentPlan,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}