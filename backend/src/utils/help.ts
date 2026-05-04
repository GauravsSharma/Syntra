export type AIStatus = "active" | "escalated";

export interface AIResponse {
  status: AIStatus;
  mssg: string;
}

const isValidResponse = (data: any): data is AIResponse => {
  return (
    data &&
    (data.status === "active" || data.status === "escalated") &&
    typeof data.mssg === "string"
  );
};

export function parseAIResponse(rawText: string): AIResponse {
    console.log("Ai reponse...",rawText);
    
  if (!rawText || typeof rawText !== "string") {
    return {
      status: "active",
      mssg: "Something went wrong. Please try again.",
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
    status: "active",
    mssg: trimmed,
  };
}