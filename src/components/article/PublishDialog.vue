<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  presetType: {
    type: String,
    default: ''
  },
  presetTags: {
    type: Array,
    default: () => []
  },
  title: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:visible', 'confirm', 'cancel'])

const articleTypes = [
  {
    id: 'tech',
    name: '技术文章',
    icon: '💻',
    color: '#F97316'
  },
  {
    id: 'note',
    name: '学习笔记',
    icon: '📝',
    color: '#10B981'
  },
  {
    id: 'discussion',
    name: '问题讨论',
    icon: '💬',
    color: '#EF4444'
  },
  {
    id: 'project',
    name: '项目分享',
    icon: '🚀',
    color: '#8B5CF6'
  }
]

const allTags = ['Java', 'Spring Boot', 'Vue', 'React', 'Python', 'Docker', 'MySQL', 'Redis', '微服务', '算法', 'TypeScript', 'Go']

const selectedType = ref(null)
const selectedTags = ref([])
const excerpt = ref('')
const coverUrl = ref('')
const coverFile = ref(null)

const initFromPreset = () => {
  if (props.presetType) {
    const found = articleTypes.find(t => t.id === props.presetType)
    if (found) selectedType.value = found
  }
  if (props.presetTags && props.presetTags.length > 0) {
    selectedTags.value = [...props.presetTags]
  }
}

initFromPreset()

const selectType = (type) => {
  selectedType.value = type
}

const toggleTag = (tag) => {
  const idx = selectedTags.value.indexOf(tag)
  if (idx > -1) {
    selectedTags.value.splice(idx, 1)
  } else {
    selectedTags.value.push(tag)
  }
}

const handleCoverUpload = (e) => {
  const file = e.target.files[0]
  if (!file) return
  if (!file.type.startsWith('image/')) return
  coverFile.value = file
  const reader = new FileReader()
  reader.onload = (ev) => {
    coverUrl.value = ev.target.result
  }
  reader.readAsDataURL(file)
}

const removeCover = () => {
  coverUrl.value = ''
  coverFile.value = null
}

const excerptCount = computed(() => excerpt.value.length)

const canPublish = computed(() => {
  return props.title.trim() && selectedType.value && excerpt.value.trim().length >= 20
})

const handleConfirm = () => {
  if (!canPublish.value) return
  emit('confirm', {
    type: selectedType.value,
    tags: [...selectedTags.value],
    excerpt: excerpt.value.trim(),
    coverUrl: coverUrl.value,
    coverFile: coverFile.value
  })
  handleClose()
}

const handleClose = () => {
  emit('update:visible', false)
  emit('cancel')
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="visible" class="modal-overlay" @click.self="handleClose">
        <div class="publish-dialog">
          <div class="dialog-header">
            <h2 class="dialog-title">发布文章</h2>
            <button class="btn-close" @click="handleClose">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          <div class="dialog-body">
            <!-- 文章类型 -->
            <div class="form-section">
              <label class="form-label">文章类型</label>
              <div class="type-options">
                <button
                  v-for="type in articleTypes"
                  :key="type.id"
                  class="type-chip"
                  :class="{ active: selectedType?.id === type.id }"
                  :style="selectedType?.id === type.id ? { borderColor: type.color, color: type.color, backgroundColor: type.color + '12' } : {}"
                  @click="selectType(type)"
                >
                  <span class="type-icon">{{ type.icon }}</span>
                  {{ type.name }}
                </button>
              </div>
            </div>

            <!-- 标签选择 -->
            <div class="form-section">
              <label class="form-label">文章标签</label>
              <div class="tag-cloud">
                <button
                  v-for="tag in allTags"
                  :key="tag"
                  class="tag-chip"
                  :class="{ active: selectedTags.includes(tag) }"
                  @click="toggleTag(tag)"
                >
                  {{ tag }}
                </button>
              </div>
              <p v-if="selectedTags.length === 0" class="hint-text">请至少选择一个标签</p>
            </div>

            <!-- 文章封面 -->
            <div class="form-section">
              <label class="form-label">文章封面（选填）</label>
              <div class="cover-area" @click="$refs.coverInput.click()">
                <img v-if="coverUrl" :src="coverUrl" alt="封面预览" class="cover-preview" />
                <template v-else>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="32" height="32">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                  <span>点击上传封面图片</span>
                </template>
                <input
                  ref="coverInput"
                  type="file"
                  accept="image/*"
                  class="cover-input"
                  @change="handleCoverUpload"
                />
              </div>
              <button v-if="coverUrl" class="btn-remove-cover" @click.stop="removeCover">移除封面</button>
            </div>

            <!-- 文章摘要 -->
            <div class="form-section">
              <label class="form-label">
                文章摘要
                <span class="char-count" :class="{ warn: excerptCount > 90, error: excerptCount > 100 }">{{ excerptCount }}/100</span>
              </label>
              <textarea
                v-model="excerpt"
                class="excerpt-input"
                placeholder="请输入文章摘要，帮助读者快速了解文章内容（至少20字）..."
                maxlength="100"
                rows="3"
              ></textarea>
            </div>
          </div>

          <div class="dialog-footer">
            <button class="btn-cancel" @click="handleClose">取消</button>
            <button class="btn-publish" :class="{ disabled: !canPublish }" :disabled="!canPublish" @click="handleConfirm">
              确认发布
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.publish-dialog {
  background: #fff;
  border-radius: 16px;
  width: 520px;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(249, 115, 22, 0.25);
    border-radius: 4px;
  }
}

.dialog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px 0;

  .dialog-title {
    font-size: 18px;
    font-weight: 700;
  }

  .btn-close {
    width: 32px;
    height: 32px;
    border: none;
    border-radius: 8px;
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
    transition: all 0.2s;

    &:hover {
      background: #f3f3f3;
      color: #333;
    }
  }
}

.dialog-body {
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-section {
  .form-label {
    display: block;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 10px;
    color: #1a1a1a;

    .char-count {
      float: right;
      font-weight: 400;
      font-size: 12px;
      color: #999;

      &.warn {
        color: #F97316;
      }

      &.error {
        color: #EF4444;
      }
    }
  }
}

// 文章类型
.type-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.type-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border: 1.5px solid #e5e7eb;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  background: transparent;
  color: #666;

  &:hover {
    border-color: #d1d5db;
    transform: translateY(-1px);
  }

  &.active {
    font-weight: 600;
  }

  .type-icon {
    font-size: 15px;
  }
}

// 标签
.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-chip {
  padding: 5px 14px;
  border: 1.5px solid #e5e7eb;
  border-radius: 16px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  background: transparent;
  color: #666;

  &:hover {
    border-color: #F97316;
    color: #F97316;
    transform: translateY(-1px);
  }

  &.active {
    border-color: #F97316;
    background: #F97316;
    color: white;
  }
}

.hint-text {
  margin-top: 8px;
  font-size: 12px;
  color: #999;
}

// 封面上传
.cover-area {
  position: relative;
  width: 100%;
  height: 140px;
  border: 2px dashed #e5e7eb;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s;
  overflow: hidden;
  color: #999;
  font-size: 13px;

  &:hover {
    border-color: #F97316;
    color: #F97316;
  }

  .cover-preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .cover-input {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
  }
}

.btn-remove-cover {
  margin-top: 8px;
  padding: 4px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  color: #999;
  background: transparent;
  transition: all 0.2s;

  &:hover {
    border-color: #EF4444;
    color: #EF4444;
  }
}

// 摘要输入
.excerpt-input {
  width: 100%;
  padding: 10px 14px;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  font-size: 14px;
  line-height: 1.6;
  resize: none;
  outline: none;
  transition: all 0.2s;
  box-sizing: border-box;
  font-family: inherit;

  &::placeholder {
    color: #bbb;
  }

  &:focus {
    border-color: #F97316;
    box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.08);
  }
}

// 底部按钮
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 16px 24px 20px;
  border-top: 1px solid #f3f3f3;
}

.btn-cancel {
  padding: 9px 22px;
  border: 1.5px solid #e5e7eb;
  border-radius: 9px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  background: transparent;
  color: #666;
  transition: all 0.2s;

  &:hover {
    border-color: #d1d5db;
    background: #f9fafb;
  }
}

.btn-publish {
  padding: 9px 26px;
  border: none;
  border-radius: 9px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  background: #F97316;
  color: white;
  transition: all 0.2s;

  &:hover:not(.disabled) {
    box-shadow: 0 6px 20px rgba(249, 115, 22, 0.35);
    transform: translateY(-1px);
  }

  &.disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .publish-dialog,
.modal-leave-to .publish-dialog {
  transform: scale(0.95) translateY(10px);
}
</style>
