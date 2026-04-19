import { Request, Response } from "express";
import { summarizeMarkdown } from "../utils/ai.js";
import { prisma } from "../lib/prisma.js";

export const addKnowledge = async (req: Request, res: Response) => {
    try {
        const { type } = req.body;

        if (!["website", "text", "file"].includes(type)) {
            return res.status(400).json({
                success: false,
                message: "Invalid knowledge type",
            });
        }
        let createdData;

        if (type === "file") {       
            const file = req.file;

            if (!file) {
                return res.status(400).json({
                    success: false,
                    message: "No file provided",
                });
            }

            const fileContent = file.buffer.toString("utf-8");
        
            const lines = fileContent
                .split("\n")
                .filter((line) => line.trim());

            const headers = lines[0].split(",").map((h) => h.trim());

            const markdown = await summarizeMarkdown(fileContent);

            createdData = await prisma.knowledgeSource.create({
                data: {
                    user_email: (req as any).user.email,
                    type: "file",
                    name: file.originalname,
                    status: "active",
                    content: markdown,
                    meta_data: JSON.stringify(
                        {
                            fileName: file.originalname,
                            fileSize: file.size,
                            rowCount: lines.length - 1,
                            headers,
                        }
                    ),
                },
            });
        }

        else if (type === "website") {
            const zenUrl = new URL("https://api.zenrows.com/v1/");

            zenUrl.searchParams.set("apikey", process.env.ZENROWS_API_KEY!);
            zenUrl.searchParams.set("url", req.body.url);
            zenUrl.searchParams.set("response_type", "markdown");

            const response = await fetch(zenUrl.toString(), {
                headers: { "User-Agent": "SyntraSupportBot/1.0" },
            });

            const html = await response.text();

            if (!html) {
                return res.status(502).json({
                    success: false,
                    message: "Failed to fetch website content",
                });
            }

            const summary = await summarizeMarkdown(html);

            createdData = await prisma.knowledgeSource.create({
                data: {
                    type: "website",
                    user_email: (req as any).user.email,
                    status: "active",
                    source_url: req.body.url,
                    content: summary,
                    name: req.body.url,
                },
            });
        }

        else if (type === "text") {
            const content = req.body.content;

            let summary = content;
            if (content.length > 500) {
                summary = await summarizeMarkdown(content);
            }

            createdData = await prisma.knowledgeSource.create({
                data: {
                    type: "text",
                    user_email: (req as any).user.email,
                    status: "active",
                    content: summary,
                    name: req.body.title || "Text Knowledge",
                },
            });
        }

        return res.status(201).json({
            success: true,
            message: "Knowledge added successfully",
            data: createdData,
        });

    } catch (error) {
        console.error("Error adding knowledge:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
export const getKnowledge = async (req: Request, res: Response) => {
    try {
        const knowledgeSources = await prisma.knowledgeSource.findMany({
            where: { user_email: (req as any).user.email },
            orderBy: { created_at: "desc" },
        });
        return res.status(200).json({
            success: true,
            data: knowledgeSources,
        });
    }
    catch (error) {
        console.error("Error fetching knowledge sources:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
           }); 
    }   
}