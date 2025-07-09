import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import eventRouter from './routes/event';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const MONGODB_URI = process.env.MONGODB_URI || '';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB 연결 성공'))
  .catch(err => {
    console.error('MongoDB 연결 실패', err);
    process.exit(1);
  });

app.use(cors());
app.use(express.json());
app.use('/api/events', eventRouter);

// 에러 핸들러
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: '서버 오류' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 