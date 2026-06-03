<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface SkillCardProps {
  name: string
  level: number // 1-100 percentage
  icon: string  // emoji
}

const props = defineProps<SkillCardProps>()

const cardRef = ref<HTMLElement | null>(null)
const inView = ref(false)
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          inView.value = true
          observer?.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.3 }
  )

  if (cardRef.value) {
    observer.observe(cardRef.value)
  }
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <div
    ref="cardRef"
    class="bg-surface rounded-lg p-6 border border-border"
  >
    <!-- Icon -->
    <span class="text-3xl block mb-3" aria-hidden="true">{{ props.icon }}</span>

    <!-- Skill name -->
    <h3 class="font-body font-medium text-text-primary mb-4">{{ props.name }}</h3>

    <!-- Level percentage -->
    <div class="flex justify-end mb-1">
      <span class="font-display text-sm text-text-secondary">{{ props.level }}%</span>
    </div>

    <!-- Progress bar -->
    <div class="h-2 rounded-full bg-bg-secondary overflow-hidden" role="progressbar" :aria-valuenow="props.level" aria-valuemin="0" aria-valuemax="100" :aria-label="`${props.name} skill level`">
      <div
        class="h-full rounded-full bg-accent transition-all duration-1000 ease-out"
        :style="{ width: inView ? `${props.level}%` : '0%' }"
      ></div>
    </div>
  </div>
</template>
