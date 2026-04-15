import { GoogleGenerativeAI } from "@google/generative-ai";
import https from "https";

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
            model: "gemini-2.5-flash",
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
            model: "gemini-2.0-flash",
            systemInstruction:
                "Summarize the following conversation history into a concise paragraph, preserving key details and user intent. The final output MUST be under 2000 words.",
            generationConfig: {
                temperature: 0.3,
                maxOutputTokens: 500,
            },
        });

        // Convert OpenAI message format to Gemini history format
        const history = messages.slice(0, -1).map((msg) => ({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [{ text: msg.content }],
        }));

        const lastMessage = messages[messages.length - 1];

        const chat = model.startChat({ history });
        const result = await chat.sendMessage(lastMessage.content);
        return result.response.text().trim() ?? "";
    } catch (error) {
        console.error("Error in summarizeConversation:", error);
        throw error;
    }
}