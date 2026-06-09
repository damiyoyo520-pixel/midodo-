<template>
  <div class="workspace-page">
    <div class="page-header">
      <h1>创作中心</h1>
      <p>开启你的创作之旅，打造爆款短剧</p>
    </div>

    <div class="stats-cards">
      <a-row :gutter="[16, 16]">
        <a-col :xs="12" :sm="6">
          <div class="stat-card">
            <div class="stat-icon">📝</div>
            <div class="stat-content">
              <h3>{{ myScripts.length }}</h3>
              <p>我的剧本</p>
            </div>
          </div>
        </a-col>
        <a-col :xs="12" :sm="6">
          <div class="stat-card">
            <div class="stat-icon">🎬</div>
            <div class="stat-content">
              <h3>{{ storyboards.length }}</h3>
              <p>分镜作品</p>
            </div>
          </div>
        </a-col>
        <a-col :xs="12" :sm="6">
          <div class="stat-card">
            <div class="stat-icon">💰</div>
            <div class="stat-content">
              <h3>¥{{ totalRevenue }}</h3>
              <p>总收入</p>
            </div>
          </div>
        </a-col>
        <a-col :xs="12" :sm="6">
          <div class="stat-card">
            <div class="stat-icon">👁️</div>
            <div class="stat-content">
              <h3>{{ totalViews }}</h3>
              <p>总浏览</p>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>

    <div class="section-title">
      <h2>创作工具</h2>
    </div>

    <a-row :gutter="[24, 24]">
      <a-col :xs="24" :sm="12" :md="6" v-for="item in menuItems" :key="item.id">
        <router-link :to="item.path">
          <div class="menu-card">
            <div class="menu-icon">{{ item.icon }}</div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
            <div class="menu-action">开始创作</div>
          </div>
        </router-link>
      </a-col>
    </a-row>

    <div class="section-title" style="margin-top: 48px">
      <h2>最近作品</h2>
    </div>

    <a-row :gutter="[16, 16]" v-if="myScripts.length > 0">
      <a-col :xs="24" :sm="12" :md="8" v-for="script in myScripts" :key="script.id">
        <div class="script-card">
          <div class="script-header">
            <span class="script-genre">{{ script.genre }}</span>
            <span class="script-status" :class="script.status">{{ script.statusText }}</span>
          </div>
          <h3>{{ script.title }}</h3>
          <p class="script-desc">{{ script.description }}</p>
          <div class="script-footer">
            <span>👁️ {{ script.views }}</span>
            <span>📅 {{ script.date }}</span>
          </div>
        </div>
      </a-col>
    </a-row>
    <a-empty v-else description="暂无作品，开始你的创作吧！" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const menuItems = ref([
  { id: '1', title: '剧本创作', description: 'AI辅助创作短剧剧本，灵感无限', icon: '📝', path: '/workspace/script' },
  { id: '2', title: '视频分镜', description: '制作专业分镜脚本，画面更精彩', icon: '🎬', path: '/workspace/storyboard' },
  { id: '3', title: '生资产创作', description: '制作视频所需素材，一键生成', icon: '🎨', path: '/workspace/assets' },
  { id: '4', title: '生视频流程', description: '完整的视频制作流程，轻松成片', icon: '🎥', path: '/workspace/video' }
])

const myScripts = ref([
  { id: '1', title: '绣娘传', description: '讲述中国传统刺绣艺术传承的感人故事', genre: '非遗', status: 'published', statusText: '已发布', views: 1280, date: '2026-06-01' },
  { id: '2', title: '唐人街往事', description: '纽约唐人街的时代变迁', genre: '海外', status: 'draft', statusText: '草稿中', views: 0, date: '2026-06-05' },
  { id: '3', title: '西湖·千年情', description: '杭州西湖的千年爱情传说', genre: '文旅', status: 'published', statusText: '已发布', views: 2800, date: '2026-05-28' }
])

const storyboards = ref([
  { id: '1', title: '绣娘传分镜' },
  { id: '2', title: '西湖分镜' }
])

const totalRevenue = ref(2450)
const totalViews = ref(4080)
</script>

<style scoped>
.workspace-page {
  padding: 48px 24px;
  max-width: 1400px;
  margin: 0 auto;
  min-height: 100vh;
  background: #0f0f0f;
}

.page-header {
  text-align: center;
  margin-bottom: 48px;
}

.page-header h1 {
  font-size: 42px;
  font-weight: 800;
  margin-bottom: 10px;
  background: linear-gradient(135deg, #dc2626 0%, #ff6b6b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-header p {
  font-size: 18px;
  color: #9ca3af;
}

.stats-cards {
  margin-bottom: 48px;
}

.stat-card {
  background: linear-gradient(135deg, #1f2937 0%, #0f172a 100%);
  border: 1px solid #374151;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.3s ease;
}

.stat-card:hover {
  border-color: #dc2626;
  box-shadow: 0 4px 20px rgba(220, 38, 38, 0.2);
}

.stat-icon {
  font-size: 36px;
}

.stat-content h3 {
  font-size: 28px;
  font-weight: 700;
  color: white;
  margin: 0 0 4px 0;
}

.stat-content p {
  font-size: 14px;
  color: #9ca3af;
  margin: 0;
}

.section-title {
  margin-bottom: 24px;
}

.section-title h2 {
  font-size: 24px;
  font-weight: 700;
  color: white;
}

.menu-card {
  background: linear-gradient(135deg, #1f2937 0%, #0f172a 100%);
  border: 1px solid #374151;
  border-radius: 12px;
  padding: 32px 24px;
  text-align: center;
  transition: all 0.3s ease;
  height: 100%;
}

.menu-card:hover {
  transform: translateY(-8px);
  border-color: #dc2626;
  box-shadow: 0 12px 40px rgba(220, 38, 38, 0.2);
}

.menu-icon {
  font-size: 56px;
  margin-bottom: 16px;
}

.menu-card h3 {
  font-size: 20px;
  font-weight: 700;
  color: white;
  margin-bottom: 8px;
}

.menu-card p {
  font-size: 14px;
  color: #9ca3af;
  margin-bottom: 20px;
  line-height: 1.6;
}

.menu-action {
  display: inline-block;
  background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
  color: white;
  padding: 10px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
}

.menu-card:hover .menu-action {
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(220, 38, 38, 0.4);
}

.script-card {
  background: linear-gradient(135deg, #1f2937 0%, #0f172a 100%);
  border: 1px solid #374151;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
}

.script-card:hover {
  border-color: #dc2626;
  box-shadow: 0 8px 30px rgba(220, 38, 38, 0.15);
}

.script-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.script-genre {
  font-size: 12px;
  color: #dc2626;
  font-weight: 600;
}

.script-status {
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 600;
}

.script-status.published {
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
}

.script-status.draft {
  background: rgba(245, 158, 11, 0.2);
  color: #f59e0b;
}

.script-card h3 {
  font-size: 18px;
  font-weight: 700;
  color: white;
  margin: 0 0 8px 0;
}

.script-desc {
  font-size: 14px;
  color: #9ca3af;
  margin-bottom: 16px;
  line-height: 1.6;
}

.script-footer {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #6b7280;
}
</style>
