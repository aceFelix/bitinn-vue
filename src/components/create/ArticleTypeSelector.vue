<script setup>
import { ref } from 'vue'

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

// 选中的文章类型
const selectedType = ref(null)

// 选择文章类型
const selectType = (type) => {
  selectedType.value = type
}

// 暴露选中类型给父组件
const getSelectedType = () => selectedType.value

defineExpose({
  getSelectedType,
  selectedType
})
</script>

<template>
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
</template>

<style scoped lang="scss">
.type-section {
  height: 100%;
  overflow-y: auto;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  padding: 24px;
  transition: all 0.2s;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(249, 115, 22, 0.25);
  }

  &::-webkit-scrollbar {
    display: none;
  }
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
}

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
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  }

  &.active {
    box-shadow: 0 8px 24px rgba(249, 115, 22, 0.3);
    transform: translateY(-2px);
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
</style>
