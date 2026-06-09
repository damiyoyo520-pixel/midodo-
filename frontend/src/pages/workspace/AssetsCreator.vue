<template>
  <div class="assets-page">
    <div class="page-header">
      <div class="header-left">
        <router-link to="/workspace" class="back-btn">← 返回</router-link>
        <h1>生资产创作</h1>
      </div>
      <div class="header-actions">
        <a-button size="large">我的资产</a-button>
        <a-button type="primary" size="large">+ 新建资产</a-button>
      </div>
    </div>

    <div class="tabs-section">
      <a-radio-group v-model:value="activeTab" button-style="solid">
        <a-radio-button value="character">🎭 角色</a-radio-button>
        <a-radio-button value="scene">🏞️ 场景</a-radio-button>
        <a-radio-button value="prop">🎁 道具</a-radio-button>
        <a-radio-button value="music">🎵 音乐</a-radio-button>
        <a-radio-button value="voice">🎤 配音</a-radio-button>
      </a-radio-group>
    </div>

    <a-row :gutter="[24, 24]">
      <a-col :xs="24" :md="8">
        <div class="generator-panel">
          <div class="panel-header">
            <h2>{{ tabConfig[activeTab].title }}生成</h2>
          </div>

          <a-form layout="vertical">
            <a-form-item label="描述">
              <a-textarea v-model:value="form.description" :rows="4" :placeholder="tabConfig[activeTab].placeholder" />
            </a-form-item>

            <a-form-item label="风格">
              <a-select v-model:value="form.style">
                <a-select-option value="realistic">写实风格</a-select-option>
                <a-select-option value="anime">动漫风格</a-select-option>
                <a-select-option value="3d">3D渲染</a-select-option>
                <a-select-option value="watercolor">水彩风格</a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item v-if="activeTab === 'character'" label="性别">
              <a-select v-model:value="form.gender">
                <a-select-option value="male">男性</a-select-option>
                <a-select-option value="female">女性</a-select-option>
                <a-select-option value="other">其他</a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item v-if="activeTab === 'character'" label="年龄">
              <a-input-number v-model:value="form.age" :min="1" :max="100" style="width: 100%" />
            </a-form-item>

            <a-form-item v-if="activeTab === 'scene'" label="时间">
              <a-select v-model:value="form.time">
                <a-select-option value="day">白天</a-select-option>
                <a-select-option value="night">夜晚</a-select-option>
                <a-select-option value="sunset">黄昏</a-select-option>
                <a-select-option value="dawn">黎明</a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item v-if="activeTab === 'voice'" label="音色">
              <a-select v-model:value="form.voiceType">
                <a-select-option value="young">年轻女声</a-select-option>
                <a-select-option value="mature">成熟女声</a-select-option>
                <a-select-option value="male">男声</a-select-option>
                <a-select-option value="child">童声</a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item v-if="activeTab === 'voice'" label="配音文本">
              <a-textarea v-model:value="form.voiceText" :rows="4" placeholder="输入需要配音的文本" />
            </a-form-item>

            <a-button type="primary" size="large" block @click="generateAsset" :loading="generating">
              {{ generating ? '生成中...' : '✨ 生成资产' }}
            </a-button>
          </a-form>

          <div v-if="generatedAssets.length > 0" class="generated-section">
            <div class="section-title">本次生成</div>
            <div class="generated-grid">
              <div v-for="(asset, index) in generatedAssets" :key="index" class="generated-item">
                <img v-if="asset.type !== 'audio'" :src="asset.url" alt="生成的资产" />
                <div v-else class="audio-placeholder">
                  <span class="audio-icon">🎵</span>
                </div>
                <div class="generated-actions">
                  <a-button size="small" @click="saveAsset(index)">保存</a-button>
                  <a-button size="small" @click="regenerateAsset(index)">重新生成</a-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a-col>

      <a-col :xs="24" :md="16">
        <div class="assets-panel">
          <div class="panel-header">
            <h2>资产库</h2>
            <a-input-search placeholder="搜索资产" style="width: 240px" />
          </div>

          <div class="assets-grid">
            <div v-for="(asset, index) in allAssets" :key="index" class="asset-card">
              <div class="asset-preview">
                <img v-if="asset.type !== 'audio'" :src="asset.url" alt="资产预览" />
                <div v-else class="audio-preview">
                  <span class="audio-icon">🎤</span>
                  <span class="audio-name">{{ asset.name }}</span>
                </div>
              </div>
              <div class="asset-info">
                <div class="asset-name">{{ asset.name }}</div>
                <div class="asset-meta">
                  <span class="asset-tag">{{ asset.tag }}</span>
                  <span class="asset-date">{{ asset.date }}</span>
                </div>
              </div>
              <div class="asset-actions">
                <a-button size="small">使用</a-button>
                <a-button size="small">编辑</a-button>
                <a-button size="small" danger>删除</a-button>
              </div>
            </div>
          </div>

          <div class="pagination">
            <a-pagination :current="1" :total="50" />
          </div>
        </div>
      </a-col>
    </a-row>

    <div class="presets-section" style="margin-top: 24px;">
      <div class="panel-header">
        <h2>快捷模板</h2>
      </div>
      <div class="presets-grid">
        <div v-for="preset in presets" :key="preset.id" class="preset-card" @click="usePreset(preset)">
          <div class="preset-icon">{{ preset.icon }}</div>
          <div class="preset-name">{{ preset.name }}</div>
          <div class="preset-desc">{{ preset.desc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const activeTab = ref('character')
const generating = ref(false)

const tabConfig = {
  character: { title: '角色', placeholder: '描述角色的外貌、服装、性格特点...' },
  scene: { title: '场景', placeholder: '描述场景的环境、氛围、建筑风格...' },
  prop: { title: '道具', placeholder: '描述道具的外观、材质、用途...' },
  music: { title: '音乐', placeholder: '描述音乐的风格、情绪、节奏...' },
  voice: { title: '配音', placeholder: '选择音色并输入需要配音的文本...' }
}

const form = reactive({
  description: '',
  style: 'realistic',
  gender: 'female',
  age: 25,
  time: 'day',
  voiceType: 'young',
  voiceText: ''
})

const generatedAssets = ref<any[]>([])

const allAssets = ref([
  { id: 1, name: '古代仕女', type: 'image', tag: '角色', date: '2026-06-01', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=400&fit=crop' },
  { id: 2, name: '江南古镇', type: 'image', tag: '场景', date: '2026-06-02', url: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=300&h=400&fit=crop' },
  { id: 3, name: '绣花针', type: 'image', tag: '道具', date: '2026-06-03', url: 'https://images.unsplash.com/photo-1615566815110-8a69b94f40f6?w=300&h=400&fit=crop' },
  { id: 4, name: '古典配乐', type: 'audio', tag: '音乐', date: '2026-06-04', url: '' },
  { id: 5, name: '书生形象', type: 'image', tag: '角色', date: '2026-06-05', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop' },
  { id: 6, name: '山水背景', type: 'image', tag: '场景', date: '2026-06-06', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=400&fit=crop' }
])

const presets = [
  { id: 1, icon: '👘', name: '古装角色', desc: '中国古代人物形象' },
  { id: 2, icon: '🏯', name: '古风场景', desc: '传统建筑和风景' },
  { id: 3, icon: '🎎', name: '日本风格', desc: '日式和服和建筑' },
  { id: 4, icon: '🌃', name: '现代都市', desc: '城市街景和人物' },
  { id: 5, icon: '🔮', name: '玄幻仙侠', desc: '仙侠古风奇幻' },
  { id: 6, icon: '🎪', name: '民国时期', desc: '民国时代背景' }
]

const generateAsset = () => {
  generating.value = true
  setTimeout(() => {
    const newAssets = [
      { 
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop',
        type: activeTab.value === 'music' || activeTab.value === 'voice' ? 'audio' : 'image'
      },
      { 
        url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=400&fit=crop',
        type: activeTab.value === 'music' || activeTab.value === 'voice' ? 'audio' : 'image'
      },
      { 
        url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=400&fit=crop',
        type: activeTab.value === 'music' || activeTab.value === 'voice' ? 'audio' : 'image'
      },
      { 
        url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=400&fit=crop',
        type: activeTab.value === 'music' || activeTab.value === 'voice' ? 'audio' : 'image'
      }
    ]
    generatedAssets.value = newAssets
    generating.value = false
  }, 2000)
}

const saveAsset = (index: number) => {
  const asset = generatedAssets.value[index]
  allAssets.value.unshift({
    id: Date.now(),
    name: `${tabConfig[activeTab.value].title} ${allAssets.value.length + 1}`,
    type: asset.type,
    tag: tabConfig[activeTab.value].title,
    date: '2026-06-07',
    url: asset.url
  })
}

const regenerateAsset = (index: number) => {
  generatedAssets.value[index].url = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop'
}

const usePreset = (preset: any) => {
  form.description = preset.desc
}
</script>

<style scoped>
.assets-page {
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

.tabs-section {
  margin-bottom: 24px;
}

.generator-panel,
.assets-panel,
.presets-section {
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

.generated-section {
  margin-top: 24px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: white;
  margin-bottom: 16px;
}

.generated-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.generated-item {
  aspect-ratio: 3/4;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  border: 1px solid #374151;
}

.generated-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.audio-placeholder {
  width: 100%;
  height: 100%;
  background: #0f172a;
  display: flex;
  align-items: center;
  justify-content: center;
}

.audio-icon {
  font-size: 48px;
}

.generated-actions {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px;
  background: linear-gradient(transparent, rgba(0,0,0,0.9));
  display: flex;
  gap: 8px;
}

.generated-actions .ant-btn {
  flex: 1;
}

.assets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.asset-card {
  background: #0f172a;
  border: 1px solid #374151;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s;
}

.asset-card:hover {
  border-color: #dc2626;
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(220, 38, 38, 0.2);
}

.asset-preview {
  aspect-ratio: 3/4;
  overflow: hidden;
}

.asset-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.audio-preview {
  width: 100%;
  height: 100%;
  background: #1f2937;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.audio-preview .audio-icon {
  font-size: 48px;
}

.audio-name {
  color: white;
  font-size: 14px;
}

.asset-info {
  padding: 16px;
}

.asset-name {
  font-size: 14px;
  font-weight: 600;
  color: white;
  margin-bottom: 8px;
}

.asset-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}

.asset-tag {
  color: #dc2626;
  background: rgba(220, 38, 38, 0.1);
  padding: 2px 8px;
  border-radius: 4px;
}

.asset-date {
  color: #9ca3af;
}

.asset-actions {
  padding: 0 16px 16px;
  display: flex;
  gap: 8px;
}

.asset-actions .ant-btn {
  flex: 1;
}

.pagination {
  margin-top: 24px;
  display: flex;
  justify-content: center;
}

.presets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.preset-card {
  background: #0f172a;
  border: 1px solid #374151;
  border-radius: 10px;
  padding: 24px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}

.preset-card:hover {
  border-color: #dc2626;
  background: rgba(220, 38, 38, 0.1);
  transform: translateY(-4px);
}

.preset-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.preset-name {
  font-size: 16px;
  font-weight: 600;
  color: white;
  margin-bottom: 8px;
}

.preset-desc {
  font-size: 14px;
  color: #9ca3af;
}
</style>
