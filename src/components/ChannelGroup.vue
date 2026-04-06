<template>
  <div class="mb-2">
    <!-- 分类标题 -->
    <button 
      @click="collapsed = !collapsed"
      class="w-full flex items-center px-4 py-1 text-xs font-semibold text-discord-muted uppercase hover:text-discord-text transition-colors"
    >
      <span class="mr-1 transition-transform" :class="{ 'rotate-90': !collapsed }">▶</span>
      {{ title }}
    </button>
    
    <!-- 频道列表 -->
    <div v-show="!collapsed" class="mt-1">
      <button
        v-for="channel in channels"
        :key="channel.id"
        @click="$emit('channel-select', channel.id)"
        class="w-full flex items-center px-4 py-1.5 text-sm text-discord-text hover:bg-discord-lighter hover:text-white transition-colors group"
        :class="{ 
          'bg-discord-accent text-white': currentChannelId === channel.id,
          'text-discord-muted': currentChannelId !== channel.id
        }"
      >
        <!-- 频道图标 -->
        <span class="mr-2 text-lg">{{ channel.icon }}</span>
        
        <!-- 频道名称 -->
        <span class="flex-1 text-left truncate">{{ channel.name }}</span>
        
        <!-- 未读标记 -->
        <span 
          v-if="channel.has_unread"
          class="w-2 h-2 bg-white rounded-full"
        ></span>
        
        <!-- 订阅标记 -->
        <span 
          v-if="channel.is_subscribed && currentChannelId !== channel.id"
          class="text-xs text-discord-muted opacity-0 group-hover:opacity-100"
        >
          ⭐
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ChannelTreeNode } from '../types'

// Props
interface Props {
  title: string
  channels: ChannelTreeNode[]
  currentChannelId: number | null
}

defineProps<Props>()

// Emits
defineEmits<{
  'channel-select': [channelId: number]
}>()

// 状态
const collapsed = ref(false)
</script>
