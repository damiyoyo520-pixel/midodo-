<template>
  <div class="page">
    <div class="page-header">
      <h1>订单成功</h1>
      <p>恭喜，订单支付成功！</p>
    </div>
    <a-result status="success" title="订单支付成功！" sub-title="你已经可以查看和使用该剧本了">
      <template #extra>
        <a-space>
          <router-link to="/orders">
            <a-button type="primary">查看订单</a-button>
          </router-link>
          <router-link to="/scripts">
            <a-button>继续浏览</a-button>
          </router-link>
        </a-space>
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
