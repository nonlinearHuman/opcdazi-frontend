<template>
  <div class="credit-badge inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium" :class="levelClass">
    <span class="level-icon">{{ levelIcon }}</span>
    <span class="level-name">{{ levelName }}</span>
    <span v-if="showScore" class="score text-discord-muted">{{ score }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  level: number
  levelName: string
  score?: number
  showScore?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showScore: false
})

const levelClass = computed(() => {
  const classes = {
    1: 'bg-gray-600 text-gray-200',
    2: 'bg-green-900 text-green-300',
    3: 'bg-blue-900 text-blue-300',
    4: 'bg-purple-900 text-purple-300',
    5: 'bg-yellow-900 text-yellow-300'
  }
  return classes[props.level as keyof typeof classes] || classes[1]
})

const levelIcon = computed(() => {
  const icons = {
    1: '🐣',
    2: '🌱',
    3: '🌿',
    4: '🌳',
    5: '🏆'
  }
  return icons[props.level as keyof typeof icons] || icons[1]
})
</script>

<style scoped>
.credit-badge {
  border: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
