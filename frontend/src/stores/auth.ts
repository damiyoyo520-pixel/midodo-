import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  role: 'user' | 'creator' | 'admin';
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(null);
  const loading = ref(false);

  const isAuthenticated = computed(() => !!token.value);
  const isCreator = computed(() => user.value?.role === 'creator');

  const setUser = (newUser: User | null) => {
    user.value = newUser;
  };

  const setToken = (newToken: string | null) => {
    token.value = newToken;
    if (newToken) {
      localStorage.setItem('token', newToken);
    } else {
      localStorage.removeItem('token');
    }
  };

  const logout = () => {
    user.value = null;
    setToken(null);
  };

  const initializeAuth = () => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      // TODO: 调用 API 验证 token 并获取用户信息
    }
  };

  return {
    user,
    token,
    loading,
    isAuthenticated,
    isCreator,
    setUser,
    setToken,
    logout,
    initializeAuth,
  };
});
