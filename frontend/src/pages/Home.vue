<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">短剧创作平台</h1>
        <p class="hero-subtitle">用AI赋能创作，让每一个灵感都绽放</p>
        <div class="hero-buttons">
          <router-link to="/workspace">
            <button class="btn btn-primary">开始创作</button>
          </router-link>
          <router-link to="/marketplace">
            <button class="btn btn-secondary">探索市场</button>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Featured Scripts -->
    <section class="section">
      <div class="section-header">
        <h2 class="section-title">精选剧本</h2>
        <router-link to="/scripts" class="see-all">查看全部 →</router-link>
      </div>
      <div class="script-grid">
        <router-link
          v-for="script in featuredScripts"
          :key="script.id"
          :to="`/scripts/${script.id}`"
          class="script-card glow-hover"
        >
          <div class="script-image">
            <div class="placeholder-image" :style="{ background: script.color }"></div>
          </div>
          <div class="script-info">
            <div class="script-theme">{{ script.theme }}</div>
            <h3 class="script-title">{{ script.title }}</h3>
            <div class="script-meta">
              <span class="script-views">{{ script.views }} 浏览</span>
              <span class="script-price">¥{{ script.price }}</span>
            </div>
          </div>
        </router-link>
      </div>
    </section>

    <!-- Three Zones -->
    <section class="section bg-gray">
      <div class="section-header">
        <h2 class="section-title">三大专区</h2>
      </div>
      <div class="zone-grid">
        <router-link to="/zone/global" class="zone-card">
          <div class="zone-icon">🌍</div>
          <h3>海外专区</h3>
          <p>全球剧本，创意无界</p>
        </router-link>
        <router-link to="/zone/culture" class="zone-card">
          <div class="zone-icon">🏛️</div>
          <h3>文旅专区</h3>
          <p>文化旅行，精彩故事</p>
        </router-link>
        <router-link to="/zone/heritage" class="zone-card">
          <div class="zone-icon">🎭</div>
          <h3>非遗专区</h3>
          <p>传统工艺，匠心传承</p>
        </router-link>
      </div>
    </section>

    <!-- Quick Access -->
    <section class="section">
      <div class="section-header">
        <h2 class="section-title">快速入口</h2>
      </div>
      <div class="quick-grid">
        <router-link to="/workspace" class="quick-card">
          <div class="quick-icon">✏️</div>
          <div class="quick-content">
            <h4>创作中心</h4>
            <p>开启你的创作之旅</p>
          </div>
        </router-link>
        <router-link to="/marketplace" class="quick-card">
          <div class="quick-icon">🛒</div>
          <div class="quick-content">
            <h4>剧本市场</h4>
            <p>发现优质剧本</p>
          </div>
        </router-link>
        <router-link to="/community" class="quick-card">
          <div class="quick-icon">👥</div>
          <div class="quick-content">
            <h4>社区交流</h4>
            <p>与创作者对话</p>
          </div>
        </router-link>
        <router-link to="/templates" class="quick-card">
          <div class="quick-icon">📋</div>
          <div class="quick-content">
            <h4>创作模板</h4>
            <p>专业模板助力创作</p>
          </div>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const featuredScripts = ref([
  {
    id: '1',
    title: '绣娘传',
    theme: '非遗',
    price: 399,
    views: 1856,
    color: 'linear-gradient(135deg, #9b5de5 0%, #f15bb5 100%)'
  },
  {
    id: '2',
    title: '京剧大师',
    theme: '非遗',
    price: 499,
    views: 2141,
    color: 'linear-gradient(135deg, #d62828 0%, #f77f00 100%)'
  },
  {
    id: '3',
    title: '景德镇瓷',
    theme: '非遗',
    price: 449,
    views: 1676,
    color: 'linear-gradient(135deg, #023e8a 0%, #0077b6 100%)'
  },
  {
    id: '4',
    title: '少林功夫',
    theme: '非遗',
    price: 599,
    views: 3241,
    color: 'linear-gradient(135deg, #e07b39 0%, #fb8500 100%)'
  },
  {
    id: '5',
    title: '唐人街往事',
    theme: '海外',
    price: 349,
    views: 2356,
    color: 'linear-gradient(135deg, #1d3557 0%, #457b9d 100%)'
  },
  {
    id: '6',
    title: '东京物语',
    theme: '海外',
    price: 329,
    views: 1923,
    color: 'linear-gradient(135deg, #000814 0%, #001d3d 100%)'
  },
  {
    id: '7',
    title: '巴黎之恋',
    theme: '海外',
    price: 379,
    views: 2456,
    color: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
  },
  {
    id: '8',
    title: '新加坡梦',
    theme: '海外',
    price: 299,
    views: 1789,
    color: 'linear-gradient(135deg, #14213d 0%, #0f3460 100%)'
  },
  {
    id: '9',
    title: '西湖·千年情',
    theme: '文旅',
    price: 369,
    views: 2621,
    color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
  },
  {
    id: '10',
    title: '长安十二时辰',
    theme: '文旅',
    price: 499,
    views: 3145,
    color: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
  },
  {
    id: '11',
    title: '丽江古城',
    theme: '文旅',
    price: 349,
    views: 1987,
    color: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
  },
  {
    id: '12',
    title: '敦煌飞天',
    theme: '文旅',
    price: 459,
    views: 2876,
    color: 'linear-gradient(135deg, #d4a574 0%, #8b6f47 100%)'
  },
  {
    id: '13',
    title: '野孩子',
    theme: '现代都市',
    price: 299,
    views: 1256,
    color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    id: '14',
    title: '暗夜追踪',
    theme: '悬疑犯罪',
    price: 399,
    views: 2341,
    color: 'linear-gradient(135deg, #1a1a1a 0%, #3a3a3a 100%)'
  },
  {
    id: '15',
    title: '星河彼岸',
    theme: '科幻',
    price: 449,
    views: 1876,
    color: 'linear-gradient(135deg, #0f0c29 0%, #302b63 100%)'
  },
  {
    id: '16',
    title: '乡村教师',
    theme: '温暖',
    price: 199,
    views: 3421,
    color: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)'
  }
])
</script>

<style scoped>
.home-page {
  min-height: 100vh;
}

.hero-section {
  padding: 120px 24px 80px;
  background: linear-gradient(135deg, #fff 0%, #f9f9f9 100%);
  text-align: center;
}

.hero-title {
  font-size: 56px;
  font-weight: 700;
  margin-bottom: 16px;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, var(--primary-red) 0%, var(--primary-red-light) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 20px;
  color: var(--text-secondary);
  margin-bottom: 40px;
}

.hero-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 500;
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  transition: all 0.3s ease;
}

.btn-primary {
  background: var(--primary-red);
  color: #fff;
}

.btn-primary:hover {
  background: var(--primary-red-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-secondary {
  background: #fff;
  color: var(--text-primary);
  border-color: var(--border-color);
}

.btn-secondary:hover {
  border-color: var(--primary-red);
  color: var(--primary-red);
  transform: translateY(-2px);
}

.section {
  padding: 80px 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.bg-gray {
  background: var(--bg-gray);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.section-title {
  font-size: 32px;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.see-all {
  color: var(--primary-red);
  font-size: 14px;
  transition: opacity 0.2s;
}

.see-all:hover {
  opacity: 0.8;
}

.script-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.script-card {
  background: #fff;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--border-light);
  transition: all 0.3s ease;
}

.script-card:hover {
  border-color: var(--border-color);
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.script-image {
  aspect-ratio: 9/16;
  max-height: 400px;
  overflow: hidden;
  position: relative;
}

.placeholder-image {
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.script-card:hover .placeholder-image {
  transform: scale(1.05);
}

.script-info {
  padding: 20px;
}

.script-theme {
  display: inline-block;
  padding: 4px 12px;
  background: rgba(220, 38, 38, 0.08);
  color: var(--primary-red);
  font-size: 12px;
  border-radius: var(--radius-sm);
  margin-bottom: 12px;
}

.script-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--text-primary);
}

.script-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.script-views {
  color: var(--text-tertiary);
}

.script-price {
  color: var(--primary-red);
  font-weight: 600;
  font-size: 18px;
}

.zone-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.zone-card {
  background: #fff;
  padding: 48px 32px;
  border-radius: var(--radius-md);
  text-align: center;
  border: 1px solid var(--border-light);
  transition: all 0.3s ease;
}

.zone-card:hover {
  border-color: var(--primary-red);
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.zone-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.zone-card h3 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--text-primary);
}

.zone-card p {
  color: var(--text-secondary);
  font-size: 14px;
}

.quick-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.quick-card {
  background: #fff;
  padding: 32px 24px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-light);
  display: flex;
  gap: 16px;
  transition: all 0.3s ease;
}

.quick-card:hover {
  border-color: var(--primary-red);
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.quick-icon {
  font-size: 32px;
  flex-shrink: 0;
}

.quick-content h4 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
  color: var(--text-primary);
}

.quick-content p {
  font-size: 13px;
  color: var(--text-secondary);
}

@media (max-width: 1024px) {
  .script-grid,
  .zone-grid,
  .quick-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .hero-title {
    font-size: 36px;
  }
  .hero-subtitle {
    font-size: 16px;
  }
  .script-grid,
  .zone-grid,
  .quick-grid {
    grid-template-columns: 1fr;
  }
}
</style>
