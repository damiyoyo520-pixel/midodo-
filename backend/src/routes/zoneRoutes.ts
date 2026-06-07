import { Router, Request, Response, NextFunction } from 'express';
import { Script } from '@/models/Script';

const router = Router();

router.get('/global', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 12 } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const [scripts, total] = await Promise.all([
      Script.find({ genre: '海外', isPublished: true })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit as string))
        .populate('author', 'username avatar'),
      Script.countDocuments({ genre: '海外', isPublished: true }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        scripts,
        pagination: {
          page: parseInt(page as string),
          limit: parseInt(limit as string),
          total,
          pages: Math.ceil(total / parseInt(limit as string)),
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/culture', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 12 } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const [scripts, total] = await Promise.all([
      Script.find({ genre: '文旅', isPublished: true })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit as string))
        .populate('author', 'username avatar'),
      Script.countDocuments({ genre: '文旅', isPublished: true }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        scripts,
        pagination: {
          page: parseInt(page as string),
          limit: parseInt(limit as string),
          total,
          pages: Math.ceil(total / parseInt(limit as string)),
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/heritage', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 12 } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const [scripts, total] = await Promise.all([
      Script.find({ genre: '非遗', isPublished: true })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit as string))
        .populate('author', 'username avatar'),
      Script.countDocuments({ genre: '非遗', isPublished: true }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        scripts,
        pagination: {
          page: parseInt(page as string),
          limit: parseInt(limit as string),
          total,
          pages: Math.ceil(total / parseInt(limit as string)),
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
