<template>
  <div class="success-page">
    <!-- 顶部导航 -->
    <nav class="top-nav">
      <div class="nav-container">
        <div class="nav-left">
          <router-link to="/" class="brand">
            <span class="brand-icon">🎬</span>
            <span class="brand-text">短剧创作交易平台</span>
          </router-link>
        </div>
      </div>
    </nav>

    <!-- 成功页面 -->
    <section class="success-section">
      <div class="success-container">
        <!-- 成功提示 -->
        <div class="success-header">
          <div class="success-icon">✅</div>
          <h1>支付成功！</h1>
          <p>恭喜您成功购买剧本《{{ script.title }}》</p>
        </div>

        <!-- 订单信息 -->
        <div class="order-card">
          <div class="script-info">
            <div class="script-poster">
              <img :src="script.image" :alt="script.title" />
              <div class="poster-overlay"></div>
            </div>
            <div class="script-details">
              <h3>{{ script.title }}</h3>
              <p>导演：{{ script.director }}</p>
            </div>
          </div>

          <div class="order-details">
            <div class="detail-row">
              <span>订单编号</span>
              <span>{{ orderNumber }}</span>
            </div>
            <div class="detail-row">
              <span>支付金额</span>
              <span class="price">¥{{ totalPrice }}</span>
            </div>
            <div class="detail-row">
              <span>购买时间</span>
              <span>{{ purchaseTime }}</span>
            </div>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="action-buttons">
          <button class="btn-download" @click="handleDownload">
            📥 下载剧本
          </button>
          <button class="btn-rating" @click="showRating = !showRating">
            ⭐ 评分
          </button>
        </div>

        <!-- 评分区域 -->
        <div v-if="showRating" class="rating-section">
          <div class="stars">
            <span 
              v-for="i in 5" 
              :key="i"
              :class="{ active: i <= rating }"
              @click="rating = i"
              @mouseover="hoverRating = i"
              @mouseleave="hoverRating = 0"
            >
              ⭐
            </span>
          </div>
          <textarea 
            v-model="comment" 
            placeholder="分享您的购买体验..." 
            class="rating-comment"
          ></textarea>
          <button class="submit-rating" @click="submitRating">
            提交评价
          </button>
        </div>

        <!-- 分享 -->
        <div class="share-section">
          <h3>分享给好友</h3>
          <div class="share-buttons">
            <button class="share-btn">💬 微信</button>
            <button class="share-btn">📱 微博</button>
            <button class="share-btn">📧 邮箱</button>
            <button class="share-btn">🔗 复制链接</button>
          </div>
        </div>

        <!-- 下一步 -->
        <div class="next-steps">
          <router-link to="/home" class="step-card">
            <span class="step-icon">🏠</span>
            <h4>返回首页</h4>
            <p>继续浏览更多剧本</p>
          </router-link>
          <router-link to="/scripts" class="step-card">
            <span class="step-icon">📚</span>
            <h4>购买更多</h4>
            <p>发现优质剧本</p>
          </router-link>
          <router-link to="/workspace" class="step-card">
            <span class="step-icon">✏️</span>
            <h4>开始创作</h4>
            <p>使用AI辅助创作</p>
          </router-link>
        </div>

        <!-- 客服 -->
        <div class="support-section">
          <p>如有疑问，请联系客服：<strong>400-888-8888</strong></p>
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
  image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20traditional%20embroidery%20master%20elegant%20woman%20in%20purple%20silk%20dramatic%20lighting%20Hollywood%20movie%20poster%20style&image_size=portrait_4_3'
})

const orderNumber = ref(`DH${Date.now().toString().slice(-10)}`)
const totalPrice = ref(439)
const purchaseTime = ref(new Date().toLocaleString('zh-CN'))
const showRating = ref(false)
const rating = ref(0)
const hoverRating = ref(0)
const comment = ref('')

const displayRating = computed(() => {
  return hoverRating.value || rating.value
})

const handleDownload = () => {
  alert('剧本下载中...')
}

const submitRating = () => {
  if (rating.value === 0) {
    alert('请先选择评分')
    return
  }
  alert('评价提交成功！感谢您的反馈')
  showRating.value = false
}
</script>

<style scoped>
.success-page {
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

/* 成功区块 */
.success-section {
  flex: 1;
  padding: 60px 24px;
}

.success-container {
  max-width: 600px;
  margin: 0 auto;
}

/* 成功提示 */
.success-header {
  text-align: center;
  margin-bottom: 40px;
}

.success-icon {
  font-size: 80px;
  margin-bottom: 16px;
}

.success-header h1 {
  font-size: 32px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 8px;
}

.success-header p {
  font-size: 16px;
  color: #6b7280;
}

/* 订单卡片 */
.order-card {
  background: #ffffff;
  border-radius: 4px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.script-info {
  display: flex;
  gap: 16px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 20px;
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
  background: linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.3) 100%);
}

.script-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.script-details h3 {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 4px;
}

.script-details p {
  font-size: 14px;
  color: #6b7280;
}

.order-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.detail-row span:first-child {
  color: #6b7280;
}

.detail-row span:last-child {
  color: #111827;
}

.detail-row .price {
  font-size: 20px;
  font-weight: 700;
  color: #dc2626;
}

/* 操作按钮 */
.action-buttons {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.btn-download,
.btn-rating {
  flex: 1;
  padding: 14px;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-download {
  background: #10b981;
  color: #ffffff;
}

.btn-download:hover {
  background: #059669;
}

.btn-rating {
  background: #ffffff;
  color: #374151;
  border: 2px solid #e5e7eb;
}

.btn-rating:hover {
  border-color: #dc2626;
  color: #dc2626;
}

/* 评分区域 */
.rating-section {
  background: #ffffff;
  padding: 24px;
  border-radius: 4px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.stars {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 16px;
}

.stars span {
  font-size: 32px;
  cursor: pointer;
  transition: transform 0.2s;
  opacity: 0.3;
}

.stars span.active,
.stars span:hover {
  opacity: 1;
  transform: scale(1.2);
}

.rating-comment {
  width: 100%;
  height: 80px;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  font-size: 14px;
  resize: none;
  margin-bottom: 12px;
}

.submit-rating {
  width: 100%;
  padding: 12px;
  background: #dc2626;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-rating:hover {
  background: #b91c1c;
}

/* 分享 */
.share-section {
  background: #ffffff;
  padding: 24px;
  border-radius: 4px;
  margin-bottom: 24px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.share-section h3 {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 16px;
}

.share-buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.share-btn {
  padding: 10px 16px;
  background: #f3f4f6;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.share-btn:hover {
  background: #e5e7eb;
}

/* 下一步 */
.next-steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 24px;
}

.step-card {
  background: #ffffff;
  padding: 20px;
  border-radius: 4px;
  text-align: center;
  text-decoration: none;
  transition: all 0.2s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.step-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.step-icon {
  font-size: 32px;
  display: block;
  margin-bottom: 8px;
}

.step-card h4 {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 4px;
}

.step-card p {
  font-size: 12px;
  color: #6b7280;
}

/* 客服 */
.support-section {
  text-align: center;
  padding: 20px;
  background: #fef2f2;
  border-radius: 4px;
}

.support-section p {
  font-size: 14px;
  color: #6b7280;
}

.support-section strong {
  color: #dc2626;
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
@media (max-width: 640px) {
  .next-steps {
    grid-template-columns: 1fr;
  }
  
  .share-buttons {
    flex-direction: column;
  }
}
</style>
