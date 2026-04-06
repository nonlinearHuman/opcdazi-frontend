<template>
  <aside class="w-60 bg-discord-dark flex flex-col">
    <!-- Logo -->
    <div class="h-12 bg-discord-darker flex items-center px-4 border-b border-discord-dark">
      <h1 class="text-lg font-bold text-white">OPC搭子社区</h1>
    </div>
    
    <!-- 频道列表 -->
    <div class="flex-1 overflow-y-auto py-4">
      <!-- 地域频道 -->
      <ChannelGroup
        title="地域频道"
        :channels="regionChannels"
        :current-channel-id="currentChannelId"
        @channel-select="handleChannelSelect"
      />
      
      <!-- 话题频道 -->
      <ChannelGroup
        title="话题频道"
        :channels="topicChannels"
        :current-channel-id="currentChannelId"
        @channel-select="handleChannelSelect"
      />
      
      <!-- 线索对接 -->
      <ChannelGroup
        title="线索对接"
        :channels="leadChannels"
        :current-channel-id="currentChannelId"
        @channel-select="handleChannelSelect"
      />
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ChannelGroup from './ChannelGroup.vue'
import type { ChannelTreeNode } from '../types'

// Props
interface Props {
  channels: ChannelTreeNode[]
  currentChannelId: number | null
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  'channel-select': [channelId: number]
}>()

// 计算分类频道
const regionChannels = computed(() => 
  props.channels.filter(c => c.type === 'region')
)

const topicChannels = computed(() => 
  props.channels.filter(c => c.type === 'topic')
)

const leadChannels = computed(() => 
  props.channels.filter(c => c.type === 'lead')
)

// 方法
const handleChannelSelect = (channelId: number) => {
  emit('channel-select', channelId)
}
</script>
