<template>
  <div class="workspace-page">
    <div class="page-header">
      <h1>创作中心</h1>
      <p>开启你的创作之旅</p>
    </div>

    <a-row :gutter="[24, 24]">
      <a-col :xs="24" :sm="12" :md="6" v-for="item in menuItems" :key="item.id">
        <router-link :to="item.path">
          <a-card hoverable class="menu-card glow-hover">
            <div class="menu-icon">{{ item.icon }}</div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </a-card>
        </router-link>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const menuItems = ref([
  { id: '1', title: '剧本创作', description: 'AI辅助创作短剧剧本', icon: '📝', path: '/workspace/script' },
  { id: '2', title: '视频分镜', description: '制作专业分镜脚本', icon: '🎬', path: '/workspace/storyboard' },
  { id: '3', title: '生资产创作', description: '制作视频所需素材', icon: '🎨', path: '/workspace/assets' },
  { id: '4', title: '生视频流程', description: '完整的视频制作流程', icon: '🎥', path: '/workspace/video' }
])
</script>

<style scoped>
.workspace-page {
  padding: 48px 24px;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
}

.page-header {
  text-align: center;
  margin-bottom: 48px;
}

.page-header h1 {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 8px;
  background: linear-gradient(135deg, var(--primary-red) 0%, var(--primary-red-light) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-header p {
  font-size: 18px;
  color: var(--text-secondary);
}

.menu-card {
  border-radius: var(--radius-md);
  border: 1px solid var(--border-light);
  transition: all 0.3s ease;
  text-align: center;
  padding: 32px;
}

.menu-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: var(--border-color);
}

.menu-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.menu-card h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--text-primary);
}

.menu-card p {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0;
}
</style>
