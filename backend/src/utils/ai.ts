import { GoogleGenerativeAI } from "@google/generative-ai";
import https from "https";

interface Message{
    role: "user"|"assistant",
    content:string
}
const agent = new https.Agent({
    rejectUnauthorized: false, // For development - set to true in production
});
// ✅ Pehle original fetch save karo
const originalFetch = global.fetch;

const customFetch = (url: RequestInfo | URL, init?: RequestInit) => {
    return originalFetch(url, {  // ✅ originalFetch use karo, global.fetch nahi
        ...init,
        // @ts-ignore - Node.js specific
        agent: url.toString().startsWith("https") ? agent : undefined,
    });
};

// Ab replace karo
global.fetch = customFetch as typeof fetch;


export const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function summarizeMarkdown(markdown: string) {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash-lite",
            systemInstruction: `
You are a data summarization engine for an AI chatbot.
Your task:
* Convert the input website markdown or text or csv files data into a CLEAN, DENSE SUMMARY for LLM context usage.
STRICT RULES:
* Output ONLY plain text (no markdown, no bullet points, no headings).
* Write as ONE continuous paragraph.
* Remove navigation, menus, buttons, CTAs, pricing tables, sponsors, ads, testimonials, community chats, UI labels, emojis, and decorative content.
* Remove repetition and marketing language.
* Keep ONLY factual, informational content that helps answer customer support questions.
* Do NOT copy sentences verbatim unless absolutely necessary.
* Compress aggressively while preserving meaning.
* The final output MUST be under 2000 words.
The result will be stored as long-term context for a chatbot.
      `,
            generationConfig: {
                temperature: 0.1,
                maxOutputTokens: 900,
            },
        });

        const result = await model.generateContent(markdown);
        return result.response.text().trim() ?? "";
    } catch (error) {
        console.error("Error in summarizeMarkdown:", error);
        throw error;
    }
}
export async function summarizeConversation(messages: any[]) {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash-lite",
        });

        const formatted = messages
            .map(m => `${m.role}: ${m.content}`)
            .join("\n");

        const prompt = `
You are a summarization assistant.

Summarize the following conversation.
- Maximum length: 1000 words
- Keep key facts, decisions, and user intent
- Remove filler, greetings, and repetition
- Be clear and structured

Conversation:
${formatted}
`;

        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: 0.3,
                maxOutputTokens: 1200, // safety cap (~1000 words ≈ 1300–1500 tokens)
            },
        });

        return result.response.text();

    } catch (error) {
        console.error(error);
        throw error;
    }
}
export async function countTokens(text: string) {
    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash-lite"
    });

    const result = await model.countTokens(text);
    return result.totalTokens;
}
export const countConversatonToken = async (
    messages: { role: string; content: string }[]
) => {
    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash-lite",
    });

    let token = 0;

    for (let mssg of messages) {
        const res = await model.countTokens(mssg.content);

        token += 4;
        token += res.totalTokens;
    }

    return token;
};

export const generateReply = async (
  context: string,
  recentMessages: Message[]
) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-lite",
    systemInstruction: `You are Sarah, a friendly, human-like customer support specialist.

CRITICAL RULES:
- If asked for your name, respond: "I'm Sarah".
- If asked for your role, respond: "I'm a customer support specialist".
- Keep answers EXTREMELY SHORT (max 1–2 sentences).
- If the question is broad, ask a clarifying question instead of answering.
- Never dump information. Guide the user conversationally.
- Mirror the user's brevity.

ESCALATION PROTOCOL — THIS IS MANDATORY:
- If the answer is NOT found in the Knowledge Base below, you MUST respond EXACTLY:
  "I don't have that info right now. Would you like me to raise a support ticket?"
- Do NOT say "I don't have information in my knowledge base" without offering a ticket.
- If user says yes to ticket:
  "[ESCALATED] I've raised a support ticket. Our team will reach out to you soon!"
- If user seems frustrated or repeats the same question, also offer a ticket.

IMPORTANT:
- Answer ONLY from the context below
- Do NOT guess or add external knowledge

Knowledge Base:
${context}`
  });

  const result = await model.generateContent({
    contents: recentMessages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    })),
    generationConfig: {
      temperature: 0.35,
      maxOutputTokens: 200,
    },
  });

  return result.response.text().trim();
};