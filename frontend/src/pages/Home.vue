<template>
  <div class="home-page">
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
          <div class="script-poster">
            <!-- AI生成的海报图片 -->
            <img :src="script.image" :alt="script.title" class="poster-image" />
            
            <!-- 半透明遮罩 -->
            <div class="poster-overlay-bg"></div>
            
            <!-- 光效装饰 -->
            <div class="poster-light-effect"></div>
            
            <!-- 顶部信息 -->
            <div class="poster-overlay">
              <span class="poster-genre">{{ script.genre }}</span>
            </div>
            
            <!-- 底部信息 -->
            <div class="poster-bottom">
              <div class="poster-meta">
                <span class="poster-rating">⭐ {{ script.rating }}</span>
                <span class="poster-price">¥{{ script.price }}</span>
              </div>
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
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20traditional%20embroidery%20master%20elegant%20woman%20in%20purple%20silk%20dramatic%20lighting%20Hollywood%20movie%20poster%20style&image_size=portrait_4_3'
  },
  {
    id: '2',
    title: '京剧大师',
    director: '王德明',
    genre: '非遗',
    price: 499,
    rating: 4.8,
    sales: 142,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Peking%20Opera%20performer%20red%20gold%20face%20paint%20traditional%20costume%20epic%20lighting%20Hollywood%20movie%20poster&image_size=portrait_4_3'
  },
  {
    id: '3',
    title: '唐人街往事',
    director: '陈建国',
    genre: '海外',
    price: 349,
    rating: 4.7,
    sales: 234,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=New%20York%20Chinatown%20neon%20lights%20rainy%20night%201980s%20style%20Hollywood%20movie%20poster%20cinematic&image_size=portrait_4_3'
  },
  {
    id: '4',
    title: '东京物语',
    director: '佐藤健',
    genre: '海外',
    price: 329,
    rating: 4.6,
    sales: 198,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Tokyo%20night%20neon%20lights%20fashionable%20woman%20silhouette%20blue%20lighting%20cyberpunk%20movie%20poster&image_size=portrait_4_3'
  },
  {
    id: '5',
    title: '西湖·千年情',
    director: '张晓月',
    genre: '文旅',
    price: 369,
    rating: 4.9,
    sales: 267,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=West%20Lake%20China%20elegant%20woman%20traditional%20costume%20lotus%20water%20mist%20romantic%20movie%20poster&image_size=portrait_4_3'
  },
  {
    id: '6',
    title: '敦煌飞天',
    director: '赵艺术',
    genre: '文旅',
    price: 459,
    rating: 4.9,
    sales: 189,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Dunhuang%20flying%20apsaras%20goddess%20golden%20silk%20mural%20epic%20movie%20poster%20Chinese%20traditional&image_size=portrait_4_3'
  },
  {
    id: '7',
    title: '星河彼岸',
    director: '刘星河',
    genre: '科幻',
    price: 449,
    rating: 4.8,
    sales: 156,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Spaceship%20galaxy%20alien%20planet%20sci-fi%20epic%20movie%20poster%20cosmic%20stars%20dramatic%20lighting&image_size=portrait_4_3'
  },
  {
    id: '8',
    title: '暗夜追踪',
    director: '周推理',
    genre: '悬疑',
    price: 399,
    rating: 4.7,
    sales: 212,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Detective%20dark%20silhouette%20rainy%20night%20mysterious%20shadows%20noir%20movie%20poster%20Hollywood%20style&image_size=portrait_4_3'
  }
])
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  background: #ffffff;
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
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

/* AI生成的海报图片 */
.poster-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

/* 半透明遮罩 */
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

.script-card:hover .script-poster {
  transform: translateY(-8px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4);
}

/* 光效 */
.poster-light-effect {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.15) 0%, transparent 50%);
  pointer-events: none;
}

.script-card:hover .poster-light-effect {
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.25) 0%, transparent 50%);
}

.poster-overlay {
  display: flex;
  justify-content: flex-start;
  position: relative;
  z-index: 2;
  margin-bottom: auto;
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
/* 移动中间信息位置，让底部信息在底部 */
.poster-info {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 20px 0;
  margin: auto 0;
}

.poster-divider {
  width: 40px;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
  margin: 12px auto;
}

.poster-info h3 {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 8px;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  letter-spacing: 2px;
  line-height: 1.3;
}

.director {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  letter-spacing: 1px;
}

.poster-bottom {
  position: relative;
  z-index: 2;
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

.script-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
}

.script-price {
  font-size: 20px;
  font-weight: 800;
  color: #dc2626;
}

.script-sales {
  font-size: 13px;
  color: #9ca3af;
  font-weight: 500;
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
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
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
  color: #ffffff;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.3);
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
