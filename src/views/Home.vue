<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import LeftSidebar from '@/components/home/LeftSidebar.vue'
import ArticleFeed from '@/components/home/ArticleFeed.vue'
import RightSidebar from '@/components/home/RightSidebar.vue'

const router = useRouter()

// 搜索关键词
const searchQuery = ref('')

// 导航到登录页
const goToLogin = () => {
  router.push('/login')
}

// 导航到写文章（直接编辑）
const writeArticle = () => {
  router.push('/article/edit')
}

// 导航到创作引导页
const startCreate = () => {
  router.push('/create')
}

// 打开消息中心
const openMessages = () => {
  // TODO: 实现消息功能
  console.log('打开消息中心')
}
</script>

<template>
  <div class="home-container">
    <!-- 顶部导航栏 -->
    <header class="navbar">
      <div class="nav-brand">
        <div class="logo">
          <span class="logo-bracket">&lt;</span>
          <span class="logo-text">BitLnn</span>
          <span class="logo-bracket">/&gt;</span>
        </div>
      </div>
      
      <div class="nav-search">
        <div class="search-box">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="搜索文章、标签、作者..."
            class="search-input"
          />
          <span class="search-shortcut">⌘K</span>
        </div>
      </div>
      
      <div class="nav-actions">
        <button class="btn-write" @click="writeArticle">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          <span>写文章</span>
        </button>
        <button class="btn-message" @click="openMessages">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          <span class="message-badge">3</span>
        </button>
        <button class="btn-login" @click="goToLogin">登录 / 注册</button>
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="main-content">
      <!-- 左侧边栏组件 -->
      <LeftSidebar />

      <!-- 文章流组件 -->
      <ArticleFeed />

      <!-- 右侧边栏组件 -->
      <RightSidebar />
    </main>
  </div>
</template>

<style scoped lang="scss">
.home-container {
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

// 顶部导航栏
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
    
    .logo-bracket {
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
    }
    
    .logo-text {
      text-shadow: 0 0 10px rgba(249, 115, 22, 0.5);
      color: #F97316;
    }
  }
}

.nav-search {
  flex: 1;
  max-width: 480px;
  margin: 0 24px;
  
  .search-box {
    position: relative;
    display: flex;
    align-items: center;
    
    .search-icon {
      position: absolute;
      left: 12px;
      width: 18px;
      height: 18px;
      transition: all 0.2s;
      z-index: 1;
      pointer-events: none;
    }

    &:hover .search-icon {
      stroke: #F97316;
    }

    .search-input {
      width: 100%;
      height: 40px;
      padding: 0 48px 0 40px;
      border-radius: 8px;
      font-size: 14px;
      border: 1px solid transparent;
      transition: all 0.2s;

      &:hover {
        box-shadow: 0 8px 24px rgba(249, 115, 22, 0.3);
        transform: translateY(-2px);
        border-color: #F97316;
      }

      &:focus {
        outline: none;
        box-shadow: 0 8px 24px rgba(249, 115, 22, 0.3);
        transform: translateY(-2px);
        border-color: #F97316;
      }
    }
    
    .search-shortcut {
      position: absolute;
      right: 12px;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 12px;
      font-family: 'JetBrains Mono', monospace;
    }
  }
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  
  .btn-write {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
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
      stroke: #1a1a1a;
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

  .btn-message {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: transparent;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
    
    svg {
      width: 20px;
      height: 20px;
    }
    
    svg {
      stroke: #1a1a1a;
      transition: stroke 0.2s;
    }

    &:hover {
      box-shadow: 0 8px 24px rgba(249, 115, 22, 0.3);
      transform: translateY(-2px);

      svg {
        stroke: #F97316;
      }
    }

    &:active {
      box-shadow: 0 8px 24px rgba(249, 115, 22, 0.3);
      transform: translateY(-2px);

      svg {
        stroke: #F97316;
      }
    }
    
    .message-badge {
      position: absolute;
      top: -6px;
      right: -6px;
      min-width: 18px;
      height: 18px;
      padding: 0 5px;
      background: #F97316;
      border-radius: 9px;
      color: white;
      font-size: 11px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
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
    
    &:hover {
      box-shadow: 0 8px 24px rgba(249, 115, 22, 0.3);
      transform: translateY(-2px);
      background: #F97316;
      color: white;
    }
  }
}

// 主内容区
.main-content {
  display: grid;
  grid-template-columns: 240px 1fr 320px;
  gap: 24px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 84px 24px 24px;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
}

// 响应式设计
@media (max-width: 1200px) {
  .main-content {
    grid-template-columns: 200px 1fr 280px;
  }
}

@media (max-width: 992px) {
  .main-content {
    grid-template-columns: 1fr;
    height: auto;
    overflow: visible;
  }
  
  .nav-search {
    max-width: 300px;
  }
}

@media (max-width: 768px) {
  .navbar {
    padding: 0 16px;
  }
  
  .nav-search {
    display: none;
  }
  
  .nav-actions {
    .btn-write span {
      display: none;
    }
  }
  
  .article-content {
    flex-direction: column;
    
    .article-cover {
      width: 100%;
      height: 180px;
    }
  }
}
</style>
