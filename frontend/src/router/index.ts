import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('../pages/Home.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/zone/global',
    component: () => import('../pages/zone/GlobalZone.vue'),
    meta: { title: '海外专区' }
  },
  {
    path: '/zone/culture',
    component: () => import('../pages/zone/CultureZone.vue'),
    meta: { title: '文旅专区' }
  },
  {
    path: '/zone/heritage',
    component: () => import('../pages/zone/HeritageZone.vue'),
    meta: { title: '非遗专区' }
  },
  {
    path: '/scripts',
    component: () => import('../pages/Scripts.vue'),
    meta: { title: '剧本市场' }
  },
  {
    path: '/scripts/:id',
    component: () => import('../pages/ScriptDetail.vue'),
    meta: { title: '剧本详情' }
  },
  {
    path: '/scripts/:id/reviews',
    component: () => import('../pages/script/Reviews.vue'),
    meta: { title: '剧本评论' }
  },
  {
    path: '/order/confirm/:id',
    component: () => import('../pages/order/OrderConfirm.vue'),
    meta: { title: '订单确认' }
  },
  {
    path: '/payment/:id',
    component: () => import('../pages/order/Payment.vue'),
    meta: { title: '支付页面' }
  },
  {
    path: '/order/success/:id',
    component: () => import('../pages/order/OrderSuccess.vue'),
    meta: { title: '订单成功' }
  },
  {
    path: '/orders/:orderId',
    component: () => import('../pages/OrderDetail.vue'),
    meta: { title: '订单详情' }
  },
  {
    path: '/orders',
    component: () => import('../pages/Orders.vue'),
    meta: { title: '我的订单' }
  },
  {
    path: '/workspace',
    component: () => import('../pages/workspace/Workspace.vue'),
    meta: { title: '创作中心' }
  },
  {
    path: '/workspace/script',
    component: () => import('../pages/workspace/ScriptCreator.vue'),
    meta: { title: '剧本创作' }
  },
  {
    path: '/workspace/storyboard',
    component: () => import('../pages/workspace/Storyboard.vue'),
    meta: { title: '视频分镜' }
  },
  {
    path: '/workspace/assets',
    component: () => import('../pages/workspace/AssetsCreator.vue'),
    meta: { title: '生资产创作' }
  },
  {
    path: '/workspace/video',
    component: () => import('../pages/workspace/VideoCreator.vue'),
    meta: { title: '生视频流程' }
  },
  {
    path: '/templates',
    component: () => import('../pages/Templates.vue'),
    meta: { title: '创作模板' }
  },
  {
    path: '/dashboard',
    component: () => import('../pages/Dashboard.vue'),
    meta: { title: '仪表盘' }
  },
  {
    path: '/download',
    component: () => import('../pages/user/DownloadCenter.vue'),
    meta: { title: '资料库' }
  },
  {
    path: '/favorites',
    component: () => import('../pages/user/Favorites.vue'),
    meta: { title: '收藏' }
  },
  {
    path: '/settings',
    component: () => import('../pages/user/Settings.vue'),
    meta: { title: '设置' }
  },
  {
    path: '/profile/:userId',
    component: () => import('../pages/user/Profile.vue'),
    meta: { title: '用户主页' }
  },
  {
    path: '/community',
    component: () => import('../pages/community/Community.vue'),
    meta: { title: '社区' }
  },
  {
    path: '/community/post/:id',
    component: () => import('../pages/community/PostDetail.vue'),
    meta: { title: '帖子详情' }
  },
  {
    path: '/marketplace',
    component: () => import('../pages/marketplace/Marketplace.vue'),
    meta: { title: '市场' }
  },
  {
    path: '/search',
    component: () => import('../pages/Search.vue'),
    meta: { title: '搜索' }
  },
  {
    path: '/login',
    component: () => import('../pages/Login.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/register',
    component: () => import('../pages/Register.vue'),
    meta: { title: '注册' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
