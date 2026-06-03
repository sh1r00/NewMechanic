<script setup lang="ts">
defineProps<{
  title: string
  description: string
  image: string
  tags: string[]
  liveUrl?: string
  repoUrl?: string
}>()
</script>

<template>
  <article
    class="bg-surface rounded-lg overflow-hidden border border-border transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
  >
    <img
      :src="image"
      :alt="title"
      width="600"
      height="400"
      loading="lazy"
      class="w-full h-48 object-cover"
    />
    <div class="p-5">
      <h3 class="font-display text-xl text-text-primary mb-2">{{ title }}</h3>
      <p class="font-body text-text-secondary text-sm line-clamp-3 mb-4">
        {{ description }}
      </p>
      <div class="flex flex-wrap gap-2 mb-4">
        <span
          v-for="tag in tags"
          :key="tag"
          class="bg-bg-secondary text-accent rounded-full px-3 py-1 text-xs font-medium"
        >
          {{ tag }}
        </span>
      </div>
      <div
        v-if="liveUrl || repoUrl"
        class="flex items-center gap-4 pt-3 border-t border-border"
      >
        <a
          v-if="liveUrl"
          :href="liveUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1 text-sm text-accent hover:text-accent-hover font-medium transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 3h6v6"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10 14L21 3"
            />
          </svg>
          {{ $t('projects.liveDemo') }}
        </a>
        <a
          v-if="repoUrl"
          :href="repoUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1 text-sm text-accent hover:text-accent-hover font-medium transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
          {{ $t('projects.source') }}
        </a>
      </div>
    </div>
  </article>
</template>
