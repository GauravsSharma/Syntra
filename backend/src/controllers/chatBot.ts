import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { countConversatonToken, generateReply, summarizeConversation } from "../utils/ai";

export const getMetaData = async (req: Request, res: Response) => {
    try {
        const user_email = (req as any).user.email;
        let existingData = await prisma.chatBotMetadata.findFirst({
            where: { user_email }
        })
        if (!existingData) {
            existingData = await prisma.chatBotMetadata.create({
                data: {
                    user_email,
                }
            })
        }
        res.status(200).json({
            metadata: existingData,
            success: true
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            success: true
        })

    }
}
export const saveChanges = async (req: Request, res: Response) => {
    try {
        const user_email = (req as any).user.email;
        const { color, welcomeMessage } = req.body;
        const updated = await prisma.chatBotMetadata.update({
            where: { user_email },
            data: {
                color,
                welcome_message: welcomeMessage
            }
        })
        res.status(200).json({
            success: true,
            data: updated
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            success: true
        })

    }
}

export const testChatBot = async (req: Request, res: Response) => {
    try {
        let { messages, knowledgeSourcsIds } = req.body;

        if (!knowledgeSourcsIds || knowledgeSourcsIds.length <= 0) {
            return res.status(400).json({
                success: false,
                message: "Required knowledge sources",
            });
        }

        const sources = await prisma.knowledgeSource.findMany({
            where: {
                id: {
                    in: knowledgeSourcsIds,
                },
            },
            select: {
                content: true,
            },
        });
        let context = sources.map((s) => s.content).filter(Boolean).join("\n\n");
        console.log(context);
        
        const tokenCount = await countConversatonToken(messages);
        if (tokenCount > 6000) {
            const recentMessage = messages.slice(-10);
            const olderMessage = messages.slice(0, -10);
            if (olderMessage.length > 0) {
                const summarizedMessages = await summarizeConversation(olderMessage)
                context = `${context} \n\n PREVIOUS CONVRSATION SUMMARY:\n${summarizedMessages}`
                messages = recentMessage;
            }
        }
        const reply = await generateReply(context, messages);
        return res.status(200).json({
            success: true,
            message: reply
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Can't reached at this moment.",
            success: false
        })

    }
}