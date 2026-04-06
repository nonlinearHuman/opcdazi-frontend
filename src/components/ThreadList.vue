<template>
  <div class="flex-1 flex flex-col bg-discord-light overflow-hidden">
    <!-- 操作栏 -->
    <div class="h-12 bg-discord-gray border-b border-discord-darker flex items-center justify-between px-4">
      <div class="text-sm text-discord-muted">
        {{ channelName }}
      </div>
      <button
        @click="$emit('create-thread')"
        class="px-4 py-1.5 bg-discord-accent text-white text-sm rounded hover:bg-blue-600 transition-colors"
      >
        + 发起讨论
      </button>
    </div>
    
    <!-- 线程列表 -->
    <div class="flex-1 overflow-y-auto">
      <div v-if="loading" class="flex items-center justify-center h-full">
        <div class="text-discord-muted">加载中...</div>
      </div>
      
      <div v-else-if="threads.length === 0" class="flex items-center justify-center h-full">
        <div class="text-center text-discord-muted">
          <div class="text-4xl mb-2">📝</div>
          <p>还没有帖子</p>
          <p class="text-sm mt-1">点击上方按钮发起第一个讨论吧</p>
        </div>
      </div>
      
      <div v-else class="divide-y divide-discord-darker">
        <ThreadItem
          v-for="thread in threads"
          :key="thread.id"
          :thread="thread"
          @click="$emit('thread-select', thread.id)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import ThreadItem from './ThreadItem.vue'
import { threadApi } from '../api'
import type { ThreadList } from '../types'

// Props
interface Props {
  channelId: number
  channelName: string
}

const props = defineProps<Props>()

// Emits
defineEmits<{
  'thread-select': [threadId: number]
  'create-thread': []
}>()

// 状态
const threads = ref<ThreadList[]>([])
const loading = ref(false)

// 加载线程
const loadThreads = async () => {
  loading.value = true
  try {
    threads.value = await threadApi.getThreads(props.channelId)
  } catch (error) {
    console.error('加载线程失败:', error)
  } finally {
    loading.value = false
  }
}

// 监听频道变化
watch(() => props.channelId, loadThreads, { immediate: true })

onMounted(loadThreads)
</script>
