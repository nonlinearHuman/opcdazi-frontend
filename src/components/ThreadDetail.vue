<template>
  <div class="flex-1 flex flex-col bg-discord-light overflow-hidden">
    <!-- 顶部栏 -->
    <div class="h-12 bg-discord-gray border-b border-discord-darker flex items-center px-4 gap-4">
      <button
        @click="$emit('back')"
        class="text-discord-muted hover:text-discord-text transition-colors"
      >
        ← 返回
      </button>
      <h2 class="font-medium text-discord-text truncate flex-1">
        {{ thread?.title }}
      </h2>
      <button
        @click="showAIChat = !showAIChat"
        class="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded flex items-center gap-1 transition-colors"
      >
        <span>🤖</span>
        <span>问AI</span>
      </button>
      <div class="flex items-center gap-2 text-xs text-discord-muted">
        <span>👁 {{ thread?.view_count }}</span>
        <span>💬 {{ thread?.reply_count }}</span>
      </div>
    </div>
    
    <!-- AI聊天面板 -->
    <div 
      v-if="showAIChat"
      class="border-b border-discord-darker"
    >
      <AIChat
        :channel-id="thread?.channel_id"
        :thread-id="threadId"
        @close="showAIChat = false"
        @回答生成="handleAIGenerate"
      />
    </div>
    
    <!-- 内容区 -->
    <div class="flex-1 overflow-y-auto">
      <div v-if="loading" class="flex items-center justify-center h-full">
        <div class="text-discord-muted">加载中...</div>
      </div>
      
      <div v-else-if="thread" class="max-w-4xl mx-auto py-6">
        <!-- 主帖 -->
        <div class="px-6 pb-6 border-b border-discord-darker">
          <!-- 作者信息 -->
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-full bg-discord-accent flex items-center justify-center text-white font-bold">
              {{ (thread.author_name || '匿')[0] }}
            </div>
            <div>
              <div class="font-medium text-discord-text">
                {{ thread.author_name || '匿名用户' }}
              </div>
              <div class="text-xs text-discord-muted">
                {{ formatTime(thread.created_at) }}
              </div>
            </div>
            <div class="ml-auto">
              <span class="px-2 py-1 text-xs rounded bg-discord-lighter text-discord-muted">
                {{ thread.type }}
              </span>
            </div>
          </div>
          
          <!-- 标题 -->
          <h1 class="text-2xl font-bold text-white mb-4">
            {{ thread.title }}
          </h1>
          
          <!-- 内容 -->
          <div class="prose prose-invert max-w-none">
            <div class="whitespace-pre-wrap text-discord-text leading-relaxed">
              {{ thread.content }}
            </div>
          </div>
        </div>
        
        <!-- 回复列表 -->
        <div class="mt-6">
          <h3 class="px-6 mb-4 text-sm font-semibold text-discord-muted">
            {{ thread.posts.length }} 条回复
          </h3>
          
          <div class="space-y-4">
            <PostItem
              v-for="post in thread.posts"
              :key="post.id"
              :post="post"
              @accept="handleAcceptPost"
            />
          </div>
          
          <!-- 无回复提示 -->
          <div v-if="thread.posts.length === 0" class="px-6 py-8 text-center text-discord-muted">
            <div class="text-4xl mb-2">💬</div>
            <p>还没有回复</p>
            <p class="text-sm mt-1">成为第一个回复的人吧</p>
          </div>
        </div>
        
        <!-- 回复输入框 -->
        <div class="px-6 mt-6">
          <div class="bg-discord-gray rounded-lg p-4">
            <textarea
              v-model="replyContent"
              placeholder="写下你的回复..."
              class="w-full bg-transparent text-discord-text resize-none outline-none"
              rows="3"
            ></textarea>
            <div class="flex items-center justify-between mt-3">
              <input
                v-model="replyAuthor"
                placeholder="你的昵称"
                class="px-3 py-1.5 bg-discord-lighter rounded text-sm text-discord-text outline-none"
              />
              <button
                @click="submitReply"
                :disabled="!replyContent.trim() || !replyAuthor.trim() || submitting"
                class="px-4 py-1.5 bg-discord-accent text-white text-sm rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {{ submitting ? '发送中...' : '发送回复' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import PostItem from './PostItem.vue'
import { threadApi, postApi } from '../api'
import type { ThreadDetail } from '../types'

// Props
interface Props {
  threadId: number
}

const props = defineProps<Props>()

// Emits
defineEmits<{
  back: []
}>()

// 状态
const thread = ref<ThreadDetail | null>(null)
const loading = ref(false)
const replyContent = ref('')
const replyAuthor = ref('')
const submitting = ref(false)
const showAIChat = ref(false)

// 加载线程
const loadThread = async () => {
  loading.value = true
  try {
    thread.value = await threadApi.getThread(props.threadId)
  } catch (error) {
    console.error('加载线程失败:', error)
  } finally {
    loading.value = false
  }
}

// 提交回复
const submitReply = async () => {
  if (!replyContent.value.trim() || !replyAuthor.value.trim()) return
  
  submitting.value = true
  try {
    const post = await postApi.createPost({
      thread_id: props.threadId,
      content: replyContent.value.trim(),
      author_name: replyAuthor.value.trim()
    })
    
    // 添加到列表
    if (thread.value) {
      thread.value.posts.push(post)
      thread.value.reply_count++
    }
    
    // 清空输入
    replyContent.value = ''
  } catch (error) {
    console.error('发送回复失败:', error)
    alert('发送失败，请重试')
  } finally {
    submitting.value = false
  }
}

// 采纳回答
const handleAcceptPost = async (postId: number) => {
  try {
    await postApi.acceptPost(postId)
    
    // 更新状态
    if (thread.value) {
      thread.value.posts.forEach(p => {
        p.is_answer = p.id === postId
      })
    }
    
    alert('已采纳为答案')
  } catch (error) {
    console.error('采纳失败:', error)
    alert('操作失败')
  }
}

// AI生成回答
const handleAIGenerate = (content: string) => {
  // 将AI回答填入回复框
  replyContent.value = content
  alert('AI回答已填入回复框，可编辑后发送')
}

// 格式化时间
const formatTime = (dateStr: string) => {
  return new Date(dateStr).toLocaleString('zh-CN')
}

// 监听threadId变化
watch(() => props.threadId, loadThread)

onMounted(loadThread)
</script>
