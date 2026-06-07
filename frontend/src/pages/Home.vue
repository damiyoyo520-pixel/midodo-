<template>
  <div class="home-page">
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
          <router-link to="/zone/heritage" class="nav-link">非遗专区</router-link>
          <router-link to="/workspace" class="nav-link">创作中心</router-link>
          <router-link to="/community" class="nav-link">社区</router-link>
        </div>
        
        <div class="nav-right">
          <router-link to="/login" class="nav-btn-outline">登录</router-link>
          <router-link to="/register" class="nav-btn-primary">注册</router-link>
        </div>
      </div>
    </nav>

    <!-- 主视觉区 -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">连接创意与市场</h1>
        <p class="hero-subtitle">专业剧本交易平台 | 赋能内容创作者</p>
        <div class="hero-search">
          <input type="text" placeholder="搜索剧本、创作者..." class="search-input" />
          <button class="search-btn">搜索</button>
        </div>
      </div>
    </section>

    <!-- 精选剧本 -->
    <section class="section scripts-section">
      <div class="section-header">
        <h2 class="section-title">精选剧本</h2>
        <router-link to="/scripts" class="see-all">查看全部 →</router-link>
      </div>
      
      <div class="scripts-grid">
        <router-link 
          v-for="script in scripts" 
          :key="script.id"
          :to="`/scripts/${script.id}`"
          class="script-card"
        >
          <div class="script-poster" :style="{ background: script.gradient }">
            <div class="poster-overlay">
              <span class="poster-genre">{{ script.genre }}</span>
            </div>
            <div class="poster-info">
              <h3>{{ script.title }}</h3>
              <p>{{ script.director }}</p>
            </div>
            <div class="poster-rating">
              <span>⭐ {{ script.rating }}</span>
            </div>
          </div>
          <div class="script-meta">
            <span class="script-price">¥{{ script.price }}</span>
            <span class="script-sales">{{ script.sales }}人购买</span>
          </div>
        </router-link>
      </div>
    </section>

    <!-- 三大专区 -->
    <section class="section zones-section">
      <h2 class="section-title">专区分类</h2>
      <div class="zones-grid">
        <router-link to="/zone/global" class="zone-card">
          <div class="zone-bg zone-global"></div>
          <div class="zone-content">
            <span class="zone-icon">🌍</span>
            <h3>海外专区</h3>
            <p>全球视野 · 国际故事</p>
          </div>
        </router-link>
        
        <router-link to="/zone/culture" class="zone-card">
          <div class="zone-bg zone-culture"></div>
          <div class="zone-content">
            <span class="zone-icon">🏛️</span>
            <h3>文旅专区</h3>
            <p>山河之美 · 人文之旅</p>
          </div>
        </router-link>
        
        <router-link to="/zone/heritage" class="zone-card">
          <div class="zone-bg zone-heritage"></div>
          <div class="zone-content">
            <span class="zone-icon">🎭</span>
            <h3>非遗专区</h3>
            <p>传统匠心 · 文化传承</p>
          </div>
        </router-link>
      </div>
    </section>

    <!-- 平台数据 -->
    <section class="stats-bar">
      <div class="stats-container">
        <div class="stat-item">
          <span class="stat-value">12,847</span>
          <span class="stat-label">注册创作者</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-value">8,392</span>
          <span class="stat-label">上架剧本</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-value">5,621</span>
          <span class="stat-label">完成交易</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-value">¥2.3M</span>
          <span class="stat-label">平台抽佣</span>
        </div>
      </div>
    </section>

    <!-- 底部导航 -->
    <footer class="footer">
      <div class="footer-content">
        <p>© 2026 短剧创作交易平台 - 让创意更有价值</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const scripts = ref([
  {
    id: '1',
    title: '绣娘传',
    director: '李文秀',
    genre: '非遗',
    price: 399,
    rating: 4.9,
    sales: 186,
    gradient: 'linear-gradient(180deg, #1a0a2e 0%, #4a1942 50%, #d4a574 100%)'
  },
  {
    id: '2',
    title: '京剧大师',
    director: '王德明',
    genre: '非遗',
    price: 499,
    rating: 4.8,
    sales: 142,
    gradient: 'linear-gradient(180deg, #2d1b3d 0%, #8b2942 50%, #d4a574 100%)'
  },
  {
    id: '3',
    title: '唐人街往事',
    director: '陈建国',
    genre: '海外',
    price: 349,
    rating: 4.7,
    sales: 234,
    gradient: 'linear-gradient(180deg, #0a1628 0%, #1d3557 50%, #f4a261 100%)'
  },
  {
    id: '4',
    title: '东京物语',
    director: '佐藤健',
    genre: '海外',
    price: 329,
    rating: 4.6,
    sales: 198,
    gradient: 'linear-gradient(180deg, #0d0d0d 0%, #1a1a2e 50%, #e94560 100%)'
  },
  {
    id: '5',
    title: '西湖·千年情',
    director: '张晓月',
    genre: '文旅',
    price: 369,
    rating: 4.9,
    sales: 267,
    gradient: 'linear-gradient(180deg, #1a4a3a 0%, #2d6a4f 50%, #95d5b2 100%)'
  },
  {
    id: '6',
    title: '敦煌飞天',
    director: '赵艺术',
    genre: '文旅',
    price: 459,
    rating: 4.9,
    sales: 189,
    gradient: 'linear-gradient(180deg, #3d2914 0%, #8b5a2b 50%, #dda15e 100%)'
  },
  {
    id: '7',
    title: '星河彼岸',
    director: '刘星河',
    genre: '科幻',
    price: 449,
    rating: 4.8,
    sales: 156,
    gradient: 'linear-gradient(180deg, #0f0c29 0%, #302b63 50%, #764ba2 100%)'
  },
  {
    id: '8',
    title: '暗夜追踪',
    director: '周推理',
    genre: '悬疑',
    price: 399,
    rating: 4.7,
    sales: 212,
    gradient: 'linear-gradient(180deg, #000000 0%, #1a1a1a 50%, #4a4a4a 100%)'
  }
])
</script>

<style scoped>
.home-page {
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

/* 主视觉区 */
.hero-section {
  background: linear-gradient(180deg, #ffffff 0%, #f9fafb 100%);
  padding: 80px 24px 60px;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 48px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 12px;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: 18px;
  color: #6b7280;
  margin-bottom: 32px;
}

.hero-search {
  display: flex;
  max-width: 600px;
  margin: 0 auto;
  border: 2px solid #e5e7eb;
  border-radius: 2px;
  overflow: hidden;
}

.search-input {
  flex: 1;
  padding: 14px 20px;
  border: none;
  font-size: 15px;
  outline: none;
}

.search-btn {
  padding: 14px 32px;
  background: #dc2626;
  color: #ffffff;
  border: none;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.search-btn:hover {
  background: #b91c1c;
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
}

.script-card:hover .script-poster {
  transform: translateY(-4px);
}

.poster-overlay {
  display: flex;
  justify-content: flex-start;
}

.poster-genre {
  background: rgba(255, 255, 255, 0.95);
  color: #111827;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 1px;
}

.poster-info {
  color: #ffffff;
}

.poster-info h3 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 4px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.poster-info p {
  font-size: 13px;
  opacity: 0.9;
}

.poster-rating {
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(0, 0, 0, 0.6);
  color: #fbbf24;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 1px;
}

.script-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
}

.script-price {
  font-size: 18px;
  font-weight: 700;
  color: #dc2626;
}

.script-sales {
  font-size: 13px;
  color: #9ca3af;
}

/* 专区 */
.zones-section {
  background: #f9fafb;
}

.zones-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 32px;
}

.zone-card {
  position: relative;
  height: 200px;
  border-radius: 2px;
  overflow: hidden;
  text-decoration: none;
}

.zone-bg {
  position: absolute;
  inset: 0;
}

.zone-global {
  background: linear-gradient(135deg, #1e3a5f 0%, #0ea5e9 100%);
}

.zone-culture {
  background: linear-gradient(135deg, #92400e 0%, #f59e0b 100%);
}

.zone-heritage {
  background: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%);
}

.zone-content {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  text-align: center;
}

.zone-icon {
  font-size: 40px;
  margin-bottom: 12px;
}

.zone-content h3 {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 6px;
}

.zone-content p {
  font-size: 14px;
  opacity: 0.9;
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

.footer-content p {
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
  
  .zones-grid {
    grid-template-columns: 1fr;
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

@media (max-width: 640px) {
  .hero-title {
    font-size: 32px;
  }
  
  .scripts-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  
  .section {
    padding: 40px 16px;
  }
  
  .section-title {
    font-size: 22px;
  }
}
</style>
