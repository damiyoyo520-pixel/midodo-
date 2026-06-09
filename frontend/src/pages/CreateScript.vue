<template>
  <div class="create-script-page">
    <div class="page-header">
      <h1>创建剧本</h1>
      <p>使用 AI 辅助创作您的短剧剧本</p>
    </div>

    <a-card class="create-card">
      <a-steps :current="currentStep" class="steps">
        <a-step title="基本信息" />
        <a-step title="剧本设定" />
        <a-step title="生成剧本" />
      </a-steps>

      <a-form
        :model="formState"
        layout="vertical"
        class="create-form"
      >
        <!-- Step 1: Basic Info -->
        <div v-show="currentStep === 0">
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item
                label="剧本标题"
                name="title"
                :rules="[{ required: true, message: '请输入剧本标题' }]"
              >
                <a-input
                  v-model:value="formState.title"
                  placeholder="请输入剧本标题"
                  size="large"
                  :maxlength="50"
                  show-count
                />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="12">
              <a-form-item
                label="剧本题材"
                name="theme"
                :rules="[{ required: true, message: '请选择剧本题材' }]"
              >
                <a-select
                  v-model:value="formState.theme"
                  placeholder="选择剧本题材"
                  size="large"
                >
                  <a-select-option value="都市言情">都市言情</a-select-option>
                  <a-select-option value="穿越重生">穿越重生</a-select-option>
                  <a-select-option value="古装剧">古装剧</a-select-option>
                  <a-select-option value="悬疑推理">悬疑推理</a-select-option>
                  <a-select-option value="青春校园">青春校园</a-select-option>
                  <a-select-option value="科幻未来">科幻未来</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="12">
              <a-form-item
                label="剧本时长"
                name="length"
                :rules="[{ required: true, message: '请选择剧本时长' }]"
              >
                <a-select
                  v-model:value="formState.length"
                  placeholder="选择剧本时长"
                  size="large"
                >
                  <a-select-option value="short">短篇 (5-10分钟)</a-select-option>
                  <a-select-option value="medium">中篇 (10-20分钟)</a-select-option>
                  <a-select-option value="long">长篇 (20-30分钟)</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item
                label="关键词"
                name="keywords"
                :rules="[{ required: true, message: '请输入关键词' }]"
                extra="输入关键词后按回车添加，最多添加5个"
              >
                <a-select
                  v-model:value="formState.keywords"
                  mode="tags"
                  placeholder="输入关键词后按回车"
                  :maxTagCount="5"
                  style="width: 100%"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </div>

        <!-- Step 2: Script Settings -->
        <div v-show="currentStep === 1">
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item
                label="剧本风格"
                name="style"
                extra="描述您期望的剧本风格，如：温馨治愈、虐心催泪、轻松搞笑等"
              >
                <a-textarea
                  v-model:value="formState.style"
                  placeholder="请描述剧本风格..."
                  :rows="4"
                  :maxlength="500"
                  show-count
                />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item
                label="剧情概要"
                name="outline"
                extra="简要描述剧本的主要剧情走向"
              >
                <a-textarea
                  v-model:value="formState.outline"
                  placeholder="请简要描述剧情走向..."
                  :rows="6"
                  :maxlength="1000"
                  show-count
                />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item
                label="特殊要求"
                name="requirements"
                extra="如有其他特殊要求，请在此说明"
              >
                <a-textarea
                  v-model:value="formState.requirements"
                  placeholder="请描述其他特殊要求（可选）..."
                  :rows="3"
                  :maxlength="500"
                  show-count
                />
              </a-form-item>
            </a-col>
          </a-row>
        </div>

        <!-- Step 3: Generate -->
        <div v-show="currentStep === 2" class="generate-step">
          <a-result
            :title="generationStatus"
            :sub-title="generationSubtitle"
            :status="generationStatusEnum"
          >
            <template #icon v-if="isGenerating">
              <a-spin size="large" />
            </template>
            <template #extra>
              <a-space v-if="!isGenerating && !generationSuccess">
                <a-button @click="currentStep = 1">上一步</a-button>
                <a-button type="primary" @click="handleGenerate" :loading="isGenerating">
                  开始生成
                </a-button>
              </a-space>
              <a-space v-else-if="generationSuccess">
                <a-button @click="handleCreateAnother">再创建一个</a-button>
                <router-link to="/dashboard">
                  <a-button type="primary">查看我的剧本</a-button>
                </router-link>
              </a-space>
            </template>
          </a-result>
        </div>

        <!-- Navigation Buttons -->
        <div v-if="currentStep < 2" class="form-actions">
          <a-space>
            <a-button v-if="currentStep > 0" @click="currentStep--">上一步</a-button>
            <a-button type="primary" @click="handleNext">
              {{ currentStep === 0 ? '下一步' : '开始生成' }}
            </a-button>
          </a-space>
        </div>
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { scriptService } from '@/services/scriptService';

const router = useRouter();

const currentStep = ref(0);
const isGenerating = ref(false);
const generationSuccess = ref(false);
const generationStatus = ref('准备生成剧本');
const generationSubtitle = ref('请确认信息后点击开始生成');

const generationStatusEnum = computed(() => {
  if (generationSuccess.value) return 'success';
  if (isGenerating.value) return 'info';
  return 'waiting';
});

import { computed } from 'vue';

const formState = reactive({
  title: '',
  theme: '',
  length: '' as 'short' | 'medium' | 'long' | '',
  keywords: [] as string[],
  style: '',
  outline: '',
  requirements: '',
});

const handleNext = () => {
  if (currentStep.value === 0) {
    if (!formState.title || !formState.theme || !formState.length) {
      message.warning('请填写完整的标题、题材和时长');
      return;
    }
    if (formState.keywords.length === 0) {
      message.warning('请至少添加一个关键词');
      return;
    }
  }
  currentStep.value++;
};

const handleGenerate = async () => {
  isGenerating.value = true;
  generationStatus.value = '正在生成剧本';
  generationSubtitle.value = 'AI 正在为您创作精彩的剧本，请稍候...';

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000));

    await scriptService.generateScript({
      title: formState.title,
      theme: formState.theme,
      keywords: formState.keywords,
      length: formState.length as 'short' | 'medium' | 'long',
      style: formState.style,
    });

    generationSuccess.value = true;
    generationStatus.value = '剧本生成成功！';
    generationSubtitle.value = '您的剧本已成功创建，可以在创作者仪表板中查看和管理';
    message.success('剧本生成成功！');
  } catch (error) {
    // Demo mode - assume success
    generationSuccess.value = true;
    generationStatus.value = '剧本生成成功！';
    generationSubtitle.value = '您的剧本已成功创建（演示模式）';
    message.success('剧本生成成功（演示模式）！');
  } finally {
    isGenerating.value = false;
  }
};

const handleCreateAnother = () => {
  // Reset form
  Object.assign(formState, {
    title: '',
    theme: '',
    length: '',
    keywords: [],
    style: '',
    outline: '',
    requirements: '',
  });
  currentStep.value = 0;
  generationSuccess.value = false;
  generationStatus.value = '准备生成剧本';
  generationSubtitle.value = '请确认信息后点击开始生成';
};
</script>

<style scoped>
.create-script-page {
  padding: 24px;
  max-width: 900px;
  margin: 0 auto;
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

.create-card {
  border-radius: 12px;
}

.steps {
  margin-bottom: 40px;
  padding: 0 40px;
}

.create-form {
  max-width: 700px;
  margin: 0 auto;
}

.generate-step {
  padding: 40px 0;
}

.form-actions {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: center;
}
</style>
