import apiClient from './api';
import type { Script } from '@/stores/script';

export interface ScriptGeneratePayload {
  title: string;
  theme: string;
  keywords: string[];
  length: 'short' | 'medium' | 'long';
  style?: string;
}

export const scriptService = {
  /**
   * 生成剧本
   */
  async generateScript(payload: ScriptGeneratePayload): Promise<Script> {
    const response = await apiClient.post('/api/scripts/generate', payload);
    return response.data;
  },

  /**
   * 获取剧本详情
   */
  async getScript(id: string): Promise<Script> {
    const response = await apiClient.get(`/api/scripts/${id}`);
    return response.data;
  },

  /**
   * 获取剧本列表
   */
  async listScripts(page: number = 1, limit: number = 10): Promise<{ scripts: Script[]; total: number }> {
    const response = await apiClient.get('/api/scripts', {
      params: { page, limit },
    });
    return response.data;
  },

  /**
   * 发布剧本
   */
  async publishScript(id: string, price: number): Promise<Script> {
    const response = await apiClient.post(`/api/scripts/${id}/publish`, { price });
    return response.data;
  },
};
