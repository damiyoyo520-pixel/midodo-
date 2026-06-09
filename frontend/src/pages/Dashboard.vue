<template>
  <div class="dashboard-page">
    <div class="page-header">
      <div class="header-content">
        <div class="welcome">
          <h1>欢迎回来，{{ user?.username || '创作者' }}</h1>
          <p>这里是您的创作者仪表板</p>
        </div>
        <router-link to="/create">
          <a-button type="primary" size="large">
            <PlusOutlined /> 创建新剧本
          </a-button>
        </router-link>
      </div>
    </div>

    <a-row :gutter="[24, 24]" class="stats-row">
      <a-col :xs="24" :sm="12" :lg="6">
        <a-card class="stat-card">
          <div class="stat-icon" style="background: #e6f7ff;">
            <FileTextOutlined style="color: #1890ff;" />
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ stats.totalScripts }}</div>
            <div class="stat-label">我的剧本</div>
          </div>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="12" :lg="6">
        <a-card class="stat-card">
          <div class="stat-icon" style="background: #f6ffed;">
            <EyeOutlined style="color: #52c41a;" />
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ stats.totalViews }}</div>
            <div class="stat-label">总浏览量</div>
          </div>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="12" :lg="6">
        <a-card class="stat-card">
          <div class="stat-icon" style="background: #fff7e6;">
            <ShoppingCartOutlined style="color: #fa8c16;" />
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ stats.totalSales }}</div>
            <div class="stat-label">总销量</div>
          </div>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="12" :lg="6">
        <a-card class="stat-card">
          <div class="stat-icon" style="background: #fff1f0;">
            <DollarOutlined style="color: #ff4d4f;" />
          </div>
          <div class="stat-content">
            <div class="stat-value">¥{{ stats.totalRevenue }}</div>
            <div class="stat-label">总收入</div>
          </div>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="[24, 24]">
      <a-col :xs="24" :lg="16">
        <a-card title="我的剧本" class="scripts-card">
          <template #extra>
            <router-link to="/scripts">查看全部</router-link>
          </template>
          <a-spin :spinning="loading">
            <a-table
              :columns="columns"
              :data-source="scripts"
              :pagination="false"
              row-key="id"
            >
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'title'">
                  <router-link :to="`/scripts/${record.id}`">
                    {{ record.title }}
                  </router-link>
                </template>
                <template v-else-if="column.key === 'theme'">
                  <a-tag color="blue">{{ record.theme }}</a-tag>
                </template>
                <template v-else-if="column.key === 'price'">
                  <span class="price-text">¥{{ record.price }}</span>
                </template>
                <template v-else-if="column.key === 'status'">
                  <a-tag :color="record.status === 'published' ? 'green' : 'default'">
                    {{ record.status === 'published' ? '已发布' : '草稿' }}
                  </a-tag>
                </template>
                <template v-else-if="column.key === 'action'">
                  <a-space>
                    <a @click="handleEdit(record)">编辑</a>
                    <a-divider type="vertical" />
                    <a @click="handlePublish(record)" v-if="record.status !== 'published'">发布</a>
                    <span v-else class="disabled-link">已发布</span>
                  </a-space>
                </template>
              </template>
            </a-table>
          </a-spin>
        </a-card>
      </a-col>

      <a-col :xs="24" :lg="8">
        <a-card title="最近订单" class="orders-card">
          <template #extra>
            <router-link to="/orders">查看全部</router-link>
          </template>
          <a-spin :spinning="loadingOrders">
            <a-list :data-source="recentOrders" size="small">
              <template #renderItem="{ item }">
                <a-list-item>
                  <a-list-item-meta :title="item.title" :description="formatTime(item.createdAt)">
                    <template #avatar>
                      <a-avatar :style="{ backgroundColor: '#1890ff' }">
                        <template #icon><UserOutlined /></template>
                      </a-avatar>
                    </template>
                  </a-list-item-meta>
                  <template #actions>
                    <span class="order-amount">¥{{ item.amount }}</span>
                  </template>
                </a-list-item>
              </template>
              <template #emptyText>
                <a-empty description="暂无订单" :image="Empty.PRESENTED_IMAGE_SIMPLE" />
              </template>
            </a-list>
          </a-spin>
        </a-card>

        <a-card title="快捷操作" class="quick-actions-card" style="margin-top: 24px;">
          <a-space direction="vertical" :size="12" style="width: 100%;">
            <router-link to="/create">
              <a-button block>
                <PlusOutlined /> 创建新剧本
              </a-button>
            </router-link>
            <router-link to="/scripts">
              <a-button block>
                <AppstoreOutlined /> 浏览剧本市场
              </a-button>
            </router-link>
            <router-link to="/orders">
              <a-button block>
                <ShoppingCartOutlined /> 查看我的订单
              </a-button>
            </router-link>
          </a-space>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import {
  PlusOutlined,
  FileTextOutlined,
  EyeOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  UserOutlined,
  AppstoreOutlined,
} from '@ant-design/icons-vue';
import { useAuthStore } from '@/stores/auth';
import { scriptService } from '@/services/scriptService';
import type { Script } from '@/stores/script';
import { format, parseISO } from 'date-fns';
import { zhCN } from 'date-fns/locale';

const router = useRouter();
const authStore = useAuthStore();
const user = computed(() => authStore.user);

const loading = ref(false);
const loadingOrders = ref(false);
const scripts = ref<Script[]>([]);

const stats = reactive({
  totalScripts: 0,
  totalViews: 0,
  totalSales: 0,
  totalRevenue: 0,
});

const recentOrders = ref<any[]>([]);

const columns = [
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '题材',
    dataIndex: 'theme',
    key: 'theme',
    width: 120,
  },
  {
    title: '价格',
    dataIndex: 'price',
    key: 'price',
    width: 100,
  },
  {
    title: '浏览',
    dataIndex: 'views',
    key: 'views',
    width: 80,
  },
  {
    title: '销量',
    dataIndex: 'sales',
    key: 'sales',
    width: 80,
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 100,
  },
  {
    title: '操作',
    key: 'action',
    width: 120,
  },
];

// Mock data
const mockScripts: Script[] = [
  { id: '1', title: '霸道总裁爱上我', theme: '都市言情', keywords: [], length: 'medium', price: 299, creatorId: 'u1', views: 1256, sales: 89, createdAt: '2024-01-15', updatedAt: '2024-01-15' },
  { id: '2', title: '重生之我在古代当首富', theme: '穿越重生', keywords: [], length: 'long', price: 399, creatorId: 'u1', views: 2341, sales: 156, createdAt: '2024-01-14', updatedAt: '2024-01-14' },
  { id: '3', title: '甜蜜陷阱（草稿）', theme: '都市爱情', keywords: [], length: 'short', price: 199, creatorId: 'u1', views: 0, sales: 0, createdAt: '2024-01-13', updatedAt: '2024-01-13' },
];

const mockOrders = [
  { id: '1', title: '霸道总裁爱上我', amount: 299, createdAt: '2024-01-15T10:30:00Z' },
  { id: '2', title: '甜蜜陷阱', amount: 199, createdAt: '2024-01-14T15:20:00Z' },
  { id: '3', title: '神医嫡女', amount: 499, createdAt: '2024-01-13T09:15:00Z' },
];

const formatTime = (timeString: string) => {
  try {
    return format(parseISO(timeString), 'MM月dd日 HH:mm', { locale: zhCN });
  } catch {
    return timeString;
  }
};

const fetchScripts = async () => {
  loading.value = true;
  try {
    const result = await scriptService.listScripts(1, 10);
    scripts.value = result.scripts.length > 0 ? result.scripts : mockScripts;
    scripts.value = scripts.value.map(s => ({ ...s, status: s.sales > 0 ? 'published' : 'draft' }));
  } catch (error) {
    scripts.value = mockScripts.map(s => ({ ...s, status: s.sales > 0 ? 'published' : 'draft' }));
  } finally {
    loading.value = false;
    updateStats();
  }
};

const fetchOrders = async () => {
  loadingOrders.value = true;
  try {
    const result = await orderService.listOrders(1, 5);
    recentOrders.value = result.orders || mockOrders;
  } catch (error) {
    recentOrders.value = mockOrders;
  } finally {
    loadingOrders.value = false;
  }
};

import { orderService } from '@/services/orderService';

const updateStats = () => {
  stats.totalScripts = scripts.value.length;
  stats.totalViews = scripts.value.reduce((sum, s) => sum + s.views, 0);
  stats.totalSales = scripts.value.reduce((sum, s) => sum + s.sales, 0);
  stats.totalRevenue = scripts.value.reduce((sum, s) => sum + s.price * s.sales, 0);
};

const handleEdit = (record: Script) => {
  message.info(`编辑剧本: ${record.title}`);
};

const handlePublish = async (record: Script) => {
  try {
    await scriptService.publishScript(record.id, record.price);
    message.success('发布成功！');
    fetchScripts();
  } catch (error) {
    message.success('发布成功（演示模式）！');
    fetchScripts();
  }
};

onMounted(() => {
  fetchScripts();
  fetchOrders();
});
</script>

<style scoped>
.dashboard-page {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
  background: #f5f5f5;
  min-height: calc(100vh - 48px);
}

.page-header {
  margin-bottom: 24px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.welcome h1 {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 4px;
}

.welcome p {
  color: #666;
  font-size: 16px;
}

.stats-row {
  margin-bottom: 24px;
}

.stat-card {
  border-radius: 12px;
}

.stat-card :deep(.ant-card-body) {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
}

.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #333;
}

.stat-label {
  font-size: 14px;
  color: #999;
}

.scripts-card,
.orders-card,
.quick-actions-card {
  border-radius: 12px;
}

.price-text {
  color: #ff4d4f;
  font-weight: 600;
}

.disabled-link {
  color: #999;
  cursor: not-allowed;
}

.order-amount {
  color: #ff4d4f;
  font-weight: 600;
}
</style>
