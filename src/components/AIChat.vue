<template>
  <div class="ai-chat bg-discord-darker rounded-lg overflow-hidden">
    <!-- 头部 -->
    <div class="flex items-center justify-between px-4 py-3 bg-discord-gray border-b border-discord-dark">
      <div class="flex items-center gap-2">
        <span class="text-xl">🤖</span>
        <span class="font-bold text-discord-text">AI助手</span>
        <span v-if="aiEnabled" class="px-2 py-0.5 bg-green-900 text-green-300 text-xs rounded-full">
          在线
        </span>
        <span v-else class="px-2 py-0.5 bg-gray-700 text-gray-400 text-xs rounded-full">
          未配置
        </span>
      </div>
      <button 
        @click="$emit('close')"
        class="text-discord-muted hover:text-white transition-colors"
      >
        ✕
      </button>
    </div>
    
    <!-- 消息列表 -->
    <div ref="messagesContainer" class="h-80 overflow-y-auto p-4 space-y-4">
      <!-- 欢迎消息 -->
      <div v-if="!messages.length" class="text-center py-8">
        <div class="text-4xl mb-2">👋</div>
        <p class="text-discord-muted">有什么OPC相关的问题？问我吧！</p>
      </div>
      
      <!-- 消息列表 -->
      <div 
        v-for="(msg, index) in messages" 
        :key="index"
        :class="msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'"
      >
        <div 
          :class="[
            'max-w-[80%] rounded-lg px-4 py-2',
            msg.role === 'user' 
              ? 'bg-blue-600 text-white' 
              : 'bg-discord-gray text-discord-text'
          ]"
        >
          <div class="text-xs opacity-60 mb-1">
            {{ msg.role === 'user' ? '你' : 'AI助手' }}
          </div>
          <div class="whitespace-pre-wrap">{{ msg.content }}</div>
        </div>
      </div>
      
      <!-- 加载中 -->
      <div v-if="loading" class="flex justify-start">
        <div class="bg-discord-gray rounded-lg px-4 py-3">
          <div class="flex gap-1">
            <span class="w-2 h-2 bg-discord-muted rounded-full animate-bounce" style="animation-delay: 0ms"></span>
            <span class="w-2 h-2 bg-discord-muted rounded-full animate-bounce" style="animation-delay: 150ms"></span>
            <span class="w-2 h-2 bg-discord-muted rounded-full animate-bounce" style="animation-delay: 300ms"></span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 输入框 -->
    <div class="border-t border-discord-dark p-3">
      <div class="flex gap-2">
        <input
          v-model="inputMessage"
          @keyup.enter="sendMessage"
          type="text"
          :disabled="loading || !aiEnabled"
          placeholder="输入你的OPC问题..."
          class="flex-1 bg-discord-gray text-discord-text rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        />
        <button
          @click="sendMessage"
          :disabled="loading || !inputMessage.trim() || !aiEnabled"
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded font-medium text-white transition-colors"
        >
          发送
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'

interface Props {
  channelId?: number
  threadId?: number
}

const props = defineProps<Props>()
const emit = defineEmits(['close', '回答生成'])

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const messages = ref<Message[]>([])
const inputMessage = ref('')
const loading = ref(false)
const aiEnabled = ref(false)
const messagesContainer = ref<HTMLElement | null>(null)

const API_BASE = '/api'

onMounted(async () => {
  // 检查AI状态
  try {
    const res = await fetch(`${API_BASE}/ai/status`)
    const data = await res.json()
    aiEnabled.value = data.enabled
  } catch (e) {
    aiEnabled.value = false
  }
})

const sendMessage = async () => {
  if (!inputMessage.value.trim() || loading.value) return
  
  const userMessage = inputMessage.value.trim()
  inputMessage.value = ''
  
  // 添加用户消息
  messages.value.push({
    role: 'user',
    content: userMessage
  })
  
  // 滚动到底部
  await nextTick()
  scrollToBottom()
  
  loading.value = true
  
  try {
    const res = await fetch(`${API_BASE}/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userMessage,
        channel_id: props.channelId,
        thread_id: props.threadId
      })
    })
    
    const data = await res.json()
    
    // 添加AI回复
    messages.value.push({
      role: 'assistant',
      content: data.answer
    })
    
    // 触发事件
    emit('回答生成', data.answer)
  } catch (e) {
    messages.value.push({
      role: 'assistant',
      content: '❌ 请求失败，请稍后重试'
    })
  } finally {
    loading.value = false
    await nextTick()
    scrollToBottom()
  }
}

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}
</script>

<style scoped>
.animate-bounce {
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}
</style>
