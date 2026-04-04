<script setup>
import { ref } from 'vue'

// 热门标签
const hotTags = ref([
  { name: 'JavaScript', count: '12.5k', color: '#F7DF1E' },
  { name: 'Python', count: '10.2k', color: '#3776AB' },
  { name: 'Java', count: '8.7k', color: '#007396' },
  { name: 'Vue', count: '6.3k', color: '#4FC08D' },
  { name: 'React', count: '9.1k', color: '#61DAFB' },
  { name: 'Go', count: '5.4k', color: '#00ADD8' },
  { name: 'Rust', count: '4.2k', color: '#DEA584' },
  { name: 'Docker', count: '3.8k', color: '#2496ED' }
])

// 当前选中的导航项
const activeNav = ref('home')

const navItems = [
  { id: 'home', label: '首页', icon: 'home' },
  { id: 'reading', label: '阅读列表', icon: 'reading' },
  { id: 'favorites', label: '收藏', icon: 'favorites' },
  { id: 'settings', label: '设置', icon: 'settings' }
]

const setActiveNav = (id) => {
  activeNav.value = id
}
</script>

<template>
  <aside class="sidebar-left">
    <nav class="nav-menu">
      <a 
        v-for="item in navItems" 
        :key="item.id"
        href="#"
        :class="['nav-item', { active: activeNav === item.id }]"
        @click.prevent="setActiveNav(item.id)"
      >
        <!-- 首页图标 -->
        <svg v-if="item.icon === 'home'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        <!-- 阅读列表图标 -->
        <svg v-else-if="item.icon === 'reading'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10 9 9 9 8 9"/>
        </svg>
        <!-- 收藏图标 -->
        <svg v-else-if="item.icon === 'favorites'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
        <!-- 设置图标 -->
        <svg v-else-if="item.icon === 'settings'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
        <span>{{ item.label }}</span>
      </a>
    </nav>

    <!-- 热门标签 -->
    <div class="section">
      <h3 class="section-title">热门标签</h3>
      <div class="tags-list">
        <a 
          v-for="tag in hotTags" 
          :key="tag.name"
          href="#"
          class="tag-item"
        >
          <span class="tag-dot" :style="{ backgroundColor: tag.color }"></span>
          <span class="tag-name">#{{ tag.name }}</span>
          <span class="tag-count">{{ tag.count }}</span>
        </a>
      </div>
    </div>
  </aside>
</template>

<style scoped lang="scss">
.sidebar-left {
  height: 100%;
  overflow-y: auto;
  border-radius: 12px;
  padding: 16px;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  
  &:hover {
    border-color: #F97316;
    box-shadow: 0 8px 24px rgba(249, 115, 22, 0.3);
    transform: translateY(-2px);
  }

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
}

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 24px;
  
  .nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 16px;
    border-radius: 8px;
    text-decoration: none;
    font-size: 14px;
    color: #1a1a1a;
    transition: all 0.2s;
    border: 2px solid transparent;

    svg {
      width: 20px;
      height: 20px;
    }

    &:hover {
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
      transform: translateY(-2px);
    }

    &:active {
      color: #F97316;
    }

    &.active {
      font-weight: 500;
      box-shadow: 0 8px 24px rgba(249, 115, 22, 0.3);
      transform: translateY(-2px);
      color: #F97316;
    }
  }
}

.section {
  .section-title {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 12px;
    padding: 0 16px;
  }
}

.tags-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  
  .tag-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 16px;
    border-radius: 6px;
    text-decoration: none;
    font-size: 14px;
    color: #1a1a1a;
    transition: all 0.2s;
    border: 2px solid transparent;

    &:hover {
      padding-left: 24px;
      color: #F97316;
    }

    .tag-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .tag-name {
      flex: 1;
    }

    .tag-count {
      font-size: 12px;
    }
  }
}
</style>
