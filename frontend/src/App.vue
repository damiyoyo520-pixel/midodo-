<template>
  <a-config-provider :locale="zhCN">
    <div id="app">
      <a-layout class="app-layout">
        <a-layout-header class="app-header">
          <div class="header-container">
            <router-link to="/" class="logo">
              <span class="logo-icon">🎬</span>
              <span class="logo-text">短剧交易平台</span>
            </router-link>

            <a-menu
              v-model:selectedKeys="currentMenu"
              mode="horizontal"
              class="nav-menu"
            >
              <a-menu-item key="home">
                <router-link to="/home">
                  <HomeOutlined /> 首页
                </router-link>
              </a-menu-item>
              <a-menu-item key="scripts">
                <router-link to="/scripts">
                  <AppstoreOutlined /> 剧本市场
                </router-link>
              </a-menu-item>
              <a-menu-item key="create" v-if="isAuthenticated">
                <router-link to="/create">
                  <PlusCircleOutlined /> 创建剧本
                </router-link>
              </a-menu-item>
            </a-menu>

            <div class="header-actions">
              <template v-if="isAuthenticated">
                <a-dropdown>
                  <a-button type="text">
                    <a-avatar :size="32" style="background-color: #1890ff; margin-right: 8px;">
                      {{ user?.username?.charAt(0).toUpperCase() || 'U' }}
                    </a-avatar>
                    {{ user?.username || '用户' }}
                    <DownOutlined />
                  </a-button>
                  <template #overlay>
                    <a-menu>
                      <a-menu-item key="dashboard">
                        <router-link to="/dashboard">
                          <DashboardOutlined /> 创作者仪表板
                        </router-link>
                      </a-menu-item>
                      <a-menu-item key="orders">
                        <router-link to="/orders">
                          <ShoppingCartOutlined /> 我的订单
                        </router-link>
                      </a-menu-item>
                      <a-menu-divider />
                      <a-menu-item key="logout" @click="handleLogout">
                        <LogoutOutlined /> 退出登录
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
            <p>© 2024 短剧交易平台 - 让创意更有价值</p>
          </div>
        </a-layout-footer>
      </a-layout>
    </div>
  </a-config-provider>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { message } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import {
  HomeOutlined,
  AppstoreOutlined,
  PlusCircleOutlined,
  DashboardOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
  DownOutlined,
} from '@ant-design/icons-vue';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const isAuthenticated = computed(() => authStore.isAuthenticated);
const user = computed(() => authStore.user);

const currentMenu = ref<string[]>(['home']);

const updateCurrentMenu = () => {
  const path = route.path;
  if (path === '/' || path === '/home') {
    currentMenu.value = ['home'];
  } else if (path.startsWith('/scripts')) {
    currentMenu.value = ['scripts'];
  } else if (path === '/create') {
    currentMenu.value = ['create'];
  } else if (path === '/dashboard') {
    currentMenu.value = ['dashboard'];
  } else if (path === '/orders') {
    currentMenu.value = ['orders'];
  }
};

watch(
  () => route.path,
  () => {
    updateCurrentMenu();
  },
  { immediate: true }
);

const handleLogout = () => {
  authStore.logout();
  message.success('已退出登录');
  router.push('/home');
};
</script>

<style>
@import './styles/globals.css';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    sans-serif;
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
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
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
  color: #333;
  font-weight: 600;
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
  line-height: 62px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-actions a {
  text-decoration: none;
}

.app-content {
  flex: 1;
  background: #f5f5f5;
}

.app-footer {
  background: white;
  text-align: center;
  padding: 24px;
  border-top: 1px solid #f0f0f0;
}

.footer-content p {
  color: #999;
  margin: 0;
}

@media (max-width: 768px) {
  .header-container {
    padding: 0 16px;
    gap: 16px;
  }

  .logo-text {
    display: none;
  }

  .nav-menu {
    display: none;
  }

  .header-actions {
    margin-left: auto;
  }
}
</style>
