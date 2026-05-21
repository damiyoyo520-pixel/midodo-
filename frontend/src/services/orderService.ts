import apiClient from './api';

export interface OrderCreatePayload {
  scriptId: string;
  usageRights: string[];
  paymentMethod: 'alipay' | 'wechat' | 'credit_card';
}

export interface Order {
  id: string;
  scriptId: string;
  status: string;
  amount: number;
  createdAt: string;
}

export const orderService = {
  /**
   * 创建订单
   */
  async createOrder(payload: OrderCreatePayload): Promise<Order> {
    const response = await apiClient.post('/api/orders', payload);
    return response.data;
  },

  /**
   * 获取订单详情
   */
  async getOrder(id: string): Promise<Order> {
    const response = await apiClient.get(`/api/orders/${id}`);
    return response.data;
  },

  /**
   * 获取用户订单列表
   */
  async listOrders(page: number = 1, limit: number = 10): Promise<{ orders: Order[]; total: number }> {
    const response = await apiClient.get('/api/orders', {
      params: { page, limit },
    });
    return response.data;
  },

  /**
   * 支付订单
   */
  async payOrder(id: string, transactionId: string): Promise<Order> {
    const response = await apiClient.post(`/api/orders/${id}/pay`, { transactionId });
    return response.data;
  },
};
