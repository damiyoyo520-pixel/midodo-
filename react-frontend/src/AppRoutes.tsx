/**
 * 《剧本交易中心》全局路由结构设计
 * React Router v6 Architecture
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// 布局组件
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// 页面组件
import Home from './pages/Home';
import Scripts from './pages/Scripts';
import ScriptDetail from './pages/ScriptDetail';
import ScriptReviews from './pages/ScriptReviews';
import OrderConfirm from './pages/OrderConfirm';
import Payment from './pages/Payment';
import OrderSuccess from './pages/OrderSuccess';
import OrderDetail from './pages/OrderDetail';
import Orders from './pages/Orders';
import Workspace from './pages/workspace/Workspace';
import ScriptCreator from './pages/workspace/ScriptCreator';
import Storyboard from './pages/workspace/Storyboard';
import AssetsCreator from './pages/workspace/AssetsCreator';
import VideoCreator from './pages/workspace/VideoCreator';
import Templates from './pages/Templates';
import Dashboard from './pages/Dashboard';
import DownloadCenter from './pages/user/DownloadCenter';
import Favorites from './pages/user/Favorites';
import Settings from './pages/user/Settings';
import Profile from './pages/user/Profile';
import Community from './pages/community/Community';
import PostDetail from './pages/community/PostDetail';
import Marketplace from './pages/marketplace/Marketplace';
import Search from './pages/Search';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// 专区页面
import GlobalZone from './pages/zone/GlobalZone';
import CultureZone from './pages/zone/CultureZone';
import HeritageZone from './pages/zone/HeritageZone';

/**
 * 路由树结构：
 *
 * /                           - 首页（重定向到 /home）
 * /home                       - 首页
 * /zone/*                     - 专区
 *   /zone/global              - 海外专区
 *   /zone/culture             - 文旅专区
 *   /zone/heritage            - 非遗专区
 * /scripts/*                  - 剧本交易
 *   /scripts                  - 剧本列表
 *   /scripts/:id              - 剧本详情
 *   /scripts/:id/reviews      - 剧本评论
 * /order/*                    - 订单流程
 *   /order/confirm/:id        - 订单确认
 *   /payment/:id              - 支付页面
 *   /order/success/:id       - 订单成功
 * /orders/*                   - 订单管理
 *   /orders                   - 订单列表
 *   /orders/:orderId          - 订单详情
 * /workspace/*                - 创作中心
 *   /workspace                - 创作中心首页
 *   /workspace/script         - 剧本创作
 *   /workspace/storyboard     - 视频分镜
 *   /workspace/assets         - 生资产创作
 *   /workspace/video          - 生视频流程
 * /templates                  - 创作模板
 * /dashboard                  - 仪表盘
 * /user/*                     - 用户中心
 *   /download                 - 资料库
 *   /favorites                - 收藏
 *   /settings                 - 设置
 *   /profile/:userId          - 用户主页
 * /community/*                - 社区
 *   /community                - 社区首页
 *   /community/post/:id       - 帖子详情
 * /marketplace                - 市场
 * /search                     - 搜索结果
 * /auth/*                     - 认证
 *   /login                    - 登录
 *   /register                 - 注册
 */

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 首页路由 */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<Home />} />
          
          {/* 专区路由 */}
          <Route path="zone">
            <Route path="global" element={<GlobalZone />} />
            <Route path="culture" element={<CultureZone />} />
            <Route path="heritage" element={<HeritageZone />} />
          </Route>
          
          {/* 剧本交易路由 */}
          <Route path="scripts">
            <Route index element={<Scripts />} />
            <Route path=":id" element={<ScriptDetail />} />
            <Route path=":id/reviews" element={<ScriptReviews />} />
          </Route>
          
          {/* 订单流程路由 */}
          <Route path="order">
            <Route path="confirm/:id" element={<OrderConfirm />} />
            <Route path="success/:id" element={<OrderSuccess />} />
          </Route>
          
          {/* 支付路由 */}
          <Route path="payment/:id" element={<Payment />} />
          
          {/* 订单管理路由 */}
          <Route path="orders">
            <Route index element={<Orders />} />
            <Route path=":orderId" element={<OrderDetail />} />
          </Route>
          
          {/* 创作中心路由 */}
          <Route path="workspace">
            <Route index element={<Workspace />} />
            <Route path="script" element={<ScriptCreator />} />
            <Route path="storyboard" element={<Storyboard />} />
            <Route path="assets" element={<AssetsCreator />} />
            <Route path="video" element={<VideoCreator />} />
          </Route>
          
          {/* 创作模板 */}
          <Route path="templates" element={<Templates />} />
          
          {/* 用户中心路由 */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="download" element={<DownloadCenter />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile/:userId" element={<Profile />} />
          
          {/* 社区路由 */}
          <Route path="community">
            <Route index element={<Community />} />
            <Route path="post/:id" element={<PostDetail />} />
          </Route>
          
          {/* 市场与搜索 */}
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="search" element={<Search />} />
        </Route>
        
        {/* 认证路由（独立布局） */}
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
