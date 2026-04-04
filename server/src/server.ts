import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoute from './routes/user-route.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json());
app.use("/api/user",userRoute)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
