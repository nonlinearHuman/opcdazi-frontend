<template>
  <div 
    class="px-4 py-3 hover:bg-discord-lighter cursor-pointer transition-colors"
    :class="{ 'bg-discord-lighter': thread.is_pinned }"
  >
    <div class="flex items-start gap-3">
      <!-- 类型图标 -->
      <div class="text-2xl">
        {{ typeIcon }}
      </div>
      
      <!-- 内容 -->
      <div class="flex-1 min-w-0">
        <!-- 标题行 -->
        <div class="flex items-center gap-2 mb-1">
          <span 
            v-if="thread.is_pinned"
            class="text-xs text-discord-accent"
          >
            📌 置顶
          </span>
          <h3 class="font-medium text-discord-text truncate">
            {{ thread.title }}
          </h3>
        </div>
        
        <!-- 元信息 -->
        <div class="flex items-center gap-3 text-xs text-discord-muted">
          <span>{{ thread.author_name || '匿名用户' }}</span>
          <span>·</span>
          <span>{{ formatTime(thread.created_at) }}</span>
          <span>·</span>
          <span class="flex items-center gap-1">
            <span>👁</span>
            {{ thread.view_count }}
          </span>
          <span class="flex items-center gap-1">
            <span>💬</span>
            {{ thread.reply_count }}
          </span>
        </div>
        
        <!-- 内容预览 -->
        <p class="mt-2 text-sm text-discord-muted line-clamp-2">
          {{ thread.content.replace(/[#*`]/g, '').substring(0, 100) }}...
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ThreadList } from '../types'

// Props
interface Props {
  thread: ThreadList
}

const props = defineProps<Props>()

// 计算类型图标
const typeIcon = computed(() => {
  const icons: Record<string, string> = {
    question: '❓',
    guide: '📖',
    resource: '📦',
    lead: '🤝'
  }
  return icons[props.thread.type] || '📝'
})

// 格式化时间
const formatTime = (dateStr: string) => {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  
  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes}分钟前`
  if (hours < 24) return `${hours}小时前`
  if (days < 7) return `${days}天前`
  
  return date.toLocaleDateString('zh-CN')
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
