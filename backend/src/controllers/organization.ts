import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import scalekit from "../config/scalkit";

export const getOrganization = async (req: Request, res: Response) => {
    try {
        const email = (req as any).user.email;
        const cookie = req.cookies.user_metadata;
        let metadata;
        if (!cookie) {
            metadata = await prisma.metadata.findUnique({
                where: { user_email: email }
            })
        }
        else {
            metadata = JSON.parse(cookie);
        }

        const organization = {
            ...(metadata || []),
            id: (req as any).user.organizationId
        }

        return res.status(200).json({
            success: true,
            organization
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const addMemberToOrganization = async (req: Request, res: Response) => {
    try {
        const organizationId = (req as any).user.organizationId
        const { name, member_email } = req.body;
        if (!member_email) {
            return res.status(400).json({
                success: false,
                message: "Member email is required."
            })
        }
        const pendingUser = await prisma.teamMember.findFirst({
            where: { user_email: member_email }
        })
        if (pendingUser) {
            return res.status(400).json({
                success: false,
                message: "User is already invited."
            })
        }
        const { user } = await scalekit.user.createUserAndMembership(organizationId, {
            email: member_email,
            userProfile: {
                firstName: name || member_email.split("@")[0],
                lastName: ""
            },
            sendInvitationEmail: true
        })
        const member = await prisma.teamMember.create({
            data: {
                user_email: member_email,
                name: name || member_email.split("@")[0],
                organization_id: organizationId
            }
        })
        return res.status(200).json({
            success: true,
            message: "Email sent successfully.",
            member
        })
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}
export const getTeamMembers = async(req: Request, res: Response)=>{
    try {
       const og_id = (req as any).user.organization_id;

      const team_members = await prisma.teamMember.findMany({
        where:{organization_id:og_id}
      })
      res.status(200).json({
        success:true,
        team_members
      })
    } catch (error) {
        console.log(error);
          res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}