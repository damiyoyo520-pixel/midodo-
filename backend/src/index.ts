import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { createServer } from 'http';

import { logger } from '@/utils/logger';
import { errorHandler } from '@/middleware/errorHandler';
import { rateLimiter } from '@/middleware/rateLimiter';
import authRoutes from '@/routes/authRoutes';
import scriptRoutes from '@/routes/scriptRoutes';
import orderRoutes from '@/routes/orderRoutes';
import userRoutes from '@/routes/userRoutes';
import zoneRoutes from '@/routes/zoneRoutes';
import communityRoutes from '@/routes/communityRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:", "http:"],
      connectSrc: ["'self'"],
    },
  },
}));

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev', {
  stream: { write: (message) => logger.info(message.trim()) },
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (NODE_ENV !== 'test') {
  app.use(rateLimiter);
}

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/scripts', scriptRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/zones', zoneRoutes);
app.use('/api/community', communityRoutes);

app.use(errorHandler);

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

const httpServer = createServer(app);

async function startServer(): Promise<void> {
  try {
    logger.info('Connecting to database...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/drama_platform');
    logger.info('Database connected successfully');

    httpServer.listen(PORT, () => {
      logger.info(`Server running on port ${PORT} (${NODE_ENV})`);
      logger.info(`Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

process.on('SIGINT', async () => {
  logger.info('SIGINT received: shutting down gracefully');
  await mongoose.connection.close();
  httpServer.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

process.on('SIGTERM', async () => {
  logger.info('SIGTERM received: shutting down gracefully');
  await mongoose.connection.close();
  httpServer.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

startServer();

export { app, httpServer };
