<template>
  <div class="scripts-page">
    <div class="page-header">
      <h1>剧本市场</h1>
      <p>发现精彩短剧剧本</p>
    </div>

    <a-row :gutter="[24, 24]" v-if="scripts.length > 0">
      <a-col :xs="24" :sm="12" :md="8" :lg="6" v-for="script in scripts" :key="script.id">
        <router-link :to="`/scripts/${script.id}`">
          <a-card hoverable class="script-card glow-hover">
            <div class="script-image">
              <div class="placeholder-image" :style="{ background: script.color }">{{ script.title }}</div>
            </div>
            <div class="card-content">
              <a-tag color="blue" class="script-theme">{{ script.theme }}</a-tag>
              <h3 class="script-title">{{ script.title }}</h3>
              <div class="script-meta">
                <span>👁️ {{ script.views }}</span>
                <span class="script-price">¥{{ script.price }}</span>
              </div>
            </div>
          </a-card>
        </router-link>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const scripts = ref([
  { id: '1', title: '绣娘传', theme: '非遗', price: 399, views: 1856, color: 'linear-gradient(135deg, #9b5de5 0%, #f15bb5 100%)' },
  { id: '2', title: '京剧大师', theme: '非遗', price: 499, views: 2141, color: 'linear-gradient(135deg, #d62828 0%, #f77f00 100%)' },
  { id: '3', title: '景德镇瓷', theme: '非遗', price: 449, views: 1676, color: 'linear-gradient(135deg, #023e8a 0%, #0077b6 100%)' },
  { id: '4', title: '少林功夫', theme: '非遗', price: 599, views: 3241, color: 'linear-gradient(135deg, #e07b39 0%, #fb8500 100%)' },
  { id: '5', title: '唐人街往事', theme: '海外', price: 349, views: 2356, color: 'linear-gradient(135deg, #1d3557 0%, #457b9d 100%)' },
  { id: '6', title: '东京物语', theme: '海外', price: 329, views: 1923, color: 'linear-gradient(135deg, #000814 0%, #001d3d 100%)' },
  { id: '7', title: '巴黎之恋', theme: '海外', price: 379, views: 2456, color: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' },
  { id: '8', title: '新加坡梦', theme: '海外', price: 299, views: 1789, color: 'linear-gradient(135deg, #14213d 0%, #0f3460 100%)' }
])
</script>

<style scoped>
.scripts-page {
  padding: 48px 24px;
  max-width: 1400px;
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

.script-card {
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--border-light);
  transition: all 0.3s ease;
}

.script-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: var(--border-color);
}

.script-image {
  aspect-ratio: 9/16;
  max-height: 320px;
  overflow: hidden;
}

.placeholder-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  padding: 16px;
  transition: transform 0.5s ease;
}

.script-card:hover .placeholder-image {
  transform: scale(1.05);
}

.card-content {
  padding: 16px;
}

.script-theme {
  margin-bottom: 12px;
}

.script-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.script-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-tertiary);
  font-size: 14px;
}

.script-price {
  color: var(--primary-red);
  font-weight: 700;
  font-size: 18px;
}
</style>
