<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

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
  },
  {
    id: 3,
    title: 'Docker 容器化部署实战指南',
    updatedAt: '3天前',
    wordCount: 2100
  },
  {
    id: 4,
    title: 'TypeScript 高级类型体操技巧',
    updatedAt: '5天前',
    wordCount: 1680
  },
  {
    id: 5,
    title: 'Redis 缓存策略与性能优化',
    updatedAt: '1周前',
    wordCount: 950
  },
  {
    id: 6,
    title: '微服务架构设计模式总结',
    updatedAt: '1周前',
    wordCount: 3200
  }
])

// 继续编辑草稿
const continueDraft = (draft) => {
  router.push(`/article/edit/${draft.id}`)
}

// 返回首页
const goHome = () => {
  router.push('/')
}

// 暴露草稿列表和操作方法给父组件
const getDrafts = () => drafts.value

defineExpose({
  getDrafts,
  drafts,
  continueDraft,
  goHome
})
</script>

<template>
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

  </section>
</template>

<style scoped lang="scss">
.drafts-section {
  height: 100%;
  overflow-y: auto;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  padding: 24px;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(249, 115, 22, 0.25);
  }

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(249, 115, 22, 0.3);
    border-radius: 4px;

    &:hover {
      background: #F97316;
    }
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
</style>
