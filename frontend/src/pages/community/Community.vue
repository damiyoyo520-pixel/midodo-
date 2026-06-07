<template>
  <div class="community-page">
    <div class="page-header">
      <h1>社区</h1>
      <p>与创作者交流分享</p>
    </div>
    <a-result status="info" title="社区功能建设中" sub-title="精彩内容即将上线">
      <template #extra>
        <router-link to="/home">
          <a-button type="primary">返回首页</a-button>
        </router-link>
      </template>
    </a-result>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.community-page {
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
