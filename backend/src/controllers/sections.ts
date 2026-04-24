import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
export const addSection = async (req: Request, res: Response) => {
    try {
        const { name, description, data_sources, tone, allowed_topics, blocked_topics } = req.body;
        if (!name || !description || !tone) {
            return res.status(400).json({
                success: false,
                message: "Name, description and tone are required",
            });
        }
        if (!data_sources || !Array.isArray(data_sources) || data_sources.length === 0) {
            return res.status(400).json({
                success: false,
                message: "At least one data source is required",
            });
        }
        console.log(data_sources,allowed_topics);
        
        const section = await prisma.section.create({
            data: {
                userEmail: (req as any).user.email,
                name,
                description,
                tone,
                allowedTopics: allowed_topics || [],
                blockedTopics: blocked_topics || [],
                sourceIds: data_sources,
                status: "active",
            }
        });
        return res.status(201).json({
            success: true,
            message: "Section added successfully",
            data: section,
        });
    } catch (error) {
        console.error("Error adding section:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}
export const getSections = async (req: Request, res: Response) => {
    try {
        const sections = await prisma.section.findMany({
            where: { userEmail: (req as any).user.email },
        });
        return res.status(200).json({
            success: true,
            data: sections,
        });
    }
    catch (error) {
        console.error("Error fetching sections:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export const deleteSection = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Section ID is required",
            });
        }
        const section = await prisma.section.findFirst({
            where: {
                id: id,
                userEmail: (req as any).user.email,
            },
        });
        if (!section) {
            return res.status(404).json({
                success: false,
                message: "Section not found",
            });
        }
        if (section.userEmail !== (req as any).user.email) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this section",
            });
        }
        await prisma.section.deleteMany({
            where: {
                id,
                userEmail: (req as any).user.email,
            },
        });
        return res.status(200).json({
            success: true,
            message: "Section deleted successfully",
        });
    }
    catch (error) {
        console.error("Error deleting section:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}