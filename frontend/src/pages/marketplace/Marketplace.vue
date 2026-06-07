<template>
  <div class="marketplace-page">
    <div class="page-header">
      <h1>市场</h1>
      <p>发现更多精彩内容</p>
    </div>
    <a-result status="info" title="市场功能建设中" sub-title="更多服务即将上线">
      <template #extra>
        <router-link to="/scripts">
          <a-button type="primary">查看剧本市场</a-button>
        </router-link>
      </template>
    </a-result>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.marketplace-page {
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
