<template>
  <div class="home-page">
    <!-- 主视觉区 - 好莱坞大片风格 -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">短剧创作交易平台</h1>
        <p class="hero-subtitle">连接创意与市场 · 让每一个故事闪耀光芒</p>
        <div class="hero-search">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="搜索剧本、创作者..." 
            class="search-input" 
            @keyup.enter="handleSearch"
          />
          <button class="search-btn" @click="handleSearch">搜索</button>
        </div>
        <div class="hero-tags">
          <span @click="handleTagClick('古装')">#古装</span>
          <span @click="handleTagClick('悬疑')">#悬疑</span>
          <span @click="handleTagClick('爱情')">#爱情</span>
          <span @click="handleTagClick('科幻')">#科幻</span>
          <span @click="handleTagClick('喜剧')">#喜剧</span>
        </div>
      </div>
    </section>

    <!-- 精选剧本 - 好莱坞海报风格 -->
    <section class="section scripts-section">
      <div class="section-header">
        <h2 class="section-title">🎬 精选剧本</h2>
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
            
            <div class="poster-overlay">
              <span class="poster-genre">{{ script.genre }}</span>
            </div>
            
            <div class="poster-info">
              <h3>{{ script.title }}</h3>
              <div class="poster-divider"></div>
              <p class="director">{{ script.director }}</p>
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

    <!-- 三大专区 -->
    <section class="section zones-section">
      <h2 class="section-title">🎭 专区分类</h2>
      <div class="zones-grid">
        <router-link to="/zone/global" class="zone-card">
          <div class="zone-bg zone-global"></div>
          <div class="zone-content">
            <span class="zone-icon">🌍</span>
            <h3>海外专区</h3>
            <p>全球视野 · 国际故事</p>
            <span class="zone-tag">点击查看 →</span>
          </div>
        </router-link>
        
        <router-link to="/zone/culture" class="zone-card">
          <div class="zone-bg zone-culture"></div>
          <div class="zone-content">
            <span class="zone-icon">🏛️</span>
            <h3>文旅专区</h3>
            <p>山河之美 · 人文之旅</p>
            <span class="zone-tag">点击查看 →</span>
          </div>
        </router-link>
        
        <router-link to="/zone/heritage" class="zone-card">
          <div class="zone-bg zone-heritage"></div>
          <div class="zone-content">
            <span class="zone-icon">🎭</span>
            <h3>非遗专区</h3>
            <p>传统匠心 · 文化传承</p>
            <span class="zone-tag">点击查看 →</span>
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
          <span class="stat-label">创作者收益</span>
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

const searchQuery = ref('')

const scripts = ref([
  {
    id: '1',
    title: '绣娘传',
    director: '李文秀 作品',
    genre: '非遗',
    price: 399,
    rating: 4.9,
    sales: 186,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20traditional%20embroidery%20master%20elegant%20woman%20in%20purple%20silk%20dramatic%20lighting%20Hollywood%20movie%20poster%20style&image_size=portrait_4_3'
  },
  {
    id: '2',
    title: '京剧大师',
    director: '王德明 作品',
    genre: '非遗',
    price: 499,
    rating: 4.8,
    sales: 142,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Peking%20Opera%20performer%20red%20gold%20face%20paint%20traditional%20costume%20epic%20lighting%20Hollywood%20movie%20poster&image_size=portrait_4_3'
  },
  {
    id: '3',
    title: '唐人街往事',
    director: '陈建国 作品',
    genre: '海外',
    price: 349,
    rating: 4.7,
    sales: 234,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=New%20York%20Chinatown%20neon%20lights%20rainy%20night%201980s%20style%20Hollywood%20movie%20poster%20cinematic&image_size=portrait_4_3'
  },
  {
    id: '4',
    title: '东京物语',
    director: '佐藤健 作品',
    genre: '海外',
    price: 329,
    rating: 4.6,
    sales: 198,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Tokyo%20night%20neon%20lights%20fashionable%20woman%20silhouette%20blue%20lighting%20cyberpunk%20movie%20poster&image_size=portrait_4_3'
  },
  {
    id: '5',
    title: '西湖·千年情',
    director: '张晓月 作品',
    genre: '文旅',
    price: 369,
    rating: 4.9,
    sales: 267,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=West%20Lake%20China%20elegant%20woman%20traditional%20costume%20lotus%20water%20mist%20romantic%20movie%20poster&image_size=portrait_4_3'
  },
  {
    id: '6',
    title: '敦煌飞天',
    director: '赵艺术 作品',
    genre: '文旅',
    price: 459,
    rating: 4.9,
    sales: 189,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Dunhuang%20flying%20apsaras%20goddess%20golden%20silk%20mural%20epic%20movie%20poster%20Chinese%20traditional&image_size=portrait_4_3'
  },
  {
    id: '7',
    title: '星河彼岸',
    director: '刘星河 作品',
    genre: '科幻',
    price: 449,
    rating: 4.8,
    sales: 156,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Spaceship%20galaxy%20alien%20planet%20sci-fi%20epic%20movie%20poster%20cosmic%20stars%20dramatic%20lighting&image_size=portrait_4_3'
  },
  {
    id: '8',
    title: '暗夜追踪',
    director: '周推理 作品',
    genre: '悬疑',
    price: 399,
    rating: 4.7,
    sales: 212,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Detective%20dark%20silhouette%20rainy%20night%20mysterious%20shadows%20noir%20movie%20poster%20Hollywood%20style&image_size=portrait_4_3'
  }
])

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    window.location.href = `/scripts?q=${encodeURIComponent(searchQuery.value)}`
  }
}

const handleTagClick = (tag: string) => {
  window.location.href = `/scripts?genre=${encodeURIComponent(tag)}`
}
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  background: #0a0a0a;
}

/* 主视觉区 */
.hero-section {
  background: linear-gradient(180deg, #1f2937 0%, #0f0f0f 100%);
  padding: 80px 24px 60px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 50% 50%, rgba(220, 38, 38, 0.15) 0%, transparent 60%);
  pointer-events: none;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: 52px;
  font-weight: 800;
  background: linear-gradient(135deg, #dc2626 0%, #ff6b6b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 16px;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: 20px;
  color: #9ca3af;
  margin-bottom: 40px;
}

.hero-search {
  display: flex;
  max-width: 600px;
  margin: 0 auto 24px;
  background: #1f2937;
  border: 1px solid #374151;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(220, 38, 38, 0.2);
}

.search-input {
  flex: 1;
  padding: 16px 24px;
  border: none;
  font-size: 16px;
  outline: none;
  background: transparent;
  color: white;
}

.search-btn {
  padding: 16px 32px;
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  color: #ffffff;
  border: none;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.search-btn:hover {
  background: linear-gradient(135deg, #b91c1c 0%, #dc2626 100%);
}

.hero-tags {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.hero-tags span {
  color: #dc2626;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
}

.hero-tags span:hover {
  color: #ff6b6b;
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
  color: white;
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
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  transition: transform 0.3s;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
  background: #1f2937;
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
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.2) 30%,
    rgba(0, 0, 0, 0.6) 70%,
    rgba(0, 0, 0, 0.9) 100%
  );
  z-index: 1;
}

.script-card:hover .script-poster {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 16px 48px rgba(220, 38, 38, 0.4);
}

.poster-overlay {
  position: absolute;
  top: 16px;
  left: 16px;
  right: 16px;
  z-index: 2;
}

.poster-genre {
  background: linear-gradient(135deg, rgba(220, 38, 38, 0.95), rgba(185, 28, 28, 0.95));
  color: white;
  padding: 4px 12px;
  font-size: 11px;
  font-weight: 700;
  border-radius: 2px;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 2px 8px rgba(220, 38, 38, 0.4);
}

.poster-info {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  text-align: center;
  color: white;
  width: 90%;
}

.poster-info h3 {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 8px;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.8);
  letter-spacing: 2px;
  line-height: 1.3;
}

.poster-divider {
  width: 40px;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(220, 38, 38, 0.8), transparent);
  margin: 12px auto;
}

.director {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  letter-spacing: 1px;
}

.poster-bottom {
  position: absolute;
  bottom: 16px;
  left: 16px;
  right: 16px;
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

/* 专区 */
.zones-section {
  background: #1f2937;
}

.zones-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 32px;
}

.zone-card {
  position: relative;
  height: 240px;
  border-radius: 4px;
  overflow: hidden;
  text-decoration: none;
  transition: transform 0.3s;
}

.zone-card:hover {
  transform: translateY(-8px);
}

.zone-bg {
  position: absolute;
  inset: 0;
  transition: transform 0.4s;
}

.zone-card:hover .zone-bg {
  transform: scale(1.1);
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
  padding: 20px;
}

.zone-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.zone-content h3 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
}

.zone-content p {
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 16px;
}

.zone-tag {
  font-size: 13px;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.2);
  padding: 6px 16px;
  border-radius: 2px;
  transition: background 0.3s;
}

.zone-card:hover .zone-tag {
  background: rgba(255, 255, 255, 0.3);
}

/* 数据统计 */
.stats-bar {
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  padding: 48px 24px;
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
  font-size: 36px;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 4px;
  letter-spacing: -0.02em;
}

.stat-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.95);
  font-weight: 500;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.3);
}

/* 底部 */
.footer {
  background: #1f2937;
  border-top: 1px solid #374151;
  padding: 32px 24px;
  text-align: center;
}

.footer-content p {
  color: #9ca3af;
  font-size: 14px;
}

/* 响应式 */
@media (max-width: 1024px) {
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
  
  .hero-subtitle {
    font-size: 16px;
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
  
  .poster-info h3 {
    font-size: 18px;
  }
  
  .stat-value {
    font-size: 28px;
  }
}
</style>
