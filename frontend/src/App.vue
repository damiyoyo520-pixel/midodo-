<template>
  <a-config-provider :locale="zhCN">
    <div id="app">
      <a-layout class="app-layout">
        <a-layout-header class="app-header">
          <div class="header-container">
            <router-link to="/" class="logo">
              <span class="logo-icon">🎬</span>
              <span class="logo-text">短剧创作交易平台</span>
            </router-link>

            <a-menu
              v-model:selectedKeys="currentMenu"
              mode="horizontal"
              class="nav-menu"
              @click="handleMenuClick"
            >
              <a-menu-item key="home">
                <span>
                  <HomeOutlined />
                  首页
                </span>
              </a-menu-item>
              <a-menu-item key="scripts">
                <span>
                  <AppstoreOutlined />
                  剧本市场
                </span>
              </a-menu-item>
              <a-menu-item key="community">
                <span>
                  <TeamOutlined />
                  社区
                </span>
              </a-menu-item>
              <a-menu-item key="workspace">
                <span>
                  <EditOutlined />
                  创作中心
                </span>
              </a-menu-item>
            </a-menu>

            <div class="header-actions">
              <template v-if="isAuthenticated">
                <a-dropdown>
                  <a-button type="text" class="user-button">
                    <a-avatar :size="32" style="background-color: var(--primary-red); margin-right: 8px;">
                      {{ user?.username?.charAt(0)?.toUpperCase() || 'U' }}
                    </a-avatar>
                    {{ user?.username || '用户' }}
                    <DownOutlined />
                  </a-button>
                  <template #overlay>
                    <a-menu @click="handleUserMenuClick">
                      <a-menu-item key="dashboard">
                        <DashboardOutlined />
                        仪表盘
                      </a-menu-item>
                      <a-menu-item key="orders">
                        <ShoppingCartOutlined />
                        我的订单
                      </a-menu-item>
                      <a-menu-item key="favorites">
                        <StarOutlined />
                        收藏
                      </a-menu-item>
                      <a-menu-divider />
                      <a-menu-item key="settings">
                        <SettingOutlined />
                        设置
                      </a-menu-item>
                      <a-menu-item key="logout">
                        <LogoutOutlined />
                        退出登录
                      </a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
              </template>
              <template v-else>
                <router-link to="/login">
                  <a-button type="text">登录</a-button>
                </router-link>
                <router-link to="/register">
                  <a-button type="primary">注册</a-button>
                </router-link>
              </template>
            </div>
          </div>
        </a-layout-header>

        <a-layout-content class="app-content">
          <router-view />
        </a-layout-content>

        <a-layout-footer class="app-footer">
          <div class="footer-content">
            <p>© 2026 短剧创作交易平台 - 让创意更有价值</p>
          </div>
        </a-layout-footer>
      </a-layout>
    </div>
  </a-config-provider>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { message } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import {
  HomeOutlined,
  AppstoreOutlined,
  TeamOutlined,
  EditOutlined,
  DashboardOutlined,
  ShoppingCartOutlined,
  StarOutlined,
  SettingOutlined,
  LogoutOutlined,
  DownOutlined
} from '@ant-design/icons-vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const isAuthenticated = computed(() => authStore.isAuthenticated)
const user = computed(() => authStore.user)

const currentMenu = ref<string[]>(['home'])

const updateCurrentMenu = () => {
  const path = route.path
  if (path === '/' || path.startsWith('/home')) {
    currentMenu.value = ['home']
  } else if (path.startsWith('/scripts')) {
    currentMenu.value = ['scripts']
  } else if (path.startsWith('/community')) {
    currentMenu.value = ['community']
  } else if (path.startsWith('/workspace')) {
    currentMenu.value = ['workspace']
  }
}

watch(
  () => route.path,
  () => {
    updateCurrentMenu()
  },
  { immediate: true }
)

const handleMenuClick = ({ key }: { key: string }) => {
  switch (key) {
    case 'home':
      router.push('/home')
      break
    case 'scripts':
      router.push('/scripts')
      break
    case 'community':
      router.push('/community')
      break
    case 'workspace':
      router.push('/workspace')
      break
  }
}

const handleUserMenuClick = ({ key }: { key: string }) => {
  switch (key) {
    case 'dashboard':
      router.push('/dashboard')
      break
    case 'orders':
      router.push('/orders')
      break
    case 'favorites':
      router.push('/favorites')
      break
    case 'settings':
      router.push('/settings')
      break
    case 'logout':
      authStore.logout()
      message.success('已退出登录')
      router.push('/home')
      break
  }
}
</script>

<style>
@import './styles/globals.css';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  min-height: 100vh;
}

.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background: #ffffff !important;
  background-color: #ffffff !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 0;
  line-height: normal;
  height: auto;
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  height: 64px;
  gap: 32px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: var(--text-primary);
  font-weight: 700;
  font-size: 18px;
}

.logo-icon {
  font-size: 28px;
}

.logo-text {
  white-space: nowrap;
}

.nav-menu {
  flex: 1;
  border-bottom: none;
  line-height: 64px;
}

.nav-menu :deep(.ant-menu-item-selected) {
  color: var(--primary-red) !important;
}

.nav-menu :deep(.ant-menu-item-selected::after) {
  border-bottom-color: var(--primary-red) !important;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-button {
  display: flex;
  align-items: center;
}

.header-actions a {
  text-decoration: none;
}

.app-content {
  flex: 1;
  background: var(--bg-gray);
}

.app-footer {
  background: #fff;
  text-align: center;
  padding: 32px 24px;
  border-top: 1px solid var(--border-light);
  color: var(--text-tertiary);
}

.footer-content p {
  color: var(--text-tertiary);
  margin: 0;
}

@media (max-width: 1024px) {
  .nav-menu {
    display: none;
  }
}

@media (max-width: 768px) {
  .header-container {
    padding: 0 16px;
    gap: 16px;
  }

  .logo-text {
    display: none;
  }

  .header-actions {
    margin-left: auto;
  }
}
</style>
