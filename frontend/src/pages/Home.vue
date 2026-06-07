<template>
  <div class="home-page">
    <div class="hero-section">
      <h1>短剧交易平台</h1>
      <p class="subtitle">发现创意剧本，开启精彩故事</p>
      <div class="hero-buttons">
        <router-link to="/scripts">
          <a-button type="primary" size="large">浏览剧本市场</a-button>
        </router-link>
        <router-link v-if="isAuthenticated" to="/create">
          <a-button size="large">创建剧本</a-button>
        </router-link>
        <router-link v-else to="/login">
          <a-button size="large">立即开始</a-button>
        </router-link>
      </div>
    </div>

    <div class="features-section">
      <a-row :gutter="[32, 32]">
        <a-col :xs="24" :sm="8">
          <div class="feature-card">
            <div class="feature-icon">📝</div>
            <h3>海量剧本</h3>
            <p>涵盖各类题材的优质短剧剧本，满足不同创作需求</p>
          </div>
        </a-col>
        <a-col :xs="24" :sm="8">
          <div class="feature-card">
            <div class="feature-icon">🤖</div>
            <h3>AI 创作助手</h3>
            <p>智能辅助剧本创作，激发灵感，提升创作效率</p>
          </div>
        </a-col>
        <a-col :xs="24" :sm="8">
          <div class="feature-card">
            <div class="feature-icon">💰</div>
            <h3>安全交易</h3>
            <p>完善的版权保护机制，确保创作者权益</p>
          </div>
        </a-col>
      </a-row>
    </div>

    <div class="hot-scripts-section">
      <h2>热门剧本</h2>
      <a-row :gutter="[24, 24]">
        <a-col :xs="24" :sm="12" :md="8" v-for="script in hotScripts" :key="script.id">
          <router-link :to="`/scripts/${script.id}`">
            <a-card hoverable class="script-card">
              <div class="script-theme">{{ script.theme }}</div>
              <h3 class="script-title">{{ script.title }}</h3>
              <div class="script-meta">
                <span>👁️ {{ script.views }}</span>
                <span>💰 {{ script.sales }}</span>
                <span class="script-price">¥{{ script.price }}</span>
              </div>
            </a-card>
          </router-link>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { scriptService } from '@/services/scriptService';

const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);

// Mock hot scripts data
const hotScripts = [
  { id: '1', title: '霸道总裁爱上我', theme: '都市言情', price: 299, views: 1256, sales: 89 },
  { id: '2', title: '重生之我在古代当首富', theme: '穿越重生', price: 399, views: 2341, sales: 156 },
  { id: '3', title: '甜蜜陷阱', theme: '都市爱情', price: 199, views: 1876, sales: 234 },
];

onMounted(async () => {
  try {
    const result = await scriptService.listScripts(1, 6);
    if (result.scripts.length > 0) {
      hotScripts.splice(0, hotScripts.length, ...result.scripts);
    }
  } catch (error) {
    console.log('Using mock data');
  }
});
</script>

<style scoped>
.home-page {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.hero-section {
  text-align: center;
  padding: 80px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  color: white;
  margin-bottom: 60px;
}

.hero-section h1 {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 16px;
}

.subtitle {
  font-size: 24px;
  opacity: 0.9;
  margin-bottom: 32px;
}

.hero-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.hero-buttons a-button {
  min-width: 160px;
}

.features-section {
  margin-bottom: 60px;
}

.feature-card {
  text-align: center;
  padding: 32px 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-4px);
}

.feature-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.feature-card h3 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}

.hot-scripts-section h2 {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 24px;
}

.script-card {
  transition: transform 0.3s, box-shadow 0.3s;
}

.script-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.script-theme {
  display: inline-block;
  padding: 4px 12px;
  background: #f0f5ff;
  color: #1890ff;
  border-radius: 4px;
  font-size: 12px;
  margin-bottom: 12px;
}

.script-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.script-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #999;
  font-size: 14px;
}

.script-price {
  color: #ff4d4f;
  font-weight: 600;
  font-size: 16px;
}
</style>
