import { Resend } from "resend";
import { PlanType } from "../../generated/prisma/client";
import { PLANS } from "../data/pricing";
import { prisma } from "../lib/prisma";
// types alag define karo
type AIStatus = 'OPEN' | 'ESCALATED' | 'EXPIRED'

export interface AIResponse {
  status: AIStatus;
  mssg: string;
  user_email: string | null;
}

const isValidResponse = (data: any): data is AIResponse => {
  return (
    data &&
    (data.status === "OPEN" || data.status === "ESCALATED" || data.status ==="EXPIRED") &&
    typeof data.mssg === "string" &&
    (typeof data.user_email === "string" || data.user_email === null) // Fix 1: correct null check
  );
};

export function parseAIResponse(rawText: string): AIResponse {
  console.log("Ai reponse...", rawText);

  if (!rawText || typeof rawText !== "string") {
    return {
      status: "OPEN",
      mssg: "Something went wrong. Please try again.",
      user_email: null, // Fix 2: added missing required field
    };
  }

  const trimmed = rawText.trim();

  // 1. Try direct parse
  try {
    const parsed = JSON.parse(trimmed);
    if (isValidResponse(parsed)) return parsed;
    throw new Error("Invalid format");
  } catch {}

  // 2. Try extracting JSON from messy output
  const match = trimmed.match(/\{[\s\S]*\}/);
  if (match) {
    try {
      const parsed = JSON.parse(match[0]);
      if (isValidResponse(parsed)) return parsed;
    } catch {}
  }

  // 3. Final fallback
  return {
    status: "OPEN",
    mssg: trimmed,
    user_email: null, // Fix 2: added missing required field
  };
}
export const validateAccess = async (
  orgId: string
): Promise<boolean> => {
  try {
    const [subscription, usage] = await Promise.all([
      prisma.subscription.findFirst({
        where: {
          organization_id: orgId,
        },
        select: {
          plan: true,
        },
      }),

      prisma.organizationUsage.findFirst({
        where: {
          organization_id: orgId,
        },
        select: {
          lifetime_ai_messages_used: true,
          monthly_ai_messages_used: true,
        },
      }),
    ]);

    if (!subscription || !usage) {
      return true;
    }

    const plan = subscription.plan as PlanType;
    
    /// free plan -> lifetime usage
    if (plan === "FREE") {
      console.log(plan);
      console.log( usage.lifetime_ai_messages_used ,
        PLANS.FREE.aiMessages);
      
      return (
        usage.lifetime_ai_messages_used <
        PLANS.FREE.aiMessages
      );
    }

    /// paid plans -> monthly usage
    return (
      usage.monthly_ai_messages_used <
      PLANS[plan].aiMessages
    );
  } catch (error) {
    console.error("Access validation error:", error);
    throw new Error("Failed to validate access");
  }
};

const resend = new Resend(process.env.RESEND_API_KEY);
export const sendEmail = async(to_email:string,from_email:string)=>{
try {
  await resend.emails.send({
  from: "Syntra <onboarding@resend.dev>",
  to: to_email,
  subject: "New Escalated Conversation",
  html: `
    <h2>Conversation Escalated</h2>
    <p>A user requested human support.</p>
    <p>Customer email: ${from_email || "Email not provided."}</p>
  `,
});
} catch (error) {
  console.log(error);
  
}
}
