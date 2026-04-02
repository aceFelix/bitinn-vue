<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Vditor from 'vditor'
import 'vditor/dist/index.css'

const router = useRouter()
const route = useRoute()

// 文章数据
const articleTitle = ref('')
const vditor = ref(null)
const vditorInstance = ref(null)

// 从路由参数获取预设值
const presetType = route.query.type || ''
const presetTags = route.query.tags ? route.query.tags.split(',') : []

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

// 发布文章
const publishArticle = () => {
  const content = vditorInstance.value?.getValue() || ''
  if (!articleTitle.value.trim()) {
    alert('请输入文章标题')
    return
  }
  if (!content.trim()) {
    alert('请输入文章内容')
    return
  }
  console.log('发布文章:', { title: articleTitle.value, content })
  // TODO: 调用 API 发布文章
  alert('文章发布成功')
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
      id: 'bitlnn-article-draft'
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
          <span class="brand-name">BitLnn</span>
          <span class="bracket">/&gt;</span>
        </div>
        <button class="btn-back" @click="goBack">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span>返回</span>
        </button>
      </div>
      
      <div class="header-actions">
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
    text-shadow: 0 0 10px rgba(53, 146, 196, 0.5);
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

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    box-shadow: 0 0 0 3px rgba(53, 146, 196, 0.2);
  }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
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

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    box-shadow: 0 0 0 3px rgba(53, 146, 196, 0.2);
  }
}

.btn-primary {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
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

  &:hover {
    color: white;
    box-shadow: 0 0 0 3px rgba(53, 146, 196, 0.3);
    transform: translateY(-1px);
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

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(53, 146, 196, 0.2);
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
