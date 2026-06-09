<template>
  <div class="page">
    <div class="page-header">
      <h1>设置</h1>
      <p>管理你的账户设置</p>
    </div>
    <a-card>
      <a-descriptions title="账户设置" :column="1">
        <a-descriptions-item label="用户名"> {{ user?.username || '未登录' }} </a-descriptions-item>
        <a-descriptions-item label="邮箱"> {{ user?.email || '未设置' }} </a-descriptions-item>
      </a-descriptions>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'

const authStore = useAuthStore()
const user = computed(() => authStore.user)
</script>

<style scoped>
.page {
  padding: 48px 24px;
  max-width: 800px;
  margin: 0 auto;
  min-height: 100vh;
}

.page-header {
  text-align: center;
  margin-bottom: 32px;
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
</style>
