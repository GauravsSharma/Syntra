import express from 'express';

const router = express.Router();

import { upload } from '../config/multer.js';
import { authMiddleware } from '../middleware/auth.js';

router.get("/scalekit", authMiddleware)

export default router;