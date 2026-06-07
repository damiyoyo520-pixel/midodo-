# 短剧创作交易平台

> 让创意更有价值 - 集 SaaS 创作工作流、多边交易市场、创作者分销生态于一体的综合性 Web 平台

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](package.json)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](tsconfig.json)
[![Docker](https://img.shields.io/badge/Docker-Compose-blue.svg)](docker-compose.prod.yml)

## 📋 目录

- [项目简介](#项目简介)
- [核心功能](#核心功能)
- [技术架构](#技术架构)
- [快速开始](#快速开始)
- [环境配置](#环境配置)
- [开发指南](#开发指南)
- [部署指南](#部署指南)
- [API 文档](#api-文档)
- [优化建议](#优化建议)
- [许可证](#许可证)

## 🎯 项目简介

短剧创作交易平台是一个完整的全栈 Web 应用，提供：

- 🔍 剧本市场与交易撮合引擎
- ✍️ SaaS 级在线创作工作流
- 🌐 社区与内容生态
- 📊 创作者分销与会员体系
- 🔒 安全交易与版权保护

## 🚀 核心功能

### 前端功能

| 功能模块 | 状态 | 说明 |
|---------|------|------|
| 首页门户 | ✅ | 政务风设计、AI 生成海报、双轨搜索 |
| 剧本市场 | ✅ | 分类浏览、搜索筛选、详情查看 |
| 三大专区 | ✅ | 海外/文旅/非遗，AI 海报展示 |
| 完整交易闭环 | ✅ | 详情 → 确认 → 支付 → 成功 → 下载 |
| 用户中心 | 🔄 | 订单管理、个人资料、收藏等 |
| 创作中心 | 🔄 | 在线编辑器、大纲生成、分镜设计 |

### 后端功能

| 功能模块 | 状态 | 说明 |
|---------|------|------|
| 用户认证 | ✅ | JWT 认证、角色权限管理 |
| 剧本 API | ✅ | CRUD、搜索、分类、统计 |
| 订单系统 | ✅ | 订单创建、支付、状态跟踪 |
| 安全中间件 | ✅ | 限流、CORS、XSS、CSRF 保护 |
| 错误处理 | ✅ | 统一错误响应、日志记录 |
| 数据模型 | ✅ | 用户、剧本、订单完整 Schema |

## 🏗️ 技术架构

### 前端技术栈

```
Vue 3.3 + TypeScript 5
├── Vue Router 4 (路由管理)
├── Pinia (状态管理)
├── Tailwind CSS 3 (样式方案)
├── Ant Design Vue 4 (UI 组件)
├── Vite 4 (构建工具)
└── Axios (HTTP 客户端)
```

### 后端技术栈

```
Node.js 20 + TypeScript 5
├── Express 4 (Web 框架)
├── Mongoose 7 (MongoDB ODM)
├── JWT (身份认证)
├── Zod (数据验证)
├── Winston (日志系统)
└── Helmet/CORS (安全中间件)
```

### 数据库

- **MongoDB 7.0**: 主数据存储
- **Redis 7.2**: 缓存与会话存储（可选）

### 部署架构

```
┌─────────────────────────────────────────┐
│         Nginx (Reverse Proxy)          │
│          (SSL + Load Balance)          │
└──────────────┬────────────────────────┘
               │
        ┌──────┴──────┐
        │             │
┌───────▼──────┐ ┌───▼──────────┐
│   Frontend   │ │   Backend    │
│  (Vue + Nginx)│ │ (Express API)│
└───────┬──────┘ └───┬──────────┘
        │            │
        └──────┬─────┘
               │
        ┌──────┴──────┐
        │             │
┌───────▼──────┐ ┌───▼──────────┐
│   MongoDB   │ │    Redis     │
│  (Database)  │ │   (Cache)    │
└──────────────┘ └──────────────┘
```

## 💻 快速开始

### 前置条件

- Node.js >= 18.0.0
- npm >= 9.0.0 或 yarn >= 1.22.0
- MongoDB >= 7.0（本地或 Docker）
- Docker（可选，用于容器化部署）

### 本地开发

#### 1. 克隆项目

```bash
git clone <repository-url>
cd drama-platform
```

#### 2. 后端启动

```bash
cd backend
cp .env.example .env
# 编辑 .env 配置文件
npm install
npm run dev
```

后端服务将在 `http://localhost:3000` 启动

#### 3. 前端启动

```bash
cd ../frontend
npm install
npm run dev
```

前端服务将在 `http://localhost:5173` 启动

#### 4. 访问应用

打开浏览器访问 `http://localhost:5173`

### Docker 快速启动

```bash
# 使用 Docker Compose 一键启动
cp .env.example .env
docker-compose -f docker-compose.prod.yml up -d

# 查看服务状态
docker-compose -f docker-compose.prod.yml ps

# 查看日志
docker-compose -f docker-compose.prod.yml logs -f

# 停止服务
docker-compose -f docker-compose.prod.yml down
```

## ⚙️ 环境配置

### 后端环境变量 (.env)

```env
# 应用配置
NODE_ENV=development
PORT=3000

# 数据库
MONGODB_URI=mongodb://localhost:27017/drama_platform

# JWT 认证
JWT_SECRET=your-production-jwt-secret-key-here-change-this
JWT_EXPIRES_IN=7d

# 安全
BCRYPT_ROUNDS=12

# Redis（可选）
REDIS_URL=redis://localhost:6379

# CORS
CORS_ORIGIN=http://localhost:5173

# 限流
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

### 前端环境变量 (.env)

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=短剧创作交易平台
```

## 🔧 开发指南

### 项目结构

```
.
├── backend/                 # 后端代码
│   ├── src/
│   │   ├── models/         # 数据模型
│   │   ├── routes/         # API 路由
│   │   ├── middleware/     # 中间件
│   │   ├── utils/          # 工具函数
│   │   └── index.ts        # 入口文件
│   ├── package.json
│   └── tsconfig.json
├── frontend/               # 前端代码
│   ├── src/
│   │   ├── pages/         # 页面组件
│   │   ├── router/        # 路由配置
│   │   ├── services/      # API 服务
│   │   ├── stores/        # 状态管理
│   │   └── styles/        # 全局样式
│   ├── package.json
│   └── vite.config.ts
├── docker-compose.prod.yml # 生产环境 Docker 配置
└── README.md              # 本文档
```

### 代码规范

- **TypeScript**: 严格类型检查，使用 interface/type 定义类型
- **ESLint**: 代码风格检查
- **Prettier**: 代码格式化
- **Git**: 使用 Conventional Commits 规范

### 常用命令

#### 后端

```bash
# 开发模式
npm run dev

# 生产构建
npm run build

# 类型检查
npm run type-check

# 代码检查
npm run lint

# 代码格式化
npm run format

# 运行测试
npm test
```

#### 前端

```bash
# 开发模式
npm run dev

# 生产构建
npm run build

# 预览构建
npm run preview

# 类型检查
npm run type-check

# 代码检查
npm run lint
```

## 🚀 部署指南

### 生产环境部署

#### 1. 准备环境

```bash
# 复制环境变量
cp .env.example .env

# 修改生产环境配置
# 重要：必须修改 JWT_SECRET 等敏感配置
```

#### 2. Docker 部署

```bash
# 构建并启动所有服务
docker-compose -f docker-compose.prod.yml up -d --build

# 查看服务状态
docker-compose -f docker-compose.prod.yml ps

# 查看日志
docker-compose -f docker-compose.prod.yml logs -f backend
docker-compose -f docker-compose.prod.yml logs -f frontend
```

#### 3. 手动部署（不使用 Docker）

**后端部署:**

```bash
cd backend
npm install
npm run build
npm start
```

**前端部署:**

```bash
cd frontend
npm install
npm run build
# 使用 nginx 或其他 Web 服务器托管 dist 目录
```

### 健康检查

- **后端健康检查**: `http://your-domain/health`
- **前端健康检查**: `http://your-domain/`

### 备份与恢复

#### MongoDB 数据备份

```bash
# 备份
docker exec drama-platform-mongodb mongodump --db=drama_platform --out=/data/backup

# 恢复
docker exec drama-platform-mongodb mongorestore --db=drama_platform /data/backup
```

## 📖 API 文档

### 认证接口

#### 注册

```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "demo",
  "password": "password123"
}

Response:
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": { ... }
  }
}
```

#### 登录

```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": { ... }
  }
}
```

### 剧本接口

#### 获取剧本列表

```
GET /api/scripts?genre=海外&page=1&limit=20

Response:
{
  "success": true,
  "data": {
    "scripts": [...],
    "pagination": { ... }
  }
}
```

#### 获取单个剧本

```
GET /api/scripts/:id

Response:
{
  "success": true,
  "data": {
    "_id": "66b8e...",
    "title": "绣娘传",
    "description": "...",
    ...
  }
}
```

#### 获取专区剧本

```
GET /api/scripts/zone/:genre

Response:
{
  "success": true,
  "data": {
    "scripts": [...],
    "pagination": { ... }
  }
}
```

### 订单接口

#### 创建订单

```
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "scriptId": "66b8e..."
}

Response:
{
  "success": true,
  "data": { ... }
}
```

#### 支付订单

```
PUT /api/orders/:id/pay
Authorization: Bearer <token>
Content-Type: application/json

{
  "paymentMethod": "wechat"
}
```

## 📈 优化建议

### 性能优化

1. **数据库优化**
   - 添加复合索引优化查询
   - 使用 Redis 缓存热点数据
   - 实现查询结果分页和懒加载

2. **前端优化**
   - 图片懒加载和 CDN 加速
   - 路由懒加载，减少首屏加载
   - 使用虚拟列表优化长列表渲染
   - 启用 gzip 压缩和缓存策略

3. **API 优化**
   - 实现 GraphQL 或数据聚合接口
   - 添加请求去重和缓存
   - 实现 WebSocket 实时更新

### 功能增强

1. **AI 能力增强**
   - 集成 AI 剧本大纲生成
   - AI 分镜建议和优化
   - 智能推荐算法

2. **支付系统**
   - 接入真实微信支付、支付宝
   - 实现订单状态 Webhook 回调
   - 添加退款和争议处理

3. **社交功能**
   - 用户评论和讨论
   - 收藏、点赞、分享
   - 创作者关注系统

### 安全加固

1. **认证安全**
   - 实现 OAuth2.0 第三方登录
   - 添加 2FA 双因素认证
   - 密码强度策略

2. **数据安全**
   - 敏感字段加密存储
   - 数据库字段级权限控制
   - 定期安全审计

3. **防滥用**
   - 更严格的 API 限流
   - CAPTCHA 防机器人
   - 内容审核机制

### 运维优化

1. **监控告警**
   - 集成 Prometheus + Grafana
   - 应用性能监控 (APM)
   - 日志聚合与分析

2. **高可用**
   - 服务负载均衡
   - 数据库主从复制
   - 自动扩缩容策略

## ⚠️ 注意事项

1. **安全配置**
   - 生产环境必须修改 `JWT_SECRET` 等敏感配置
   - 启用 HTTPS
   - 配置正确的 CORS 白名单

2. **数据备份**
   - 定期备份 MongoDB 数据
   - 测试备份恢复流程
   - 重要数据异地备份

3. **日志管理**
   - 定期清理旧日志
   - 日志轮转配置
   - 错误日志监控告警

4. **性能监控**
   - 监控系统资源使用
   - 设置合理的告警阈值
   - 定期进行性能测试

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 联系方式

如有问题，请通过以下方式联系：

- 官方邮箱: support@scripthub.com
- 客服热线: 400-888-8888

---

**让创意更有价值** ✨
