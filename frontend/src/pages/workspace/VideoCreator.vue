<template>
  <div class="video-page">
    <div class="page-header">
      <div class="header-left">
        <router-link to="/workspace" class="back-btn">← 返回</router-link>
        <h1>生视频流程</h1>
      </div>
      <div class="header-actions">
        <a-button size="large">保存项目</a-button>
        <a-button type="primary" size="large" @click="startGeneration">🎬 开始生成</a-button>
      </div>
    </div>

    <div class="workflow-steps">
      <div v-for="(step, index) in steps" :key="index" 
           class="workflow-step" 
           :class="{ active: currentStep === index, completed: currentStep > index }">
        <div class="step-number">{{ index + 1 }}</div>
        <div class="step-content">
          <div class="step-title">{{ step.title }}</div>
          <div class="step-desc">{{ step.desc }}</div>
        </div>
        <div v-if="index < steps.length - 1" class="step-line"></div>
      </div>
    </div>

    <a-row :gutter="[24, 24]">
      <a-col :xs="24" :md="16">
        <div class="main-panel">
          <div class="panel-header">
            <h2>{{ steps[currentStep].title }}</h2>
          </div>

          <div v-if="currentStep === 0" class="step-content">
            <div class="script-selector">
              <div class="section-title">选择剧本</div>
              <div class="script-grid">
                <div v-for="script in scripts" :key="script.id" 
                     class="script-option" 
                     :class="{ selected: selectedScript?.id === script.id }"
                     @click="selectScript(script)">
                  <div class="script-thumb">
                    <img :src="script.poster" alt="剧本封面" />
                  </div>
                  <div class="script-info">
                    <div class="script-name">{{ script.title }}</div>
                    <div class="script-meta">{{ script.episodes }}集 · {{ script.genre }}</div>
                  </div>
                  <div class="script-check" v-if="selectedScript?.id === script.id">✓</div>
                </div>
              </div>
            </div>

            <div class="upload-section" style="margin-top: 24px;">
              <a-upload drag custom-request>
                <p class="ant-upload-drag-icon">📄</p>
                <p class="ant-upload-text">点击或拖拽上传剧本文件</p>
                <p class="ant-upload-hint">支持 .txt, .docx, .pdf 格式</p>
              </a-upload>
            </div>

            <div class="step-actions" style="margin-top: 24px;">
              <a-button type="primary" size="large" @click="nextStep" :disabled="!selectedScript">
                下一步：生成分镜
              </a-button>
            </div>
          </div>

          <div v-if="currentStep === 1" class="step-content">
            <div class="storyboard-preview">
              <div class="section-title">分镜预览</div>
              <div class="storyboard-grid">
                <div v-for="(shot, index) in storyboards" :key="index" class="storyboard-card">
                  <div class="shot-number">镜 {{ index + 1 }}</div>
                  <div class="shot-preview">
                    <img :src="shot.image" alt="分镜画面" />
                  </div>
                  <div class="shot-desc">{{ shot.description }}</div>
                  <div class="shot-duration">{{ shot.duration }}秒</div>
                </div>
              </div>
            </div>

            <div class="step-actions" style="margin-top: 24px;">
              <a-button size="large" @click="prevStep">上一步</a-button>
              <a-button type="primary" size="large" @click="nextStep">
                下一步：选择资产
              </a-button>
            </div>
          </div>

          <div v-if="currentStep === 2" class="step-content">
            <div class="assets-selection">
              <div class="section-title">选择资产</div>
              <a-tabs default-active-key="1">
                <a-tab-pane key="1" tab="角色">
                  <div class="assets-mini-grid">
                    <div v-for="asset in assets.characters" :key="asset.id" 
                         class="asset-mini" :class="{ selected: selectedAssets.includes(asset.id) }"
                         @click="toggleAsset(asset.id)">
                      <img :src="asset.url" alt="资产" />
                      <span>{{ asset.name }}</span>
                    </div>
                  </div>
                </a-tab-pane>
                <a-tab-pane key="2" tab="场景">
                  <div class="assets-mini-grid">
                    <div v-for="asset in assets.scenes" :key="asset.id" 
                         class="asset-mini" :class="{ selected: selectedAssets.includes(asset.id) }"
                         @click="toggleAsset(asset.id)">
                      <img :src="asset.url" alt="资产" />
                      <span>{{ asset.name }}</span>
                    </div>
                  </div>
                </a-tab-pane>
                <a-tab-pane key="3" tab="配音">
                  <div class="assets-mini-grid">
                    <div v-for="asset in assets.voices" :key="asset.id" 
                         class="asset-mini" :class="{ selected: selectedAssets.includes(asset.id) }"
                         @click="toggleAsset(asset.id)">
                      <div class="voice-placeholder">🎤</div>
                      <span>{{ asset.name }}</span>
                    </div>
                  </div>
                </a-tab-pane>
              </a-tabs>
            </div>

            <div class="step-actions" style="margin-top: 24px;">
              <a-button size="large" @click="prevStep">上一步</a-button>
              <a-button type="primary" size="large" @click="nextStep">
                下一步：视频生成
              </a-button>
            </div>
          </div>

          <div v-if="currentStep === 3" class="step-content">
            <div class="generation-config">
              <div class="section-title">生成设置</div>
              <a-form layout="vertical">
                <a-row :gutter="[16, 0]">
                  <a-col :span="12">
                    <a-form-item label="视频分辨率">
                      <a-select v-model:value="config.resolution">
                        <a-select-option value="720p">720p</a-select-option>
                        <a-select-option value="1080p">1080p</a-select-option>
                        <a-select-option value="4k">4K</a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item label="帧率">
                      <a-select v-model:value="config.fps">
                        <a-select-option value="24">24 fps</a-select-option>
                        <a-select-option value="30">30 fps</a-select-option>
                        <a-select-option value="60">60 fps</a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                </a-row>

                <a-form-item label="画面风格">
                  <a-radio-group v-model:value="config.style">
                    <a-radio value="realistic">写实</a-radio>
                    <a-radio value="anime">动漫</a-radio>
                    <a-radio value="3d">3D</a-radio>
                  </a-radio-group>
                </a-form-item>

                <a-form-item label="视频比例">
                  <a-radio-group v-model:value="config.ratio">
                    <a-radio value="9:16">竖屏 9:16</a-radio>
                    <a-radio value="16:9">横屏 16:9</a-radio>
                    <a-radio value="1:1">方形 1:1</a-radio>
                  </a-radio-group>
                </a-form-item>
              </a-form>
            </div>

            <div class="step-actions" style="margin-top: 24px;">
              <a-button size="large" @click="prevStep">上一步</a-button>
              <a-button type="primary" size="large" @click="startGeneration">
                ✨ 开始生成视频
              </a-button>
            </div>
          </div>

          <div v-if="currentStep === 4" class="step-content">
            <div class="generation-progress">
              <div v-if="!generationComplete" class="progress-section">
                <div class="progress-icon">⏳</div>
                <div class="progress-title">正在生成视频...</div>
                <div class="progress-desc">{{ currentTask }}</div>
                <a-progress :percent="generationProgress" :stroke-color="{ '0%': '#dc2626', '100%': '#ff6b6b' }" style="margin-top: 24px;" />
                <div class="progress-tasks">
                  <div v-for="(task, index) in tasks" :key="index" class="task-item" :class="{ done: task.done, active: task.active }">
                    <span class="task-icon">{{ task.icon }}</span>
                    <span class="task-name">{{ task.name }}</span>
                    <span v-if="task.done" class="task-check">✓</span>
                  </div>
                </div>
              </div>

              <div v-else class="complete-section">
                <div class="complete-icon">🎉</div>
                <div class="complete-title">视频生成完成！</div>
                <div class="video-preview">
                  <div class="video-placeholder">
                    <div class="play-button">▶</div>
                    <img :src="previewImage" alt="视频预览" />
                  </div>
                </div>
                <div class="complete-actions">
                  <a-button size="large">📥 下载视频</a-button>
                  <a-button size="large">📤 发布到平台</a-button>
                  <a-button type="primary" size="large" @click="createNew">🆕 新建项目</a-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a-col>

      <a-col :xs="24" :md="8">
        <div class="summary-panel">
          <div class="panel-header">
            <h2>项目概览</h2>
          </div>

          <div v-if="selectedScript" class="summary-item">
            <div class="summary-label">📝 剧本</div>
            <div class="summary-value">{{ selectedScript.title }}</div>
          </div>

          <div class="summary-item">
            <div class="summary-label">🎬 分镜</div>
            <div class="summary-value">{{ storyboards.length }}个镜头</div>
          </div>

          <div class="summary-item">
            <div class="summary-label">🎨 资产</div>
            <div class="summary-value">{{ selectedAssets.length }}个已选</div>
          </div>

          <div class="summary-item">
            <div class="summary-label">⏱️ 预计时长</div>
            <div class="summary-value">{{ totalDuration }}秒</div>
          </div>

          <div class="summary-divider"></div>

          <div class="summary-total">
            <div class="summary-label">📊 项目进度</div>
            <div class="summary-value">{{ Math.round(((currentStep + 1) / steps.length) * 100) }}%</div>
          </div>

          <div class="my-projects" style="margin-top: 24px;">
            <div class="section-title">我的项目</div>
            <div class="project-list">
              <div v-for="project in projects" :key="project.id" class="project-item">
                <div class="project-thumb">
                  <img :src="project.thumbnail" alt="项目" />
                </div>
                <div class="project-info">
                  <div class="project-name">{{ project.name }}</div>
                  <div class="project-date">{{ project.date }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

const currentStep = ref(0)
const selectedScript = ref<any>(null)
const selectedAssets = ref<number[]>([])
const generationProgress = ref(0)
const generationComplete = ref(false)
const currentTask = ref('准备生成...')

const steps = [
  { title: '选择剧本', desc: '上传或选择已有剧本' },
  { title: '生成分镜', desc: 'AI自动生成分镜脚本' },
  { title: '选择资产', desc: '选择角色、场景等素材' },
  { title: '视频生成', desc: '配置并生成最终视频' },
  { title: '完成', desc: '下载或发布视频' }
]

const scripts = ref([
  { id: 1, title: '绣娘传', episodes: 24, genre: '非遗', poster: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=280&fit=crop' },
  { id: 2, title: '唐人街往事', episodes: 16, genre: '海外', poster: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=200&h=280&fit=crop' },
  { id: 3, title: '西湖·千年情', episodes: 20, genre: '文旅', poster: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=200&h=280&fit=crop' }
])

const storyboards = ref([
  { id: 1, description: '清晨江南古镇', duration: 5, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop' },
  { id: 2, description: '绣娘走进绣坊', duration: 4, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=200&fit=crop' },
  { id: 3, description: '特写刺绣过程', duration: 6, image: 'https://images.unsplash.com/photo-1615566815110-8a69b94f40f6?w=300&h=200&fit=crop' },
  { id: 4, description: '完成的作品展示', duration: 5, image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=300&h=200&fit=crop' }
])

const assets = reactive({
  characters: [
    { id: 1, name: '绣娘', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=160&fit=crop' },
    { id: 2, name: '母亲', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=160&fit=crop' }
  ],
  scenes: [
    { id: 3, name: '绣坊', url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=120&h=160&fit=crop' },
    { id: 4, name: '古镇', url: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=120&h=160&fit=crop' }
  ],
  voices: [
    { id: 5, name: '温柔女声' },
    { id: 6, name: '成熟女声' }
  ]
})

const projects = ref([
  { id: 1, name: '绣娘传v1', date: '2026-06-01', thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=80&h=60&fit=crop' },
  { id: 2, name: '西湖宣传片', date: '2026-05-28', thumbnail: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=80&h=60&fit=crop' }
])

const config = reactive({
  resolution: '1080p',
  fps: '30',
  style: 'realistic',
  ratio: '9:16'
})

const tasks = ref([
  { name: '处理剧本内容', icon: '📝', done: false, active: false },
  { name: '生成视频画面', icon: '🎬', done: false, active: false },
  { name: '合成配音音效', icon: '🎤', done: false, active: false },
  { name: '添加背景音乐', icon: '🎵', done: false, active: false },
  { name: '导出最终视频', icon: '📦', done: false, active: false }
])

const previewImage = 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=600&h=400&fit=crop'

const totalDuration = computed(() => {
  return storyboards.value.reduce((sum, s) => sum + s.duration, 0)
})

const selectScript = (script: any) => {
  selectedScript.value = script
}

const toggleAsset = (id: number) => {
  const index = selectedAssets.value.indexOf(id)
  if (index > -1) {
    selectedAssets.value.splice(index, 1)
  } else {
    selectedAssets.value.push(id)
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const nextStep = () => {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++
  }
}

const startGeneration = () => {
  if (currentStep.value < 3) {
    currentStep.value = 3
    return
  }
  
  currentStep.value = 4
  generationComplete.value = false
  generationProgress.value = 0
  
  let taskIndex = 0
  tasks.value.forEach((t, i) => {
    t.done = false
    t.active = i === 0
  })

  const interval = setInterval(() => {
    generationProgress.value += 2
    
    if (generationProgress.value >= 20 && taskIndex === 0) {
      tasks.value[0].done = true
      tasks.value[0].active = false
      tasks.value[1].active = true
      currentTask.value = tasks.value[1].name
      taskIndex++
    }
    if (generationProgress.value >= 45 && taskIndex === 1) {
      tasks.value[1].done = true
      tasks.value[1].active = false
      tasks.value[2].active = true
      currentTask.value = tasks.value[2].name
      taskIndex++
    }
    if (generationProgress.value >= 70 && taskIndex === 2) {
      tasks.value[2].done = true
      tasks.value[2].active = false
      tasks.value[3].active = true
      currentTask.value = tasks.value[3].name
      taskIndex++
    }
    if (generationProgress.value >= 90 && taskIndex === 3) {
      tasks.value[3].done = true
      tasks.value[3].active = false
      tasks.value[4].active = true
      currentTask.value = tasks.value[4].name
      taskIndex++
    }
    
    if (generationProgress.value >= 100) {
      clearInterval(interval)
      tasks.value[4].done = true
      tasks.value[4].active = false
      generationComplete.value = true
    }
  }, 100)
}

const createNew = () => {
  currentStep.value = 0
  selectedScript.value = null
  selectedAssets.value = []
  generationProgress.value = 0
  generationComplete.value = false
  tasks.value.forEach(t => {
    t.done = false
    t.active = false
  })
}
</script>

<style scoped>
.video-page {
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
  margin-bottom: 24px;
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

.workflow-steps {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
  padding: 0 48px;
}

.workflow-step {
  display: flex;
  align-items: center;
  flex: 1;
}

.step-number {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #1f2937;
  border: 2px solid #374151;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  color: #9ca3af;
  flex-shrink: 0;
  transition: all 0.3s;
}

.workflow-step.active .step-number,
.workflow-step.completed .step-number {
  background: #dc2626;
  border-color: #dc2626;
  color: white;
}

.step-content {
  margin-left: 12px;
}

.step-title {
  font-size: 14px;
  font-weight: 600;
  color: white;
}

.step-desc {
  font-size: 12px;
  color: #9ca3af;
}

.step-line {
  flex: 1;
  height: 2px;
  background: #374151;
  margin: 0 24px;
  transition: background 0.3s;
}

.workflow-step.completed + .workflow-step .step-line,
.workflow-step.completed .step-line {
  background: #dc2626;
}

.main-panel,
.summary-panel {
  background: linear-gradient(135deg, #1f2937 0%, #0f172a 100%);
  border: 1px solid #374151;
  border-radius: 12px;
  padding: 24px;
}

.panel-header {
  margin-bottom: 24px;
}

.panel-header h2 {
  font-size: 20px;
  font-weight: 700;
  color: white;
  margin: 0;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: white;
  margin-bottom: 16px;
}

.script-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.script-option {
  position: relative;
  background: #0f172a;
  border: 2px solid #374151;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.script-option:hover {
  border-color: #dc2626;
}

.script-option.selected {
  border-color: #dc2626;
  background: rgba(220, 38, 38, 0.1);
}

.script-thumb {
  aspect-ratio: 3/4;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 12px;
}

.script-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.script-info {
  text-align: center;
}

.script-name {
  font-size: 14px;
  font-weight: 600;
  color: white;
  margin-bottom: 4px;
}

.script-meta {
  font-size: 12px;
  color: #9ca3af;
}

.script-check {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 28px;
  height: 28px;
  background: #dc2626;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
}

.step-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.storyboard-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.storyboard-card {
  background: #0f172a;
  border: 1px solid #374151;
  border-radius: 10px;
  overflow: hidden;
}

.shot-number {
  background: #dc2626;
  color: white;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
}

.shot-preview {
  aspect-ratio: 16/9;
  overflow: hidden;
}

.shot-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.shot-desc {
  padding: 12px;
  font-size: 14px;
  color: white;
}

.shot-duration {
  padding: 0 12px 12px;
  font-size: 12px;
  color: #9ca3af;
}

.assets-mini-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.asset-mini {
  background: #0f172a;
  border: 2px solid #374151;
  border-radius: 10px;
  padding: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}

.asset-mini:hover {
  border-color: #dc2626;
}

.asset-mini.selected {
  border-color: #dc2626;
  background: rgba(220, 38, 38, 0.1);
}

.asset-mini img {
  width: 100%;
  aspect-ratio: 3/4;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 8px;
}

.voice-placeholder {
  width: 100%;
  aspect-ratio: 3/4;
  background: #1f2937;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  margin-bottom: 8px;
}

.asset-mini span {
  font-size: 12px;
  color: white;
}

.generation-progress {
  text-align: center;
  padding: 48px 24px;
}

.progress-icon,
.complete-icon {
  font-size: 64px;
  margin-bottom: 24px;
}

.progress-title,
.complete-title {
  font-size: 24px;
  font-weight: 700;
  color: white;
  margin-bottom: 8px;
}

.progress-desc {
  font-size: 16px;
  color: #9ca3af;
  margin-bottom: 24px;
}

.progress-tasks {
  margin-top: 32px;
  text-align: left;
}

.task-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #0f172a;
  border-radius: 8px;
  margin-bottom: 8px;
  opacity: 0.5;
  transition: all 0.3s;
}

.task-item.active {
  opacity: 1;
  border: 1px solid #dc2626;
}

.task-item.done {
  opacity: 1;
}

.task-icon {
  font-size: 20px;
}

.task-name {
  flex: 1;
  color: white;
}

.task-check {
  color: #10b981;
  font-weight: 700;
}

.video-preview {
  margin: 24px 0;
}

.video-placeholder {
  aspect-ratio: 16/9;
  background: #0f172a;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
}

.video-placeholder img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background: rgba(220, 38, 38, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: white;
  cursor: pointer;
  transition: transform 0.3s;
}

.play-button:hover {
  transform: translate(-50%, -50%) scale(1.1);
}

.complete-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #374151;
}

.summary-label {
  color: #9ca3af;
  font-size: 14px;
}

.summary-value {
  color: white;
  font-weight: 600;
  font-size: 14px;
}

.summary-divider {
  height: 1px;
  background: #374151;
  margin: 16px 0;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
}

.my-projects {
  margin-top: 24px;
}

.project-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.project-item {
  display: flex;
  gap: 12px;
  background: #0f172a;
  border-radius: 8px;
  padding: 12px;
}

.project-thumb {
  width: 60px;
  height: 45px;
  border-radius: 6px;
  overflow: hidden;
  flex-shrink: 0;
}

.project-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-info {
  flex: 1;
}

.project-name {
  font-size: 14px;
  color: white;
  font-weight: 600;
}

.project-date {
  font-size: 12px;
  color: #9ca3af;
}
</style>
