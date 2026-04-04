<script setup>
import { ref } from 'vue'

// 推荐标签
const recommendedTags = ref([
  'Java', 'Spring Boot', 'Vue', 'React', 'Python', 
  'Docker', 'MySQL', 'Redis', '微服务', '算法'
])

// 选中的标签
const selectedTags = ref([])

// 切换标签选择
const toggleTag = (tag) => {
  const index = selectedTags.value.indexOf(tag)
  if (index > -1) {
    selectedTags.value.splice(index, 1)
  } else {
    selectedTags.value.push(tag)
  }
}

// 暴露选中标签给父组件
const getSelectedTags = () => selectedTags.value

defineExpose({
  getSelectedTags,
  selectedTags
})
</script>

<template>
  <section class="tags-section">
    <h2 class="section-title">添加标签</h2>
    <p class="section-desc">选择合适的标签，让更多人发现你的文章</p>
    <div class="tags-cloud">
      <button
        v-for="tag in recommendedTags"
        :key="tag"
        class="tag-btn"
        :class="{ active: selectedTags.includes(tag) }"
        @click="toggleTag(tag)"
      >
        {{ tag }}
      </button>
    </div>
    <div class="selected-tags" v-if="selectedTags.length > 0">
      <span class="selected-label">已选择：</span>
      <span
        v-for="tag in selectedTags"
        :key="tag"
        class="selected-tag"
        @click="toggleTag(tag)"
      >
        {{ tag }}
        <span class="remove">×</span>
      </span>
    </div>
  </section>
</template>

<style scoped lang="scss">
.tags-section {
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

.tags-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag-btn {
  padding: 8px 16px;
  border: 1px solid #F97316;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  background: transparent;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.25);
  }

  &.active {
    color: white;
    background: #F97316;
    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
  }
}

.selected-tags {
  margin-top: 20px;
  padding-top: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.selected-label {
  font-size: 13px;
}

.selected-tag {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  color: #1a1a1a;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s;

  .remove {
    font-size: 14px;
    opacity: 0.8;
  }
}
</style>
