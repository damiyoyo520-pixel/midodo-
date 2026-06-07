# 短剧创作交易平台 - 完整部署指南

## 📋 项目概述

这是一个完整的短剧创作交易平台，包含：
- **前端** - Vue 3 + Ant Design Vue 构建
- **后端** - Node.js + Express + TypeScript
- **数据库** - MongoDB
- **容器化** - Docker + Docker Compose

## 🚀 部署步骤

### 步骤 1: 环境准备

确保您的系统已安装以下软件：

- **Node.js** (v18 或更高版本)
- **Docker** 和 **Docker Compose**
- **Git** (可选，用于克隆代码)

检查安装：

```bash
node --version
docker --version
docker-compose --version
```

### 步骤 2: 初始化项目

#### 方式 A: 使用 Docker Compose 部署（推荐用于生产）

1. **克隆项目**（如果适用）：
```bash
cd /workspace
```

2. **创建生产环境配置文件**：

在根目录创建 `.env` 文件：

```env
# 数据库配置
MONGODB_URI=mongodb://mongodb:27017/drama_platform

# JWT 配置（请修改为随机字符串）
JWT_SECRET=your-production-jwt-secret-key-here-change-this
CORS_ORIGIN=http://your-domain.com  # 或者您的服务器 IP
```

3. **构建并启动服务**：

```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

4. **检查服务状态**：

```bash
docker-compose -f docker-compose.prod.yml ps
```

5. **查看日志**：

```bash
# 查看所有服务日志
docker-compose -f docker-compose.prod.yml logs -f

# 查看特定服务日志
docker-compose -f docker-compose.prod.yml logs -f backend
docker-compose -f docker-compose.prod.yml logs -f frontend
```

6. **访问应用**：
   - 前端：http://localhost (或您的服务器 IP)
   - 后端 API：http://localhost:3000

#### 方式 B: 本地开发部署

1. **安装依赖**：

```bash
# 安装根目录依赖
cd /workspace
npm install

# 安装后端依赖
cd backend
npm install

# 安装前端依赖
cd ../frontend
npm install
```

2. **启动数据库服务**（使用 Docker）：

```bash
cd /workspace
docker-compose up -d
```

3. **启动后端服务**：

```bash
cd /workspace/backend
npm run dev
```

后端将在 http://localhost:3000 运行

4. **启动前端服务**（新终端窗口）：

```bash
cd /workspace/frontend
npm run dev
```

前端将在 http://localhost:5173 运行

### 步骤 3: 初始化数据（可选但推荐）

创建初始测试数据脚本。在项目根目录创建 `scripts/seed.js`：

```javascript
// 这个步骤是可选的，用于创建测试数据
// 您可以直接在应用中注册用户和创建内容
```

## 📦 项目结构

```
/workspace/
├── backend/                # 后端服务
│   ├── src/
│   │   ├── models/        # 数据模型
│   │   ├── routes/        # API 路由
│   │   ├── middleware/    # 中间件
│   │   ├── utils/         # 工具函数
│   │   └── index.ts       # 入口文件
│   ├── Dockerfile
│   └── package.json
├── frontend/              # 前端应用
│   ├── src/
│   │   ├── pages/         # 页面组件
│   │   ├── router/        # 路由配置
│   │   ├── stores/        # Pinia 状态管理
│   │   └── services/      # API 服务
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── docker-compose.yml     # 开发环境配置
├── docker-compose.prod.yml # 生产环境配置
└── package.json           # 根项目配置
```

## 🔧 API 端点概览

### 认证
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录

### 剧本
- `GET /api/scripts` - 获取剧本列表
- `GET /api/scripts/:id` - 获取单个剧本详情
- `GET /api/scripts/featured` - 获取精选剧本
- `GET /api/scripts/zone/:genre` - 获取专区剧本

### 订单
- `POST /api/orders` - 创建订单
- `GET /api/orders` - 获取用户订单列表
- `GET /api/orders/:id` - 获取订单详情
- `PUT /api/orders/:id/pay` - 支付订单

### 用户
- `GET /api/users/me` - 获取当前用户信息
- `PUT /api/users/me` - 更新用户信息

### 专区
- `GET /api/zones/global` - 海外专区
- `GET /api/zones/culture` - 文旅专区
- `GET /api/zones/heritage` - 非遗专区

## 🎯 测试完整流程

### 1. 用户注册

访问前端页面 http://localhost:5173，点击"注册"并创建账号。

### 2. 浏览剧本

在首页浏览精选剧本，或访问三大专区。

### 3. 购买剧本

1. 点击任意剧本查看详情
2. 点击"购买"按钮
3. 确认订单信息
4. 选择支付方式（当前为模拟支付）
5. 完成支付

### 4. 查看订单

登录后访问"我的订单"页面查看购买的剧本。

### 5. 创作中心

访问"创作中心"进行剧本创作（需要创作者权限）。

## 🛠️ 常见问题排查

### 问题 1: Docker 服务无法启动

**解决方案**：
```bash
# 停止并删除旧容器
docker-compose -f docker-compose.prod.yml down

# 清理卷数据（慎用！会删除所有数据）
docker volume prune

# 重新构建
docker-compose -f docker-compose.prod.yml up -d --build
```

### 问题 2: 前端无法连接后端

**解决方案**：
- 检查前端 `src/services/api.ts` 中的 API 地址
- 确认 CORS 配置正确
- 检查防火墙设置

### 问题 3: 数据库连接失败

**解决方案**：
```bash
# 检查 MongoDB 容器状态
docker ps | grep mongodb

# 查看 MongoDB 日志
docker logs drama-platform-mongodb
```

### 问题 4: 端口被占用

**解决方案**：
- 修改 `docker-compose.prod.yml` 中的端口映射
- 或停止占用端口的其他服务

## 📈 生产环境优化建议

1. **安全配置**：
   - 修改默认 JWT_SECRET 为强随机字符串
   - 配置 HTTPS（使用 Nginx + Let's Encrypt）
   - 设置防火墙规则
   - 定期备份数据库

2. **性能优化**：
   - 配置 Redis 缓存
   - 使用 CDN 加速静态资源
   - 配置数据库索引优化查询

3. **监控和日志**：
   - 配置日志收集（ELK Stack）
   - 设置监控告警
   - 定期分析访问日志

## 🔒 安全建议

- 永远不要将 `.env` 文件提交到版本控制
- 使用环境变量管理敏感信息
- 定期更新依赖包
- 实施访问频率限制
- 使用 HTTPS 加密传输

## 📞 技术支持

如遇到问题，请检查：
1. Docker 容器日志
2. 浏览器控制台错误
3. 后端服务日志

---

祝您部署顺利！🎉
