<template>
  <div class="script-creator-page">
    <div class="page-header">
      <div class="header-left">
        <router-link to="/workspace" class="back-btn">← 返回</router-link>
        <h1>剧本创作</h1>
      </div>
      <div class="header-actions">
        <a-button size="large">保存草稿</a-button>
        <a-button type="primary" size="large">发布剧本</a-button>
      </div>
    </div>

    <a-row :gutter="[24, 24]">
      <a-col :xs="24" :md="16">
        <div class="editor-panel">
          <div class="panel-header">
            <h2>剧本编辑器</h2>
          </div>
          
          <div class="form-section">
            <a-form layout="vertical">
              <a-row :gutter="[16, 0]">
                <a-col :span="16">
                  <a-form-item label="剧本标题">
                    <a-input v-model:value="form.title" size="large" placeholder="输入剧本标题" />
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item label="类型">
                    <a-select v-model:value="form.genre" size="large" placeholder="选择类型">
                      <a-select-option value="heritage">非遗</a-select-option>
                      <a-select-option value="global">海外</a-select-option>
                      <a-select-option value="culture">文旅</a-select-option>
                      <a-select-option value="other">其他</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
              </a-row>

              <a-form-item label="剧本简介">
                <a-textarea v-model:value="form.description" :rows="3" placeholder="描述你的剧本" />
              </a-form-item>

              <a-row :gutter="[16, 0]">
                <a-col :span="8">
                  <a-form-item label="集数">
                    <a-input-number v-model:value="form.episodes" size="large" :min="1" :max="100" />
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item label="单集时长(分钟)">
                    <a-input-number v-model:value="form.duration" size="large" :min="1" :max="60" />
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item label="预计售价">
                    <a-input-number v-model:value="form.price" size="large" :min="0" addon-before="¥" />
                  </a-form-item>
                </a-col>
              </a-row>
            </a-form>
          </div>

          <div class="ai-assistant">
            <div class="ai-header">
              <span class="ai-icon">🤖</span>
              <span class="ai-title">AI 创作助手</span>
            </div>
            <div class="ai-actions">
              <a-button @click="generateTitle" :loading="generating">
                生成标题
              </a-button>
              <a-button @click="generateOutline" :loading="generating">
                生成大纲
              </a-button>
              <a-button @click="generateScript" :loading="generating" type="primary">
                生成剧本
              </a-button>
            </div>
          </div>

          <div class="script-editor">
            <div class="scene-list">
              <div v-for="(scene, index) in scenes" :key="index" class="scene-item" :class="{ active: currentScene === index }" @click="currentScene = index">
                <div class="scene-number">第 {{ index + 1 }} 场</div>
                <div class="scene-title">{{ scene.title || '未命名场景' }}</div>
              </div>
              <a-button type="dashed" block @click="addScene">+ 添加场景</a-button>
            </div>
            <div class="scene-editor">
              <div class="editor-toolbar">
                <a-button size="small">加粗</a-button>
                <a-button size="small">斜体</a-button>
                <a-button size="small">对话</a-button>
                <a-button size="small">旁白</a-button>
              </div>
              <a-textarea v-model:value="scenes[currentScene]?.content" :rows="20" placeholder="在这里编写剧本内容..." />
            </div>
          </div>
        </div>
      </a-col>

      <a-col :xs="24" :md="8">
        <div class="info-panel">
          <div class="panel-header">
            <h2>剧本信息</h2>
          </div>
          
          <div class="info-section">
            <h3>创作状态</h3>
            <a-progress :percent="progress" :stroke-color="{ '0%': '#dc2626', '100%': '#ff6b6b' }" />
            <p class="info-text">{{ currentScene + 1 }} / {{ scenes.length }} 场景</p>
          </div>

          <div class="info-section">
            <h3>字数统计</h3>
            <div class="stats-grid">
              <div class="stat-item">
                <span class="stat-number">{{ totalWords }}</span>
                <span class="stat-label">总字数</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">{{ scenes.length }}</span>
                <span class="stat-label">场景数</span>
              </div>
            </div>
          </div>

          <div class="info-section">
            <h3>提示建议</h3>
            <div class="tips-list">
              <div class="tip-item">💡 每个场景保持在 300-500 字</div>
              <div class="tip-item">💡 增加角色对话让故事更生动</div>
              <div class="tip-item">💡 设置悬疑点吸引观众</div>
            </div>
          </div>

          <div class="info-section">
            <h3>创作模板</h3>
            <div class="template-list">
              <div class="template-item" @click="useTemplate('romance')">
                <div class="template-icon">❤️</div>
                <div class="template-name">爱情剧</div>
              </div>
              <div class="template-item" @click="useTemplate('suspense')">
                <div class="template-icon">🔍</div>
                <div class="template-name">悬疑剧</div>
              </div>
              <div class="template-item" @click="useTemplate('comedy')">
                <div class="template-icon">😂</div>
                <div class="template-name">喜剧</div>
              </div>
            </div>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const form = ref({
  title: '',
  genre: '',
  description: '',
  episodes: 24,
  duration: 3,
  price: 99
})

const scenes = ref([
  { title: '开场', content: '' },
  { title: '冲突', content: '' },
  { title: '高潮', content: '' }
])

const currentScene = ref(0)
const generating = ref(false)

const progress = computed(() => {
  if (scenes.value.length === 0) return 0
  const completed = scenes.value.filter(s => s.content.length > 50).length
  return Math.round((completed / scenes.value.length) * 100)
})

const totalWords = computed(() => {
  return scenes.value.reduce((sum, scene) => sum + scene.content.length, 0)
})

const addScene = () => {
  scenes.value.push({ title: '', content: '' })
}

const generateTitle = () => {
  generating.value = true
  setTimeout(() => {
    form.value.title = '神秘的绣娘'
    generating.value = false
  }, 1000)
}

const generateOutline = () => {
  generating.value = true
  setTimeout(() => {
    scenes.value = [
      { title: '开场 - 绣坊初遇', content: '' },
      { title: '发展 - 技艺传承', content: '' },
      { title: '冲突 - 遭遇挑战', content: '' },
      { title: '高潮 - 惊艳四座', content: '' },
      { title: '结局 - 名扬天下', content: '' }
    ]
    generating.value = false
  }, 1000)
}

const generateScript = () => {
  generating.value = true
  setTimeout(() => {
    if (scenes.value.length > 0 && currentScene.value >= 0) {
      scenes.value[currentScene.value].content = 
`【场景】江南绣坊，日，内

【人物】
- 苏婉：20岁，绣坊主人之女，聪慧善良
- 李母：45岁，绣坊老艺人，技艺精湛

【画面】
古老的绣坊内，丝线在阳光下闪着光芒。苏婉专注地刺绣，指尖翻飞。

【对话】
李母：婉婉，这针法又有精进了。
苏婉：母亲，我想把失传的"双面绣"技法重新钻研出来。
李母：那可是咱们苏家的传家之宝...
`
    }
    generating.value = false
  }, 1500)
}

const useTemplate = (type: string) => {
  const templates = {
    romance: ['相遇', '相知', '误会', '和解', '相守'],
    suspense: ['案发', '调查', '悬念', '真相', '结局'],
    comedy: ['出场', '窘境', '反转', '爆笑', '收尾']
  }
  const titles = templates[type as keyof typeof templates] || ['开场', '发展', '结局']
  scenes.value = titles.map(title => ({ title, content: '' }))
}
</script>

<style scoped>
.script-creator-page {
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

.editor-panel,
.info-panel {
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

.form-section {
  margin-bottom: 24px;
}

.ai-assistant {
  background: rgba(220, 38, 38, 0.1);
  border: 1px solid rgba(220, 38, 38, 0.3);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 24px;
}

.ai-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.ai-icon {
  font-size: 24px;
}

.ai-title {
  font-size: 16px;
  font-weight: 600;
  color: white;
}

.ai-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.script-editor {
  display: flex;
  gap: 16px;
  min-height: 500px;
}

.scene-list {
  width: 200px;
  flex-shrink: 0;
}

.scene-item {
  background: #0f172a;
  border: 1px solid #374151;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.scene-item:hover,
.scene-item.active {
  border-color: #dc2626;
  background: rgba(220, 38, 38, 0.1);
}

.scene-number {
  font-size: 12px;
  color: #dc2626;
  margin-bottom: 4px;
}

.scene-title {
  font-size: 14px;
  color: white;
  font-weight: 500;
}

.scene-editor {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.editor-toolbar {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.info-section {
  margin-bottom: 32px;
}

.info-section h3 {
  font-size: 16px;
  font-weight: 600;
  color: white;
  margin: 0 0 16px 0;
}

.info-text {
  text-align: center;
  color: #9ca3af;
  margin-top: 8px;
  font-size: 14px;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.stat-item {
  text-align: center;
  padding: 16px;
  background: #0f172a;
  border-radius: 8px;
}

.stat-number {
  display: block;
  font-size: 28px;
  font-weight: 700;
  color: #dc2626;
}

.stat-label {
  display: block;
  font-size: 14px;
  color: #9ca3af;
  margin-top: 4px;
}

.tips-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.tip-item {
  background: #0f172a;
  padding: 12px;
  border-radius: 8px;
  color: #9ca3af;
  font-size: 14px;
}

.template-list {
  display: flex;
  gap: 12px;
}

.template-item {
  flex: 1;
  background: #0f172a;
  border: 1px solid #374151;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}

.template-item:hover {
  border-color: #dc2626;
  background: rgba(220, 38, 38, 0.1);
}

.template-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.template-name {
  font-size: 14px;
  color: white;
  font-weight: 500;
}
</style>
