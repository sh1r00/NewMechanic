<script setup lang="ts">
import { portfolioData } from '~/data/portfolio-data'

const projects = portfolioData.projects
const sectionRef = ref<HTMLElement | null>(null)
const visibleCards = ref<Set<number>>(new Set())

let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!sectionRef.value) return

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(
            (entry.target as HTMLElement).dataset.index
          )
          visibleCards.value = new Set([...visibleCards.value, index])
          observer?.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 }
  )

  const cards = sectionRef.value.querySelectorAll('[data-index]')
  cards.forEach((card) => observer?.observe(card))
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <section
    id="projects"
    ref="sectionRef"
    class="py-20 px-6"
    style="content-visibility: auto; contain-intrinsic-size: auto 800px"
  >
    <div class="max-w-6xl mx-auto">
      <h2 class="font-display text-4xl text-on-background mb-2">{{ $t('projects.heading') }}</h2>
      <div class="w-12 h-1 bg-primary rounded mb-12"></div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          :data-index="index"
          class="transition-all duration-500 ease-out"
          :class="
            visibleCards.has(index)
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-5'
          "
          :style="{ transitionDelay: `${index * 100}ms` }"
        >
          <ProjectCard
            :title="project.title"
            :description="project.description"
            :image="project.image"
            :tags="project.tags"
            :live-url="project.liveUrl"
            :repo-url="project.repoUrl"
          />
        </div>
      </div>
    </div>
  </section>
</template>
