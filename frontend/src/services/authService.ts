import apiClient from './api';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
  };
}

export const authService = {
  /**
   * 登录
   */
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const response = await apiClient.post('/api/auth/login', payload);
    return response.data;
  },

  /**
   * 注册
   */
  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const response = await apiClient.post('/api/auth/register', payload);
    return response.data;
  },

  /**
   * 获取用户信息
   */
  async getUserInfo(): Promise<any> {
    const response = await apiClient.get('/api/auth/me');
    return response.data;
  },

  /**
   * 登出
   */
  async logout(): Promise<void> {
    await apiClient.post('/api/auth/logout');
  },
};
