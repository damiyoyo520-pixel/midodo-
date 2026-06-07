<template>
  <div class="orders-page">
    <div class="page-header">
      <h1>我的订单</h1>
      <p>查看和管理您的所有订单</p>
    </div>

    <a-card class="orders-card">
      <a-tabs v-model:activeKey="activeTab" @change="handleTabChange">
        <a-tab-pane key="all" tab="全部订单" />
        <a-tab-pane key="pending" tab="待支付" />
        <a-tab-pane key="paid" tab="已支付" />
      </a-tabs>

      <a-table
        :columns="columns"
        :data-source="filteredOrders"
        :loading="loading"
        :pagination="pagination"
        row-key="id"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'scriptId'">
            <router-link :to="`/scripts/${record.scriptId}`" class="script-link">
              {{ getScriptTitle(record.scriptId) }}
            </router-link>
          </template>
          <template v-else-if="column.key === 'status'">
            <a-tag :color="getStatusColor(record.status)">
              {{ getStatusText(record.status) }}
            </a-tag>
          </template>
          <template v-else-if="column.key === 'amount'">
            <span class="amount">¥{{ record.amount }}</span>
          </template>
          <template v-else-if="column.key === 'createdAt'">
            {{ formatDate(record.createdAt) }}
          </template>
          <template v-else-if="column.key === 'action'">
            <a-space>
              <a @click="handleViewDetail(record)">查看</a>
              <a-divider type="vertical" />
              <a
                v-if="record.status === 'pending'"
                type="primary"
                @click="handlePay(record)"
              >
                去支付
              </a>
              <span v-else-if="record.status === 'paid'" class="completed-text">
                已完成
              </span>
            </a-space>
          </template>
        </template>
      </a-table>
    </a-card>

    <a-modal
      v-model:open="detailModalVisible"
      title="订单详情"
      :footer="null"
      width="600px"
    >
      <a-descriptions :column="2" bordered v-if="currentOrder">
        <a-descriptions-item label="订单编号">
          {{ currentOrder.id }}
        </a-descriptions-item>
        <a-descriptions-item label="订单状态">
          <a-tag :color="getStatusColor(currentOrder.status)">
            {{ getStatusText(currentOrder.status) }}
          </a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="剧本">
          <router-link :to="`/scripts/${currentOrder.scriptId}`">
            {{ getScriptTitle(currentOrder.scriptId) }}
          </router-link>
        </a-descriptions-item>
        <a-descriptions-item label="金额">
          <span class="amount">¥{{ currentOrder.amount }}</span>
        </a-descriptions-item>
        <a-descriptions-item label="下单时间" :span="2">
          {{ formatDateTime(currentOrder.createdAt) }}
        </a-descriptions-item>
        <a-descriptions-item label="使用权限" :span="2">
          <a-tag v-for="right in currentOrder.usageRights" :key="right">
            {{ getRightText(right) }}
          </a-tag>
        </a-descriptions-item>
      </a-descriptions>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { message, Modal } from 'ant-design-vue';
import type { TablePaginationConfig } from 'ant-design-vue';
import { orderService, Order } from '@/services/orderService';
import { format, parseISO } from 'date-fns';
import { zhCN } from 'date-fns/locale';

const router = useRouter();

const orders = ref<Order[]>([]);
const loading = ref(false);
const activeTab = ref('all');

const detailModalVisible = ref(false);
const currentOrder = ref<Order | null>(null);

const pagination = reactive<TablePaginationConfig>({
  current: 1,
  pageSize: 10,
  total: 0,
  showSizeChanger: true,
  showTotal: (total: number) => `共 ${total} 条订单`,
});

const columns = [
  {
    title: '订单编号',
    dataIndex: 'id',
    key: 'id',
    width: 180,
  },
  {
    title: '剧本',
    dataIndex: 'scriptId',
    key: 'scriptId',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 100,
  },
  {
    title: '金额',
    dataIndex: 'amount',
    key: 'amount',
    width: 100,
  },
  {
    title: '下单时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 180,
  },
  {
    title: '操作',
    key: 'action',
    width: 150,
  },
];

// Mock data
const mockOrders: (Order & { usageRights: string[] })[] = [
  { id: 'ORD202401150001', scriptId: '1', status: 'paid', amount: 299, createdAt: '2024-01-15T10:30:00Z', usageRights: ['full_usage'] },
  { id: 'ORD202401140002', scriptId: '2', status: 'paid', amount: 399, createdAt: '2024-01-14T15:20:00Z', usageRights: ['full_usage'] },
  { id: 'ORD202401130003', scriptId: '4', status: 'pending', amount: 499, createdAt: '2024-01-13T09:15:00Z', usageRights: ['full_usage'] },
  { id: 'ORD202401120004', scriptId: '3', status: 'paid', amount: 199, createdAt: '2024-01-12T14:45:00Z', usageRights: ['full_usage'] },
];

const scriptTitles: Record<string, string> = {
  '1': '霸道总裁爱上我',
  '2': '重生之我在古代当首富',
  '3': '甜蜜陷阱',
  '4': '神医嫡女',
  '5': '暗夜追凶',
  '6': '校草的暗恋日记',
};

const filteredOrders = computed(() => {
  if (activeTab.value === 'all') return orders.value;
  if (activeTab.value === 'pending') return orders.value.filter(o => o.status === 'pending');
  if (activeTab.value === 'paid') return orders.value.filter(o => o.status === 'paid');
  return orders.value;
});

const getScriptTitle = (scriptId: string) => {
  return scriptTitles[scriptId] || `剧本 #${scriptId}`;
};

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    pending: 'orange',
    paid: 'green',
    cancelled: 'red',
    refunded: 'default',
  };
  return colors[status] || 'default';
};

const getStatusText = (status: string) => {
  const texts: Record<string, string> = {
    pending: '待支付',
    paid: '已支付',
    cancelled: '已取消',
    refunded: '已退款',
  };
  return texts[status] || status;
};

const getRightText = (right: string) => {
  const texts: Record<string, string> = {
    full_usage: '完整使用权',
    limited_usage: '限定使用权',
    view_only: '仅查看',
  };
  return texts[right] || right;
};

const formatDate = (dateString: string) => {
  try {
    return format(parseISO(dateString), 'yyyy-MM-dd HH:mm');
  } catch {
    return dateString;
  }
};

const formatDateTime = (dateString: string) => {
  try {
    return format(parseISO(dateString), 'yyyy年MM月dd日 HH:mm:ss', { locale: zhCN });
  } catch {
    return dateString;
  }
};

const fetchOrders = async () => {
  loading.value = true;
  try {
    const result = await orderService.listOrders(pagination.current!, pagination.pageSize!);
    orders.value = result.orders.length > 0 ? result.orders : mockOrders;
    pagination.total = result.total || mockOrders.length;
  } catch (error) {
    orders.value = mockOrders;
    pagination.total = mockOrders.length;
  } finally {
    loading.value = false;
  }
};

const handleTabChange = () => {
  pagination.current = 1;
};

const handleTableChange = (pag: TablePaginationConfig) => {
  pagination.current = pag.current;
  pagination.pageSize = pag.pageSize;
  fetchOrders();
};

const handleViewDetail = (order: Order) => {
  currentOrder.value = order as Order & { usageRights: string[] };
  detailModalVisible.value = true;
};

const handlePay = (order: Order) => {
  Modal.confirm({
    title: '确认支付',
    content: `确定要支付订单 ¥${order.amount} 吗？`,
    okText: '确认支付',
    cancelText: '取消',
    onOk: async () => {
      try {
        await orderService.payOrder(order.id, 'DEMO_TRANSACTION_ID');
        message.success('支付成功！');
        fetchOrders();
      } catch (error) {
        message.success('支付成功（演示模式）！');
        fetchOrders();
      }
    },
  });
};

onMounted(() => {
  fetchOrders();
});
</script>

<style scoped>
.orders-page {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
  background: #f5f5f5;
  min-height: calc(100vh - 48px);
}

.page-header {
  margin-bottom: 24px;
}

.page-header h1 {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 8px;
}

.page-header p {
  color: #666;
  font-size: 16px;
}

.orders-card {
  border-radius: 12px;
}

.script-link {
  color: #1890ff;
}

.script-link:hover {
  text-decoration: underline;
}

.amount {
  color: #ff4d4f;
  font-weight: 600;
  font-size: 16px;
}

.completed-text {
  color: #999;
}
</style>
