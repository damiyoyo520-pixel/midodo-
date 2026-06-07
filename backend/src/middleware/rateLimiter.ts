import { Request, Response, NextFunction } from 'express';
import { logger } from '@/utils/logger';

const requestCounts = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000');
const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX || '100');

export const rateLimiter = (req: Request, res: Response, next: NextFunction) => {
  const clientKey = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  
  const entry = requestCounts.get(clientKey);
  
  if (!entry) {
    requestCounts.set(clientKey, { count: 1, timestamp: now });
    return next();
  }

  if (now - entry.timestamp > RATE_LIMIT_WINDOW_MS) {
    requestCounts.set(clientKey, { count: 1, timestamp: now });
    return next();
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    logger.warn(`Rate limit exceeded for ${clientKey}`);
    return res.status(429).json({
      success: false,
      message: 'Too many requests, please try again later',
    });
  }

  entry.count++;
  requestCounts.set(clientKey, entry);
  next();
};

setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of requestCounts) {
    if (now - entry.timestamp > RATE_LIMIT_WINDOW_MS) {
      requestCounts.delete(key);
    }
  }
}, RATE_LIMIT_WINDOW_MS);
