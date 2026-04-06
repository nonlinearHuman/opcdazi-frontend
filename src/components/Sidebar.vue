<template>
  <!-- Mobile overlay backdrop -->
  <div 
    v-if="isMobile && sidebarOpen" 
    class="fixed inset-0 bg-black/50 z-30 md:hidden"
    @click="$emit('toggle-sidebar')"
  />
  
  <!-- Sidebar -->
  <aside 
    :class="[
      'bg-discord-dark flex flex-col transition-transform duration-300 z-40',
      'fixed md:relative inset-y-0 left-0',
      isMobile ? (sidebarOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0',
      'w-60 h-full'
    ]"
  >
    <!-- Logo -->
    <div class="h-12 bg-discord-darker flex items-center px-4 border-b border-discord-dark">
      <!-- Mobile close button -->
      <button 
        v-if="isMobile"
        class="mr-2 text-discord-muted hover:text-white"
        @click="$emit('toggle-sidebar')"
      >
        ✕
      </button>
      <h1 class="text-lg font-bold text-white">OPC搭子社区</h1>
    </div>
    
    <!-- 频道列表 -->
    <div class="flex-1 overflow-y-auto py-4">
      <ChannelGroup
        title="地域频道"
        :channels="regionChannels"
        :current-channel-id="currentChannelId"
        @channel-select="handleChannelSelect"
      />
      <ChannelGroup
        title="话题频道"
        :channels="topicChannels"
        :current-channel-id="currentChannelId"
        @channel-select="handleChannelSelect"
      />
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
import { computed, ref, onMounted, onUnmounted } from 'vue'
import ChannelGroup from './ChannelGroup.vue'
import type { ChannelTreeNode } from '../types'

interface Props {
  channels: ChannelTreeNode[]
  currentChannelId: number | null
  sidebarOpen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  sidebarOpen: true,
})

const emit = defineEmits<{
  'channel-select': [channelId: number]
  'toggle-sidebar': []
}>()

const isMobile = ref(false)

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

const regionChannels = computed(() => props.channels.filter(c => c.type === 'region'))
const topicChannels = computed(() => props.channels.filter(c => c.type === 'topic'))
const leadChannels = computed(() => props.channels.filter(c => c.type === 'lead'))

const handleChannelSelect = (channelId: number) => {
  emit('channel-select', channelId)
}
</script>
