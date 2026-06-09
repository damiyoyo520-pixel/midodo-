<template>
  <div class="templates-page">
    <div class="page-header">
      <div class="header-left">
        <h1>创作模板</h1>
        <p>专业的短剧剧本模板，助力您快速创作</p>
      </div>
      <div class="header-actions">
        <a-input-search placeholder="搜索模板" style="width: 300px;" />
        <a-button type="primary">
          <template #icon><span>➕</span></template>
          上传模板
        </a-button>
      </div>
    </div>

    <div class="filter-section">
      <a-radio-group v-model:value="activeCategory" button-style="solid">
        <a-radio-button value="all">全部</a-radio-button>
        <a-radio-button value="romance">爱情</a-radio-button>
        <a-radio-button value="suspense">悬疑</a-radio-button>
        <a-radio-button value="comedy">喜剧</a-radio-button>
        <a-radio-button value="costume">古装</a-radio-button>
        <a-radio-button value="modern">都市</a-radio-button>
      </a-radio-group>
    </div>

    <div class="templates-grid">
      <div v-for="template in filteredTemplates" :key="template.id" class="template-card">
        <div class="template-preview">
          <img :src="template.cover" :alt="template.title" />
          <div class="template-overlay">
            <a-button type="primary" @click="useTemplate(template)">
              使用模板
            </a-button>
          </div>
        </div>
        <div class="template-info">
          <div class="template-title">{{ template.title }}</div>
          <div class="template-meta">
            <span class="template-tag">{{ template.category }}</span>
            <span class="template-episodes">{{ template.episodes }}集</span>
          </div>
          <div class="template-desc">{{ template.description }}</div>
          <div class="template-stats">
            <span>👁️ {{ template.views }}</span>
            <span>💾 {{ template.saves }}</span>
            <span>⭐ {{ template.rating }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="pagination" style="margin-top: 48px;">
      <a-pagination :current="1" :page-size="12" :total="60" show-size-changer show-quick-jumper />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { message } from 'ant-design-vue'

const activeCategory = ref('all')

const templates = ref([
  {
    id: 1,
    title: '穿越王妃系列',
    category: '古装',
    episodes: 24,
    description: '现代女主穿越到古代成为废柴王妃，凭借智慧逆袭',
    views: 12500,
    saves: 3200,
    rating: 4.8,
    cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    title: '霸道总裁爱上我',
    category: '爱情',
    episodes: 30,
    description: '灰姑娘与霸道总裁的甜蜜爱情故事',
    views: 28000,
    saves: 8500,
    rating: 4.7,
    cover: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=300&fit=crop'
  },
  {
    id: 3,
    title: '侦探事务所',
    category: '悬疑',
    episodes: 20,
    description: '神秘侦探破解各种离奇案件',
    views: 15600,
    saves: 4200,
    rating: 4.9,
    cover: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=400&h=300&fit=crop'
  },
  {
    id: 4,
    title: '爆笑办公室',
    category: '喜剧',
    episodes: 36,
    description: '办公室里的搞笑日常',
    views: 21000,
    saves: 5800,
    rating: 4.6,
    cover: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop'
  },
  {
    id: 5,
    title: '都市爱情故事',
    category: '都市',
    episodes: 28,
    description: '北漂青年们的爱情与奋斗',
    views: 18900,
    saves: 4900,
    rating: 4.5,
    cover: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=300&fit=crop'
  },
  {
    id: 6,
    title: '仙侠情缘',
    category: '古装',
    episodes: 32,
    description: '仙侠世界的爱恨情仇',
    views: 25000,
    saves: 7200,
    rating: 4.8,
    cover: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
  },
  {
    id: 7,
    title: '豪门恩怨',
    category: '爱情',
    episodes: 26,
    description: '豪门家族里的爱恨纠葛',
    views: 22000,
    saves: 6100,
    rating: 4.7,
    cover: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop'
  },
  {
    id: 8,
    title: '校园青春',
    category: '喜剧',
    episodes: 24,
    description: '美好的校园时光',
    views: 16500,
    saves: 4500,
    rating: 4.6,
    cover: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=300&fit=crop'
  },
  {
    id: 9,
    title: '悬疑追踪',
    category: '悬疑',
    episodes: 18,
    description: '连环案件的真相追踪',
    views: 19200,
    saves: 5200,
    rating: 4.9,
    cover: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=400&h=300&fit=crop'
  },
  {
    id: 10,
    title: '古风恋歌',
    category: '古装',
    episodes: 22,
    description: '古代文人雅士的浪漫爱情',
    views: 17800,
    saves: 4700,
    rating: 4.7,
    cover: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=300&fit=crop'
  },
  {
    id: 11,
    title: '职场菜鸟升职记',
    category: '都市',
    episodes: 28,
    description: '职场新人的奋斗历程',
    views: 14300,
    saves: 3800,
    rating: 4.5,
    cover: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=300&fit=crop'
  },
  {
    id: 12,
    title: '甜蜜咖啡店',
    category: '爱情',
    episodes: 20,
    description: '咖啡店里的浪漫邂逅',
    views: 20500,
    saves: 5600,
    rating: 4.6,
    cover: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop'
  }
])

const categoryMap: Record<string, string> = {
  romance: '爱情',
  suspense: '悬疑',
  comedy: '喜剧',
  costume: '古装',
  modern: '都市'
}

const filteredTemplates = computed(() => {
  if (activeCategory.value === 'all') {
    return templates.value
  }
  const categoryName = categoryMap[activeCategory.value]
  return templates.value.filter(t => t.category === categoryName)
})

const useTemplate = (template: any) => {
  message.success(`已选择模板：${template.title}`)
}
</script>

<style scoped>
.templates-page {
  padding: 40px 24px;
  max-width: 1600px;
  margin: 0 auto;
  min-height: 100vh;
  background: #0f0f0f;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #374151;
}

.header-left h1 {
  font-size: 32px;
  font-weight: 700;
  color: white;
  margin: 0 0 8px 0;
  background: linear-gradient(135deg, #dc2626 0%, #ff6b6b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header-left p {
  font-size: 16px;
  color: #9ca3af;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 16px;
}

.filter-section {
  margin-bottom: 32px;
}

.templates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.template-card {
  background: linear-gradient(135deg, #1f2937 0%, #0f172a 100%);
  border: 1px solid #374151;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.template-card:hover {
  transform: translateY(-8px);
  border-color: #dc2626;
  box-shadow: 0 16px 40px rgba(220, 38, 38, 0.2);
}

.template-preview {
  position: relative;
  aspect-ratio: 4/3;
  overflow: hidden;
}

.template-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.template-card:hover .template-preview img {
  transform: scale(1.05);
}

.template-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.template-card:hover .template-overlay {
  opacity: 1;
}

.template-info {
  padding: 20px;
}

.template-title {
  font-size: 18px;
  font-weight: 700;
  color: white;
  margin-bottom: 12px;
}

.template-meta {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.template-tag {
  font-size: 12px;
  color: #dc2626;
  background: rgba(220, 38, 38, 0.1);
  padding: 4px 12px;
  border-radius: 20px;
}

.template-episodes {
  font-size: 12px;
  color: #9ca3af;
}

.template-desc {
  font-size: 14px;
  color: #9ca3af;
  margin-bottom: 16px;
  line-height: 1.5;
}

.template-stats {
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: #6b7280;
}

.pagination {
  display: flex;
  justify-content: center;
}
</style>
