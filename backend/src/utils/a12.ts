import OpenAI from "openai";
import dotenv from "dotenv";
import { summarizeMarkdownPrompt } from "./prompts";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: "https://integrate.api.nvidia.com/v1",
});

export async function summarizeMarkdown(markdown: string) {
  try {
    const completion = await client.chat.completions.create({
      model: "meta/llama-3.1-8b-instruct",
      messages: [
        {
          role: "system",
          content: summarizeMarkdownPrompt,
        },
        {
          role: "user",
          content: markdown,
        },
      ],
      temperature: 0.1,
      max_tokens: 900,
    });
    console.log(completion.choices[0].message.content?.trim() ?? "");
    
    return completion.choices[0].message.content?.trim() ?? "";
  } catch (error) {
    console.error("Error in summarizeMarkdown:", error);
    throw error;
  }
}