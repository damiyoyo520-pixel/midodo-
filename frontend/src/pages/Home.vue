<template>
  <div class="home-page">
    <!-- 官方比赛横幅 -->
    <div class="competition-banner">
      <div class="banner-content">
        <span class="trophy">🏆</span>
        <span class="banner-text">首届全国短剧创作大赛正式开启！百万奖金池，等你来战！</span>
        <router-link to="/competition" class="banner-button">立即报名</router-link>
      </div>
    </div>

    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">短剧创作交易平台</h1>
        <p class="hero-subtitle">用AI赋能创作，让每一个灵感都绽放 | 连接创作者与市场的一站式服务平台</p>
        
        <!-- 双轨搜索 -->
        <div class="search-container">
          <div class="search-tabs">
            <button 
              :class="['search-tab', { active: searchMode === 'script' }]"
              @click="searchMode = 'script'"
            >
              🔍 搜剧本
            </button>
            <button 
              :class="['search-tab', { active: searchMode === 'demand' }]"
              @click="searchMode = 'demand'"
            >
              📋 搜需求
            </button>
          </div>
          <div class="search-box">
            <input 
              type="text" 
              v-model="searchQuery"
              :placeholder="searchMode === 'script' ? '搜索剧本名称、类型、作者...' : '搜索需求名称、公司、类型...'"
              class="search-input"
            />
            <button class="search-button">
              {{ searchMode === 'script' ? '搜索剧本' : '搜索需求' }}
            </button>
          </div>
          <div class="search-tags">
            <span class="tags-label">热门：</span>
            <button 
              v-for="tag in (searchMode === 'script' ? scriptTags : demandTags)" 
              :key="tag"
              class="tag-button"
              @click="searchQuery = tag"
            >
              {{ tag }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- 数据统计 -->
    <section class="stats-section">
      <div class="stats-container">
        <div class="stat-item">
          <div class="stat-icon">👥</div>
          <div class="stat-info">
            <div class="stat-number">12,847</div>
            <div class="stat-label">注册创作者</div>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-icon">📚</div>
          <div class="stat-info">
            <div class="stat-number">8,392</div>
            <div class="stat-label">上架剧本</div>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-icon">💰</div>
          <div class="stat-info">
            <div class="stat-number">5,621</div>
            <div class="stat-label">完成交易</div>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-icon">🏆</div>
          <div class="stat-info">
            <div class="stat-number">¥2.3M</div>
            <div class="stat-label">平台抽佣</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 精选剧本 -->
    <section class="section featured-scripts">
      <div class="section-header">
        <div class="header-left">
          <h2 class="section-title">🔥 精选剧本</h2>
          <span class="section-badge">HOT</span>
        </div>
        <router-link to="/scripts" class="see-all">查看全部 →</router-link>
      </div>
      <div class="script-grid">
        <router-link
          v-for="(script, index) in featuredScripts"
          :key="script.id"
          :to="`/scripts/${script.id}`"
          :class="['script-card', 'glow-hover', { 'large-card': index === 0 || index === 5 }]"
        >
          <div class="script-image">
            <div class="placeholder-image" :style="{ background: script.color }">
              <span class="poster-label">{{ script.title }}</span>
            </div>
            <div class="script-overlay">
              <span class="script-category">{{ script.category }}</span>
              <span class="script-price">¥{{ script.price }}</span>
            </div>
          </div>
          <div class="script-info">
            <h3 class="script-title">{{ script.title }}</h3>
            <p class="script-author">作者：{{ script.author }}</p>
            <div class="script-meta">
              <span class="meta-item">👁️ {{ script.views }}</span>
              <span class="meta-item">⭐ {{ script.rating }}</span>
            </div>
          </div>
        </router-link>
      </div>
    </section>

    <!-- 三大专区 -->
    <section class="section zones-section bg-gray">
      <div class="section-header">
        <h2 class="section-title">🎯 三大专区</h2>
      </div>
      <div class="zone-grid">
        <router-link to="/zone/global" class="zone-card zone-global">
          <div class="zone-bg"></div>
          <div class="zone-content">
            <div class="zone-icon">🌍</div>
            <h3>海外专区</h3>
            <p>全球剧本，创意无界</p>
            <div class="zone-count">1,234 剧本</div>
          </div>
        </router-link>
        <router-link to="/zone/culture" class="zone-card zone-culture">
          <div class="zone-bg"></div>
          <div class="zone-content">
            <div class="zone-icon">🏛️</div>
            <h3>文旅专区</h3>
            <p>文化旅行，精彩故事</p>
            <div class="zone-count">2,567 剧本</div>
          </div>
        </router-link>
        <router-link to="/zone/heritage" class="zone-card zone-heritage">
          <div class="zone-bg"></div>
          <div class="zone-content">
            <div class="zone-icon">🎭</div>
            <h3>非遗专区</h3>
            <p>传统工艺，匠心传承</p>
            <div class="zone-count">1,891 剧本</div>
          </div>
        </router-link>
      </div>
    </section>

    <!-- 高净值需求 -->
    <section class="section demands-section">
      <div class="section-header">
        <div class="header-left">
          <h2 class="section-title">💼 高净值B端需求</h2>
        </div>
        <router-link to="/marketplace" class="see-all">查看全部需求 →</router-link>
      </div>
      <div class="demand-grid">
        <router-link 
          v-for="demand in highValueDemands" 
          :key="demand.id"
          to="/marketplace"
          class="demand-card"
        >
          <div class="demand-header">
            <h4 class="demand-title">{{ demand.title }}</h4>
            <span v-if="demand.urgent" class="urgent-badge">紧急</span>
          </div>
          <div class="demand-company">
            <span class="company-icon">🏢</span>
            <span class="company-name">{{ demand.company }}</span>
            <span v-if="demand.verified" class="verified-badge">✓ 已认证</span>
          </div>
          <div class="demand-tags">
            <span v-for="tag in demand.tags" :key="tag" class="demand-tag">{{ tag }}</span>
          </div>
          <div class="demand-footer">
            <div class="demand-info">
              <div class="info-item">
                <span class="info-label">预算</span>
                <span class="info-value">{{ demand.budget }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">截止</span>
                <span class="info-value">{{ demand.deadline }}</span>
              </div>
            </div>
            <div class="bid-count">
              <span>👥 {{ demand.bids }}人投标</span>
            </div>
          </div>
        </router-link>
      </div>
    </section>

    <!-- 平台特色 -->
    <section class="section features-section bg-gray">
      <div class="section-header">
        <h2 class="section-title">✨ 平台核心优势</h2>
        <p class="section-subtitle">一站式解决剧本创作、交易、授权全流程</p>
      </div>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">🛡️</div>
          <h3>安全交易</h3>
          <p>资金托管、版权保护、专业法律支持</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">⚡</div>
          <h3>高效创作</h3>
          <p>AI辅助创作、云端协作、模板市场</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">👥</div>
          <h3>分销体系</h3>
          <p>邀请返利、会员折扣、佣金分成</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🎨</div>
          <h3>多元内容</h3>
          <p>非遗传承、海外视野、文旅融合</p>
        </div>
      </div>
    </section>

    <!-- 快速入口 -->
    <section class="section quick-access">
      <div class="section-header">
        <h2 class="section-title">🚀 快速入口</h2>
      </div>
      <div class="quick-grid">
        <router-link to="/workspace" class="quick-card">
          <div class="quick-icon">✏️</div>
          <div class="quick-content">
            <h4>创作中心</h4>
            <p>开启你的创作之旅</p>
          </div>
          <span class="quick-arrow">→</span>
        </router-link>
        <router-link to="/marketplace" class="quick-card">
          <div class="quick-icon">🛒</div>
          <div class="quick-content">
            <h4>剧本市场</h4>
            <p>发现优质剧本</p>
          </div>
          <span class="quick-arrow">→</span>
        </router-link>
        <router-link to="/community" class="quick-card">
          <div class="quick-icon">👥</div>
          <div class="quick-content">
            <h4>社区交流</h4>
            <p>与创作者对话</p>
          </div>
          <span class="quick-arrow">→</span>
        </router-link>
        <router-link to="/templates" class="quick-card">
          <div class="quick-icon">📋</div>
          <div class="quick-content">
            <h4>创作模板</h4>
            <p>专业模板助力创作</p>
          </div>
          <span class="quick-arrow">→</span>
        </router-link>
      </div>
    </section>

    <!-- 用户评价 -->
    <section class="section testimonials-section">
      <div class="section-header">
        <h2 class="section-title">💬 用户评价</h2>
      </div>
      <div class="testimonials-grid">
        <div v-for="testimonial in testimonials" :key="testimonial.id" class="testimonial-card">
          <div class="testimonial-content">
            <p>"{{ testimonial.content }}"</p>
          </div>
          <div class="testimonial-author">
            <div class="author-avatar">{{ testimonial.avatar }}</div>
            <div class="author-info">
              <div class="author-name">{{ testimonial.name }}</div>
              <div class="author-role">{{ testimonial.role }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 合作伙伴 -->
    <section class="partners-section">
      <div class="partners-container">
        <h3 class="partners-title">信任我们的合作伙伴</h3>
        <div class="partners-logos">
          <div v-for="partner in partners" :key="partner" class="partner-logo">
            {{ partner }}
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const searchMode = ref<'script' | 'demand'>('script')
const searchQuery = ref('')

const scriptTags = ['都市情感', '悬疑推理', '古装历史', '科幻冒险', '非遗文化']
const demandTags = ['定制创作', '短视频', '纪录片', '品牌定制', '政府项目']

const featuredScripts = ref([
  {
    id: '1',
    title: '绣娘传',
    theme: '非遗',
    category: '非遗专区',
    author: '李文秀',
    price: 399,
    views: 1856,
    rating: 4.9,
    color: 'linear-gradient(135deg, #9b5de5 0%, #f15bb5 100%)'
  },
  {
    id: '2',
    title: '京剧大师',
    theme: '非遗',
    category: '非遗专区',
    author: '王德明',
    price: 499,
    views: 2141,
    rating: 4.8,
    color: 'linear-gradient(135deg, #d62828 0%, #f77f00 100%)'
  },
  {
    id: '3',
    title: '唐人街往事',
    theme: '海外',
    category: '海外专区',
    author: '陈建国',
    price: 349,
    views: 2356,
    rating: 4.7,
    color: 'linear-gradient(135deg, #1d3557 0%, #457b9d 100%)'
  },
  {
    id: '4',
    title: '西湖·千年情',
    theme: '文旅',
    category: '文旅专区',
    author: '张晓月',
    price: 369,
    views: 2621,
    rating: 4.9,
    color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
  },
  {
    id: '5',
    title: '东京物语',
    theme: '海外',
    category: '海外专区',
    author: '佐藤健',
    price: 329,
    views: 1923,
    rating: 4.6,
    color: 'linear-gradient(135deg, #000814 0%, #001d3d 100%)'
  },
  {
    id: '6',
    title: '敦煌飞天',
    theme: '文旅',
    category: '文旅专区',
    author: '赵艺术',
    price: 459,
    views: 2876,
    rating: 4.9,
    color: 'linear-gradient(135deg, #d4a574 0%, #8b6f47 100%)'
  },
  {
    id: '7',
    title: '星河彼岸',
    theme: '科幻',
    category: '剧本市场',
    author: '刘星河',
    price: 449,
    views: 1876,
    rating: 4.8,
    color: 'linear-gradient(135deg, #0f0c29 0%, #302b63 100%)'
  },
  {
    id: '8',
    title: '乡村教师',
    theme: '温暖',
    category: '剧本市场',
    author: '马云飞',
    price: 199,
    views: 3421,
    rating: 5.0,
    color: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)'
  }
])

const highValueDemands = ref([
  {
    id: '1',
    title: 'MCN机构定制微电影剧本',
    company: '星耀传媒集团',
    budget: '50,000 - 80,000',
    deadline: '15天',
    bids: 23,
    tags: ['微电影', '正能量', '品牌定制'],
    verified: true,
    urgent: true
  },
  {
    id: '2',
    title: '文旅景区宣传片剧本招标',
    company: '杭州西湖文化传媒',
    budget: '30,000 - 50,000',
    deadline: '10天',
    bids: 15,
    tags: ['景区', '宣传', '文化'],
    verified: true,
    urgent: false
  },
  {
    id: '3',
    title: '短视频剧情脚本长期合作',
    company: '抖音官方MCN',
    budget: '8,000 - 15,000/集',
    deadline: '长期有效',
    bids: 156,
    tags: ['短视频', '剧情', '长期'],
    verified: true,
    urgent: false
  },
  {
    id: '4',
    title: '非遗传承纪录片剧本',
    company: '国家非遗保护中心',
    budget: '100,000 - 150,000',
    deadline: '30天',
    bids: 8,
    tags: ['非遗', '纪录片', '政府项目'],
    verified: true,
    urgent: true
  }
])

const testimonials = ref([
  {
    id: '1',
    name: '李导',
    role: '知名导演',
    avatar: '🎬',
    content: '这个平台让我发现了许多优秀的原创剧本，节省了大量筛选时间。交易流程也非常安全便捷。'
  },
  {
    id: '2',
    name: '张总',
    role: 'MCN机构负责人',
    avatar: '💼',
    content: '作为创作者，这里提供了丰富的创作工具和模板，大大提升了我们的创作效率。分销体系也很完善。'
  },
  {
    id: '3',
    name: '王编剧',
    role: '职业编剧',
    avatar: '✍️',
    content: '终于有一个专业、规范的剧本交易平台了！版权保护做得很到位，让我可以安心创作。'
  }
])

const partners = ref([
  '爱奇艺', '优酷', '腾讯视频', '芒果TV', '抖音', '快手', 'B站'
])
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  background: var(--bg-gray);
}

/* 比赛横幅 */
.competition-banner {
  background: linear-gradient(90deg, var(--primary-red), var(--primary-red-light), var(--primary-red));
  background-size: 200% 100%;
  animation: gradient-shift 3s ease infinite;
  padding: 12px 24px;
}

@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.banner-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: white;
}

.trophy {
  font-size: 24px;
}

.banner-text {
  font-size: 14px;
  font-weight: 500;
}

.banner-button {
  background: white;
  color: var(--primary-red);
  padding: 6px 16px;
  border-radius: var(--radius-sm);
  font-size: 13px;
  font-weight: 600;
  transition: all 0.3s;
}

.banner-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

/* Hero Section */
.hero-section {
  padding: 80px 24px 60px;
  background: white;
  text-align: center;
}

.hero-content {
  max-width: 900px;
  margin: 0 auto;
}

.hero-title {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 16px;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, var(--primary-red) 0%, var(--primary-red-light) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 18px;
  color: var(--text-secondary);
  margin-bottom: 40px;
  line-height: 1.6;
}

/* 搜索容器 */
.search-container {
  background: var(--bg-gray);
  border-radius: var(--radius-lg);
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
}

.search-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  justify-content: center;
}

.search-tab {
  padding: 8px 24px;
  border-radius: var(--radius-md);
  border: none;
  background: white;
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.search-tab.active {
  background: var(--primary-red);
  color: white;
}

.search-box {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.search-input {
  flex: 1;
  padding: 14px 20px;
  border: 2px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 15px;
  transition: border-color 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-red);
}

.search-button {
  padding: 14px 32px;
  background: var(--primary-red);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
}

.search-button:hover {
  background: var(--primary-red-dark);
}

.search-tags {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
}

.tags-label {
  font-size: 13px;
  color: var(--text-tertiary);
}

.tag-button {
  padding: 4px 12px;
  background: white;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  font-size: 12px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s;
}

.tag-button:hover {
  background: var(--primary-red);
  color: white;
  border-color: var(--primary-red);
}

/* 数据统计 */
.stats-section {
  background: white;
  border-bottom: 1px solid var(--border-light);
  padding: 40px 24px;
}

.stats-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: center;
}

.stat-icon {
  font-size: 36px;
}

.stat-number {
  font-size: 28px;
  font-weight: 700;
  color: var(--primary-red);
}

.stat-label {
  font-size: 14px;
  color: var(--text-secondary);
}

/* Section 通用 */
.section {
  padding: 80px 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.section-title {
  font-size: 32px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--text-primary);
}

.section-badge {
  background: linear-gradient(135deg, #ff6b6b, #ee5a6f);
  color: white;
  padding: 4px 12px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-weight: 600;
}

.section-subtitle {
  color: var(--text-secondary);
  font-size: 16px;
  margin-top: 8px;
}

.see-all {
  color: var(--primary-red);
  font-size: 14px;
  transition: opacity 0.2s;
}

.see-all:hover {
  opacity: 0.8;
}

/* 精选剧本 */
.featured-scripts {
  padding-bottom: 40px;
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

.script-card.large-card {
  grid-column: span 2;
}

.script-card:hover {
  border-color: var(--primary-red);
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.script-image {
  aspect-ratio: 9/16;
  max-height: 400px;
  overflow: hidden;
  position: relative;
}

.large-card .script-image {
  max-height: 500px;
}

.placeholder-image {
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.poster-label {
  font-size: 24px;
  font-weight: 700;
  color: white;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  z-index: 1;
}

.script-card:hover .placeholder-image {
  transform: scale(1.05);
}

.script-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  background: linear-gradient(to bottom, rgba(0,0,0,0.5), transparent);
}

.script-category {
  background: rgba(255,255,255,0.9);
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  font-size: 11px;
  font-weight: 600;
  color: var(--text-primary);
}

.script-price {
  background: var(--primary-red);
  color: white;
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-weight: 700;
}

.script-info {
  padding: 16px;
}

.script-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
  color: var(--text-primary);
}

.script-author {
  font-size: 13px;
  color: var(--text-tertiary);
  margin-bottom: 8px;
}

.script-meta {
  display: flex;
  gap: 12px;
  font-size: 13px;
}

.meta-item {
  color: var(--text-tertiary);
}

/* 三大专区 */
.zones-section {
  border-radius: 0;
  max-width: 100%;
  padding: 80px 24px;
}

.zones-section > .zone-grid,
.zones-section > .section-header {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.zone-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.zone-card {
  position: relative;
  height: 280px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all 0.3s;
}

.zone-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.zone-bg {
  position: absolute;
  inset: 0;
}

.zone-global .zone-bg {
  background: linear-gradient(135deg, #1e3a5f 0%, #0ea5e9 100%);
}

.zone-culture .zone-bg {
  background: linear-gradient(135deg, #92400e 0%, #f59e0b 100%);
}

.zone-heritage .zone-bg {
  background: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%);
}

.zone-content {
  position: relative;
  z-index: 1;
  padding: 32px;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: white;
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
  margin-bottom: auto;
}

.zone-count {
  font-size: 13px;
  opacity: 0.8;
}

/* 需求部分 */
.demands-section {
  padding-top: 40px;
}

.demand-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.demand-card {
  background: white;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  padding: 24px;
  transition: all 0.3s;
}

.demand-card:hover {
  border-color: var(--primary-red);
  box-shadow: var(--shadow-md);
}

.demand-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 12px;
}

.demand-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  flex: 1;
}

.urgent-badge {
  background: #fee2e2;
  color: #dc2626;
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  font-size: 11px;
  font-weight: 600;
}

.demand-company {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.company-icon {
  font-size: 16px;
}

.company-name {
  font-size: 14px;
  color: var(--text-secondary);
}

.verified-badge {
  color: #10b981;
  font-size: 12px;
  font-weight: 500;
}

.demand-tags {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.demand-tag {
  background: var(--bg-gray);
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  color: var(--text-tertiary);
}

.demand-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid var(--border-light);
}

.demand-info {
  display: flex;
  gap: 24px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.info-label {
  font-size: 11px;
  color: var(--text-tertiary);
}

.info-value {
  font-size: 14px;
  font-weight: 600;
  color: var(--primary-red);
}

.bid-count {
  font-size: 13px;
  color: var(--text-tertiary);
}

/* 特色功能 */
.features-section {
  max-width: 100%;
  padding: 80px 24px;
  background: var(--bg-gray);
}

.features-section > .features-grid,
.features-section > .section-header {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.section-header {
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.feature-card {
  background: white;
  padding: 32px;
  border-radius: var(--radius-md);
  text-align: center;
  border: 1px solid var(--border-light);
  transition: all 0.3s;
}

.feature-card:hover {
  border-color: var(--primary-red);
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.feature-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.feature-card h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--text-primary);
}

.feature-card p {
  font-size: 14px;
  color: var(--text-secondary);
}

/* 快速入口 */
.quick-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.quick-card {
  background: white;
  padding: 32px 24px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-light);
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.3s;
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

.quick-content {
  flex: 1;
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

.quick-arrow {
  font-size: 20px;
  color: var(--primary-red);
  transition: transform 0.3s;
}

.quick-card:hover .quick-arrow {
  transform: translateX(4px);
}

/* 用户评价 */
.testimonials-section {
  background: white;
  max-width: 100%;
  padding: 80px 24px;
}

.testimonials-section > .testimonials-grid,
.testimonials-section > .section-header {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.testimonial-card {
  background: var(--bg-gray);
  padding: 24px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-light);
}

.testimonial-content {
  margin-bottom: 20px;
}

.testimonial-content p {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.6;
  font-style: italic;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 12px;
}

.author-avatar {
  font-size: 32px;
}

.author-name {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
}

.author-role {
  font-size: 13px;
  color: var(--text-tertiary);
}

/* 合作伙伴 */
.partners-section {
  background: white;
  padding: 48px 24px;
  border-top: 1px solid var(--border-light);
}

.partners-container {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.partners-title {
  font-size: 16px;
  color: var(--text-tertiary);
  margin-bottom: 32px;
}

.partners-logos {
  display: flex;
  justify-content: center;
  gap: 48px;
  flex-wrap: wrap;
}

.partner-logo {
  font-size: 20px;
  color: var(--text-secondary);
  font-weight: 600;
  opacity: 0.6;
  transition: opacity 0.3s;
}

.partner-logo:hover {
  opacity: 1;
}

/* 响应式 */
@media (max-width: 1024px) {
  .stats-container,
  .script-grid,
  .zone-grid,
  .features-grid,
  .quick-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .hero-title {
    font-size: 36px;
  }
  
  .section {
    padding: 60px 24px;
  }
}

@media (max-width: 768px) {
  .stats-container,
  .script-grid,
  .zone-grid,
  .features-grid,
  .quick-grid,
  .testimonials-grid,
  .demand-grid {
    grid-template-columns: 1fr;
  }
  
  .hero-title {
    font-size: 28px;
  }
  
  .hero-subtitle {
    font-size: 15px;
  }
  
  .section-title {
    font-size: 24px;
  }
  
  .banner-content {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
