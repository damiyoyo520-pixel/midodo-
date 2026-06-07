import { Router, Request, Response, NextFunction } from 'express';
import { User } from '@/models/User';
import { AppError } from '@/middleware/errorHandler';
import { authenticate } from '@/middleware/auth';

const router = Router();

router.get('/me', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return next(new AppError('User not found', 404));
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

router.put('/me', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, avatar, bio, phone } = req.body;
    
    const updateData: any = {};
    if (username) updateData.username = username;
    if (avatar !== undefined) updateData.avatar = avatar;
    if (bio !== undefined) updateData.bio = bio;
    if (phone !== undefined) updateData.phone = phone;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return next(new AppError('User not found', 404));
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
