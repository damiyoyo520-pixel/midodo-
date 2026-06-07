<template>
  <div class="page">
    <div class="page-header">
      <h1>剧本评论</h1>
      <p>查看剧本评价</p>
    </div>
    <a-result status="info" title="评论功能建设中" sub-title="更多评论功能即将上线">
      <template #extra>
        <router-link :to="`/scripts/${$route.params.id}`">
          <a-button type="primary">返回剧本详情</a-button>
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
