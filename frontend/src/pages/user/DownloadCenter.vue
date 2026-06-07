<template>
  <div class="page">
    <div class="page-header">
      <h1>资料库</h1>
      <p>下载和管理你的资源</p>
    </div>
    <a-result status="info" title="资料库功能建设中" sub-title="更多功能即将上线">
      <template #extra>
        <router-link to="/dashboard">
          <a-button type="primary">返回仪表盘</a-button>
        </router-link>
      </template>
    </a-result>
  </div>
</template>

<script setup lang="ts"></script>

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
