import { addMemberToOrganization, getOrganization } from "../controllers/organization";
import express from 'express';

const router = express.Router();
import { authMiddleware } from '../middleware/auth.js';

router.get("/", authMiddleware,getOrganization)
router.post("/members/add", authMiddleware,addMemberToOrganization)

export default router;
