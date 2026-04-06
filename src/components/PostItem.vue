<template>
  <div class="px-6 py-4 bg-discord-gray rounded-lg">
    <!-- 作者信息 -->
    <div class="flex items-center gap-3 mb-3">
      <div class="w-8 h-8 rounded-full bg-discord-lighter flex items-center justify-center text-white text-sm font-bold">
        {{ (post.author_name || '匿')[0] }}
      </div>
      <div>
        <div class="text-sm font-medium text-discord-text">
          {{ post.author_name || '匿名用户' }}
        </div>
        <div class="text-xs text-discord-muted">
          {{ formatTime(post.created_at) }}
        </div>
      </div>
      
      <!-- 已采纳标记 -->
      <div v-if="post.is_answer" class="ml-auto">
        <span class="px-2 py-1 text-xs rounded bg-green-600 text-white">
          ✓ 已采纳
        </span>
      </div>
    </div>
    
    <!-- 内容 -->
    <div class="text-discord-text whitespace-pre-wrap">
      {{ post.content }}
    </div>
    
    <!-- 操作按钮 -->
    <div class="mt-3 flex items-center gap-2">
      <button
        v-if="!post.is_answer"
        @click="$emit('accept', post.id)"
        class="text-xs text-discord-muted hover:text-discord-accent transition-colors"
      >
        采纳为答案
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '../types'

// Props
interface Props {
  post: Post
}

defineProps<Props>()

// Emits
defineEmits<{
  accept: [postId: number]
}>()

// 格式化时间
const formatTime = (dateStr: string) => {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  
  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes}分钟前`
  if (hours < 24) return `${hours}小时前`
  
  return date.toLocaleDateString('zh-CN')
}
</script>
