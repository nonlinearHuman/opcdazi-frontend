<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click.self="$emit('close')">
    <div class="bg-discord-gray rounded-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden flex flex-col">
      <!-- 标题栏 -->
      <div class="h-12 bg-discord-darker flex items-center justify-between px-4 border-b border-discord-dark">
        <h3 class="font-semibold text-white">发起新讨论 - {{ channelName }}</h3>
        <button 
          @click="$emit('close')"
          class="text-discord-muted hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>
      
      <!-- 表单内容 -->
      <div class="flex-1 overflow-y-auto p-6">
        <!-- 作者名称 -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-discord-muted mb-2">
            你的昵称 *
          </label>
          <input
            v-model="form.author_name"
            type="text"
            placeholder="输入昵称"
            class="w-full px-4 py-2 bg-discord-lighter border border-discord-dark rounded text-discord-text outline-none focus:border-discord-accent transition-colors"
          />
        </div>
        
        <!-- 标题 -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-discord-muted mb-2">
            标题 *
          </label>
          <input
            v-model="form.title"
            type="text"
            placeholder="输入标题"
            class="w-full px-4 py-2 bg-discord-lighter border border-discord-dark rounded text-discord-text outline-none focus:border-discord-accent transition-colors"
          />
        </div>
        
        <!-- 类型 -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-discord-muted mb-2">
            类型
          </label>
          <div class="flex gap-2">
            <button
              v-for="type in types"
              :key="type.value"
              @click="form.type = type.value"
              class="px-4 py-2 rounded text-sm transition-colors"
              :class="form.type === type.value 
                ? 'bg-discord-accent text-white' 
                : 'bg-discord-lighter text-discord-text hover:bg-discord-dark'"
            >
              {{ type.icon }} {{ type.label }}
            </button>
          </div>
        </div>
        
        <!-- 内容 -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-discord-muted mb-2">
            内容 *
          </label>
          <textarea
            v-model="form.content"
            placeholder="分享你的经验、问题或资源..."
            rows="10"
            class="w-full px-4 py-2 bg-discord-lighter border border-discord-dark rounded text-discord-text outline-none focus:border-discord-accent transition-colors resize-none"
          ></textarea>
        </div>
      </div>
      
      <!-- 底部按钮 -->
      <div class="h-16 bg-discord-darker flex items-center justify-end gap-3 px-6 border-t border-discord-dark">
        <button
          @click="$emit('close')"
          class="px-4 py-2 text-discord-muted hover:text-white transition-colors"
        >
          取消
        </button>
        <button
          @click="submit"
          :disabled="!isFormValid || submitting"
          class="px-6 py-2 bg-discord-accent text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {{ submitting ? '发布中...' : '发布' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { threadApi } from '../api'

// Props
interface Props {
  channelId: number
  channelName: string
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  close: []
  created: [threadId: number]
}>()

// 帖子类型
const types = [
  { value: 'question', label: '提问', icon: '❓' },
  { value: 'guide', label: '攻略', icon: '📖' },
  { value: 'resource', label: '资源', icon: '📦' },
  { value: 'lead', label: '线索', icon: '🤝' }
]

// 表单数据
const form = ref({
  title: '',
  content: '',
  author_name: '',
  type: 'question'
})

const submitting = ref(false)

// 表单验证
const isFormValid = computed(() => {
  return form.value.title.trim() && 
         form.value.content.trim() && 
         form.value.author_name.trim()
})

// 提交表单
const submit = async () => {
  if (!isFormValid.value || submitting.value) return
  
  submitting.value = true
  try {
    const thread = await threadApi.createThread({
      channel_id: props.channelId,
      title: form.value.title.trim(),
      content: form.value.content.trim(),
      author_name: form.value.author_name.trim(),
      type: form.value.type
    })
    
    emit('created', thread.id)
  } catch (error) {
    console.error('创建线程失败:', error)
    alert('发布失败，请重试')
  } finally {
    submitting.value = false
  }
}
</script>
