<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 文章类型选项
const articleTypes = ref([
  {
    id: 'tech',
    name: '技术文章',
    description: '分享技术经验、教程、最佳实践',
    icon: '💻',
    color: '#3592C4',
    tags: ['Java', 'Python', 'Vue', 'React', 'Spring Boot']
  },
  {
    id: 'note',
    name: '学习笔记',
    description: '记录学习心得、知识点整理',
    icon: '📝',
    color: '#499C54',
    tags: ['读书笔记', '源码分析', '算法', '设计模式']
  },
  {
    id: 'discussion',
    name: '问题讨论',
    description: '提出技术问题、寻求解决方案',
    icon: '💬',
    color: '#CC7832',
    tags: ['Bug解决', '架构设计', '性能优化']
  },
  {
    id: 'project',
    name: '项目分享',
    description: '展示个人项目、开源作品',
    icon: '🚀',
    color: '#9876AA',
    tags: ['开源项目', '工具推荐', '实战案例']
  }
])

// 草稿列表（Mock数据）
const drafts = ref([
  {
    id: 1,
    title: 'Vue 3 组合式函数最佳实践',
    updatedAt: '2小时前',
    wordCount: 1250
  },
  {
    id: 2,
    title: 'Spring Security 配置详解',
    updatedAt: '昨天',
    wordCount: 890
  }
])

// 推荐标签
const recommendedTags = ref([
  'Java', 'Spring Boot', 'Vue', 'React', 'Python', 
  'Docker', 'MySQL', 'Redis', '微服务', '算法'
])

// 选中的文章类型
const selectedType = ref(null)
// 选中的标签
const selectedTags = ref([])

// 选择文章类型
const selectType = (type) => {
  selectedType.value = type
}

// 切换标签选择
const toggleTag = (tag) => {
  const index = selectedTags.value.indexOf(tag)
  if (index > -1) {
    selectedTags.value.splice(index, 1)
  } else {
    selectedTags.value.push(tag)
  }
}

// 继续编辑草稿
const continueDraft = (draft) => {
  router.push(`/article/edit/${draft.id}`)
}

// 开始创作
const startWriting = () => {
  // 可以携带选中的类型和标签
  const query = {}
  if (selectedType.value) {
    query.type = selectedType.value.id
  }
  if (selectedTags.value.length > 0) {
    query.tags = selectedTags.value.join(',')
  }
  router.push({ path: '/article/edit', query })
}

// 返回首页
const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="create-container">
    <!-- 顶部导航 -->
    <header class="create-header">
      <div class="header-brand" @click="goHome">
        <span class="bracket">&lt;</span>
        <span class="brand-name">BitLnn</span>
        <span class="bracket">/&gt;</span>
      </div>
      <h1 class="header-title">开始创作</h1>
      <button class="btn-close" @click="goHome">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
    </header>

    <!-- 主内容区 -->
    <main class="create-content">
      <!-- 左侧：文章类型选择 -->
      <section class="type-section">
        <h2 class="section-title">选择文章类型</h2>
        <div class="type-grid">
          <div
            v-for="type in articleTypes"
            :key="type.id"
            class="type-card"
            :class="{ active: selectedType?.id === type.id }"
            @click="selectType(type)"
          >
            <div class="type-icon" :style="{ background: type.color + '20', color: type.color }">
              {{ type.icon }}
            </div>
            <h3 class="type-name">{{ type.name }}</h3>
            <p class="type-desc">{{ type.description }}</p>
            <div class="type-tags">
              <span v-for="tag in type.tags.slice(0, 3)" :key="tag" class="tag">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- 中间：推荐标签 -->
      <section class="tags-section">
        <h2 class="section-title">添加标签</h2>
        <p class="section-desc">选择合适的标签，让更多人发现你的文章</p>
        <div class="tags-cloud">
          <button
            v-for="tag in recommendedTags"
            :key="tag"
            class="tag-btn"
            :class="{ active: selectedTags.includes(tag) }"
            @click="toggleTag(tag)"
          >
            {{ tag }}
          </button>
        </div>
        <div class="selected-tags" v-if="selectedTags.length > 0">
          <span class="selected-label">已选择：</span>
          <span
            v-for="tag in selectedTags"
            :key="tag"
            class="selected-tag"
            @click="toggleTag(tag)"
          >
            {{ tag }}
            <span class="remove">×</span>
          </span>
        </div>
      </section>

      <!-- 右侧：草稿箱 -->
      <section class="drafts-section">
        <h2 class="section-title">草稿箱</h2>
        <p class="section-desc">继续你未完成的创作</p>
        <div class="drafts-list">
          <div
            v-for="draft in drafts"
            :key="draft.id"
            class="draft-card"
            @click="continueDraft(draft)"
          >
            <h4 class="draft-title">{{ draft.title }}</h4>
            <div class="draft-meta">
              <span class="draft-time">{{ draft.updatedAt }}</span>
              <span class="draft-count">{{ draft.wordCount }} 字</span>
            </div>
          </div>
          <div v-if="drafts.length === 0" class="drafts-empty">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            <p>暂无草稿</p>
          </div>
        </div>
        <!-- 开始写作按钮 -->
        <div class="section-actions">
          <button class="btn-secondary" @click="goHome">取消</button>
          <button class="btn-primary" @click="startWriting" :disabled="!selectedType">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            开始写作
          </button>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped lang="scss">
.create-container {
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: flex;
  flex-direction: column;
}

// 顶部导航
.create-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  z-index: 1000;
}

.header-brand {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 24px;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }

  .bracket {
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
  }

  .brand-name {
    text-shadow: 0 0 10px rgba(53, 146, 196, 0.5);
  }
}

.header-title {
  font-size: 20px;
  font-weight: 600;
}

.btn-close {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    box-shadow: 0 0 0 3px rgba(53, 146, 196, 0.2);
  }
}

// 主内容区
.create-content {
  flex: 1;
  display: grid;
  grid-template-columns: 1.2fr 1fr 300px;
  gap: 24px;
  padding: 84px 24px 24px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
}

// 通用区块样式
section {
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  padding: 24px;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(249, 115, 22, 0.25);
  }
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}

.section-desc {
  font-size: 14px;
  margin-bottom: 20px;
}

// 文章类型选择
.type-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.type-card {
  border: 2px solid transparent;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(249, 115, 22, 0.25);
  }

  &.active {
    box-shadow: 0 0 0 3px rgba(53, 146, 196, 0.2);
  }
}

.type-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 12px;
}

.type-name {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
}

.type-desc {
  font-size: 13px;
  margin-bottom: 12px;
  line-height: 1.5;
}

.type-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;

  .tag {
    padding: 3px 8px;
    border-radius: 4px;
    font-size: 11px;
  }
}

// 标签选择
.tags-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag-btn {
  padding: 8px 16px;
  border: 2px solid transparent;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.25);
  }

  &.active {
    color: #1a1a1a;
    box-shadow: 0 0 0 3px rgba(53, 146, 196, 0.2);
  }
}

.selected-tags {
  margin-top: 20px;
  padding-top: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.selected-label {
  font-size: 13px;
}

.selected-tag {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  color: #1a1a1a;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s;

  &:hover {
    background: #4BA3D3;
  }

  .remove {
    font-size: 14px;
    opacity: 0.8;
  }
}

// 草稿箱
.drafts-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.draft-card {
  border: 2px solid transparent;
  border-radius: 10px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(249, 115, 22, 0.25);
  }
}

.draft-title {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.draft-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}

.drafts-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;

  svg {
    width: 48px;
    height: 48px;
    margin-bottom: 12px;
    opacity: 0.5;
  }

  p {
    font-size: 14px;
  }
}

.section-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
  padding-top: 20px;
}

.btn-secondary {
  padding: 12px 24px;
  background: transparent;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.25);
  }
}

.btn-primary {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 8px;
  color: #1a1a1a;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover:not(:disabled) {
    background: #4BA3D3;
    border-color: #4BA3D3;
    color: white;
    box-shadow: 0 0 0 4px rgba(53, 146, 196, 0.25);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

// 响应式
@media (max-width: 1200px) {
  .create-content {
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    padding: 80px 20px 20px;
  }

  .drafts-section {
    grid-column: span 2;
  }
}

@media (max-width: 900px) {
  .create-content {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 76px 16px 16px;
  }

  .drafts-section {
    grid-column: span 1;
  }

  .type-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .create-content {
    grid-template-columns: 1fr;
    padding: 76px 16px 16px;
  }

  .drafts-section {
    grid-column: span 1;
  }

  .type-grid {
    grid-template-columns: 1fr;
  }

  .create-footer {
    flex-direction: column;
    gap: 16px;
  }
}
</style>
