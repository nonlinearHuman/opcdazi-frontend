<template>
  <div class="flex h-screen bg-discord-light overflow-hidden">
    <!-- 左侧导航栏 -->
    <Sidebar 
      :channels="channels"
      :current-channel-id="currentChannelId"
      @channel-select="handleChannelSelect"
    />
    
    <!-- 主内容区 -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- 顶部栏 -->
      <header class="h-12 bg-discord-gray border-b border-discord-darker flex items-center px-4">
        <h1 class="text-lg font-semibold text-discord-text">
          {{ currentChannel?.icon }} {{ currentChannel?.name || 'OPC搭子社区' }}
        </h1>
        <div class="ml-auto flex items-center gap-2">
          <span class="text-discord-muted text-sm">{{ currentChannel?.description }}</span>
        </div>
      </header>
      
      <!-- 内容区 -->
      <main class="flex-1 overflow-hidden flex">
        <!-- 线程列表 -->
        <ThreadList 
          v-if="currentChannelId && !currentThreadId"
          :channel-id="currentChannelId"
          :channel-name="currentChannel?.name || ''"
          @thread-select="handleThreadSelect"
          @create-thread="handleCreateThread"
        />
        
        <!-- 线程详情 -->
        <ThreadDetail 
          v-if="currentThreadId"
          :thread-id="currentThreadId"
          @back="currentThreadId = null"
        />
        
        <!-- 欢迎页 -->
        <div 
          v-if="!currentChannelId"
          class="flex-1 flex items-center justify-center text-discord-muted"
        >
          <div class="text-center">
            <div class="text-6xl mb-4">🏢</div>
            <h2 class="text-2xl font-bold text-discord-text mb-2">欢迎来到OPC搭子社区</h2>
            <p class="text-lg">选择一个频道开始浏览</p>
          </div>
        </div>
      </main>
    </div>
    
    <!-- 发帖弹窗 -->
    <CreateThreadModal
      v-if="showCreateModal"
      :channel-id="currentChannelId!"
      :channel-name="currentChannel?.name || ''"
      @close="showCreateModal = false"
      @created="handleThreadCreated"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Sidebar from './components/Sidebar.vue'
import ThreadList from './components/ThreadList.vue'
import ThreadDetail from './components/ThreadDetail.vue'
import CreateThreadModal from './components/CreateThreadModal.vue'
import { channelApi } from './api'
import type { ChannelTreeNode } from './types'

// 状态
const channels = ref<ChannelTreeNode[]>([])
const currentChannelId = ref<number | null>(null)
const currentThreadId = ref<number | null>(null)
const showCreateModal = ref(false)

// 计算属性
const currentChannel = computed(() => {
  if (!currentChannelId.value) return null
  
  // 搜索函数
  const findChannel = (nodes: ChannelTreeNode[]): ChannelTreeNode | null => {
    for (const node of nodes) {
      if (node.id === currentChannelId.value) return node
      if (node.children.length > 0) {
        const found = findChannel(node.children)
        if (found) return found
      }
    }
    return null
  }
  
  return findChannel(channels.value)
})

// 方法
const loadChannels = async () => {
  try {
    channels.value = await channelApi.getChannels()
  } catch (error) {
    console.error('加载频道失败:', error)
  }
}

const handleChannelSelect = (channelId: number) => {
  currentChannelId.value = channelId
  currentThreadId.value = null
}

const handleThreadSelect = (threadId: number) => {
  currentThreadId.value = threadId
}

const handleCreateThread = () => {
  showCreateModal.value = true
}

const handleThreadCreated = (threadId: number) => {
  showCreateModal.value = false
  currentThreadId.value = threadId
}

// 生命周期
onMounted(() => {
  loadChannels()
})
</script>

<style scoped>
</style>
