<template>
  <div class="page">
    <div class="page-header">
      <h1>订单详情</h1>
      <p>查看订单详细信息</p>
    </div>
    <a-card>
      <a-descriptions title="订单信息" :column="1">
        <a-descriptions-item label="订单编号"> {{ $route.params.orderId }} </a-descriptions-item>
        <a-descriptions-item label="订单状态"> 成功 </a-descriptions-item>
      </a-descriptions>
    </a-card>
    <div style="margin-top: 16px">
      <router-link to="/orders">
        <a-button type="primary">返回订单列表</a-button>
      </router-link>
    </div>
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
