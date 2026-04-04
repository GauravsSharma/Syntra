import express from 'express';
import { generateRedirectUrl } from '../controllers/user.js';


const router = express.Router();

// Example route for getting user information
router.get("/",generateRedirectUrl)

export default router;