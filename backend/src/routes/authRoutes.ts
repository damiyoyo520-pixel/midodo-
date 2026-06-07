import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { User } from '@/models/User';
import { AppError } from '@/middleware/errorHandler';
import jwt from 'jsonwebtoken';
import { logger } from '@/utils/logger';

const router = Router();

const registerSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  username: z.string().min(3, 'Username must be at least 3 characters').max(30, 'Username must be less than 30 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});

const generateToken = (id: string) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'fallback-secret-change-in-production',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, username, password } = registerSchema.parse(req.body);

    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (existingUser) {
      return next(new AppError('Email or username already exists', 400));
    }

    const inviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const user = await User.create({
      email,
      username,
      password,
      role: 'user',
      inviteCode,
    });

    const token = generateToken(user._id);

    logger.info(`New user registered: ${username}`);

    res.status(201).json({
      success: true,
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          role: user.role,
          inviteCode: user.inviteCode,
        },
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: error.issues[0].message,
      });
    }
    next(error);
  }
});

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new AppError('Invalid email or password', 401));
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return next(new AppError('Invalid email or password', 401));
    }

    if (!user.isActive) {
      return next(new AppError('Your account has been disabled', 403));
    }

    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user._id);

    logger.info(`User logged in: ${user.username}`);

    res.status(200).json({
      success: true,
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          role: user.role,
          avatar: user.avatar,
        },
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: error.issues[0].message,
      });
    }
    next(error);
  }
});

export default router;
