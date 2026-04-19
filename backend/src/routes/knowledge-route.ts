import express from 'express';

const router = express.Router();

import { addKnowledge, getKnowledge } from '../controllers/knowledge.js';
import { upload } from '../config/multer.js';
import { authMiddleware } from '../middleware/auth.js';

router.get("/", authMiddleware,getKnowledge)
router.post("/", authMiddleware ,upload.single("file"),addKnowledge)

export default router;