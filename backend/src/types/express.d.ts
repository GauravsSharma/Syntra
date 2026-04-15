// types/express.d.ts
import { Request } from "express";

export interface AuthRequest extends Request {
  user?: {
    email: string;
    organizationId: string | null;
  };
}