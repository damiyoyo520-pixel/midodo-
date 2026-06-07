import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { createServer } from 'http';

import { initSampleData } from './models/memoryStorage';
import authRoutes from './routes/authRoutes';
import scriptRoutes from './routes/scriptRoutes';
import orderRoutes from './routes/orderRoutes';
import userRoutes from './routes/userRoutes';
import zoneRoutes from './routes/zoneRoutes';
import communityRoutes from './routes/communityRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// 中间件
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 健康检查
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// API 路由
app.use('/api/auth', authRoutes);
app.use('/api/scripts', scriptRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/zones', zoneRoutes);
app.use('/api/community', communityRoutes);

// 错误处理中间件
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('服务器错误:', err);
  res.status(500).json({ success: false, message: '服务器内部错误' });
});

// 404 处理
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: '路由不存在',
  });
});

const httpServer = createServer(app);

async function startServer(): Promise<void> {
  try {
    console.log('🎬 初始化短剧创作交易平台后端服务');
    console.log('========================================');
    
    // 初始化示例数据
    await initSampleData();
    
    console.log('');
    console.log('🚀 启动服务器...');
    
    httpServer.listen(PORT, () => {
      console.log('✅ 服务器运行成功!');
      console.log(`📍 服务地址: http://localhost:${PORT}`);
      console.log(`🔧 环境: ${NODE_ENV}`);
      console.log('');
      console.log('📚 可用 API 端点:');
      console.log('   - 认证: /api/auth/*');
      console.log('   - 剧本: /api/scripts/*');
      console.log('   - 订单: /api/orders/*');
      console.log('   - 用户: /api/users/*');
      console.log('   - 专区: /api/zones/*');
      console.log('   - 社区: /api/community/*');
      console.log('');
      console.log('========================================');
    });
  } catch (error) {
    console.error('❌ 服务器启动失败:', error);
    process.exit(1);
  }
}

process.on('SIGINT', async () => {
  console.log('');
  console.log('👋 正在关闭服务器...');
  httpServer.close(() => {
    console.log('✅ 服务器已关闭');
    process.exit(0);
  });
});

process.on('SIGTERM', async () => {
  console.log('');
  console.log('👋 正在关闭服务器...');
  httpServer.close(() => {
    console.log('✅ 服务器已关闭');
    process.exit(0);
  });
});

startServer();

export { app, httpServer };
