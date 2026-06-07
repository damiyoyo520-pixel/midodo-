<template>
  <div class="confirm-page">
    <!-- 顶部导航 -->
    <nav class="top-nav">
      <div class="nav-container">
        <div class="nav-left">
          <router-link to="/" class="brand">
            <span class="brand-icon">🎬</span>
            <span class="brand-text">短剧创作交易平台</span>
          </router-link>
        </div>
        
        <div class="nav-center">
          <router-link to="/home" class="nav-link">首页</router-link>
          <router-link to="/scripts" class="nav-link">剧本市场</router-link>
          <router-link to="/workspace" class="nav-link">创作中心</router-link>
          <router-link to="/community" class="nav-link">社区</router-link>
        </div>
        
        <div class="nav-right">
          <router-link to="/login" class="nav-btn-outline">登录</router-link>
        </div>
      </div>
    </nav>

    <!-- 订单确认 -->
    <section class="confirm-section">
      <div class="confirm-container">
        <h1 class="page-title">确认订单</h1>
        
        <div class="order-content">
          <!-- 剧本信息 -->
          <div class="script-card">
            <div class="script-poster">
              <img :src="script.image" :alt="script.title" />
              <div class="poster-overlay-bg"></div>
            </div>
            <div class="script-info">
              <h3>{{ script.title }}</h3>
              <p>导演：{{ script.director }}</p>
              <span class="tag">{{ script.genre }}</span>
            </div>
          </div>

          <!-- 订单详情 -->
          <div class="order-details">
            <h2>订单信息</h2>
            
            <div class="detail-item">
              <span class="label">订单编号</span>
              <span class="value">{{ orderNumber }}</span>
            </div>
            
            <div class="detail-item">
              <span class="label">剧本费用</span>
              <span class="value">¥{{ script.price }}</span>
            </div>
            
            <div class="detail-item">
              <span class="label">平台服务费</span>
              <span class="value">¥{{ serviceFee }}</span>
            </div>
            
            <div class="detail-item total">
              <span class="label">应付总额</span>
              <span class="value price">¥{{ totalPrice }}</span>
            </div>
          </div>

          <!-- 支付方式 -->
          <div class="payment-methods">
            <h2>选择支付方式</h2>
            
            <div class="methods-grid">
              <div 
                v-for="method in paymentMethods" 
                :key="method.id"
                :class="['method-card', { active: selectedMethod === method.id }]"
                @click="selectedMethod = method.id"
              >
                <span class="method-icon">{{ method.icon }}</span>
                <span class="method-name">{{ method.name }}</span>
              </div>
            </div>
          </div>

          <!-- 服务协议 -->
          <div class="agreement-section">
            <label class="agreement-checkbox">
              <input type="checkbox" v-model="agreed" />
              <span>我已阅读并同意<a href="#">《服务协议》</a>和<a href="#">《版权授权协议》</a></span>
            </label>
          </div>

          <!-- 提交按钮 -->
          <div class="submit-section">
            <router-link 
              :to="`/payment/${script.id}`"
              class="submit-btn"
              :class="{ disabled: !agreed }"
              @click.prevent="handleSubmit"
            >
              确认支付 ¥{{ totalPrice }}
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- 底部 -->
    <footer class="footer">
      <p>© 2026 短剧创作交易平台 - 让创意更有价值</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const script = ref({
  id: '1',
  title: '绣娘传',
  director: '李文秀',
  genre: '非遗',
  price: 399,
  image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20traditional%20embroidery%20master%20elegant%20woman%20in%20purple%20silk%20dramatic%20lighting%20Hollywood%20movie%20poster%20style&image_size=portrait_4_3'
})

const orderNumber = ref(`DH${Date.now().toString().slice(-10)}`)
const selectedMethod = ref('wechat')
const agreed = ref(false)

const serviceFee = computed(() => Math.round(script.value.price * 0.1))
const totalPrice = computed(() => script.value.price + serviceFee.value)

const paymentMethods = [
  { id: 'wechat', name: '微信支付', icon: '💚' },
  { id: 'alipay', name: '支付宝', icon: '💙' },
  { id: 'card', name: '银行卡', icon: '💳' },
  { id: 'balance', name: '平台余额', icon: '💰' }
]

const handleSubmit = () => {
  if (!agreed.value) {
    alert('请先阅读并同意服务协议')
    return
  }
  window.location.href = `/payment/${script.value.id}`
}
</script>

<style scoped>
.confirm-page {
  min-height: 100vh;
  background: #f9fafb;
}

/* 顶部导航 */
.top-nav {
  background: #ffffff;
  border-bottom: 1px solid #e5e5e5;
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
}

.brand-icon {
  font-size: 24px;
}

.brand-text {
  font-size: 18px;
  font-weight: 700;
  color: #dc2626;
}

.nav-center {
  display: flex;
  gap: 32px;
}

.nav-link {
  text-decoration: none;
  color: #374151;
  font-size: 14px;
  font-weight: 500;
}

.nav-link:hover {
  color: #dc2626;
}

.nav-right {
  display: flex;
  gap: 12px;
}

.nav-btn-outline {
  padding: 8px 16px;
  border: 1px solid #d1d5db;
  border-radius: 2px;
  text-decoration: none;
  color: #374151;
  font-size: 14px;
}

/* 确认区块 */
.confirm-section {
  padding: 60px 24px;
}

.confirm-container {
  max-width: 800px;
  margin: 0 auto;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  color: #111827;
  text-align: center;
  margin-bottom: 40px;
}

.order-content {
  background: #ffffff;
  border-radius: 4px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* 剧本卡片 */
.script-card {
  display: flex;
  gap: 20px;
  padding: 24px;
  background: #f9fafb;
  border-radius: 4px;
  margin-bottom: 32px;
}

.script-poster {
  width: 100px;
  aspect-ratio: 2/3;
  border-radius: 2px;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
}

.script-poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.poster-overlay-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.5) 100%);
}

.script-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.script-info h3 {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 4px;
}

.script-info p {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 8px;
}

.tag {
  display: inline-block;
  width: fit-content;
  padding: 4px 12px;
  background: #fef2f2;
  color: #dc2626;
  font-size: 12px;
  border-radius: 2px;
}

/* 订单详情 */
.order-details {
  padding-bottom: 24px;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 24px;
}

.order-details h2,
.payment-methods h2 {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 16px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
}

.detail-item .label {
  font-size: 14px;
  color: #6b7280;
}

.detail-item .value {
  font-size: 14px;
  color: #111827;
  font-weight: 500;
}

.detail-item.total {
  border-top: 1px solid #e5e7eb;
  margin-top: 8px;
  padding-top: 16px;
}

.detail-item.total .label {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
}

.detail-item.total .value.price {
  font-size: 24px;
  font-weight: 700;
  color: #dc2626;
}

/* 支付方式 */
.payment-methods {
  margin-bottom: 24px;
}

.methods-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.method-card {
  padding: 16px;
  border: 2px solid #e5e7eb;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.method-card:hover {
  border-color: #dc2626;
}

.method-card.active {
  border-color: #dc2626;
  background: #fef2f2;
}

.method-icon {
  font-size: 24px;
  display: block;
  margin-bottom: 8px;
}

.method-name {
  font-size: 13px;
  color: #374151;
}

/* 服务协议 */
.agreement-section {
  margin-bottom: 24px;
}

.agreement-checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #6b7280;
  cursor: pointer;
}

.agreement-checkbox input {
  width: 16px;
  height: 16px;
}

.agreement-checkbox a {
  color: #dc2626;
  text-decoration: none;
}

/* 提交按钮 */
.submit-section {
  text-align: center;
}

.submit-btn {
  display: inline-block;
  padding: 16px 64px;
  background: #dc2626;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  border-radius: 2px;
  transition: background 0.2s;
}

.submit-btn:hover {
  background: #b91c1c;
}

.submit-btn.disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

/* 底部 */
.footer {
  background: #ffffff;
  border-top: 1px solid #e5e7eb;
  padding: 24px;
  text-align: center;
  margin-top: auto;
}

.footer p {
  color: #6b7280;
  font-size: 14px;
}

/* 响应式 */
@media (max-width: 768px) {
  .nav-center {
    display: none;
  }
  
  .methods-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .script-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>
