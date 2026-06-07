<template>
  <div class="scripts-page">
    <div class="page-header">
      <h1>剧本市场</h1>
      <p>发现精彩短剧剧本，开启创作之旅</p>
    </div>

    <div class="filters">
      <a-row :gutter="[16, 16]" align="middle">
        <a-col :xs="24" :sm="12" :md="6">
          <a-select
            v-model:value="filterTheme"
            placeholder="选择题材"
            allowClear
            style="width: 100%"
            @change="handleFilterChange"
          >
            <a-select-option value="都市言情">都市言情</a-select-option>
            <a-select-option value="穿越重生">穿越重生</a-select-option>
            <a-select-option value="古装剧">古装剧</a-select-option>
            <a-select-option value="悬疑推理">悬疑推理</a-select-option>
            <a-select-option value="青春校园">青春校园</a-select-option>
          </a-select>
        </a-col>
        <a-col :xs="24" :sm="12" :md="6">
          <a-select
            v-model:value="filterLength"
            placeholder="选择时长"
            allowClear
            style="width: 100%"
            @change="handleFilterChange"
          >
            <a-select-option value="short">短篇 (5-10分钟)</a-select-option>
            <a-select-option value="medium">中篇 (10-20分钟)</a-select-option>
            <a-select-option value="long">长篇 (20-30分钟)</a-select-option>
          </a-select>
        </a-col>
        <a-col :xs="24" :sm="12" :md="6">
          <a-input-search
            v-model:value="searchKeyword"
            placeholder="搜索剧本"
            allowClear
            @search="handleSearch"
          />
        </a-col>
        <a-col :xs="24" :sm="12" :md="6">
          <a-select
            v-model:value="sortBy"
            style="width: 100%"
            @change="handleSortChange"
          >
            <a-select-option value="latest">最新上架</a-select-option>
            <a-select-option value="popular">最受欢迎</a-select-option>
            <a-select-option value="sales">销量最高</a-select-option>
            <a-select-option value="price-low">价格从低到高</a-select-option>
            <a-select-option value="price-high">价格从高到低</a-select-option>
          </a-select>
        </a-col>
      </a-row>
    </div>

    <a-spin :spinning="loading">
      <a-row :gutter="[24, 24]" v-if="scripts.length > 0">
        <a-col :xs="24" :sm="12" :md="8" :lg="6" v-for="script in scripts" :key="script.id">
          <router-link :to="`/scripts/${script.id}`">
            <a-card hoverable class="script-card">
              <div class="card-header">
                <a-tag color="blue">{{ script.theme }}</a-tag>
                <a-tag v-if="script.length === 'short'" color="green">短篇</a-tag>
                <a-tag v-else-if="script.length === 'medium'" color="orange">中篇</a-tag>
                <a-tag v-else color="red">长篇</a-tag>
              </div>
              <h3 class="script-title">{{ script.title }}</h3>
              <p class="script-keywords">
                <a-tag v-for="keyword in script.keywords.slice(0, 3)" :key="keyword" size="small">
                  {{ keyword }}
                </a-tag>
              </p>
              <div class="card-footer">
                <div class="stats">
                  <span><EyeOutlined /> {{ script.views }}</span>
                  <span><ShoppingCartOutlined /> {{ script.sales }}</span>
                </div>
                <div class="price">¥{{ script.price }}</div>
              </div>
            </a-card>
          </router-link>
        </a-col>
      </a-row>

      <a-empty v-else-if="!loading" description="暂无剧本">
        <router-link to="/create">
          <a-button type="primary">创建第一个剧本</a-button>
        </router-link>
      </a-empty>
    </a-spin>

    <div class="pagination" v-if="total > 0">
      <a-pagination
        v-model:current="currentPage"
        :total="total"
        :pageSize="pageSize"
        show-quick-jumper
        @change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons-vue';
import { scriptService } from '@/services/scriptService';
import type { Script } from '@/stores/script';

const scripts = ref<Script[]>([]);
const loading = ref(false);
const currentPage = ref(1);
const pageSize = ref(12);
const total = ref(0);

const filterTheme = ref<string>();
const filterLength = ref<string>();
const searchKeyword = ref('');
const sortBy = ref('latest');

// Mock data for demo
const mockScripts: Script[] = [
  { id: '1', title: '霸道总裁爱上我', theme: '都市言情', keywords: ['总裁', '甜宠', '职场'], length: 'medium', price: 299, creatorId: 'u1', views: 1256, sales: 89, createdAt: '2024-01-15', updatedAt: '2024-01-15' },
  { id: '2', title: '重生之我在古代当首富', theme: '穿越重生', keywords: ['穿越', '经商', '逆袭'], length: 'long', price: 399, creatorId: 'u2', views: 2341, sales: 156, createdAt: '2024-01-14', updatedAt: '2024-01-14' },
  { id: '3', title: '甜蜜陷阱', theme: '都市爱情', keywords: ['复仇', '豪门', '虐恋'], length: 'short', price: 199, creatorId: 'u3', views: 1876, sales: 234, createdAt: '2024-01-13', updatedAt: '2024-01-13' },
  { id: '4', title: '神医嫡女', theme: '古装剧', keywords: ['医妃', '复仇', '权谋'], length: 'long', price: 499, creatorId: 'u4', views: 3567, sales: 312, createdAt: '2024-01-12', updatedAt: '2024-01-12' },
  { id: '5', title: '暗夜追凶', theme: '悬疑推理', keywords: ['刑侦', '推理', '犯罪'], length: 'medium', price: 349, creatorId: 'u5', views: 1543, sales: 98, createdAt: '2024-01-11', updatedAt: '2024-01-11' },
  { id: '6', title: '校草的暗恋日记', theme: '青春校园', keywords: ['校园', '甜文', '暗恋'], length: 'short', price: 159, creatorId: 'u6', views: 2987, sales: 445, createdAt: '2024-01-10', updatedAt: '2024-01-10' },
  { id: '7', title: '闪婚娇妻带球跑', theme: '都市言情', keywords: ['闪婚', '萌宝', '豪门'], length: 'medium', price: 279, creatorId: 'u7', views: 2123, sales: 167, createdAt: '2024-01-09', updatedAt: '2024-01-09' },
  { id: '8', title: '凤逆天下', theme: '古装剧', keywords: ['玄幻', '女强', '穿越'], length: 'long', price: 599, creatorId: 'u8', views: 4532, sales: 523, createdAt: '2024-01-08', updatedAt: '2024-01-08' },
];

const fetchScripts = async () => {
  loading.value = true;
  try {
    const result = await scriptService.listScripts(currentPage.value, pageSize.value);
    scripts.value = result.scripts.length > 0 ? result.scripts : mockScripts;
    total.value = result.total || mockScripts.length;
  } catch (error) {
    scripts.value = mockScripts;
    total.value = mockScripts.length;
  } finally {
    loading.value = false;
  }
};

const handleFilterChange = () => {
  currentPage.value = 1;
  fetchScripts();
};

const handleSearch = () => {
  currentPage.value = 1;
  fetchScripts();
};

const handleSortChange = () => {
  currentPage.value = 1;
  fetchScripts();
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
  fetchScripts();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
  fetchScripts();
});
</script>

<style scoped>
.scripts-page {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 32px;
}

.page-header h1 {
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 8px;
}

.page-header p {
  color: #666;
  font-size: 16px;
}

.filters {
  background: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.script-card {
  height: 100%;
  transition: transform 0.3s, box-shadow 0.3s;
}

.script-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.script-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  min-height: 44px;
}

.script-keywords {
  margin-bottom: 12px;
  min-height: 28px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
}

.stats {
  display: flex;
  gap: 16px;
  color: #999;
  font-size: 13px;
}

.stats span {
  display: flex;
  align-items: center;
  gap: 4px;
}

.price {
  font-size: 18px;
  font-weight: 600;
  color: #ff4d4f;
}

.pagination {
  margin-top: 32px;
  text-align: center;
}
</style>
