import { Request, Response } from "express";
import { summarizeMarkdown } from "../utils/ai.js";

export const addKnowledge = async (req: Request, res: Response) => {
    try {
        const { type } = req.body;
        if (type !== "website" && type !== "qand" && type !== "file") {
            return res.status(400).json({ message: "Invalid knowledge type" });
        }
        if (type === "website") {
            const zenUrl = new URL("https://api.zenrows.com/v1/");

            zenUrl.searchParams.set("apikey", process.env.ZENROWS_API_KEY!);
            zenUrl.searchParams.set("url", req.body.url);
            zenUrl.searchParams.set("response_type", "markdown");

            const response = await fetch(zenUrl.toString(), {
                headers: {
                    "User-Agent": "SyntraSupportBot/1.0"
                }
            });
            const html = await response.text();
            if (!response.text) {
                return res.status(502).json(
                    {
                        body: html.slice(0, 500),
                        status: res.status,
                        message: "Failed to fetch website content"
                    }
                );
            }
            const summary = await summarizeMarkdown(html);   
        }
        console.log("Received knowledge data:", { type });
        res.status(200).json({ message: "Knowledge added successfully", data: { type } });
    } catch (error) {
        console.error("Error adding knowledge:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}