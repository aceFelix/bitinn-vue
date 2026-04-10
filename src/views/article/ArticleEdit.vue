<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import defaultAvatar from '@/assets/user-avatar1.jpg'
import { useTokenStore } from '@/stores/token'
import { userInfoStore } from '@/stores/userInfo'
import PublishDialog from '@/components/article/PublishDialog.vue'

const router = useRouter()
const route = useRoute()
const tokenStore = useTokenStore()
const userStore = userInfoStore()

const isLoggedIn = computed(() => !!tokenStore.token)

const userAvatar = computed(() => {
  if (!isLoggedIn.value) return ''
  const avatar = userStore.userInfo?.userPic || ''
  return avatar || defaultAvatar
})

const userName = computed(() => {
  if (!isLoggedIn.value) return ''
  return userStore.userInfo?.nickname || userStore.userInfo?.username || '用户'
})

const goToLogin = () => {
  router.push('/login')
}

const goToAdmin = () => {
  router.push('/admin/article/manage')
}

// 文章数据
const articleTitle = ref('')
const vditor = ref(null)
const vditorInstance = ref(null)

// 从路由参数获取预设值
const presetType = route.query.type || ''
const presetTags = route.query.tags ? route.query.tags.split(',') : []

// 发布弹窗
const showPublishDialog = ref(false)

// 返回上一页
const goBack = () => {
  router.back()
}

// 返回首页
const goHome = () => {
  router.push('/')
}

// 保存草稿
const saveDraft = () => {
  const content = vditorInstance.value?.getValue() || ''
  console.log('保存草稿:', { title: articleTitle.value, content })
  // TODO: 调用 API 保存草稿
  alert('草稿已保存')
}

// 发布文章 - 打开发布弹窗
const publishArticle = () => {
  if (!articleTitle.value.trim()) {
    alert('请输入文章标题')
    return
  }
  const content = vditorInstance.value?.getValue() || ''
  if (!content.trim()) {
    alert('请输入文章内容')
    return
  }
  showPublishDialog.value = true
}

// 确认发布
const handlePublishConfirm = (publishData) => {
  const content = vditorInstance.value?.getValue() || ''
  console.log('发布文章:', {
    title: articleTitle.value,
    content,
    type: publishData.type?.id,
    tags: publishData.tags,
    excerpt: publishData.excerpt,
    coverUrl: publishData.coverUrl
  })
  alert('文章发布成功！')
  router.push('/')
}

// 初始化 Vditor
onMounted(() => {
  vditorInstance.value = new Vditor(vditor.value, {
    height: 'calc(100vh - 200px)',
    mode: 'ir', // 即时渲染模式
    theme: 'classic',
    preview: {
      theme: {
        current: 'light'
      }
    },
    toolbar: [
      'emoji',
      'headings',
      'bold',
      'italic',
      'strike',
      'line',
      'quote',
      'list',
      'ordered-list',
      'check',
      'outdent',
      'indent',
      'code',
      'inline-code',
      'insert-after',
      'insert-before',
      'undo',
      'redo',
      'upload',
      'link',
      'table',
      'record',
      'edit-mode',
      'both',
      'preview',
      'fullscreen',
      'outline'
    ],
    toolbarConfig: {
      pin: true
    },
    counter: {
      enable: true,
      type: 'text'
    },
    cache: {
      enable: true,
      id: 'bitinn-article-draft'
    },
    upload: {
      url: '/api/upload', // TODO: 配置上传接口
      max: 10 * 1024 * 1024, // 10MB
      accept: 'image/*'
    },
    placeholder: '开始创作你的文章...\n\n支持 Markdown 语法',
    after: () => {
      // 如果有预设内容，可以在这里加载
      if (presetType) {
        console.log('预设类型:', presetType)
      }
    }
  })
})

// 销毁 Vditor
onUnmounted(() => {
  if (vditorInstance.value) {
    vditorInstance.value.destroy()
  }
})
</script>

<template>
  <div class="edit-container">
    <!-- 顶部导航 -->
    <header class="edit-header">
      <div class="header-left">
        <div class="header-brand" @click="goHome">
          <span class="bracket">&lt;</span>
          <span class="brand-name">BitInn</span>
          <span class="bracket">/&gt;</span>
        </div>
      </div>

      <div class="header-actions">
        <button class="btn-back" @click="goBack">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span>返回</span>
        </button>
        <button class="btn-secondary" @click="saveDraft">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
            <polyline points="17 21 17 13 7 13 7 21"/>
            <polyline points="7 3 7 8 15 8"/>
          </svg>
          <span>保存草稿</span>
        </button>
        <button class="btn-primary" @click="publishArticle">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 19l7-7 3 3-7 7-3-3z"/>
            <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
            <path d="M2 2l7.586 7.586"/>
            <circle cx="11" cy="11" r="2"/>
          </svg>
          <span>发布文章</span>
        </button>
        <button v-if="!isLoggedIn" class="btn-login" @click="goToLogin">登录 / 注册</button>
        <div v-else class="user-avatar-wrapper" :title="userName" @click="goToAdmin">
          <img :src="userAvatar" :alt="userName" class="user-avatar" />
        </div>
      </div>
    </header>

    <!-- 编辑区域 -->
    <main class="edit-main">
      <!-- 标题输入 -->
      <div class="title-section">
        <input
          v-model="articleTitle"
          type="text"
          class="title-input"
          placeholder="请输入文章标题..."
          maxlength="100"
        />
        <div class="title-count">{{ articleTitle.length }}/100</div>
      </div>

      <!-- Markdown 编辑器 -->
      <div class="editor-section">
        <div ref="vditor" class="vditor-container"></div>
      </div>
    </main>

    <!-- 发布文章弹窗 -->
    <PublishDialog
      v-model:visible="showPublishDialog"
      :preset-type="presetType"
      :preset-tags="presetTags"
      :title="articleTitle"
      @confirm="handlePublishConfirm"
    />
  </div>
</template>

<style scoped lang="scss">
.edit-container {
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: flex;
  flex-direction: column;
}

// 顶部导航
.edit-header {
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
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 8px 24px rgba(249, 115, 22, 0.3);
  }
}

.header-left {
  display: flex;
  align-items: center;
  gap: 24px;
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
    text-shadow: 0 0 10px rgba(249, 115, 22, 0.5);
    color: #F97316;
  }
}

.btn-back {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid #F97316;
  border-radius: 6px;
  background: transparent;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    box-shadow: 0 8px 24px rgba(249, 115, 22, 0.3);
    transform: translateY(-2px);
    background: #F97316;
    color: white;

    svg {
      stroke: white;
    }
  }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn-login {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid #F97316;
  background: transparent;

  &:hover {
    box-shadow: 0 8px 24px rgba(249, 115, 22, 0.3);
    transform: translateY(-2px);
    background: #F97316;
    color: white;
  }
}

.user-avatar-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.4);
    transform: translateY(-2px);
    border-color: #F97316;
  }

  .user-avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
}

.btn-secondary {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid #F97316;
  border-radius: 6px;
  background: transparent;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    box-shadow: 0 8px 24px rgba(249, 115, 22, 0.3);
    transform: translateY(-2px);
    background: #F97316;
    color: white;

    svg {
      stroke: white;
    }
  }
}

.btn-primary {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 6px;
  color: #1a1a1a;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid #F97316;
  background: transparent;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    background: #F97316;
    color: white;
    box-shadow: 0 8px 24px rgba(249, 115, 22, 0.3);
    transform: translateY(-2px);

    svg {
      stroke: white;
    }
  }
}

// 主编辑区
.edit-main {
  flex: 1;
  padding: 84px 24px 24px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

// 标题区域
.title-section {
  position: relative;

  .title-input {
    width: 100%;
    padding: 16px 80px 16px 20px;
    border-radius: 12px;
    font-size: 24px;
    font-weight: 600;
    transition: all 0.2s;
    box-sizing: border-box;
    border: 1px solid transparent;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

    &:focus {
      outline: none;
      border-color: #F97316;
      box-shadow: 0 8px 24px rgba(249, 115, 22, 0.25);
    }
  }

  .title-count {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 12px;
  }
}

// 编辑器区域
.editor-section {
  flex: 1;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.2s;

  &:hover,
  &:focus-within {
    box-shadow: 0 8px 24px rgba(249, 115, 22, 0.25);
  }

  :deep(.vditor-toolbar) {
    .vditor-toolbar__item {
      button:hover,
      &--current > button {
        color: #F97316;

        svg {
          color: #F97316;
        }
      }
    }
  }
}

.vditor-container {
  height: 100%;
}

// 响应式
@media (max-width: 768px) {
  .edit-header {
    padding: 0 16px;
  }
  
  .header-brand {
    font-size: 20px;
  }
  
  .btn-back span {
    display: none;
  }
  
  .header-actions {
    gap: 8px;
  }
  
  .btn-secondary span,
  .btn-primary span {
    display: none;
  }
  
  .edit-main {
    padding: 76px 16px 16px;
  }
  
  .title-section .title-input {
    font-size: 18px;
    padding: 12px 70px 12px 16px;
  }
}
</style>
