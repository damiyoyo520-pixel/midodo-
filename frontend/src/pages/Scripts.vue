<template>
  <div class="scripts-page">
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">剧本市场</h1>
        <p class="page-subtitle">发现精彩短剧剧本，开启您的创作之旅</p>
      </div>
    </div>

    <!-- 筛选栏 -->
    <div class="filter-bar">
      <div class="filter-left">
        <span class="filter-label">分类：</span>
        <button 
          v-for="genre in genres" 
          :key="genre"
          class="filter-btn"
          :class="{ active: selectedGenre === genre }"
          @click="selectedGenre = genre"
        >
          {{ genre }}
        </button>
      </div>
      <div class="filter-right">
        <span class="filter-label">排序：</span>
        <select v-model="sortBy" class="sort-select">
          <option value="price">价格</option>
          <option value="views">浏览量</option>
          <option value="rating">评分</option>
        </select>
      </div>
    </div>

    <!-- 剧本网格 -->
    <div class="scripts-grid">
      <router-link 
        v-for="script in displayedScripts" 
        :key="script.id"
        :to="`/scripts/${script.id}`"
        class="script-card"
      >
        <div class="script-poster">
          <img :src="script.poster" :alt="script.title" class="poster-image" />
          <div class="poster-overlay"></div>
          
          <div class="poster-top">
            <span class="genre-tag">{{ script.genre }}</span>
          </div>
          
          <div class="poster-center">
            <h3 class="script-title">{{ script.title }}</h3>
            <div class="poster-divider"></div>
            <p class="script-author">{{ script.author }}</p>
          </div>
          
          <div class="poster-bottom">
            <div class="poster-meta">
              <span class="rating">⭐ {{ script.rating }}</span>
              <span class="price">¥{{ script.price }}</span>
            </div>
          </div>
        </div>
        
        <div class="script-info">
          <p class="script-description">{{ script.description }}</p>
          <div class="script-stats">
            <span>👁️ {{ script.views }}</span>
            <span>📊 {{ script.episodes }}集</span>
            <span>⏱️ {{ script.duration }}分钟</span>
          </div>
        </div>
      </router-link>
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>正在加载剧本...</p>
    </div>

    <!-- 空状态 -->
    <div v-else-if="displayedScripts.length === 0" class="empty-state">
      <div class="empty-icon">🎬</div>
      <p class="empty-title">暂无剧本</p>
      <p class="empty-desc">该分类下暂时没有剧本，敬请期待</p>
    </div>

    <!-- 分页 -->
    <div class="pagination">
      <button class="page-btn" :disabled="currentPage === 1" @click="currentPage--">
        上一页
      </button>
      <span class="page-info">第 {{ currentPage }} / {{ totalPages }} 页</span>
      <button class="page-btn" :disabled="currentPage === totalPages" @click="currentPage++">
        下一页
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

interface Script {
  id: number;
  title: string;
  author: string;
  genre: string;
  description: string;
  price: number;
  rating: number;
  views: number;
  episodes: number;
  duration: number;
  poster: string;
}

const loading = ref(true);
const selectedGenre = ref('全部');
const sortBy = ref('price');
const currentPage = ref(1);
const pageSize = 12;

const genres = ['全部', '古装', '都市', '悬疑', '爱情', '喜剧', '科幻', '非遗', '文旅'];

// 从后端获取数据
const allScripts = ref<Script[]>([]);

// 默认数据（API不可用时显示）
const fallbackScripts: Script[] = [
  { id: 1, title: '绣娘传', author: '李文秀 作品', genre: '非遗', description: '讲述中国传统刺绣艺术传承的感人故事', price: 399, rating: 4.9, views: 12800, episodes: 24, duration: 5, poster: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop' },
  { id: 2, title: '唐人街往事', author: '陈建国 作品', genre: '都市', description: '纽约唐人街的时代变迁与华人奋斗史', price: 299, rating: 4.7, views: 15200, episodes: 20, duration: 6, poster: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=400&h=600&fit=crop' },
  { id: 3, title: '西湖·千年情', author: '张晓月 作品', genre: '文旅', description: '杭州西湖的千年浪漫传说', price: 369, rating: 4.8, views: 20800, episodes: 22, duration: 5, poster: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=400&h=600&fit=crop' },
  { id: 4, title: '暗夜追踪', author: '周推理 作品', genre: '悬疑', description: '连环案件的真相追踪，扣人心弦', price: 449, rating: 4.9, views: 28600, episodes: 28, duration: 7, poster: 'https://images.unsplash.com/photo-1504198266287-1659872e6590?w=400&h=600&fit=crop' },
  { id: 5, title: '星河彼岸', author: '刘星河 作品', genre: '科幻', description: '星际冒险与未知文明的邂逅', price: 499, rating: 4.8, views: 18400, episodes: 30, duration: 6, poster: 'https://images.unsplash.com/photo-1446772187255-366fd3faf24f?w=400&h=600&fit=crop' },
  { id: 6, title: '京华烟云', author: '王丹青 作品', genre: '古装', description: '老北京的时代风情与爱恨情仇', price: 389, rating: 4.7, views: 15800, episodes: 24, duration: 5, poster: 'https://images.unsplash.com/photo-1552083974-dafa599cd256?w=400&h=600&fit=crop' },
  { id: 7, title: '都市奇缘', author: '林晓风 作品', genre: '爱情', description: '现代都市中的浪漫邂逅', price: 329, rating: 4.6, views: 22400, episodes: 20, duration: 5, poster: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop' },
  { id: 8, title: '敦煌飞天', author: '赵艺术 作品', genre: '文旅', description: '敦煌壁画中的千年飞天传说', price: 459, rating: 4.9, views: 16800, episodes: 26, duration: 6, poster: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop' },
  { id: 9, title: '东京物语', author: '佐藤健 作品', genre: '都市', description: '东京夜晚的霓虹与人心', price: 329, rating: 4.6, views: 19200, episodes: 18, duration: 5, poster: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=600&fit=crop' },
  { id: 10, title: '京剧大师', author: '王德明 作品', genre: '非遗', description: '一代京剧大师的艺术人生', price: 499, rating: 4.9, views: 14200, episodes: 24, duration: 6, poster: 'https://images.unsplash.com/photo-1551632436-c5feb1d4e6b6?w=400&h=600&fit=crop' },
  { id: 11, title: '龙门客栈', author: '陈江湖 作品', genre: '古装', description: '江湖儿女的恩怨情仇', price: 379, rating: 4.7, views: 21600, episodes: 22, duration: 6, poster: 'https://images.unsplash.com/photo-1519817914152-22d216bb9170?w=400&h=600&fit=crop' },
  { id: 12, title: '都市欢笑', author: '李喜剧 作品', genre: '喜剧', description: '现代都市中的爆笑日常', price: 299, rating: 4.5, views: 16800, episodes: 20, duration: 5, poster: 'https://images.unsplash.com/photo-1492684223066-6a04ab1061e4?w=400&h=600&fit=crop' }
];

onMounted(async () => {
  try {
    // 尝试从后端 API 获取数据
    const response = await fetch('http://localhost:9000/api/scripts', {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.success && data.data && data.data.scripts) {
        allScripts.value = data.data.scripts.map((script: any) => ({
          id: script.id,
          title: script.title,
          author: script.author || '匿名',
          genre: script.genre || '其他',
          description: script.description || '',
          price: script.price || 299,
          rating: script.rating || 4.5,
          views: script.views || 1000,
          episodes: script.episodes || 20,
          duration: script.duration || 5,
          poster: script.poster || script.image || 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=400&h=600&fit=crop'
        }));
      } else {
        allScripts.value = fallbackScripts;
      }
    } else {
      allScripts.value = fallbackScripts;
    }
  } catch (error) {
    console.log('使用默认数据');
    allScripts.value = fallbackScripts;
  } finally {
    loading.value = false;
  }
});

// 筛选和排序
const displayedScripts = computed(() => {
  let scripts = [...allScripts.value];
  
  // 按分类筛选
  if (selectedGenre.value !== '全部') {
    scripts = scripts.filter(s => s.genre === selectedGenre.value);
  }
  
  // 排序
  if (sortBy.value === 'price') {
    scripts.sort((a, b) => a.price - b.price);
  } else if (sortBy.value === 'views') {
    scripts.sort((a, b) => b.views - a.views);
  } else if (sortBy.value === 'rating') {
    scripts.sort((a, b) => b.rating - a.rating);
  }
  
  // 分页
  const start = (currentPage.value - 1) * pageSize;
  return scripts.slice(start, start + pageSize);
});

const totalPages = computed(() => {
  let scripts = [...allScripts.value];
  if (selectedGenre.value !== '全部') {
    scripts = scripts.filter(s => s.genre === selectedGenre.value);
  }
  return Math.ceil(scripts.length / pageSize) || 1;
});
</script>

<style scoped>
.scripts-page {
  min-height: 100vh;
  background: #0a0a0a;
  padding: 0 0 48px;
}

/* 页面头部 */
.page-header {
  background: linear-gradient(180deg, #1f2937 0%, #0f0f0f 100%);
  padding: 60px 24px;
  position: relative;
  overflow: hidden;
}

.page-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 50% 50%, rgba(220, 38, 38, 0.15) 0%, transparent 60%);
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
}

.page-title {
  font-size: 48px;
  font-weight: 800;
  margin: 0 0 12px 0;
  background: linear-gradient(135deg, #dc2626 0%, #ff6b6b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  font-size: 18px;
  color: #9ca3af;
  margin: 0;
}

/* 筛选栏 */
.filter-bar {
  max-width: 1400px;
  margin: 0 auto;
  padding: 32px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.filter-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.filter-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.filter-label {
  color: #9ca3af;
  font-size: 14px;
  font-weight: 500;
}

.filter-btn {
  padding: 8px 16px;
  background: #1f2937;
  border: 1px solid #374151;
  color: #9ca3af;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn:hover {
  background: rgba(220, 38, 38, 0.1);
  border-color: rgba(220, 38, 38, 0.3);
  color: white;
}

.filter-btn.active {
  background: linear-gradient(135deg, rgba(220, 38, 38, 0.2), rgba(185, 28, 28, 0.2));
  border-color: #dc2626;
  color: white;
}

.sort-select {
  padding: 8px 16px;
  background: #1f2937;
  border: 1px solid #374151;
  color: white;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  outline: none;
}

.sort-select:focus {
  border-color: #dc2626;
}

/* 剧本网格 */
.scripts-grid {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
}

.script-card {
  text-decoration: none;
  transition: transform 0.3s;
  display: block;
}

.script-card:hover {
  transform: translateY(-8px);
}

.script-poster {
  aspect-ratio: 2/3;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
  margin-bottom: 16px;
  background: #1f2937;
}

.script-card:hover .script-poster {
  box-shadow: 0 16px 48px rgba(220, 38, 38, 0.3);
}

.poster-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s;
}

.script-card:hover .poster-image {
  transform: scale(1.05);
}

.poster-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.3) 0%,
    transparent 30%,
    transparent 60%,
    rgba(0, 0, 0, 0.9) 100%
  );
  z-index: 1;
}

.poster-top {
  position: absolute;
  top: 16px;
  left: 16px;
  right: 16px;
  z-index: 2;
}

.genre-tag {
  background: linear-gradient(135deg, rgba(220, 38, 38, 0.9), rgba(185, 28, 28, 0.9));
  color: white;
  padding: 4px 12px;
  font-size: 11px;
  font-weight: 700;
  border-radius: 2px;
  letter-spacing: 1px;
  box-shadow: 0 2px 8px rgba(220, 38, 38, 0.4);
}

.poster-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  text-align: center;
  width: 90%;
}

.script-title {
  font-size: 20px;
  font-weight: 800;
  color: white;
  margin: 0 0 8px 0;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.8);
  letter-spacing: 1px;
  line-height: 1.3;
}

.poster-divider {
  width: 30px;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(220, 38, 38, 0.8), transparent);
  margin: 8px auto;
}

.script-author {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  font-weight: 500;
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
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.rating {
  color: #fbbf24;
  font-size: 14px;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.price {
  color: white;
  font-size: 16px;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

/* 剧本信息 */
.script-info {
  padding: 0 4px;
}

.script-description {
  color: #9ca3af;
  font-size: 13px;
  line-height: 1.6;
  margin: 0 0 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.script-stats {
  display: flex;
  gap: 12px;
  color: #6b7280;
  font-size: 12px;
}

/* 加载状态 */
.loading-state {
  max-width: 1400px;
  margin: 0 auto;
  padding: 80px 24px;
  text-align: center;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 3px solid #374151;
  border-top-color: #dc2626;
  border-radius: 50%;
  margin: 0 auto 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-state p {
  color: #9ca3af;
  font-size: 16px;
  margin: 0;
}

/* 空状态 */
.empty-state {
  max-width: 1400px;
  margin: 0 auto;
  padding: 80px 24px;
  text-align: center;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 20px;
}

.empty-title {
  font-size: 24px;
  font-weight: 700;
  color: white;
  margin: 0 0 12px 0;
}

.empty-desc {
  color: #9ca3af;
  font-size: 16px;
  margin: 0;
}

/* 分页 */
.pagination {
  max-width: 1400px;
  margin: 48px auto 0;
  padding: 0 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
}

.page-btn {
  padding: 10px 20px;
  background: #1f2937;
  border: 1px solid #374151;
  color: white;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.page-btn:hover:not(:disabled) {
  background: rgba(220, 38, 38, 0.1);
  border-color: rgba(220, 38, 38, 0.3);
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  color: #9ca3af;
  font-size: 14px;
}

/* 响应式 */
@media (max-width: 640px) {
  .page-title {
    font-size: 32px;
  }
  
  .page-subtitle {
    font-size: 14px;
  }
  
  .scripts-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    padding: 0 16px;
  }
  
  .script-title {
    font-size: 16px;
  }
  
  .filter-bar {
    padding: 24px 16px;
  }
}
</style>
