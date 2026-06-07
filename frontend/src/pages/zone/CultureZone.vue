<template>
  <div class="zone-page">
    <div class="zone-header">
      <h1>文旅专区</h1>
      <p>文化旅行，精彩故事</p>
    </div>
    <div class="script-grid">
      <router-link
        v-for="script in scripts"
        :key="script.id"
        :to="`/scripts/${script.id}`"
        class="script-card glow-hover"
      >
        <div class="script-image">
          <div class="placeholder-image" :style="{ background: script.color }">{{ script.title }}</div>
        </div>
        <div class="script-info">
          <div class="script-theme">{{ script.theme }}</div>
          <h3 class="script-title">{{ script.title }}</h3>
          <div class="script-meta">
            <span class="script-views">{{ script.views }} 浏览</span>
            <span class="script-price">¥{{ script.price }}</span>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const scripts = ref([
  {
    id: '9',
    title: '西湖·千年情',
    theme: '文旅',
    price: 369,
    views: 2621,
    color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
  },
  {
    id: '10',
    title: '长安十二时辰',
    theme: '文旅',
    price: 499,
    views: 3145,
    color: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
  },
  {
    id: '11',
    title: '丽江古城',
    theme: '文旅',
    price: 349,
    views: 1987,
    color: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
  },
  {
    id: '12',
    title: '敦煌飞天',
    theme: '文旅',
    price: 459,
    views: 2876,
    color: 'linear-gradient(135deg, #d4a574 0%, #8b6f47 100%)'
  }
])
</script>

<style scoped>
.zone-page {
  padding: 80px 24px;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
}

.zone-header {
  text-align: center;
  margin-bottom: 60px;
}

.zone-header h1 {
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 12px;
  background: linear-gradient(135deg, var(--primary-red) 0%, var(--primary-red-light) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.zone-header p {
  font-size: 18px;
  color: var(--text-secondary);
}

.script-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.script-card {
  background: #fff;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--border-light);
  transition: all 0.3s ease;
}

.script-card:hover {
  border-color: var(--border-color);
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.script-image {
  aspect-ratio: 9/16;
  max-height: 400px;
  overflow: hidden;
  position: relative;
}

.placeholder-image {
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: rgba(255,255,255,0.9);
  font-size: 16px;
}

.script-card:hover .placeholder-image {
  transform: scale(1.05);
}

.script-info {
  padding: 20px;
}

.script-theme {
  display: inline-block;
  padding: 4px 12px;
  background: rgba(220, 38, 38, 0.08);
  color: var(--primary-red);
  font-size: 12px;
  border-radius: var(--radius-sm);
  margin-bottom: 12px;
}

.script-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--text-primary);
}

.script-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.script-views {
  color: var(--text-tertiary);
}

.script-price {
  color: var(--primary-red);
  font-weight: 600;
  font-size: 18px;
}

@media (max-width: 1024px) {
  .script-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .script-grid {
    grid-template-columns: 1fr;
  }
}
</style>
