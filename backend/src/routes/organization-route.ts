import { addMemberToOrganization, getOrganization, getTeamMembers } from "../controllers/organization";
import express from 'express';

import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get("/", authMiddleware, getOrganization)

router.get("/members", authMiddleware, getTeamMembers)
router.post("/members", authMiddleware, addMemberToOrganization)

export default router;
