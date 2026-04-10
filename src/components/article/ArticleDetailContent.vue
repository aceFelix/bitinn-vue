<script setup>
import { ref, nextTick } from 'vue'

const props = defineProps({
  article: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['comment-click'])

const commentText = ref('')
const comments = ref([
  {
    id: 1,
    author: '前端小白',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=c1',
    content: '写得非常清晰，终于搞懂 Composition API 了！',
    time: '1小时前',
    likes: 12
  },
  {
    id: 2,
    author: 'Java老司机',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=c2',
    content: '对比 React Hooks 来看，Vue 的设计确实更优雅一些。',
    time: '30分钟前',
    likes: 8
  },
  {
    id: 3,
    author: '全栈学习者',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=c3',
    content: '请问 setup 语法糖和普通写法有什么区别吗？',
    time: '10分钟前',
    likes: 3
  }
])

const submitComment = () => {
  const text = commentText.value.trim()
  if (!text) return
  comments.value.unshift({
    id: Date.now(),
    author: '我',
    avatar: '',
    content: text,
    time: '刚刚',
    likes: 0
  })
  commentText.value = ''
}

const scrollToComments = () => {
  emit('comment-click')
}
</script>

<template>
  <article class="article-detail-content">
    <div class="article-header">
      <h1 class="article-title">{{ article.title || '' }}</h1>
    </div>

    <div ref="contentRef" class="article-body" v-html="article.content || ''"></div>

    <div ref="commentSectionRef" class="comment-section">
      <div class="section-header">
        <h3 class="section-title">评论 ({{ comments.length }})</h3>
      </div>

      <div class="comment-input-area">
        <textarea
          v-model="commentText"
          class="comment-textarea"
          placeholder="写下你的想法..."
          rows="3"
        ></textarea>
        <button class="btn-submit-comment" @click="submitComment">发布评论</button>
      </div>

      <div class="comments-list">
        <div v-for="comment in comments" :key="comment.id" class="comment-item">
          <img :src="comment.avatar" :alt="comment.author" class="comment-avatar">
          <div class="comment-main">
            <div class="comment-head">
              <span class="comment-author">{{ comment.author }}</span>
              <span class="comment-time">{{ comment.time }}</span>
            </div>
            <p class="comment-text">{{ comment.content }}</p>
            <div class="comment-actions">
              <button class="comment-action-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                {{ comment.likes }}
              </button>
              <button class="comment-action-btn">回复</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
.article-detail-content {
  border-radius: 10px;
  background: #fff;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  height: 100%;
  overflow-y: auto;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 8px 24px rgba(249, 115, 22, 0.3);
    transform: translateY(-2px);
  }

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(249, 115, 22, 0.25);
    border-radius: 4px;
  }
}

.article-header {
  padding: 28px 28px 20px;
}

.article-title {
  font-size: 26px;
  font-weight: 700;
  line-height: 1.45;
  margin-bottom: 18px;
  color: #1a1a1a;
}

.article-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;

  .meta-left {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: #888;
  }

  .author-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  }

  .author-name {
    font-weight: 600;
    color: #333;
  }

  .meta-sep {
    color: #ddd;
  }

  .publish-time,
  .read-time {
    color: #999;
  }
}

.article-tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

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
  background: #f5f5f5;
  color: #666;
}

.article-body {
  padding: 0 28px 28px;
  font-size: 15px;
  line-height: 1.85;
  color: #333;

  :deep(h2) {
    font-size: 21px;
    font-weight: 700;
    margin: 32px 0 14px;
    padding-top: 10px;
    color: #1a1a1a;
  }

  :deep(h3) {
    font-size: 17px;
    font-weight: 600;
    margin: 24px 0 10px;
    color: #222;
  }

  :deep(p) {
    margin: 12px 0;
  }

  :deep(pre) {
    background: #1e1e2e;
    color: #cdd6f4;
    border-radius: 10px;
    padding: 18px 20px;
    overflow-x: auto;
    margin: 18px 0;
    font-size: 13.5px;
    line-height: 1.65;
  }

  :deep(code) {
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    font-size: 13px;
  }

  :deep(blockquote) {
    border-left: 4px solid #F97316;
    margin: 18px 0;
    padding: 12px 18px;
    background: rgba(249, 115, 22, 0.05);
    border-radius: 0 10px 10px 0;
    color: #555;
    font-style: italic;
  }

  :deep(img) {
    max-width: 100%;
    border-radius: 10px;
    margin: 16px 0;
  }

  :deep(ul),
  :deep(ol) {
    padding-left: 22px;
    margin: 12px 0;

    li {
      margin: 6px 0;
    }
  }

  :deep(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 18px 0;

    th, td {
      border: 1px solid #e5e7eb;
      padding: 10px 14px;
      text-align: left;
      font-size: 13.5px;
    }

    th {
      background: #f9fafb;
      font-weight: 600;
    }
  }
}

.comment-section {
  padding: 24px 28px 28px;
  border-top: 1px solid #eee;
}

.section-header {
  margin-bottom: 18px;

  .section-title {
    font-size: 17px;
    font-weight: 700;
    color: #1a1a1a;
  }
}

.comment-input-area {
  margin-bottom: 24px;

  .comment-textarea {
    width: 100%;
    padding: 12px 16px;
    border: 1.5px solid #e5e7eb;
    border-radius: 10px;
    font-size: 14px;
    line-height: 1.6;
    resize: none;
    outline: none;
    transition: all 0.2s;
    font-family: inherit;
    box-sizing: border-box;

    &::placeholder {
      color: #bbb;
    }

    &:focus {
      border-color: #F97316;
      box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.08);
    }
  }

  .btn-submit-comment {
    margin-top: 10px;
    padding: 8px 22px;
    border: none;
    border-radius: 9px;
    font-size: 13.5px;
    font-weight: 600;
    cursor: pointer;
    background: #F97316;
    color: white;
    transition: all 0.2s;

    &:hover {
      box-shadow: 0 6px 20px rgba(249, 115, 22, 0.35);
      transform: translateY(-1px);
    }
  }
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.comment-item {
  display: flex;
  gap: 12px;
  padding-bottom: 18px;
  border-bottom: 1px solid #f3f3f3;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
}

.comment-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.comment-main {
  flex: 1;
  min-width: 0;
}

.comment-head {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;

  .comment-author {
    font-size: 13.5px;
    font-weight: 600;
    color: #333;
  }

  .comment-time {
    font-size: 12px;
    color: #aaa;
  }
}

.comment-text {
  font-size: 14px;
  line-height: 1.65;
  color: #444;
  margin-bottom: 8px;
}

.comment-actions {
  display: flex;
  gap: 16px;
}

.comment-action-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border: none;
  border-radius: 6px;
  background: transparent;
  font-size: 12px;
  color: #999;
  cursor: pointer;
  transition: all 0.2s;

  svg {
    stroke: #bbb;
    transition: stroke 0.2s;
  }

  &:hover {
    color: #F97316;

    svg {
      stroke: #F97316;
    }
  }
}
</style>
