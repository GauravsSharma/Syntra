import express from 'express';

const router = express.Router();

import { addKnowledge } from '../controllers/knowledge.js';
import { upload } from '../config/multer.js';

router.post("/",  upload.single("file"),addKnowledge)

export default router;