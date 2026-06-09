<template>
  <div class="payment-page">
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
        </div>
      </div>
    </nav>

    <!-- 支付页面 -->
    <section class="payment-section">
      <div class="payment-container">
        <h1 class="page-title">订单支付</h1>
        
        <div class="payment-content">
          <!-- 左侧二维码 -->
          <div class="qr-section">
            <div class="qr-wrapper">
              <div class="qr-code">
                <div class="qr-placeholder">
                  <span>📱</span>
                  <p>请扫描二维码支付</p>
                </div>
              </div>
              <div class="qr-timer">
                <span>⏱️</span>
                <span>剩余支付时间：<strong>{{ formattedTime }}</strong></span>
              </div>
            </div>
            
            <div class="payment-instructions">
              <h3>支付步骤</h3>
              <ol>
                <li>打开{{ currentMethodName }}APP</li>
                <li>扫描左侧二维码</li>
                <li>完成支付</li>
              </ol>
            </div>
          </div>

          <!-- 右侧订单信息 -->
          <div class="order-section">
            <div class="order-card">
              <h2>订单信息</h2>
              
              <div class="script-preview">
                <div class="script-poster">
                  <img :src="script.image" :alt="script.title" />
                  <div class="poster-overlay"></div>
                </div>
                <div class="script-info">
                  <h4>{{ script.title }}</h4>
                  <p>导演：{{ script.director }}</p>
                </div>
              </div>

              <div class="order-details">
                <div class="detail-row">
                  <span>订单编号</span>
                  <span>{{ orderNumber }}</span>
                </div>
                <div class="detail-row">
                  <span>剧本费用</span>
                  <span>¥{{ script.price }}</span>
                </div>
                <div class="detail-row">
                  <span>平台服务费</span>
                  <span>¥{{ serviceFee }}</span>
                </div>
                <div class="detail-row total">
                  <span>应付总额</span>
                  <span class="price">¥{{ totalPrice }}</span>
                </div>
              </div>

              <div class="payment-methods">
                <h3>支付方式</h3>
                <div class="methods-list">
                  <div 
                    v-for="method in paymentMethods" 
                    :key="method.id"
                    :class="['method-item', { active: selectedMethod === method.id }]"
                    @click="selectedMethod = method.id"
                  >
                    <span class="method-icon">{{ method.icon }}</span>
                    <span>{{ method.name }}</span>
                  </div>
                </div>
              </div>

              <div class="security-info">
                <div class="security-item">
                  <span>🛡️</span>
                  <span>资金托管</span>
                </div>
                <div class="security-item">
                  <span>🔒</span>
                  <span>SSL加密</span>
                </div>
                <div class="security-item">
                  <span>📱</span>
                  <span>即时交付</span>
                </div>
              </div>
            </div>

            <button class="confirm-btn" @click="handlePayment">
              我已支付完成
            </button>
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const script = ref({
  id: '1',
  title: '绣娘传',
  director: '李文秀',
  image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20traditional%20embroidery%20master%20elegant%20woman%20in%20purple%20silk%20dramatic%20lighting%20Hollywood%20movie%20poster%20style&image_size=portrait_4_3'
})

const orderNumber = ref(`DH${Date.now().toString().slice(-10)}`)
const selectedMethod = ref('wechat')
const timeLeft = ref(30 * 60) // 30分钟

const serviceFee = computed(() => Math.round(script.value.price * 0.1))
const totalPrice = computed(() => script.value.price + serviceFee.value)

const formattedTime = computed(() => {
  const mins = Math.floor(timeLeft.value / 60)
  const secs = timeLeft.value % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
})

const currentMethodName = computed(() => {
  const method = paymentMethods.find(m => m.id === selectedMethod.value)
  return method?.name.replace('支付', '') || '支付'
})

const paymentMethods = [
  { id: 'wechat', name: '微信支付', icon: '💚' },
  { id: 'alipay', name: '支付宝', icon: '💙' },
  { id: 'card', name: '银行卡', icon: '💳' },
  { id: 'balance', name: '平台余额', icon: '💰' }
]

let timer: number | null = null

onMounted(() => {
  timer = window.setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      alert('支付已超时，请重新下单')
      router.push('/home')
    }
  }, 1000)
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})

const handlePayment = () => {
  alert('支付成功！即将跳转至订单完成页面...')
  router.push(`/order/success/${script.value.id}`)
}
</script>

<style scoped>
.payment-page {
  min-height: 100vh;
  background: #f9fafb;
  display: flex;
  flex-direction: column;
}

/* 顶部导航 */
.top-nav {
  background: #ffffff;
  border-bottom: 1px solid #e5e5e5;
}

.nav-container {
  max-width: 1200px;
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

/* 支付区块 */
.payment-section {
  flex: 1;
  padding: 60px 24px;
}

.payment-container {
  max-width: 1000px;
  margin: 0 auto;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  color: #111827;
  text-align: center;
  margin-bottom: 40px;
}

.payment-content {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 40px;
}

/* 二维码区域 */
.qr-section {
  background: #ffffff;
  padding: 32px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.qr-wrapper {
  text-align: center;
  margin-bottom: 24px;
}

.qr-code {
  width: 200px;
  height: 200px;
  margin: 0 auto 16px;
  background: #f9fafb;
  border: 2px dashed #e5e7eb;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qr-placeholder {
  text-align: center;
}

.qr-placeholder span {
  font-size: 64px;
  display: block;
  margin-bottom: 8px;
}

.qr-placeholder p {
  font-size: 14px;
  color: #6b7280;
}

.qr-timer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  color: #6b7280;
}

.qr-timer strong {
  color: #dc2626;
  font-size: 18px;
}

.payment-instructions {
  background: #f9fafb;
  padding: 20px;
  border-radius: 4px;
}

.payment-instructions h3 {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 12px;
}

.payment-instructions ol {
  padding-left: 20px;
  font-size: 13px;
  color: #6b7280;
  line-height: 2;
}

/* 订单区域 */
.order-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.order-card {
  background: #ffffff;
  padding: 32px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.order-card h2 {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 20px;
}

.script-preview {
  display: flex;
  gap: 16px;
  padding: 16px;
  background: #f9fafb;
  border-radius: 4px;
  margin-bottom: 24px;
}

.script-poster {
  width: 80px;
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

.poster-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.4) 100%);
}

.script-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.script-info h4 {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 4px;
}

.script-info p {
  font-size: 13px;
  color: #6b7280;
}

.order-details {
  border-top: 1px solid #e5e7eb;
  padding-top: 16px;
  margin-bottom: 24px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  font-size: 14px;
}

.detail-row span:first-child {
  color: #6b7280;
}

.detail-row span:last-child {
  color: #111827;
}

.detail-row.total {
  border-top: 1px solid #e5e7eb;
  padding-top: 16px;
  margin-top: 8px;
}

.detail-row.total span:first-child {
  font-weight: 600;
  color: #111827;
}

.detail-row.total .price {
  font-size: 24px;
  font-weight: 700;
  color: #dc2626;
}

.payment-methods h3 {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 12px;
}

.methods-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.method-item {
  padding: 12px;
  border: 2px solid #e5e7eb;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}

.method-item:hover {
  border-color: #dc2626;
}

.method-item.active {
  border-color: #dc2626;
  background: #fef2f2;
}

.method-icon {
  font-size: 20px;
}

.security-info {
  display: flex;
  gap: 24px;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
}

.security-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #6b7280;
}

.confirm-btn {
  width: 100%;
  padding: 16px;
  background: #10b981;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

.confirm-btn:hover {
  background: #059669;
}

/* 底部 */
.footer {
  background: #ffffff;
  border-top: 1px solid #e5e7eb;
  padding: 24px;
  text-align: center;
}

.footer p {
  color: #6b7280;
  font-size: 14px;
}

/* 响应式 */
@media (max-width: 768px) {
  .payment-content {
    grid-template-columns: 1fr;
  }
  
  .nav-center {
    display: none;
  }
}
</style>
