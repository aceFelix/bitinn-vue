<script setup>
import { ref } from 'vue'

// 模拟文章数据
const articles = ref([
  {
    id: 1,
    title: '深入理解 Vue 3 Composition API',
    excerpt: 'Composition API 是 Vue 3 中引入的一种新的组织组件逻辑的方式，它提供了更灵活的代码组织方式...',
    author: '张三',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    tags: ['Vue', 'JavaScript', '前端'],
    likes: 128,
    comments: 32,
    readTime: '5 min',
    publishedAt: '2小时前',
    cover: null
  },
  {
    id: 2,
    title: 'Spring Boot 3.0 新特性详解',
    excerpt: 'Spring Boot 3.0 带来了许多令人兴奋的新特性，包括对 Jakarta EE 9 的支持、原生镜像支持等...',
    author: '李四',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
    tags: ['Java', 'Spring Boot', '后端'],
    likes: 256,
    comments: 48,
    readTime: '8 min',
    publishedAt: '5小时前',
    cover: 'https://picsum.photos/seed/spring/400/200'
  },
  {
    id: 3,
    title: 'TypeScript 高级类型体操',
    excerpt: 'TypeScript 的类型系统非常强大，本文将带你深入了解一些高级类型技巧...',
    author: '王五',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
    tags: ['TypeScript', 'JavaScript'],
    likes: 89,
    comments: 15,
    readTime: '12 min',
    publishedAt: '1天前',
    cover: null
  },
  {
    id: 4,
    title: 'Docker 容器化部署最佳实践',
    excerpt: '本文分享了在生产环境中使用 Docker 进行容器化部署的一些最佳实践...',
    author: '赵六',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
    tags: ['Docker', 'DevOps', '运维'],
    likes: 167,
    comments: 23,
    readTime: '6 min',
    publishedAt: '2天前',
    cover: 'https://picsum.photos/seed/docker/400/200'
  },
  {
    id: 5,
    title: 'React 18 Concurrent 模式解析',
    excerpt: 'React 18 引入了 Concurrent 模式，这是一个革命性的特性，它允许 React 同时准备多个版本的 UI...',
    author: '钱七',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=5',
    tags: ['React', 'JavaScript', '前端'],
    likes: 312,
    comments: 67,
    readTime: '10 min',
    publishedAt: '3天前',
    cover: null
  }
])

// 当前选中的排序方式
const currentSort = ref('recommend')
const sortOptions = [
  { value: 'recommend', label: '推荐' },
  { value: 'latest', label: '最新' },
  { value: 'hot', label: '热门' }
]

const loadMore = () => {
  // TODO: 实现加载更多逻辑
  console.log('加载更多文章')
}
</script>

<template>
  <section class="content-feed">
    <!-- 排序选项卡 -->
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

    <!-- 文章列表 -->
    <div class="articles-list">
      <article 
        v-for="article in articles" 
        :key="article.id"
        class="article-card"
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

    <!-- 加载更多 -->
    <div class="load-more">
      <button class="btn-load-more" @click="loadMore">加载更多</button>
    </div>
  </section>
</template>

<style lang="scss">
.content-feed {
  min-width: 0;
  height: 100%;
  overflow-y: auto;
  border: 3px solid none;
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
  border: 2px solid none;
  border-radius: 12px;
  padding: 4px;
  margin-bottom: 16px;
  transition: all 0.2s;
  
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

  &:active {
    color: #F97316;
  }

  &.active {
    font-weight: 600;
    box-shadow: 0 8px 24px rgba(249, 115, 22, 0.3);
    transform: translateY(-2px);
    color: #F97316;
  }
}

.articles-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.article-card {
  border: none;
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
    border: 2px solid none;
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
    border: 2px solid none;
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
  
  .tag-badge {
    padding: 4px 10px;
    border: 1px solid none;
    border-radius: 12px;
    font-size: 12px;
    transition: all 0.2s;
    
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

.load-more {
  margin-top: 24px;
  text-align: center;
  
  .btn-load-more {
    padding: 12px 32px;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    background: transparent;

    &:hover {
      box-shadow: 0 8px 24px rgba(249, 115, 22, 0.3);
      transform: translateY(-2px);
    }
  }
}

// 响应式
@media (max-width: 768px) {
  .article-content {
    flex-direction: column;
    
    .article-cover {
      width: 100%;
      height: 180px;
    }
  }
}
</style>
