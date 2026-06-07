<template>
  <div class="login-page">
    <div class="login-container">
      <a-card class="login-card">
        <h1>登录</h1>
        <p class="subtitle">欢迎回到短剧交易平台</p>

        <a-form
          :model="formState"
          @finish="handleLogin"
          layout="vertical"
          class="login-form"
        >
          <a-form-item
            name="email"
            :rules="[{ required: true, message: '请输入邮箱地址' }]"
          >
            <a-input
              v-model:value="formState.email"
              placeholder="邮箱地址"
              size="large"
            >
              <template #prefix>
                <UserOutlined />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item
            name="password"
            :rules="[{ required: true, message: '请输入密码' }]"
          >
            <a-input-password
              v-model:value="formState.password"
              placeholder="密码"
              size="large"
            >
              <template #prefix>
                <LockOutlined />
              </template>
            </a-input-password>
          </a-form-item>

          <a-form-item>
            <a-button
              type="primary"
              html-type="submit"
              size="large"
              block
              :loading="loading"
            >
              登录
            </a-button>
          </a-form-item>
        </a-form>

        <div class="login-footer">
          还没有账号？
          <router-link to="/register">立即注册</router-link>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { useAuthStore } from '@/stores/auth';
import { authService } from '@/services/authService';

const router = useRouter();
const authStore = useAuthStore();
const loading = ref(false);

const formState = reactive({
  email: '',
  password: '',
});

const handleLogin = async () => {
  loading.value = true;
  try {
    const response = await authService.login(formState);
    authStore.setToken(response.token);
    authStore.setUser(response.user);
    message.success('登录成功');
    router.push('/dashboard');
  } catch (error: any) {
    message.error(error.response?.data?.message || '登录失败，请检查邮箱和密码');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-container {
  width: 100%;
  max-width: 420px;
}

.login-card {
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.login-card h1 {
  text-align: center;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
}

.subtitle {
  text-align: center;
  color: #999;
  margin-bottom: 32px;
}

.login-form {
  margin-top: 24px;
}

.login-footer {
  text-align: center;
  margin-top: 16px;
  color: #666;
}

.login-footer a {
  color: #1890ff;
  margin-left: 4px;
}

.login-footer a:hover {
  text-decoration: underline;
}
</style>
