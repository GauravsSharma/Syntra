import express from 'express';
const router = express.Router();

import { authMiddleware } from '../middleware/auth.js';
import { getOrgCurrentPlan, upgradePlan } from '../controllers/plan.js';

router.get("/upgrade", authMiddleware,upgradePlan)
router.get("/current", authMiddleware,getOrgCurrentPlan)

export default router;