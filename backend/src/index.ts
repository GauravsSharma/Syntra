import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import userRoute from './routes/user-route.js';
import knowledgeRouter from './routes/knowledge-route.js';
import chatBotRouter from './routes/chatBot-route.js';
import sectionRouter from './routes/sections-route.js';
import organizationRouter from './routes/organization-route.js';
import webhooks from './routes/webhook-route.js';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000
console.log(process.env.CLIENT_URL);

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth",userRoute)
app.use("/api/knowledge",knowledgeRouter)
app.use("/api/section",sectionRouter)
app.use("/api/chatBot",chatBotRouter)
app.use("/api/organization",organizationRouter)
app.use("/api/webhooks",webhooks)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
