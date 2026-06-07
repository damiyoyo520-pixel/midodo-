import { Router, Request, Response, NextFunction } from 'express';
import { Script } from '@/models/Script';
import { AppError } from '@/middleware/errorHandler';
import { authenticate } from '@/middleware/auth';
import { logger } from '@/utils/logger';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { 
      genre, 
      search, 
      page = 1, 
      limit = 20, 
      sort = '-createdAt' 
    } = req.query;

    const filter: any = { isPublished: true };
    
    if (genre && genre !== 'all') {
      filter.genre = genre;
    }

    if (search) {
      filter.$text = { $search: search };
    }

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const [scripts, total] = await Promise.all([
      Script.find(filter)
        .sort(sort as string)
        .skip(skip)
        .limit(parseInt(limit as string))
        .populate('author', 'username avatar'),
      Script.countDocuments(filter),
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

router.get('/featured', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const scripts = await Script.find({ 
      isPublished: true, 
      isFeatured: true 
    })
      .sort({ createdAt: -1 })
      .limit(12)
      .populate('author', 'username avatar');

    res.status(200).json({
      success: true,
      data: scripts,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const script = await Script.findById(req.params.id)
      .populate('author', 'username avatar bio');

    if (!script) {
      return next(new AppError('Script not found', 404));
    }

    await Script.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });

    res.status(200).json({
      success: true,
      data: script,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/zone/:genre', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { genre } = req.params;
    const { page = 1, limit = 12 } = req.query;

    const validGenres = ['海外', '文旅', '非遗'];
    if (!validGenres.includes(genre)) {
      return next(new AppError('Invalid zone', 400));
    }

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const [scripts, total] = await Promise.all([
      Script.find({ genre, isPublished: true })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit as string))
        .populate('author', 'username avatar'),
      Script.countDocuments({ genre, isPublished: true }),
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
