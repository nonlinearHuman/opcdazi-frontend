<template>
  <div class="credit-panel bg-discord-darker rounded-lg p-4">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-bold text-discord-text">我的声望</h3>
      <router-link to="/credit-history" class="text-sm text-discord-link hover:underline">
        查看历史
      </router-link>
    </div>
    
    <div v-if="loading" class="text-center py-4 text-discord-muted">加载中...</div>
    
    <div v-else-if="credit" class="space-y-4">
      <!-- 等级显示 -->
      <div class="flex items-center gap-3">
        <CreditBadge 
          :level="credit.level" 
          :level-name="credit.level_name"
          :score="credit.score"
          :show-score="true"
        />
      </div>
      
      <!-- 进度条 -->
      <div class="space-y-1">
        <div class="flex justify-between text-xs text-discord-muted">
          <span>{{ credit.score }} / {{ nextLevelScore }}</span>
          <span>{{ nextLevelName }}</span>
        </div>
        <div class="h-2 bg-discord-dark rounded-full overflow-hidden">
          <div 
            class="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-300"
            :style="{ width: progressPercent + '%' }"
          ></div>
        </div>
      </div>
      
      <!-- 统计 -->
      <div class="grid grid-cols-2 gap-4 pt-2">
        <div>
          <div class="text-2xl font-bold text-green-400">+{{ credit.total_earned }}</div>
          <div class="text-xs text-discord-muted">累计获得</div>
        </div>
        <div>
          <div class="text-2xl font-bold text-red-400">-{{ credit.total_spent }}</div>
          <div class="text-xs text-discord-muted">累计消费</div>
        </div>
      </div>
      
      <!-- 特权提示 -->
      <div class="pt-2 border-t border-discord-dark">
        <div class="text-xs text-discord-muted mb-2">当前特权</div>
        <div class="flex flex-wrap gap-2">
          <span v-if="privileges.can_post" class="px-2 py-0.5 bg-discord-dark rounded text-xs text-discord-text">
            ✍️ 发帖
          </span>
          <span v-if="privileges.can_reply" class="px-2 py-0.5 bg-discord-dark rounded text-xs text-discord-text">
            💬 回复
          </span>
          <span v-if="privileges.can_like" class="px-2 py-0.5 bg-discord-dark rounded text-xs text-discord-text">
            👍 点赞
          </span>
          <span v-if="privileges.can_collect" class="px-2 py-0.5 bg-discord-dark rounded text-xs text-discord-text">
            ⭐ 收藏
          </span>
          <span v-if="privileges.priority" class="px-2 py-0.5 bg-purple-900 rounded text-xs text-purple-300">
            🚀 优先推荐
          </span>
          <span v-if="privileges.free_ai" class="px-2 py-0.5 bg-yellow-900 rounded text-xs text-yellow-300">
            🤖 AI免费咨询
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import CreditBadge from './CreditBadge.vue'
import { creditApi } from '../api'

interface Props {
  userId: number
}

const props = defineProps<Props>()

const loading = ref(true)
const credit = ref<any>(null)
const privileges = ref<any>({})

// 计算下一级所需声望
const nextLevelScore = computed(() => {
  if (!credit.value) return 50
  const thresholds = [50, 200, 500, 1000, Infinity]
  const current = credit.value.level
  return thresholds[current] || 1000
})

const nextLevelName = computed(() => {
  if (!credit.value || credit.value.level >= 5) return '已满级'
  const names = ['', '小试牛刀', '渐入佳境', '资深玩家', '金牌搭子']
  return names[credit.value.level] || ''
})

const progressPercent = computed(() => {
  if (!credit.value || credit.value.level >= 5) return 100
  const thresholds = [0, 50, 200, 500, 1000]
  const current = credit.value.level
  const prev = thresholds[current - 1] || 0
  const next = thresholds[current]
  return Math.min(100, ((credit.value.score - prev) / (next - prev)) * 100)
})

onMounted(async () => {
  try {
    const [creditData, privilegeData] = await Promise.all([
      creditApi.getCredit(props.userId),
      creditApi.getPrivileges(props.userId)
    ])
    credit.value = creditData
    privileges.value = privilegeData.privileges
  } catch (error) {
    console.error('加载声望值失败:', error)
  } finally {
    loading.value = false
  }
})
</script>
