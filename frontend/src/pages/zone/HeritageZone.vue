<template>
  <div class="zone-page">
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
          <router-link to="/zone/global" class="nav-link">海外专区</router-link>
          <router-link to="/zone/culture" class="nav-link">文旅专区</router-link>
          <router-link to="/zone/heritage" class="nav-link active">非遗专区</router-link>
          <router-link to="/workspace" class="nav-link">创作中心</router-link>
          <router-link to="/community" class="nav-link">社区</router-link>
        </div>
        
        <div class="nav-right">
          <router-link to="/login" class="nav-btn-outline">登录</router-link>
          <router-link to="/register" class="nav-btn-primary">注册</router-link>
        </div>
      </div>
    </nav>

    <!-- 专区标题 -->
    <section class="zone-hero">
      <h1>非遗专区</h1>
      <p>传统工艺 · 匠心传承</p>
    </section>

    <!-- 剧本列表 -->
    <section class="section scripts-section">
      <div class="section-header">
        <h2 class="section-title">非遗剧本</h2>
        <router-link to="/scripts" class="see-all">查看全部 →</router-link>
      </div>
      
      <div class="scripts-grid">
        <router-link 
          v-for="script in scripts" 
          :key="script.id"
          :to="`/scripts/${script.id}`"
          class="script-card"
        >
          <div class="script-poster">
            <img :src="script.image" :alt="script.title" class="poster-image" />
            <div class="poster-overlay-bg"></div>
            <div class="poster-light-effect"></div>
            
            <div class="poster-overlay">
              <span class="poster-genre">{{ script.genre }}</span>
            </div>
            
            <div class="poster-bottom">
              <div class="poster-meta">
                <span class="poster-rating">⭐ {{ script.rating }}</span>
                <span class="poster-price">¥{{ script.price }}</span>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </section>

    <!-- 数据统计 -->
    <section class="stats-bar">
      <div class="stats-container">
        <div class="stat-item">
          <span class="stat-value">1,891</span>
          <span class="stat-label">非遗剧本</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-value">128</span>
          <span class="stat-label">传承技艺</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-value">567</span>
          <span class="stat-label">非遗传承人</span>
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
import { ref } from 'vue'

const scripts = ref([
  {
    id: '1',
    title: '绣娘传',
    genre: '非遗',
    price: 399,
    rating: 4.8,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20traditional%20embroidery%20master%20elegant%20woman%20in%20purple%20silk%20dramatic%20lighting%20Hollywood%20movie%20poster%20style&image_size=portrait_4_3'
  },
  {
    id: '2',
    title: '京剧大师',
    genre: '非遗',
    price: 499,
    rating: 4.9,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Peking%20Opera%20performer%20red%20gold%20face%20paint%20traditional%20costume%20epic%20lighting%20Hollywood%20movie%20poster&image_size=portrait_4_3'
  },
  {
    id: '3',
    title: '少林功夫',
    genre: '非遗',
    price: 599,
    rating: 4.7,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Shaolin%20monk%20kungfu%20martial%20arts%20pose%20orange%20temple%20background%20epic%20movie%20poster&image_size=portrait_4_3'
  },
  {
    id: '4',
    title: '景德镇瓷',
    genre: '非遗',
    price: 449,
    rating: 4.6,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Blue%20and%20white%20porcelain%20ceramic%20art%20master%20dramatic%20lighting%20Chinese%20art%20movie%20poster&image_size=portrait_4_3'
  }
])
</script>

<style scoped>
.zone-page {
  min-height: 100vh;
  background: #ffffff;
}

/* 顶部导航 */
.top-nav {
  position: sticky;
  top: 0;
  z-index: 100;
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

.nav-left {
  display: flex;
  align-items: center;
}

.brand {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: #111827;
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
  transition: color 0.2s;
}

.nav-link:hover {
  color: #dc2626;
}

.nav-link.active {
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
  font-weight: 500;
  transition: all 0.2s;
}

.nav-btn-outline:hover {
  border-color: #dc2626;
  color: #dc2626;
}

.nav-btn-primary {
  padding: 8px 16px;
  background: #dc2626;
  border-radius: 2px;
  text-decoration: none;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.2s;
}

.nav-btn-primary:hover {
  background: #b91c1c;
}

/* 专区标题 */
.zone-hero {
  background: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%);
  padding: 80px 24px;
  text-align: center;
  color: #ffffff;
}

.zone-hero h1 {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 12px;
}

.zone-hero p {
  font-size: 18px;
  opacity: 0.9;
}

/* 区块通用 */
.section {
  max-width: 1400px;
  margin: 0 auto;
  padding: 60px 24px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.section-title {
  font-size: 28px;
  font-weight: 700;
  color: #111827;
}

.see-all {
  color: #dc2626;
  font-size: 14px;
  text-decoration: none;
  font-weight: 500;
}

/* 剧本网格 */
.scripts-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.script-card {
  text-decoration: none;
  display: block;
}

.script-poster {
  aspect-ratio: 2/3;
  border-radius: 2px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  transition: transform 0.3s;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.script-card:hover .script-poster {
  transform: translateY(-8px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4);
}

.poster-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.poster-overlay-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.1) 30%,
    rgba(0, 0, 0, 0.3) 70%,
    rgba(0, 0, 0, 0.7) 100%
  );
  z-index: 1;
}

.poster-light-effect {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.15) 0%, transparent 50%);
  pointer-events: none;
  z-index: 2;
}

.script-card:hover .poster-light-effect {
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.25) 0%, transparent 50%);
}

.poster-overlay {
  position: relative;
  z-index: 3;
}

.poster-genre {
  background: rgba(255, 255, 255, 0.95);
  color: #111827;
  padding: 6px 14px;
  font-size: 12px;
  font-weight: 700;
  border-radius: 1px;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.poster-bottom {
  position: relative;
  z-index: 3;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.poster-meta {
  display: flex;
  align-items: center;
  gap: 12px;
}

.poster-rating {
  color: #fbbf24;
  font-size: 14px;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.poster-price {
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

/* 数据统计 */
.stats-bar {
  background: #111827;
  padding: 40px 24px;
}

.stats-container {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 48px;
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  color: #dc2626;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: #9ca3af;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: #374151;
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
@media (max-width: 1024px) {
  .nav-center {
    display: none;
  }
  
  .scripts-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .stats-container {
    flex-wrap: wrap;
  }
  
  .stat-divider {
    display: none;
  }
  
  .stat-item {
    padding: 16px 24px;
    width: 50%;
  }
}
</style>
