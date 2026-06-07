<template>
  <div class="register-page">
    <div class="register-container">
      <a-card class="register-card">
        <h1>注册</h1>
        <p class="subtitle">创建您的短剧交易平台账号</p>

        <a-form
          :model="formState"
          @finish="handleRegister"
          layout="vertical"
          class="register-form"
        >
          <a-form-item
            name="username"
            :rules="[{ required: true, message: '请输入用户名' }]"
          >
            <a-input
              v-model:value="formState.username"
              placeholder="用户名"
              size="large"
            >
              <template #prefix>
                <UserOutlined />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item
            name="email"
            :rules="[
              { required: true, message: '请输入邮箱地址' },
              { type: 'email', message: '请输入有效的邮箱地址' }
            ]"
          >
            <a-input
              v-model:value="formState.email"
              placeholder="邮箱地址"
              size="large"
            >
              <template #prefix>
                <MailOutlined />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item
            name="password"
            :rules="[
              { required: true, message: '请输入密码' },
              { min: 6, message: '密码至少6位' }
            ]"
          >
            <a-input-password
              v-model:value="formState.password"
              placeholder="密码（至少6位）"
              size="large"
            >
              <template #prefix>
                <LockOutlined />
              </template>
            </a-input-password>
          </a-form-item>

          <a-form-item
            name="confirmPassword"
            :rules="[
              { required: true, message: '请确认密码' },
              { validator: validateConfirmPassword, trigger: 'change' }
            ]"
          >
            <a-input-password
              v-model:value="formState.confirmPassword"
              placeholder="确认密码"
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
              注册
            </a-button>
          </a-form-item>
        </a-form>

        <div class="register-footer">
          已有账号？
          <router-link to="/login">立即登录</router-link>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons-vue';
import { useAuthStore } from '@/stores/auth';
import { authService } from '@/services/authService';

const router = useRouter();
const authStore = useAuthStore();
const loading = ref(false);

const formState = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const validateConfirmPassword = async (_rule: any, value: string) => {
  if (value !== formState.password) {
    throw new Error('两次输入的密码不一致');
  }
};

const handleRegister = async () => {
  loading.value = true;
  try {
    const response = await authService.register({
      username: formState.username,
      email: formState.email,
      password: formState.password,
    });
    authStore.setToken(response.token);
    authStore.setUser(response.user);
    message.success('注册成功');
    router.push('/dashboard');
  } catch (error: any) {
    message.error(error.response?.data?.message || '注册失败，请重试');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.register-container {
  width: 100%;
  max-width: 420px;
}

.register-card {
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.register-card h1 {
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

.register-form {
  margin-top: 24px;
}

.register-footer {
  text-align: center;
  margin-top: 16px;
  color: #666;
}

.register-footer a {
  color: #1890ff;
  margin-left: 4px;
}

.register-footer a:hover {
  text-decoration: underline;
}
</style>
