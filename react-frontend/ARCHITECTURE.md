# 剧本交易中心（Script Hub）- 技术架构文档

## 一、项目概述

《剧本交易中心》是一个集 SaaS 创作工作流 + 多边交易市场（B2B/B2C） + 创作者分销生态于一体的综合性 Web 平台，致力于打通剧本产业上下游，为创作者、MCN机构、投流公司和承制方提供一站式服务。

## 二、技术栈规范

| 技术类别 | 选型方案 | 说明 |
|---------|---------|------|
| 核心框架 | React 18 + TypeScript | 函数式组件 + 完整类型支持 |
| 样式方案 | Tailwind CSS | 工具类优先，高可定制性 |
| 布局规范 | Bento Grid | 模块化、高信息密度布局 |
| 图标库 | Lucide React | 线框风格图标 |
| 状态管理 | Zustand (预期) | 轻量级状态管理 |
| 路由 | React Router v6 | 完整路由功能支持 |
| 构建工具 | Vite | 快速开发体验 |

## 三、视觉交互设计规范（G-Tech 风格）

### 3.1 色彩系统

```css
/* 主品牌色：高级全息国家党政红 */
primary: #DC2626
primary-light: #EF4444
primary-dark: #B91C1C

/* 背景色 */
background-white: #FFFFFF
background-gray: #F3F4F6
background-grayLight: #F9FAFB

/* 文字色 */
text-primary: #111827
text-secondary: #374151
text-tertiary: #6B7280

/* 点缀色：科技蓝 */
accent: #2563EB
accent-light: #3B82F6
accent-dark: #1D4ED8
```

### 3.2 组件风格

- ✅ 取消大圆角，统一使用直角或极小圆角 (rounded-sm)
- ✅ 使用细腻的边框 (border-gray-200) 分割模块
- ✅ 避免花哨动效，强调信息对称性和层级感
- ✅ 官方权威感的政务风格设计

## 四、全局路由结构设计

### 4.1 路由树结构

```
/                           - 首页（重定向到 /home）
├── /home                   - 首页
├── /zone/*                 - 专区
│   ├── /zone/global        - 海外专区
│   ├── /zone/culture       - 文旅专区
│   └── /zone/heritage      - 非遗专区
├── /scripts/*              - 剧本交易
│   ├── /scripts            - 剧本列表
│   ├── /scripts/:id        - 剧本详情
│   └── /scripts/:id/reviews - 剧本评论
├── /order/*                - 订单流程
│   ├── /order/confirm/:id  - 订单确认
│   └── /order/success/:id  - 订单成功
├── /payment/:id            - 支付页面
├── /orders/*               - 订单管理
│   ├── /orders             - 订单列表
│   └── /orders/:orderId    - 订单详情
├── /workspace/*            - 创作中心
│   ├── /workspace          - 创作中心首页
│   ├── /workspace/script   - 剧本创作
│   ├── /workspace/storyboard - 视频分镜
│   ├── /workspace/assets   - 生资产创作
│   └── /workspace/video    - 生视频流程
├── /templates              - 创作模板
├── /dashboard              - 仪表盘
├── /user/*                 - 用户中心
│   ├── /download           - 资料库
│   ├── /favorites           - 收藏
│   ├── /settings            - 设置
│   └── /profile/:userId    - 用户主页
├── /community/*             - 社区
│   ├── /community           - 社区首页
│   └── /community/post/:id - 帖子详情
├── /marketplace            - 市场
├── /search                 - 搜索结果
└── /auth/*                 - 认证
    ├── /login              - 登录
    └── /register           - 注册
```

## 五、核心页面设计

### 5.1 首页（Home.tsx）

**设计特点：**

1. **政务感顶部导航栏**
   - Logo + 品牌标识
   - 清晰的导航菜单
   - 用户登录/注册入口

2. **红色官方比赛宣传横幅**
   - 使用 G-Tech 追光效果
   - CTA 按钮引导报名

3. **中心化双轨搜索区**
   - Tab 切换：搜剧本 / 搜需求
   - 热门标签快速检索
   - 智能搜索建议

4. **Bento Grid 布局展示**
   - 左侧（8列）：最新上架剧本（9:16 竖屏海报）
   - 右侧（4列）：高净值 B 端需求
   - 响应式网格布局

5. **数据统计区**
   - 创作者数量
   - 上架剧本数
   - 完成交易数
   - 平台抽佣金额

6. **特色功能展示**
   - 安全交易
   - 高效创作
   - 分销体系

### 5.2 支付页面（Payment.tsx）

**核心功能：**

1. **二维码生成系统**
   - 微信支付二维码
   - 支付宝支付二维码
   - 实时刷新功能

2. **收款账号信息展示**
   - 银行卡转账信息
   - IBAN 国际账户信息
   - 一键复制功能

3. **支付倒计时**
   - 30 分钟支付超时
   - 实时时间显示
   - 超时自动取消

4. **分步骤操作指引**
   - 清晰的3步操作流程
   - 支付提示和注意事项

5. **支付安全保障**
   - 资金托管说明
   - SSL 加密标识
   - 即时交付承诺

### 5.3 订单确认页面（OrderConfirm.tsx）

**核心功能：**

1. **详细订单摘要**
   - 剧本信息展示（9:16 海报）
   - 费用透明分项展示
   - 授权类型说明

2. **费用透明明细**
   - 剧本费用
   - 平台服务费（10%）
   - 优惠折扣
   - 总计金额

3. **支付方式选择**
   - 微信支付
   - 支付宝
   - 银行卡
   - 平台余额

4. **服务协议确认**
   - 可展开的协议详情
   - 版权授权说明
   - 退款政策展示

5. **订单号自动生成**
   - 唯一订单编号
   - 下单时间记录

### 5.4 订单成功页面（OrderSuccess.tsx）

**核心功能：**

1. **成功动画反馈**
   - 动态成功图标
   - 庆祝动画效果

2. **剧本下载功能**
   - 一键下载按钮
   - 下载状态显示

3. **评分系统**
   - 5 星评分交互
   - 评论输入框
   - 字数统计

4. **分享功能**
   - 微信、微博分享
   - 邮箱分享
   - 复制链接
   - 邀请码展示

5. **下一步引导**
   - 继续浏览
   - 购买更多
   - 开始创作

6. **客服支持**
   - 热线电话
   - 邮箱地址
   - 在线客服入口

## 六、数据模型设计

### 6.1 核心实体

```typescript
// User (用户)
interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'vip' | 'creator' | 'enterprise';
  inviteCode: string;
  commissionRate: number;
  balance: number;
}

// Script (剧本)
interface Script {
  id: string;
  title: string;
  author: string;
  description: string;
  category: string;
  price: number;
  wordCount: number;
  authorizationType: 'exclusive' | 'non-exclusive';
  poster: string;
  gradient: string;
  views: number;
  rating: number;
}

// Requirement (招标需求)
interface Requirement {
  id: string;
  title: string;
  company: string;
  budget: string;
  deadline: string;
  bids: number;
  category: string;
  tags: string[];
  verified: boolean;
  urgent: boolean;
}

// Order (订单)
interface Order {
  orderId: string;
  scriptId: string;
  userId: string;
  amount: number;
  platformFee: number;
  status: 'pending' | 'paid' | 'completed';
  createdAt: string;
}
```

## 七、页面组件清单

| 组件名 | 文件路径 | 功能描述 |
|-------|---------|---------|
| AppRoutes | src/AppRoutes.tsx | 全局路由配置 |
| Home | src/pages/Home.tsx | 首页 |
| Payment | src/pages/Payment.tsx | 支付页面 |
| OrderConfirm | src/pages/OrderConfirm.tsx | 订单确认 |
| OrderSuccess | src/pages/OrderSuccess.tsx | 订单成功 |

## 八、测试建议

### 8.1 功能测试流程

1. **首页浏览测试**
   - 检查 Bento Grid 布局
   - 验证搜索功能
   - 测试专区导航

2. **剧本购买流程**
   - 选择剧本 → 进入详情
   - 点击购买 → 订单确认
   - 选择支付方式 → 支付
   - 验证支付成功 → 下载剧本

3. **用户交互测试**
   - 评分系统
   - 分享功能
   - 邀请码复制

### 8.2 响应式测试

- 桌面端（1920px+）
- 平板端（768px - 1024px）
- 移动端（320px - 768px）

## 九、技术实现亮点

### 9.1 G-Tech 视觉风格

- 高级全息淡红色配色
- 极小圆角设计
- 细腻边框分割
- 政务权威感
- 追光效果动画

### 9.2 9:16 竖屏海报

- 好莱坞电影海报风格
- 渐变色背景
- 竖屏比例适配
- 信息层次清晰

### 9.3 用户体验优化

- 倒计时提醒
- 复制功能反馈
- 加载状态提示
- 安全保障展示
- 下一步引导

## 十、项目文件结构

```
react-frontend/
├── src/
│   ├── AppRoutes.tsx          # 路由配置
│   ├── pages/
│   │   ├── Home.tsx          # 首页
│   │   ├── Payment.tsx       # 支付页面
│   │   ├── OrderConfirm.tsx   # 订单确认
│   │   └── OrderSuccess.tsx  # 订单成功
│   └── styles/
│       └── globals.css
├── tailwind.config.js         # Tailwind 配置
├── package.json
└── vite.config.ts
```

## 十一、下一步开发建议

1. **完善其他页面**
   - 剧本详情页
   - 创作中心各功能页
   - 用户中心各页面

2. **状态管理**
   - 集成 Zustand
   - 用户认证状态
   - 购物车管理

3. **API 集成**
   - 剧本列表 API
   - 订单创建 API
   - 支付接口对接

4. **组件库建设**
   - 通用卡片组件
   - 表单组件
   - 布局组件

---

**文档版本：** v1.0  
**最后更新：** 2024年  
**作者：** 全栈架构师团队
