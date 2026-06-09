<template>
  <div class="detail-page">
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

    <!-- 剧本详情 -->
    <section class="detail-section">
      <div class="detail-container">
        <!-- 左侧海报 -->
        <div class="poster-wrapper">
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
                <span class="poster-sales">{{ script.sales }}人购买</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧信息 -->
        <div class="info-wrapper">
          <div class="script-info">
            <h1 class="script-title">{{ script.title }}</h1>
            <p class="script-director">导演：{{ script.director }}</p>
            
            <div class="script-stats">
              <div class="stat-item">
                <span class="stat-value">{{ script.wordCount }}</span>
                <span class="stat-label">字数</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">{{ script.views }}</span>
                <span class="stat-label">浏览</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">{{ script.rating }}</span>
                <span class="stat-label">评分</span>
              </div>
            </div>

            <div class="script-tags">
              <span v-for="tag in script.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>

            <div class="script-description">
              <h3>剧本简介</h3>
              <p>{{ script.description }}</p>
            </div>

            <div class="script-price-section">
              <div class="price-info">
                <span class="price-label">授权价格</span>
                <span class="price-value">¥{{ script.price }}</span>
                <span class="price-unit">独家授权</span>
              </div>
            </div>

            <div class="action-buttons">
              <router-link :to="`/order/confirm/${script.id}`" class="btn-primary">
                立即购买
              </router-link>
              <button class="btn-secondary" @click="handleFavorite">
                ❤️ 收藏
              </button>
            </div>

            <div class="script-guarantee">
              <div class="guarantee-item">
                <span>🛡️</span>
                <span>资金托管</span>
              </div>
              <div class="guarantee-item">
                <span>📱</span>
                <span>即时交付</span>
              </div>
              <div class="guarantee-item">
                <span>📜</span>
                <span>版权保护</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 剧本大纲 -->
    <section class="outline-section">
      <div class="outline-container">
        <h2>剧本大纲</h2>
        <div class="outline-content">
          <p>{{ script.outline }}</p>
        </div>
      </div>
    </section>

    <!-- 相关推荐 -->
    <section class="related-section">
      <div class="related-container">
        <h2>相关推荐</h2>
        <div class="related-grid">
          <router-link 
            v-for="item in relatedScripts" 
            :key="item.id"
            :to="`/scripts/${item.id}`"
            class="related-card"
          >
            <div class="related-poster">
              <img :src="item.image" :alt="item.title" />
              <div class="poster-overlay-bg"></div>
              <span class="poster-price">¥{{ item.price }}</span>
            </div>
            <h4>{{ item.title }}</h4>
          </router-link>
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
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const script = ref({
  id: '1',
  title: '绣娘传',
  director: '李文秀',
  genre: '非遗',
  price: 399,
  rating: 4.9,
  sales: 186,
  views: 2356,
  wordCount: '32,000',
  tags: ['非遗传承', '女性励志', '传统文化'],
  description: '本剧讲述了一位中国传统刺绣大师的人生传奇。她从小学艺，凭借精湛的刺绣技艺，在传统工艺逐渐式微的时代，坚持传承，最终将中国刺绣推向世界舞台。故事展现了中国女性的坚韧与智慧，以及传统工艺的独特魅力。',
  outline: '第一章：少女学艺\n主人公阿秀出生在江南刺绣世家，从小跟随祖母学习刺绣技艺。她天资聪颖，勤奋好学，很快便掌握了家族传承的绝技。\n\n第二章：坚守传承\n随着时代发展，传统刺绣逐渐被机器刺绣取代。许多同行纷纷转行，但阿秀坚持留守，用心守护这门古老的手艺。她开设刺绣工作室，培养新一代传承人。\n\n第三章：走向世界\n阿秀的刺绣作品在国际工艺展览上获得金奖，震惊世界。她受邀到各国进行文化交流，将中国刺绣推向世界舞台，成为非遗传承的典范。',
  image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20traditional%20embroidery%20master%20elegant%20woman%20in%20purple%20silk%20dramatic%20lighting%20Hollywood%20movie%20poster%20style&image_size=portrait_4_3'
})

const relatedScripts = ref([
  {
    id: '2',
    title: '京剧大师',
    price: 499,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Peking%20Opera%20performer%20red%20gold%20face%20paint%20traditional%20costume%20epic%20lighting%20Hollywood%20movie%20poster&image_size=portrait_4_3'
  },
  {
    id: '3',
    title: '唐人街往事',
    price: 349,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=New%20York%20Chinatown%20neon%20lights%20rainy%20night%201980s%20style%20Hollywood%20movie%20poster%20cinematic&image_size=portrait_4_3'
  },
  {
    id: '5',
    title: '西湖·千年情',
    price: 369,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=West%20Lake%20China%20elegant%20woman%20traditional%20costume%20lotus%20water%20mist%20romantic%20movie%20poster&image_size=portrait_4_3'
  },
  {
    id: '6',
    title: '敦煌飞天',
    price: 459,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Dunhuang%20flying%20apsaras%20goddess%20golden%20silk%20mural%20epic%20movie%20poster%20Chinese%20traditional&image_size=portrait_4_3'
  }
])

const handleFavorite = () => {
  alert('已添加到收藏')
}

onMounted(() => {
  const id = route.params.id
  // 根据ID加载不同剧本数据
  if (id === '2') {
    script.value = {
      id: '2',
      title: '京剧大师',
      director: '王德明',
      genre: '非遗',
      price: 499,
      rating: 4.8,
      sales: 142,
      views: 1892,
      wordCount: '35,000',
      tags: ['京剧艺术', '传承创新', '梨园情怀'],
      description: '本剧以京剧艺术为主题，讲述了一位京剧表演艺术家的人生历程。他从小学戏，经历了京剧的辉煌与低谷，始终坚守艺术初心，最终成为一代京剧大师。',
      outline: '第一幕：学戏生涯\n主人公小生自幼酷爱京剧，在戏班学艺，经历了严苛的训练，打下了扎实的功底。\n\n第二幕：艺术巅峰\n他的表演艺术日臻成熟，在舞台上塑造了众多经典角色，赢得了观众的喜爱。\n\n第三幕：传承使命\n面对京剧的式微，他投身教育，培养新一代京剧人才，让这门艺术薪火相传。',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Peking%20Opera%20performer%20red%20gold%20face%20paint%20traditional%20costume%20epic%20lighting%20Hollywood%20movie%20poster&image_size=portrait_4_3'
    }
  }
})
</script>

<style scoped>
.detail-page {
  min-height: 100vh;
  background: #f9fafb;
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

/* 详情区块 */
.detail-section {
  background: #ffffff;
  padding: 60px 24px;
}

.detail-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 60px;
}

/* 海报 */
.poster-wrapper {
  position: sticky;
  top: 100px;
}

.script-poster {
  aspect-ratio: 2/3;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
}

.poster-image {
  position: absolute;
  top: 0;
  left: 0;
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

.poster-overlay {
  position: absolute;
  top: 16px;
  left: 16px;
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
}

.poster-bottom {
  position: absolute;
  bottom: 16px;
  left: 16px;
  right: 16px;
  z-index: 3;
}

.poster-meta {
  display: flex;
  align-items: center;
  gap: 16px;
}

.poster-rating {
  color: #fbbf24;
  font-size: 14px;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.poster-sales {
  color: #ffffff;
  font-size: 13px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

/* 信息区块 */
.script-info {
  padding: 20px 0;
}

.script-title {
  font-size: 36px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 8px;
}

.script-director {
  font-size: 16px;
  color: #6b7280;
  margin-bottom: 24px;
}

.script-stats {
  display: flex;
  gap: 40px;
  padding: 24px 0;
  border-top: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 24px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #dc2626;
}

.stat-label {
  font-size: 13px;
  color: #9ca3af;
}

.script-tags {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.tag {
  padding: 6px 16px;
  background: #f3f4f6;
  color: #374151;
  font-size: 13px;
  border-radius: 2px;
}

.script-description {
  margin-bottom: 32px;
}

.script-description h3 {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 12px;
}

.script-description p {
  font-size: 15px;
  color: #6b7280;
  line-height: 1.8;
}

.script-price-section {
  padding: 24px;
  background: #fef2f2;
  border-radius: 4px;
  margin-bottom: 24px;
}

.price-info {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.price-label {
  font-size: 14px;
  color: #6b7280;
}

.price-value {
  font-size: 36px;
  font-weight: 700;
  color: #dc2626;
}

.price-unit {
  font-size: 14px;
  color: #dc2626;
  background: #fee;
  padding: 4px 12px;
  border-radius: 2px;
}

.action-buttons {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.btn-primary {
  flex: 1;
  padding: 16px 32px;
  background: #dc2626;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  border-radius: 2px;
  transition: background 0.2s;
}

.btn-primary:hover {
  background: #b91c1c;
}

.btn-secondary {
  padding: 16px 24px;
  background: #ffffff;
  color: #374151;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid #d1d5db;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary:hover {
  border-color: #dc2626;
  color: #dc2626;
}

.script-guarantee {
  display: flex;
  gap: 32px;
}

.guarantee-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #6b7280;
}

/* 大纲区块 */
.outline-section {
  background: #ffffff;
  padding: 60px 24px;
  border-top: 1px solid #e5e7eb;
}

.outline-container {
  max-width: 1200px;
  margin: 0 auto;
}

.outline-container h2 {
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 24px;
}

.outline-content {
  background: #f9fafb;
  padding: 32px;
  border-radius: 4px;
  border: 1px solid #e5e7eb;
}

.outline-content p {
  font-size: 15px;
  color: #4b5563;
  line-height: 2;
  white-space: pre-line;
}

/* 相关推荐 */
.related-section {
  background: #f9fafb;
  padding: 60px 24px;
  border-top: 1px solid #e5e7eb;
}

.related-container {
  max-width: 1200px;
  margin: 0 auto;
}

.related-container h2 {
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 24px;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.related-card {
  text-decoration: none;
}

.related-poster {
  position: relative;
  aspect-ratio: 2/3;
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 12px;
  transition: transform 0.3s;
}

.related-card:hover .related-poster {
  transform: translateY(-4px);
}

.related-poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.related-poster .poster-overlay-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.2) 0%,
    rgba(0, 0, 0, 0.5) 100%
  );
  z-index: 1;
}

.poster-price {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: #dc2626;
  color: #ffffff;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 700;
  border-radius: 1px;
  z-index: 2;
}

.related-card h4 {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
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
  
  .detail-container {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .poster-wrapper {
    position: static;
    max-width: 350px;
    margin: 0 auto;
  }
  
  .related-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .script-title {
    font-size: 28px;
  }
  
  .script-stats {
    gap: 24px;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .script-guarantee {
    flex-wrap: wrap;
    gap: 16px;
  }
}
</style>
