<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import request from '@/utils/request'
import defaultAvatar from '@/assets/user-avatar1.jpg'

const router = useRouter()

const articles = ref([])
const loading = ref(true)
const currentSort = ref('latest')
const sortOptions = [
  { value: 'latest', label: '最新' },
  { value: 'hot', label: '热门' }
]

const typeColorMap = {
  '技术文章': '#F97316',
  '学习笔记': '#10B981',
  '项目分享': '#8B5CF6',
  '问题讨论': '#EF4444',
  '经验分享': '#3B82F6',
  '教程指南': '#EC4899'
}

const fetchMyArticles = async () => {
  loading.value = true
  try {
    const result = await request.get('/article/my')
    if (result.code === 200) {
      const pageData = result.data || {}
      articles.value = (pageData.items || []).map(item => ({
        id: item.id,
        title: item.title,
        excerpt: item.excerpt || (item.content ? item.content.replace(/<[^>]+>/g, '').substring(0, 100) + '...' : ''),
        author: item.authorName || '我',
        avatar: item.authorAvatar || defaultAvatar,
        type: item.categoryName || '',
        typeColor: typeColorMap[item.categoryName] || '#F97316',
        tags: (item.tags || []).map(t => typeof t === 'string' ? t : t.tagName).filter(Boolean),
        likes: item.likeCount || 0,
        comments: item.commentCount || 0,
        favorites: item.favoriteCount || 0,
        shares: 0,
        readTime: `${Math.max(1, Math.ceil((item.content?.length || 0) / 500))} min`,
        publishedAt: formatTime(item.createTime),
        cover: item.coverImg || null
      }))
    }
  } catch (error) {
    console.error('获取我的文章失败:', error)
  } finally {
    loading.value = false
  }
}

function formatTime(timeStr) {
  if (!timeStr) return ''
  const date = new Date(timeStr)
  const now = new Date()
  const diffMs = now - date
  const diffMin = Math.floor(diffMs / 60000)
  if (diffMin < 60) return `${diffMin}分钟前`
  const diffHour = Math.floor(diffMin / 60)
  if (diffHour < 24) return `${diffHour}小时前`
  const diffDay = Math.floor(diffHour / 24)
  if (diffDay < 30) return `${diffDay}天前`
  return timeStr.substring(0, 10)
}

const goToDetail = (id) => {
  router.push(`/article/${id}`)
}

onMounted(() => {
  fetchMyArticles()
})

defineExpose({ refresh: fetchMyArticles })
</script>

<template>
  <section class="content-feed">
    <div class="feed-header">
      <div class="sort-tabs">
        <button 
          v-for="option in sortOptions"
          :key="option.value"
          :class="['sort-tab', { active: currentSort === option.value }]"
          @click="currentSort = option.value"
        >
          {{ option.label }}
        </button>
      </div>
    </div>

    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <span>加载中...</span>
    </div>

    <div v-else-if="articles.length === 0" class="empty-state">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="12" y1="18" x2="12" y2="12"/>
        <line x1="9" y1="15" x2="15" y2="15"/>
      </svg>
      <p>还没有发布过文章</p>
      <router-link to="/create" class="btn-write-first">写第一篇文章</router-link>
    </div>

    <div v-else class="articles-list">
      <article 
        v-for="article in articles" 
        :key="article.id"
        class="article-card"
        @click="goToDetail(article.id)"
      >
        <div class="article-header">
          <img :src="article.avatar" :alt="article.author" class="author-avatar">
          <div class="article-meta">
            <span class="author-name">{{ article.author }}</span>
            <span class="article-date">{{ article.publishedAt }}</span>
          </div>
        </div>

        <div class="article-content">
          <div class="article-text">
            <h2 class="article-title">{{ article.title }}</h2>
            <p class="article-excerpt">{{ article.excerpt }}</p>
            
            <div class="article-footer">
              <div class="article-tags">
                <span 
                  v-if="article.type"
                  class="type-badge"
                  :style="{ color: article.typeColor, borderColor: article.typeColor }"
                >
                  {{ article.type }}
                </span>
                <span 
                  v-for="tag in article.tags" 
                  :key="tag"
                  class="tag-badge"
                >
                  #{{ tag }}
                </span>
              </div>
              
              <div class="article-stats">
                <span class="stat-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                  {{ article.likes }}
                </span>
                <span class="stat-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                  {{ article.comments }}
                </span>
                <span class="stat-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                  {{ article.favorites }}
                </span>
                <span class="stat-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                    <polyline points="16 6 12 2 8 6"/>
                    <line x1="12" y1="2" x2="12" y2="15"/>
                  </svg>
                  {{ article.shares }}
                </span>
                <span class="stat-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  {{ article.readTime }}
                </span>
              </div>
            </div>
          </div>

          <img 
            v-if="article.cover" 
            :src="article.cover" 
            :alt="article.title"
            class="article-cover"
          >
        </div>
      </article>
    </div>
  </section>
</template>

<style lang="scss">
.content-feed {
  min-width: 0;
  height: 100%;
  overflow-y: auto;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 8px 24px rgba(249, 115, 22, 0.3);
    transform: translateY(-2px);
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

.feed-header {
  border-radius: 12px;
  padding: 4px;
  margin-bottom: 16px;
}

.sort-tabs {
  display: flex;
  gap: 4px;
}

.sort-tab {
  flex: 1;
  padding: 10px 16px;
  background: transparent;
  border: 2px solid transparent;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
    transform: translateY(-2px);
  }

  &.active {
    font-weight: 600;
    box-shadow: 0 8px 24px rgba(249, 115, 22, 0.3);
    transform: translateY(-2px);
    color: #F97316;
  }
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 60px 20px;
  color: #888;
  font-size: 14px;

  .loading-spinner {
    width: 32px;
    height: 32px;
    border: 3px solid #f0f0f0;
    border-top-color: #F97316;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 60px 20px;
  color: #888;

  svg {
    width: 64px;
    height: 64px;
    opacity: 0.4;
  }

  p {
    font-size: 15px;
  }

  .btn-write-first {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 10px 24px;
    background: #F97316;
    color: white;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.2s;

    &:hover {
      box-shadow: 0 8px 24px rgba(249, 115, 22, 0.35);
      transform: translateY(-2px);
    }
  }
}

.articles-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.article-card {
  border-radius: 12px;
  padding: 20px;
  transition: all 0.2s;
  cursor: pointer;
  
  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
    transform: translateY(-2px);
  }
}

.article-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  
  .author-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  
  .article-meta {
    display: flex;
    flex-direction: column;
    gap: 2px;
    
    .author-name {
      font-size: 14px;
      font-weight: 600;
    }
    
    .article-date {
      font-size: 12px;
    }
  }
}

.article-content {
  display: flex;
  gap: 20px;
  
  .article-text {
    flex: 1;
    min-width: 0;
  }
  
  .article-title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 8px;
    line-height: 1.4;
  }
  
  .article-excerpt {
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: 16px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .article-cover {
    width: 200px;
    height: 120px;
    object-fit: cover;
    border-radius: 8px;
    flex-shrink: 0;
  }
}

.article-footer {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  
  .type-badge {
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
    border: 1.5px solid;
    transition: all 0.2s;

    &:hover {
      transform: translateY(-1px);
    }
  }
  
  .tag-badge {
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 12px;
  }
}

.article-stats {
  display: flex;
  gap: 16px;
  
  .stat-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    
    svg {
      width: 16px;
      height: 16px;
    }
  }
}
</style>
