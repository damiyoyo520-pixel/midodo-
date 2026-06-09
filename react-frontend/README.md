# 剧本交易中心（Script Hub）- React Frontend

基于 React 18 + TypeScript + Tailwind CSS 的剧本交易平台前端项目

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖

```bash
cd react-frontend
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173

### 构建生产版本

```bash
npm run build
```

## 📁 项目结构

```
react-frontend/
├── src/
│   ├── pages/                # 页面组件
│   │   ├── Home.tsx         # 首页
│   │   ├── Payment.tsx      # 支付页面
│   │   ├── OrderConfirm.tsx  # 订单确认
│   │   └── OrderSuccess.tsx  # 订单成功
│   ├── AppRoutes.tsx        # 路由配置
│   ├── main.tsx             # 入口文件
│   └── index.css            # 全局样式
├── tailwind.config.js       # Tailwind 配置
├── vite.config.ts           # Vite 配置
└── package.json
```

## 🎨 设计规范

### G-Tech 视觉风格

- **主品牌色：** 高级全息国家党政红 (#DC2626)
- **背景色：** 纯净白 (#FFFFFF) 与 极简灰 (#F3F4F6)
- **点缀色：** 科技蓝 (#2563EB)
- **圆角：** 极小圆角 (2px - 4px)
- **边框：** 细腻边框分割

### 设计特点

- ✅ 政务感权威设计
- ✅ Bento Grid 布局
- ✅ 9:16 竖屏海报
- ✅ 响应式设计
- ✅ 追光效果动画

## 📱 核心页面

### 1. 首页 (Home)

- 政务感顶部导航栏
- 官方比赛宣传横幅
- 双轨搜索区（剧本/需求）
- 三大专区入口
- Bento Grid 剧本展示
- B 端需求列表
- 数据统计面板

### 2. 支付页面 (Payment)

- 四种支付方式（微信/支付宝/银行卡/境外）
- 二维码生成与展示
- 30 分钟支付倒计时
- 收款账号信息复制
- 分步骤操作指引
- 支付安全保障

### 3. 订单确认 (OrderConfirm)

- 详细订单摘要
- 费用透明明细
- 支付方式选择
- 服务协议确认
- 订单号生成

### 4. 订单成功 (OrderSuccess)

- 成功动画反馈
- 剧本下载功能
- 5 星评分系统
- 分享功能（微信/微博/邮箱）
- 邀请码展示
- 下一步引导
- 客服支持

## 🔧 技术栈

- **框架：** React 18
- **语言：** TypeScript
- **样式：** Tailwind CSS
- **路由：** React Router v6
- **图标：** Lucide React
- **构建：** Vite
- **类型检查：** TypeScript

## 📖 路由结构

```
/home                     - 首页
/zone/global             - 海外专区
/zone/culture            - 文旅专区
/zone/heritage           - 非遗专区
/scripts                 - 剧本市场
/scripts/:id             - 剧本详情
/order/confirm/:id       - 订单确认
/payment/:id             - 支付页面
/order/success/:id       - 订单成功
/workspace               - 创作中心
/dashboard               - 仪表盘
/community               - 社区
/marketplace             - 市场
/search                  - 搜索
/login                   - 登录
/register                - 注册
```

## 🎯 功能特点

### 剧本交易

- ✅ 剧本列表浏览
- ✅ 9:16 竖屏海报
- ✅ 剧本详情展示
- ✅ 订单创建流程
- ✅ 多种支付方式
- ✅ 即时下载交付

### 用户体验

- ✅ 流畅的页面切换
- ✅ 清晰的视觉层次
- ✅ 即时的状态反馈
- ✅ 完善的错误处理
- ✅ 引导性操作流程

### 视觉设计

- ✅ G-Tech 政务风格
- ✅ Bento Grid 布局
- ✅ 响应式适配
- ✅ 细腻边框分割
- ✅ 追光效果动画

## 📝 Mock 数据

项目包含完整的 Mock 数据：

- 16+ 个剧本样本（覆盖非遗、海外、文旅等分类）
- 4+ 个 B 端需求样本
- 完整的订单流程数据
- 用户评分和评论样本

## 🔍 测试建议

### 功能测试

1. 首页浏览 → 剧本选择 → 订单确认 → 支付 → 成功
2. 搜索功能测试（剧本/需求）
3. 评分和分享功能
4. 下载功能

### 响应式测试

- 桌面端（1920px+）
- 平板端（768px - 1024px）
- 移动端（320px - 768px）

## 📚 文档

- [架构文档](ARCHITECTURE.md) - 完整的技术架构说明
- [开发总结](SUMMARY.md) - 第一阶段开发成果总结

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

---

**版本：** 1.0.0  
**作者：** Script Hub Team  
**年份：** 2024
