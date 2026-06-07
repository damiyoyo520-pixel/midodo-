# 🎬 短剧创作交易平台

一个功能完整的短剧剧本创作与交易平台，支持用户浏览、购买剧本，创作者发布作品。

## ✨ 功能特性

### 🏠 首页
- 苹果风格的现代化界面
- 精选剧本展示（好莱坞风格海报）
- 三大专区快速入口
- 平台数据统计
- 响应式设计，支持多种设备

### 📖 剧本市场
- 剧本列表浏览
- 分类筛选（海外、文旅、非遗）
- 搜索功能
- 剧本详情页
- 用户评论

### 🚀 三大专区
- **海外专区** - 国际化题材剧本
- **文旅专区** - 旅游文化主题剧本
- **非遗专区** - 非物质文化遗产主题

### 💱 完整交易流程
- 订单确认
- 多种支付方式
- 订单成功通知
- 订单详情查看

### 🎨 创作中心
- 剧本创作
- 视频分镜
- 生资产创作
- 创作模板

### 👤 用户中心
- 个人仪表盘
- 下载中心
- 我的收藏
- 个人设置
- 用户主页

### 🗣️ 社区与市场
- 社区交流
- 帖子详情
- 市场展示
- 搜索功能

## 🛠️ 技术栈

### 前端
- **Vue 3** - 渐进式 JavaScript 框架
- **Ant Design Vue** - 企业级 UI 组件库
- **Pinia** - 新一代状态管理
- **Vue Router** - 官方路由管理器
- **TypeScript** - 类型安全的 JavaScript
- **Tailwind CSS** - 原子化 CSS 框架
- **Vite** - 下一代前端构建工具

### 后端
- **Node.js** - JavaScript 运行时
- **Express** - 轻量级 Web 框架
- **TypeScript** - 类型安全
- **MongoDB** - NoSQL 数据库
- **Mongoose** - MongoDB 对象建模
- **JWT** - JSON Web Token 认证
- **Zod** - 数据验证
- **Winston** - 日志管理

### 基础设施
- **Docker** - 容器化技术
- **Nginx** - 高性能 Web 服务器
- **Docker Compose** - 多容器编排

## 🚀 快速开始

### 方式一：一键启动（推荐）

```bash
# 克隆或进入项目目录
cd /workspace

# 运行快速启动脚本
./quick-start.sh
```

### 方式二：使用 Docker Compose

```bash
# 1. 创建环境配置文件
cp .env.example .env
# 编辑 .env 文件，修改 JWT_SECRET 等配置

# 2. 构建并启动所有服务
docker-compose -f docker-compose.prod.yml up -d --build

# 3. 查看服务状态
docker-compose -f docker-compose.prod.yml ps

# 4. 查看日志
docker-compose -f docker-compose.prod.yml logs -f
```

### 方式三：本地开发

```bash
# 1. 安装依赖
npm install

# 2. 启动数据库
docker-compose up -d

# 3. 启动后端服务
cd backend
npm install
npm run dev

# 4. 启动前端服务（新终端）
cd frontend
npm install
npm run dev
```

访问地址：
- 前端应用: http://localhost:5173
- 后端 API: http://localhost:3000

## 📁 项目结构

```
/workspace/
├── backend/                 # 后端服务
│   ├── src/
│   │   ├── models/         # 数据模型
│   │   ├── routes/         # API 路由
│   │   ├── middleware/     # 中间件
│   │   ├── utils/          # 工具函数
│   │   ├── scripts/        # 脚本工具
│   │   └── index.ts        # 入口文件
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
├── frontend/               # 前端应用
│   ├── src/
│   │   ├── pages/         # 页面组件
│   │   ├── router/        # 路由配置
│   │   ├── stores/        # Pinia 状态
│   │   ├── services/      # API 服务
│   │   ├── styles/        # 全局样式
│   │   ├── App.vue        # 根组件
│   │   └── main.ts        # 入口文件
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── docker-compose.yml     # 开发环境配置
├── docker-compose.prod.yml # 生产环境配置
├── DEPLOYMENT.md          # 完整部署指南
├── quick-start.sh         # 快速启动脚本
└── README.md              # 项目文档
```

## 📋 完整部署指南

详细的部署说明请查看 [DEPLOYMENT.md](./DEPLOYMENT.md)，包含：
- 环境准备
- 生产环境部署
- 本地开发配置
- API 文档
- 常见问题排查
- 生产环境优化建议

## 🎯 功能演示流程

1. **注册账号** - 创建新用户
2. **浏览剧本** - 在首页或专区浏览精选剧本
3. **查看详情** - 点击剧本查看详细信息
4. **购买剧本** - 选择剧本并完成购买流程
5. **查看订单** - 在用户中心查看购买记录
6. **创作中心** - 尝试创作新剧本

## 🔧 开发命令

```bash
# 根目录
npm run dev              # 同时启动前后端开发服务
npm run build            # 构建前后端
npm run install:all      # 安装所有依赖

# 后端
cd backend
npm run dev              # 开发模式
npm run build            # 构建
npm run seed             # 初始化测试数据
npm run test             # 运行测试

# 前端
cd frontend
npm run dev              # 开发模式
npm run build            # 构建
npm run preview          # 预览构建结果
```

## 🤝 贡献指南

欢迎贡献代码、报告问题或提出建议！

## 📄 许可证

MIT License

---

**让创意更有价值** ✨
