# 🎬 短剧交易平台

一个基于 AI 驱动的短剧创作、交易、分发平台。集成了剧本生成、文本转视频、数字资产交易等核心功能。

## 🎯 核心功能

- ✅ **AI 剧本生成**：基于 ChatGLM 的智能创作辅助
- ✅ **短剧交易系统**：完整的买卖、支付、提现流程
- ✅ **文本转视频**：集成 ModelScope 自动生成短视频
- ✅ **创作者生态**：版权保护、收益分配、创作者认证
- ✅ **数字资产**：NFT、数字版权管理（可选）
- ✅ **内容库**：剧本模板、素材库、分类管理

## 📊 技术栈

### 后端
- **框架**：Medusa.js (Node.js + TypeScript)
- **数据库**：PostgreSQL
- **缓存**：Redis
- **消息队列**：Bull (Redis-based)
- **支付**：支付宝、微信支付
- **存储**：Minio / AWS S3

### 前端
- **框架**：Vue 3 + TypeScript
- **构建**：Vite
- **UI**：Ant Design Vue / TailwindCSS
- **状态管理**：Pinia
- **HTTP 客户端**：Axios

### AI/ML
- **剧本生成**：ChatGLM-6B / API
- **文本转视频**：ModelScope
- **图片生成**：Stable Diffusion（可选）

## 🏗️ 项目结构

```
midodo-/
├── backend/                    # Medusa 后端
│   ├── src/
│   │   ├── models/            # 数据模型（Script, Order, Creator等）
│   │   ├── services/          # 业务服务
│   │   ├── routes/            # API 路由
│   │   ├── jobs/              # 异步任务（视频转换、邮件等）
│   │   ├── ai/                # AI 模块集成
│   │   ├── middlewares/       # 中间件
│   │   ├── utils/             # 工具函数
│   │   └── index.ts           # 入口
│   ├── migrations/            # 数据库迁移
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── frontend/                   # Vue 3 前端
│   ├── src/
│   │   ├── components/        # 组件库
│   │   ├── pages/             # 页面
│   │   ├── stores/            # 状态管理（Pinia）
│   │   ├── services/          # API 服务
│   │   ├── assets/            # 静态资源
│   │   ├── types/             # TypeScript 类型定义
│   │   ├── App.vue
│   │   └── main.ts
│   ├── vite.config.ts
│   ├── package.json
│   └── .env.example
├── docker-compose.yml         # 本地开发环境
├── .env.example               # 环境变量模板
├── .gitignore
├── docs/                      # 文档
└── scripts/                   # 初始化脚本
```

## 🚀 快速开始

### 前置要求
- Node.js 18+
- PostgreSQL 14+
- Redis 7+
- Docker & Docker Compose

### 一键启动（推荐）

```bash
# 1. 克隆仓库
git clone https://github.com/damiyoyo520-pixel/midodo-.git
cd midodo-

# 2. 启动本地开发环境（Docker）
docker-compose up -d

# 3. 等待数据库就绪（约 30 秒）
sleep 30

# 4. 后端初始化
cd backend
npm install
npm run db:migrate
npm run db:seed
npm run dev

# 5. 新终端启动前端
cd ../frontend
npm install
npm run dev
```

### 访问地址
- 🌐 **前端**：http://localhost:5173
- 🔧 **后端 API**：http://localhost:9000
- 👨‍💼 **Admin 面板**：http://localhost:7001
- 📦 **Minio（文件存储）**：http://localhost:9001
  - 用户名：minioadmin
  - 密码：minioadmin

### 环境变量配置

```bash
# 复制环境变量模板
cp .env.example .env

# 编辑 .env 填入你的 API 密钥
vim .env
```

关键配置项：
```env
# 数据库
DATABASE_URL=postgres://drama_user:drama_password@localhost:5432/drama_db

# Redis
REDIS_URL=redis://localhost:6379

# AI 配置
CHATGLM_API_KEY=your_key
MODELSCOPE_API_KEY=your_key

# 支付配置
ALIBABA_APPID=your_id
WECHAT_APPID=your_id
```

## 📚 文档

- [后端开发指南](./docs/backend-guide.md)
- [前端开发指南](./docs/frontend-guide.md)
- [AI 集成指南](./docs/ai-integration.md)
- [API 文档](./docs/api-docs.md)
- [部署指南](./docs/deployment.md)
- [数据库设计](./docs/database-schema.md)

## 🔄 工作流程

### 创作者创建短剧
```
创作者输入关键词
    ↓
AI 生成剧本框架
    ↓
创作者编辑调整
    ↓
AI 生成短视频预览
    ↓
发布到交易平台
```

### 买家购买剧本
```
浏览剧本/视频
    ↓
选择使用权限
    ↓
支付（支付宝/微信）
    ↓
获得授权下载
    ↓
创作者获得收益
```

## 🧪 API 示例

### 生成剧本
```bash
curl -X POST http://localhost:9000/admin/scripts/generate \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "办公室爱情故事",
    "theme": "都市情感",
    "keywords": ["上班族", "职场", "爱情"],
    "length": "short",
    "style": "comedy"
  }'
```

### 创建订单
```bash
curl -X POST http://localhost:9000/store/orders \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "script_id": "script_123",
    "usage_rights": ["personal_use", "commercial"],
    "payment_method": "alipay"
  }'
```

## 🐳 Docker 命令

```bash
# 启动所有服务
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down

# 删除所有数据（谨慎！）
docker-compose down -v
```

## 🧪 测试

```bash
# 后端测试
cd backend && npm test

# 前端测试
cd ../frontend && npm test

# 代码检查
npm run lint
```

## 📦 生产部署

### Docker 生产构建
```bash
docker build -f backend/Dockerfile -t drama-backend:latest .
docker build -f frontend/Dockerfile -t drama-frontend:latest .
```

### Kubernetes 部署
```bash
kubectl apply -f k8s/
```

详见 [部署指南](./docs/deployment.md)

## 🤝 贡献指南

欢迎 PR 和 Issue！请确保：
1. 代码通过 ESLint 检查
2. 编写单元测试
3. 更新相关文档

## 📝 提交规范

```
<type>(<scope>): <subject>

<body>

<footer>
```

Type:
- feat: 新功能
- fix: 修复
- docs: 文档
- style: 格式
- refactor: 重构
- test: 测试
- chore: 构建

## 📄 许可证

MIT License - 详见 [LICENSE](./LICENSE)

## 💬 联系方式

- GitHub Issues：用于bug报告和功能建议
- Email：damiyoyo520-pixel@example.com
- Discord：[加入我们的社区](your-discord-link)

## ⭐ 支持我们

如果这个项目对你有帮助，请给个 Star！

---

**最后更新**：2024年
**版本**：v0.1.0 (MVP)
