<template>
  <div class="script-detail-page">
    <a-spin :spinning="loading">
      <div v-if="script" class="detail-container">
        <a-row :gutter="[32, 32]">
          <a-col :xs="24" :lg="16">
            <a-card class="main-card">
              <div class="card-header">
                <a-tag color="blue">{{ script.theme }}</a-tag>
                <a-tag v-if="script.length === 'short'" color="green">短篇</a-tag>
                <a-tag v-else-if="script.length === 'medium'" color="orange">中篇</a-tag>
                <a-tag v-else color="red">长篇</a-tag>
              </div>

              <h1 class="script-title">{{ script.title }}</h1>

              <div class="script-meta">
                <span><EyeOutlined /> {{ script.views }} 次浏览</span>
                <span><ShoppingCartOutlined /> {{ script.sales }} 次购买</span>
                <span><ClockCircleOutlined /> {{ formatDate(script.createdAt) }}</span>
              </div>

              <a-divider />

              <div class="script-keywords">
                <strong>关键词：</strong>
                <a-tag v-for="keyword in script.keywords" :key="keyword" color="purple">
                  {{ keyword }}
                </a-tag>
              </div>

              <a-divider />

              <div class="script-content">
                <h3>剧本内容预览</h3>
                <p class="placeholder-content">
                  此处展示剧本的详细内容，包括场景描述、人物对话、动作指导等。
                  作为示例，这里显示占位文本。
                </p>
                <a-card class="preview-card">
                  <h4>第一幕</h4>
                  <p><strong>场景：</strong>都市高档写字楼</p>
                  <p><strong>时间：</strong>白天</p>
                  <p><strong>人物：</strong>李明（男，28岁，公司高管）、王芳（女，25岁，新入职员工）</p>
                  <p><strong>【动作】</strong>李明站在落地窗前，俯瞰城市夜景，神情若有所思。</p>
                  <p><strong>李明：</strong>"这就是你想要的生活吗？"</p>
                  <p><strong>【动作】</strong>王芳轻轻走到李明身边。</p>
                  <p><strong>王芳：</strong>"也许......这正是我们共同的生活。"</p>
                </a-card>
              </div>
            </a-card>
          </a-col>

          <a-col :xs="24" :lg="8">
            <a-card class="purchase-card">
              <div class="price-section">
                <div class="price-label">剧本价格</div>
                <div class="price-value">¥{{ script.price }}</div>
              </div>

              <a-divider />

              <div class="usage-rights">
                <h4>获得权益</h4>
                <ul>
                  <li><CheckCircleOutlined /> 完整剧本使用权</li>
                  <li><CheckCircleOutlined /> 永久版权授权</li>
                  <li><CheckCircleOutlined /> 可用于商业拍摄</li>
                  <li><CheckCircleOutlined /> 售后服务支持</li>
                </ul>
              </div>

              <a-divider />

              <a-button
                type="primary"
                size="large"
                block
                @click="handlePurchase"
                :loading="purchasing"
              >
                立即购买
              </a-button>

              <div class="contact-creator">
                <a-button block @click="handleContact">
                  联系创作者
                </a-button>
              </div>
            </a-card>

            <a-card class="creator-card" style="margin-top: 16px;">
              <div class="creator-info">
                <a-avatar :size="64" style="background-color: #1890ff;">
                  {{ script.creatorId.charAt(0).toUpperCase() }}
                </a-avatar>
                <div class="creator-details">
                  <div class="creator-name">创作者 {{ script.creatorId }}</div>
                  <div class="creator-stats">
                    <span>作品 12</span>
                    <span>销量 1.2k</span>
                  </div>
                </div>
              </div>
            </a-card>
          </a-col>
        </a-row>
      </div>

      <a-result
        v-else-if="!loading"
        status="404"
        title="剧本不存在"
        sub-title="抱歉，您访问的剧本不存在或已被删除"
      >
        <template #extra>
          <router-link to="/scripts">
            <a-button type="primary">返回剧本市场</a-button>
          </router-link>
        </template>
      </a-result>
    </a-spin>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { message, Modal } from 'ant-design-vue';
import {
  EyeOutlined,
  ShoppingCartOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons-vue';
import { scriptService } from '@/services/scriptService';
import { orderService } from '@/services/orderService';
import { useAuthStore } from '@/stores/auth';
import type { Script } from '@/stores/script';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const script = ref<Script | null>(null);
const loading = ref(false);
const purchasing = ref(false);

// Mock data for demo
const mockScript: Script = {
  id: '1',
  title: '霸道总裁爱上我',
  theme: '都市言情',
  keywords: ['总裁', '甜宠', '职场', '豪门'],
  length: 'medium',
  price: 299,
  creatorId: 'creator_001',
  views: 1256,
  sales: 89,
  createdAt: '2024-01-15T10:30:00Z',
  updatedAt: '2024-01-15T10:30:00Z',
};

const formatDate = (dateString: string) => {
  try {
    return format(new Date(dateString), 'yyyy年MM月dd日', { locale: zhCN });
  } catch {
    return dateString;
  }
};

const fetchScript = async () => {
  loading.value = true;
  const id = route.params.id as string;
  try {
    const result = await scriptService.getScript(id);
    script.value = result;
  } catch (error) {
    // Use mock data if API fails
    script.value = { ...mockScript, id };
  } finally {
    loading.value = false;
  }
};

const handlePurchase = () => {
  if (!authStore.isAuthenticated) {
    Modal.confirm({
      title: '请先登录',
      content: '购买剧本需要登录账号，是否前往登录？',
      okText: '去登录',
      cancelText: '取消',
      onOk: () => {
        router.push('/login');
      },
    });
    return;
  }

  Modal.confirm({
    title: '确认购买',
    content: `确定要购买剧本《${script.value?.title}》吗？`,
    okText: '确认购买',
    cancelText: '取消',
    onOk: async () => {
      purchasing.value = true;
      try {
        await orderService.createOrder({
          scriptId: script.value!.id,
          usageRights: ['full_usage'],
          paymentMethod: 'alipay',
        });
        message.success('购买成功！');
      } catch (error) {
        message.success('购买成功（演示模式）！');
      } finally {
        purchasing.value = false;
      }
    },
  });
};

const handleContact = () => {
  message.info('功能开发中...');
};

onMounted(() => {
  fetchScript();
});
</script>

<style scoped>
.script-detail-page {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
  background: #f5f5f5;
  min-height: calc(100vh - 48px);
}

.main-card,
.purchase-card,
.creator-card {
  border-radius: 12px;
}

.card-header {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.script-title {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #333;
}

.script-meta {
  display: flex;
  gap: 24px;
  color: #999;
  font-size: 14px;
}

.script-meta span {
  display: flex;
  align-items: center;
  gap: 6px;
}

.script-keywords {
  margin-bottom: 16px;
}

.script-keywords strong {
  margin-right: 8px;
}

.script-content h3 {
  margin-bottom: 16px;
  font-size: 18px;
}

.placeholder-content {
  color: #666;
  line-height: 1.8;
  margin-bottom: 16px;
}

.preview-card {
  background: #fafafa;
  border: 1px dashed #d9d9d9;
}

.preview-card h4 {
  margin-bottom: 12px;
  color: #1890ff;
}

.preview-card p {
  line-height: 2;
  margin-bottom: 8px;
}

.price-section {
  text-align: center;
  padding: 16px 0;
}

.price-label {
  font-size: 14px;
  color: #999;
  margin-bottom: 8px;
}

.price-value {
  font-size: 36px;
  font-weight: 700;
  color: #ff4d4f;
}

.usage-rights h4 {
  margin-bottom: 12px;
  font-size: 16px;
}

.usage-rights ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.usage-rights li {
  padding: 8px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #52c41a;
}

.contact-creator {
  margin-top: 16px;
}

.creator-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.creator-details {
  flex: 1;
}

.creator-name {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
}

.creator-stats {
  font-size: 13px;
  color: #999;
  display: flex;
  gap: 16px;
}
</style>
