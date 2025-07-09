import express from 'express';
import Event from '../models/Event';
import { Request, Response, NextFunction } from 'express';

const router = express.Router();

// 이벤트 목록 조회 (필터/검색/정렬)
router.get('/', async (req: Request, res: Response) => {
  try {
    const { type, region, keyword, sort } = req.query;
    const filter: any = {};
    if (type) filter.type = type;
    if (region && region !== '전체') filter.region = region;
    if (keyword) filter.$or = [
      { name: { $regex: keyword, $options: 'i' } },
      { location: { $regex: keyword, $options: 'i' } },
      { description: { $regex: keyword, $options: 'i' } }
    ];
    let sortOption: any = { createdAt: -1 };
    if (sort === 'upcoming') sortOption = { startDate: 1 };
    if (sort === 'popular') sortOption = { views: -1 };
    const events = await Event.find(filter).sort(sortOption);
    res.json(events);
  } catch (e) {
    res.status(500).json({ error: '이벤트 목록 조회 실패' });
  }
});

// 이벤트 상세 조회 (+조회수 증가)
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!event) return res.status(404).json({ error: '이벤트 없음' });
    res.json(event);
  } catch (e) {
    res.status(500).json({ error: '이벤트 조회 실패' });
  }
});

// 관리자 인증 미들웨어
function adminAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['x-admin-token'];
  if (token === process.env.ADMIN_TOKEN) return next();
  return res.status(401).json({ error: '관리자 인증 실패' });
}

// 이벤트 생성 (관리자)
router.post('/', adminAuth, async (req: Request, res: Response) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (e) {
    res.status(400).json({ error: '이벤트 생성 실패' });
  }
});

// 이벤트 수정 (관리자)
router.put('/:id', adminAuth, async (req: Request, res: Response) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(404).json({ error: '이벤트 없음' });
    res.json(event);
  } catch (e) {
    res.status(400).json({ error: '이벤트 수정 실패' });
  }
});

// 이벤트 삭제 (관리자)
router.delete('/:id', adminAuth, async (req: Request, res: Response) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ error: '이벤트 없음' });
    res.json({ success: true });
  } catch (e) {
    res.status(400).json({ error: '이벤트 삭제 실패' });
  }
});

export default router; 