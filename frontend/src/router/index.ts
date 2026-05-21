import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: () => import('../pages/Home.vue'),
    meta: { title: '首页' },
  },
  {
    path: '/login',
    component: () => import('../pages/Login.vue'),
    meta: { title: '登录' },
  },
  {
    path: '/register',
    component: () => import('../pages/Register.vue'),
    meta: { title: '注册' },
  },
  {
    path: '/scripts',
    component: () => import('../pages/Scripts.vue'),
    meta: { title: '剧本市场' },
  },
  {
    path: '/scripts/:id',
    component: () => import('../pages/ScriptDetail.vue'),
    meta: { title: '剧本详情' },
  },
  {
    path: '/create',
    component: () => import('../pages/CreateScript.vue'),
    meta: { title: '创建剧本', requiresAuth: true },
  },
  {
    path: '/dashboard',
    component: () => import('../pages/Dashboard.vue'),
    meta: { title: '创作者仪表板', requiresAuth: true },
  },
  {
    path: '/orders',
    component: () => import('../pages/Orders.vue'),
    meta: { title: '我的订单', requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const title = to.meta.title as string;
  if (title) {
    document.title = `${title} - 短剧交易平台`;
  }

  const requiresAuth = to.meta.requiresAuth as boolean;
  const isAuthenticated = !!localStorage.getItem('token');

  if (requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
