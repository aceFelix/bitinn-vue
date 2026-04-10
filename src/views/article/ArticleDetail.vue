<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ArticleDetailSidebar from '@/components/article/ArticleDetailSidebar.vue'
import ArticleDetailContent from '@/components/article/ArticleDetailContent.vue'
import ArticleDetailRight from '@/components/article/ArticleDetailRight.vue'
import UserCard from '@/components/common/UserCard.vue'
import defaultAvatar from '@/assets/user-avatar1.jpg'
import { useTokenStore } from '@/stores/token'
import { userInfoStore } from '@/stores/userInfo'

const route = useRoute()
const router = useRouter()
const tokenStore = useTokenStore()
const userStore = userInfoStore()

const showUserCard = ref(false)

const articleId = computed(() => route.params.id)

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

const searchQuery = ref('')

const article = ref({
  title: '',
  authorName: '',
  authorAvatar: '',
  publishedAt: '',
  readTime: '',
  type: '',
  typeColor: '',
  tags: [],
  content: ''
})

const author = ref({
  name: '',
  avatar: '',
  bio: '',
  articleCount: 0,
  followerCount: 0
})

const relatedArticles = ref([])

const tocList = ref([
  { id: 'toc-1', text: '什么是 Composition API', level: 1 },
  { id: 'toc-2', text: '为什么需要 Composition API', level: 1 },
  { id: 'toc-3', text: '核心概念', level: 1 },
  { id: 'toc-4', text: 'setup 函数', level: 2 },
  { id: 'toc-5', text: '响应式 API', level: 2 },
  { id: 'toc-6', text: '生命周期钩子', level: 2 },
  { id: 'toc-7', text: '与 Options API 对比', level: 1 },
  { id: 'toc-8', text: '最佳实践', level: 1 }
])

const mockArticles = {
  '1': {
    title: '深入理解 Vue 3 Composition API',
    authorName: '张三',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    publishedAt: '2小时前',
    readTime: '5 min',
    type: '技术文章',
    typeColor: '#F97316',
    tags: ['Vue', 'JavaScript', '前端'],
    likes: 128,
    favorites: 56,
    comments: 32,
    shares: 18,
    content: `
      <h2>什么是 Composition API</h2>
      <p>Composition API 是 Vue 3 中引入的一种新的组织组件逻辑的方式，它提供了更灵活的代码组织方式，让开发者能够按照逻辑关注点来组织代码，而不是按照选项类型（data、methods、computed 等）来分散代码。</p>

      <h2>为什么需要 Composition API</h2>
      <p>在大型组件中，Options API 的代码组织方式会导致相关逻辑被分散在不同的选项中。例如，一个组件可能需要处理搜索、排序、分页等功能，这些功能的代码会分别散落在 data、methods、computed、watch 等不同位置。</p>
      <blockquote>Composition API 让我们能够把相关的逻辑放在一起，提高代码的可读性和可维护性。</blockquote>

      <h2>核心概念</h2>

      <h3>setup 函数</h3>
      <p><code>setup()</code> 是 Composition API 的入口函数，它在组件创建之前执行。它是组合式 API 的核心：</p>
      <pre><code>import { ref, reactive, computed } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const doubleCount = computed(() => count.value * 2)

    const increment = () => {
      count.value++
    }

    return {
      count,
      doubleCount,
      increment
    }
  }
}</code></pre>

      <h3>响应式 API</h3>
      <p>Vue 3 提供了多种响应式 API 来创建响应式数据：</p>
      <ul>
        <li><strong>ref()</strong> - 创建基本类型的响应式引用</li>
        <li><strong>reactive()</strong> - 创建对象类型的响应式代理</li>
        <li><strong>computed()</strong> - 创建计算属性</li>
        <li><strong>watch()</strong> / <strong>watchEffect()</strong> - 监听数据变化</li>
      </ul>

      <h3>生命周期钩子</h3>
      <p>Composition API 中的生命周期钩子需要在 setup 内部调用，名称前加 "on"：</p>
      <pre><code>import { onMounted, onUnmounted } from 'vue'

export default {
  setup() {
    onMounted(() => {
      console.log('组件已挂载')
    })

    onUnmounted(() => {
      console.log('组件将卸载')
    })
  }
}</code></pre>

      <h2>与 Options API 对比</h2>
      <table>
        <tr><th>特性</th><th>Options API</th><th>Composition API</th></tr>
        <tr><td>代码组织</td><td>按选项类型</td><td>按逻辑关注点</td></tr>
        <tr><td>TypeScript 支持</td><td>一般</td><td>优秀</td></tr>
        <tr><td>逻辑复用</td><td>Mixins（有缺陷）</td><td>Composables</td></tr>
        <tr><td>this 指向</td><td>依赖 this</td><td>无需 this</td></tr>
        <tr><td>学习曲线</td><td>较低</td><td>中等</td></tr>
      </table>

      <h2>最佳实践</h2>
      <ol>
        <li>使用 <code>&lt;script setup&gt;</code> 语法糖简化代码</li>
        <li>将可复用逻辑抽取为 Composable 函数</li>
        <li>合理使用 ref 和 reactive，基本类型用 ref，对象用 reactive</li>
        <li>避免过度拆分，保持代码的可读性</li>
      </ol>
      <p>Composition API 是 Vue 3 最重要的发展之一，掌握它能让你写出更加优雅、可维护的 Vue 组件代码。</p>
    `
  }
}

onMounted(() => {
  const data = mockArticles[articleId.value] || mockArticles['1']
  article.value = data

  author.value = {
    name: data.authorName,
    avatar: data.authorAvatar,
    bio: '全栈开发工程师，热爱开源技术分享',
    articleCount: 42,
    followerCount: 1286
  }

  relatedArticles.value = [
    {
      id: 101,
      title: 'Vue 3 响应式原理深度解析',
      authorName: '张三',
      likes: 89,
      cover: 'https://picsum.photos/seed/vue-react/160/108'
    },
    {
      id: 102,
      title: '从 Vue 2 迁移到 Vue 3 完整指南',
      authorName: '李四',
      likes: 156,
      cover: 'https://picsum.photos/seed/vue-migrate/160/108'
    },
    {
      id: 103,
      title: 'Vite + Vue 3 项目搭建最佳实践',
      authorName: '王五',
      likes: 203,
      cover: null
    },
    {
      id: 104,
      title: 'Pinia 状态管理完全指南',
      authorName: '赵六',
      likes: 178,
      cover: null
    }
  ]
})

const goBack = () => {
  router.back()
}

const goHome = () => {
  router.push('/')
}

const toggleUserCard = () => {
  showUserCard.value = !showUserCard.value
}

const handleTocClick = (item) => {
  const el = document.getElementById(item.id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <div class="detail-container">
    <header class="navbar">
      <div class="nav-brand">
        <div class="logo" @click="goHome">
          <span class="bracket">&lt;</span>
          <span class="brand-name">BitInn</span>
          <span class="bracket">/&gt;</span>
        </div>
      </div>

      <div class="nav-actions">
        <button class="btn-back" @click="goBack" title="返回">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span>返回</span>
        </button>
        <button class="btn-write" @click="router.push('/article/edit')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          <span>写文章</span>
        </button>
        <button v-if="!isLoggedIn" class="btn-login" @click="router.push('/login')">登录 / 注册</button>
        <div v-else class="user-avatar-wrapper" :title="userName" @click="toggleUserCard">
          <img :src="userAvatar" :alt="userName" class="user-avatar" />
        </div>
      </div>
    </header>

    <UserCard :visible="showUserCard" @close="showUserCard = false" />

    <main class="main-content">
      <ArticleDetailSidebar
        :likes="article.likes"
        :favorites="article.favorites"
        :comments="article.comments"
        :shares="article.shares"
        :toc-list="tocList"
        @toc-click="handleTocClick"
      />

      <ArticleDetailContent :article="article" />

      <ArticleDetailRight
        :author="author"
        :related-articles="relatedArticles"
      />
    </main>
  </div>
</template>

<style scoped lang="scss">
.detail-container {
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 8px 24px rgba(249, 115, 22, 0.3);
  }
}

.nav-brand {
  .logo {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 24px;
    font-weight: 700;
    cursor: pointer;

    .bracket {
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
      color: #333;
    }

    .brand-name {
      color: #F97316;
      text-shadow: 0 0 10px rgba(249, 115, 22, 0.5);
    }
  }
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 12px;

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

  .btn-write {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    border: 1px solid #F97316;
    background: transparent;
    color: #1a1a1a;

    svg {
      width: 16px;
      height: 16px;
      stroke: currentColor;
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

  .btn-login {
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    border: 1px solid #F97316;
    background: transparent;
    color: #F97316;

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
}

.main-content {
  display: grid;
  grid-template-columns: 200px 1fr 300px;
  gap: 20px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 84px 24px 24px;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
}

@media (max-width: 1200px) {
  .main-content {
    grid-template-columns: 180px 1fr 270px;
    gap: 16px;
  }
}

@media (max-width: 992px) {
  .main-content {
    grid-template-columns: 1fr;
    height: auto;
    overflow: visible;
  }

  .nav-actions .btn-write span {
    display: none;
  }
}

@media (max-width: 768px) {
  .navbar {
    padding: 0 16px;
  }

  .nav-actions .btn-login {
    padding: 7px 10px;
    font-size: 11.5px;
  }
}
</style>
