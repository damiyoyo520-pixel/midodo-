<template>
  <div class="storyboard-page">
    <div class="page-header">
      <div class="header-left">
        <router-link to="/workspace" class="back-btn">← 返回</router-link>
        <h1>视频分镜</h1>
      </div>
      <div class="header-actions">
        <a-button size="large">保存</a-button>
        <a-button type="primary" size="large">导出分镜</a-button>
      </div>
    </div>

    <a-row :gutter="[24, 24]">
      <a-col :xs="24" :md="8">
        <div class="scenes-panel">
          <div class="panel-header">
            <h2>分镜列表</h2>
            <a-button type="primary" @click="addScene">+ 添加分镜</a-button>
          </div>
          
          <div class="scenes-list">
            <div v-for="(scene, index) in storyboards" :key="index" class="scene-card" :class="{ active: currentScene === index }" @click="currentScene = index">
              <div class="scene-thumb">
                <img v-if="scene.image" :src="scene.image" alt="分镜" />
                <div v-else class="placeholder">
                  <span>🎬</span>
                </div>
              </div>
              <div class="scene-info">
                <div class="scene-number">镜 {{ index + 1 }}</div>
                <div class="scene-title">{{ scene.title || '未命名' }}</div>
                <div class="scene-duration">{{ scene.duration }}s</div>
              </div>
            </div>
          </div>
        </div>
      </a-col>

      <a-col :xs="24" :md="16">
        <div class="editor-panel">
          <div class="panel-header">
            <h2>分镜编辑</h2>
          </div>

          <div v-if="storyboards[currentScene]" class="editor-content">
            <a-row :gutter="[24, 24]">
              <a-col :span="14">
                <div class="image-section">
                  <div class="image-preview">
                    <img v-if="storyboards[currentScene].image" :src="storyboards[currentScene].image" alt="分镜画面" />
                    <div v-else class="placeholder-large">
                      <span class="placeholder-icon">🖼️</span>
                      <p>点击上传或生成画面</p>
                    </div>
                  </div>
                  <div class="image-actions">
                    <a-button block @click="generateImage">
                      🎨 AI 生成画面
                    </a-button>
                    <a-button block>
                      📁 上传图片
                    </a-button>
                  </div>
                </div>
              </a-col>

              <a-col :span="10">
                <a-form layout="vertical">
                  <a-form-item label="分镜标题">
                    <a-input v-model:value="storyboards[currentScene].title" placeholder="输入分镜标题" />
                  </a-form-item>

                  <a-form-item label="时长(秒)">
                    <a-input-number v-model:value="storyboards[currentScene].duration" :min="1" :max="60" style="width: 100%" />
                  </a-form-item>

                  <a-form-item label="景别">
                    <a-select v-model:value="storyboards[currentScene].shotType">
                      <a-select-option value="wide">远景</a-select-option>
                      <a-select-option value="full">全景</a-select-option>
                      <a-select-option value="medium">中景</a-select-option>
                      <a-select-option value="close">近景</a-select-option>
                      <a-select-option value="detail">特写</a-select-option>
                    </a-select>
                  </a-form-item>

                  <a-form-item label="镜头运动">
                    <a-select v-model:value="storyboards[currentScene].cameraMovement">
                      <a-select-option value="fixed">固定镜头</a-select-option>
                      <a-select-option value="pan">横摇</a-select-option>
                      <a-select-option value="tilt">竖摇</a-select-option>
                      <a-select-option value="zoom">推拉</a-select-option>
                      <a-select-option value="follow">跟随</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-form>
              </a-col>
            </a-row>

            <a-form layout="vertical" style="margin-top: 24px;">
              <a-form-item label="画面描述">
                <a-textarea v-model:value="storyboards[currentScene].description" :rows="3" placeholder="描述这个镜头的画面内容" />
              </a-form-item>

              <a-row :gutter="[16, 0]">
                <a-col :span="12">
                  <a-form-item label="对白/旁白">
                    <a-textarea v-model:value="storyboards[currentScene].dialogue" :rows="4" placeholder="角色对话或旁白内容" />
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item label="音效/音乐">
                    <a-textarea v-model:value="storyboards[currentScene].audio" :rows="4" placeholder="音效或背景音乐说明" />
                  </a-form-item>
                </a-col>
              </a-row>

              <a-form-item label="备注">
                <a-textarea v-model:value="storyboards[currentScene].notes" :rows="2" placeholder="其他备注信息" />
              </a-form-item>
            </a-form>
          </div>

          <div v-else class="empty-state">
            <div class="empty-icon">🎬</div>
            <p>选择或创建一个分镜开始编辑</p>
          </div>
        </div>
      </a-col>
    </a-row>

    <div class="timeline-section" style="margin-top: 24px;">
      <div class="panel-header">
        <h2>时间轴预览</h2>
      </div>
      <div class="timeline">
        <div v-for="(scene, index) in storyboards" :key="index" class="timeline-item" :class="{ active: currentScene === index }" @click="currentScene = index">
          <div class="timeline-thumb">
            <img v-if="scene.image" :src="scene.image" alt="" />
            <span v-else class="thumb-placeholder">🎬</span>
          </div>
          <div class="timeline-info">
            <div class="timeline-num">镜 {{ index + 1 }}</div>
            <div class="timeline-time">{{ scene.duration }}s</div>
          </div>
        </div>
        <div class="timeline-total">
          总时长: {{ totalDuration }}s
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const currentScene = ref(0)

const storyboards = ref([
  {
    title: '开场 - 绣坊',
    duration: 5,
    shotType: 'wide',
    cameraMovement: 'pan',
    description: '清晨的江南古镇，阳光洒在古老的绣坊上',
    dialogue: '',
    audio: '鸟鸣声，悠扬的古乐',
    notes: '',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
  },
  {
    title: '主角登场',
    duration: 3,
    shotType: 'medium',
    cameraMovement: 'fixed',
    description: '苏婉走进绣坊，开始准备刺绣工具',
    dialogue: '苏婉：又是美好的一天',
    audio: '轻轻的脚步声',
    notes: '',
    image: ''
  },
  {
    title: '刺绣特写',
    duration: 4,
    shotType: 'detail',
    cameraMovement: 'zoom',
    description: '特写苏婉的手，银针在绣布上翻飞',
    dialogue: '',
    audio: '轻柔的针线声',
    notes: '',
    image: ''
  }
])

const totalDuration = computed(() => {
  return storyboards.value.reduce((sum, scene) => sum + scene.duration, 0)
})

const addScene = () => {
  storyboards.value.push({
    title: '',
    duration: 3,
    shotType: 'medium',
    cameraMovement: 'fixed',
    description: '',
    dialogue: '',
    audio: '',
    notes: '',
    image: ''
  })
  currentScene.value = storyboards.value.length - 1
}

const generateImage = () => {
  if (storyboards.value[currentScene.value]) {
    storyboards.value[currentScene.value].image = 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=400&h=300&fit=crop'
  }
}
</script>

<style scoped>
.storyboard-page {
  padding: 24px;
  max-width: 1600px;
  margin: 0 auto;
  min-height: 100vh;
  background: #0f0f0f;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #374151;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 24px;
}

.back-btn {
  color: #9ca3af;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s;
}

.back-btn:hover {
  color: #dc2626;
}

.header-left h1 {
  font-size: 28px;
  font-weight: 700;
  color: white;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.scenes-panel,
.editor-panel,
.timeline-section {
  background: linear-gradient(135deg, #1f2937 0%, #0f172a 100%);
  border: 1px solid #374151;
  border-radius: 12px;
  padding: 24px;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.panel-header h2 {
  font-size: 20px;
  font-weight: 700;
  color: white;
  margin: 0;
}

.scenes-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 600px;
  overflow-y: auto;
}

.scene-card {
  display: flex;
  gap: 12px;
  background: #0f172a;
  border: 1px solid #374151;
  border-radius: 10px;
  padding: 12px;
  cursor: pointer;
  transition: all 0.3s;
}

.scene-card:hover,
.scene-card.active {
  border-color: #dc2626;
  background: rgba(220, 38, 38, 0.1);
}

.scene-thumb {
  width: 80px;
  height: 60px;
  border-radius: 6px;
  overflow: hidden;
  flex-shrink: 0;
}

.scene-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.scene-thumb .placeholder {
  width: 100%;
  height: 100%;
  background: #1f2937;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.scene-info {
  flex: 1;
  min-width: 0;
}

.scene-number {
  font-size: 12px;
  color: #dc2626;
  font-weight: 600;
  margin-bottom: 4px;
}

.scene-title {
  font-size: 14px;
  color: white;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.scene-duration {
  font-size: 12px;
  color: #9ca3af;
}

.editor-content {
  min-height: 400px;
}

.image-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.image-preview {
  aspect-ratio: 4/3;
  background: #0f172a;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #374151;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.placeholder-large {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.placeholder-icon {
  font-size: 48px;
}

.placeholder-large p {
  color: #9ca3af;
  margin: 0;
}

.image-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.empty-state {
  text-align: center;
  padding: 80px 24px;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.empty-state p {
  color: #9ca3af;
  font-size: 16px;
}

.timeline {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 12px;
  align-items: flex-end;
}

.timeline-item {
  flex-shrink: 0;
  width: 120px;
  cursor: pointer;
  transition: all 0.3s;
}

.timeline-item:hover {
  transform: translateY(-4px);
}

.timeline-thumb {
  aspect-ratio: 4/3;
  background: #0f172a;
  border: 2px solid #374151;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
}

.timeline-item.active .timeline-thumb {
  border-color: #dc2626;
}

.timeline-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.timeline-info {
  text-align: center;
  margin-top: 8px;
}

.timeline-num {
  font-size: 12px;
  color: #dc2626;
  font-weight: 600;
}

.timeline-time {
  font-size: 12px;
  color: #9ca3af;
}

.timeline-total {
  margin-left: auto;
  padding: 16px 24px;
  background: rgba(220, 38, 38, 0.1);
  border: 1px solid rgba(220, 38, 38, 0.3);
  border-radius: 8px;
  color: white;
  font-weight: 600;
  flex-shrink: 0;
}
</style>
