<template>
  <div id="app">
    <!-- 导航栏 -->
    <nav class="nav-container">
      <div class="nav-content">
        <router-link to="/" class="nav-logo">
          <span class="logo-icon">🎬</span>
          <span class="logo-text">短剧创作交易平台</span>
        </router-link>
        
        <div class="nav-menu">
          <router-link to="/" class="nav-link" :class="{ active: $route.path === '/' || $route.path === '/home' }">首页</router-link>
          <router-link to="/scripts" class="nav-link" :class="{ active: $route.path === '/scripts' }">剧本市场</router-link>
          <router-link to="/workspace" class="nav-link" :class="{ active: $route.path.startsWith('/workspace') }">创作中心</router-link>
          <router-link to="/templates" class="nav-link" :class="{ active: $route.path === '/templates' }">创作模板</router-link>
          <router-link to="/community" class="nav-link" :class="{ active: $route.path === '/community' }">社区交流</router-link>
        </div>

        <div class="nav-actions">
          <router-link to="/login" v-if="!userStore.isAuthenticated">
            <button class="btn-outline">登录</button>
          </router-link>
          <router-link to="/register" v-if="!userStore.isAuthenticated">
            <button class="btn-primary">注册</button>
          </router-link>
          <div v-else class="user-info">
            <router-link to="/workspace" class="user-avatar">{{ userStore.user?.username?.charAt(0).toUpperCase() }}</router-link>
            <button @click="handleLogout" class="btn-outline">退出</button>
          </div>
        </div>
      </div>
    </nav>

    <!-- 主内容区 -->
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- 底部 -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <div class="footer-logo">
            <span class="logo-icon">🎬</span>
            <span class="logo-text">短剧创作交易平台</span>
          </div>
          <p class="footer-desc">连接创意与市场，让每一个故事闪耀光芒</p>
        </div>
        <div class="footer-section">
          <h4>快速链接</h4>
          <router-link to="/scripts">剧本市场</router-link>
          <router-link to="/workspace">创作中心</router-link>
          <router-link to="/templates">创作模板</router-link>
          <router-link to="/community">社区交流</router-link>
        </div>
        <div class="footer-section">
          <h4>关于我们</h4>
          <a href="#">平台介绍</a>
          <a href="#">使用条款</a>
          <a href="#">隐私政策</a>
          <a href="#">联系我们</a>
        </div>
        <div class="footer-section">
          <h4>联系方式</h4>
          <p>📧 contact@dramaplat.com</p>
          <p>📱 客服微信: dramaplat</p>
          <p>🏢 北京市朝阳区</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 短剧创作交易平台 - 让创意更有价值. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from './stores/auth';

const userStore = useAuthStore();

const handleLogout = () => {
  userStore.logout();
};
</script>

<style scoped>
/* 全局 */
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #0a0a0a;
  color: white;
}

/* 导航栏 */
.nav-container {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: linear-gradient(180deg, rgba(15, 15, 15, 0.98) 0%, rgba(15, 15, 15, 0.95) 100%);
  border-bottom: 1px solid #374151;
  backdrop-filter: blur(10px);
}

.nav-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  font-size: 18px;
  font-weight: 700;
  transition: transform 0.2s;
}

.nav-logo:hover {
  transform: scale(1.02);
}

.logo-icon {
  font-size: 28px;
}

.logo-text {
  background: linear-gradient(135deg, #dc2626 0%, #ff6b6b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-menu {
  display: flex;
  gap: 8px;
}

.nav-link {
  padding: 10px 20px;
  color: #9ca3af;
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  border-radius: 4px;
  transition: all 0.2s;
}

.nav-link:hover {
  color: white;
  background: rgba(220, 38, 38, 0.1);
}

.nav-link.active {
  color: white;
  background: linear-gradient(135deg, rgba(220, 38, 38, 0.2) 0%, rgba(185, 28, 28, 0.2) 100%);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn-primary {
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 16px rgba(220, 38, 38, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(220, 38, 38, 0.4);
}

.btn-outline {
  background: transparent;
  color: white;
  border: 1px solid #374151;
  padding: 10px 24px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-outline:hover {
  border-color: #dc2626;
  background: rgba(220, 38, 38, 0.1);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  text-decoration: none;
  transition: transform 0.2s;
}

.user-avatar:hover {
  transform: scale(1.1);
}

/* 主内容区 */
.main-content {
  flex: 1;
  min-height: calc(100vh - 70px - 400px);
}

/* 页面过渡 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 底部 */
.footer {
  background: #1f2937;
  border-top: 1px solid #374151;
  padding: 48px 24px 24px;
  margin-top: auto;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 48px;
  padding-bottom: 32px;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-section h4 {
  font-size: 16px;
  font-weight: 600;
  color: white;
  margin: 0 0 8px 0;
}

.footer-section a,
.footer-section p {
  color: #9ca3af;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
  margin: 0;
}

.footer-section a:hover {
  color: #dc2626;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.footer-logo .logo-icon {
  font-size: 32px;
}

.footer-logo .logo-text {
  font-size: 18px;
  font-weight: 700;
  color: white;
}

.footer-desc {
  font-size: 14px;
  color: #9ca3af;
  margin: 0;
  line-height: 1.6;
}

.footer-bottom {
  max-width: 1400px;
  margin: 0 auto;
  padding-top: 24px;
  border-top: 1px solid #374151;
  text-align: center;
}

.footer-bottom p {
  color: #6b7280;
  font-size: 13px;
  margin: 0;
}

/* 响应式 */
@media (max-width: 1024px) {
  .nav-menu {
    display: none;
  }

  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }
}

@media (max-width: 640px) {
  .nav-content {
    padding: 0 16px;
    height: 60px;
  }

  .logo-text {
    display: none;
  }

  .nav-actions {
    gap: 8px;
  }

  .btn-primary,
  .btn-outline {
    padding: 8px 16px;
    font-size: 13px;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
</style>
