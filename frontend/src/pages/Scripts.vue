<template>
  <div class="scripts-page">
    <div class="page-header">
      <h1>剧本市场</h1>
      <p>发现精彩短剧剧本</p>
    </div>

    <a-spin :spinning="loading">
      <a-row :gutter="[16, 24]">
        <a-col :xs="24" :sm="12" :md="8" :lg="6" v-for="script in scripts" :key="script._id">
          <router-link :to="`/scripts/${script._id}`">
            <div class="script-card">
              <div class="script-poster">
                <img :src="script.poster" :alt="script.title" />
              </div>
              <div class="script-details">
                <h3 class="script-title">{{ script.title }}</h3>
                <p class="script-genre">{{ script.genre }}</p>
                <div class="script-meta">
                  <span>👁️ {{ script.views }}</span>
                  <span class="script-price">¥{{ script.price }}</span>
                </div>
              </div>
            </div>
          </router-link>
        </a-col>
      </a-row>
    </a-spin>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import { scriptService } from '../services/scriptService'
import apiClient from '../services/api'

interface Script {
  _id: string
  title: string
  genre: string
  poster: string
  price: number
  views: number
}

const scripts = ref<Script[]>([])
const loading = ref(false)

const loadScripts = async () => {
  try {
    loading.value = true
    const response = await apiClient.get('/api/scripts')
    if (response.data.success) {
      scripts.value = response.data.data.scripts
    }
  } catch (error) {
    message.error('加载剧本失败')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadScripts()
})
</script>

<style scoped>
.scripts-page {
  padding: 40px 20px;
  max-width: 1400px;
  margin: 0 auto;
  min-height: 100vh;
  background: #0f0f0f;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
}

.page-header h1 {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 10px;
  background: linear-gradient(135deg, #dc2626 0%, #ff6b6b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-header p {
  font-size: 16px;
  color: #9ca3af;
}

.script-card {
  border-radius: 12px;
  overflow: hidden;
  background: #1f2937;
  border: 1px solid #374151;
  transition: all 0.3s ease;
  cursor: pointer;
  height: 100%;
}

.script-card:hover {
  transform: translateY(-4px);
  border-color: #dc2626;
  box-shadow: 0 10px 30px rgba(220, 38, 38, 0.2);
}

.script-poster {
  aspect-ratio: 9/16;
  overflow: hidden;
}

.script-poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.script-card:hover .script-poster img {
  transform: scale(1.05);
}

.script-details {
  padding: 16px;
}

.script-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
  color: white;
}

.script-genre {
  font-size: 12px;
  color: #dc2626;
  margin-bottom: 12px;
}

.script-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #9ca3af;
}

.script-price {
  color: #dc2626;
  font-weight: 700;
  font-size: 18px;
}
</style>
