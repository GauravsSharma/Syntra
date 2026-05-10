import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import scalekit from "../config/scalkit";

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: "/",
};

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
        console.log(pendingUser);

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
export const getTeamMembers = async (req: Request, res: Response) => {
    try {
        const og_id = (req as any).user.organization_id;

        const team_members = await prisma.teamMember.findMany({
            where: { organization_id: og_id }
        })
        res.status(200).json({
            success: true,
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
export const getMyOrganizations = async (req: Request, res: Response) => {
    try {

        const user_email = (req as any).user.email;
        const teamMembers = await prisma.teamMember.findMany({
            where: {
                user_email
            },
            select: {
                organization_id: true
            }
        });
        const organizationIds = teamMembers.map(
            (member) => member.organization_id
        );

        const organizations = await prisma.organization.findMany({
            where: {
                id: {
                    in: organizationIds
                }
            }
        });
        const user_org = await prisma.organization.findFirst({
            where: { owner_email: user_email },
        })

        return res.status(200).json({
            success: true,
            organizations: [...organizations, user_org]

        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};


export const switchOrganizations = async (req: Request, res: Response) => {
  try {
    const { org_id } = req.body;
    const user_email = (req as any).user.email as string;

    // Check if user is the org owner
    const ownedOrg = await prisma.organization.findFirst({
      where: { owner_email: user_email, id: org_id },
    });

    // Fall back to team membership check
    const membership = !ownedOrg
      ? await prisma.teamMember.findFirst({
          where: { user_email, organization_id: org_id },
          select: { organization_id: true, role: true },
        })
      : null;

    if (!ownedOrg && !membership) {
      return res.status(403).json({
        success: false,
        message: "You are not a member of this organization.",
      });
    }

    const userSession = {
      email: user_email,
      organization_id: ownedOrg ? ownedOrg.id : membership!.organization_id,
      role: ownedOrg ? "admin" : membership!.role,
    };

    
    const organization = ownedOrg
    ? ownedOrg
    : await prisma.organization.findUnique({
        where: { id: membership!.organization_id },
    });
    
    res.cookie("user_session", JSON.stringify(userSession), COOKIE_OPTIONS);
    res.cookie("user_metadata", JSON.stringify(organization), COOKIE_OPTIONS);
    
    return res.status(200).json({ success: true, organization });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
