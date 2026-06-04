<script setup lang="ts">
const { t } = useI18n()
const { isPromptVisible, install, dismiss } = usePwaInstall()

const bannerRef = ref<HTMLElement | null>(null)
const previousFocusRef = ref<HTMLElement | null>(null)

// Focus management: move focus to banner on appear, return on dismiss
watch(isPromptVisible, (visible) => {
  if (visible) {
    // Store the previously focused element to restore later
    previousFocusRef.value = document.activeElement as HTMLElement | null
    nextTick(() => {
      bannerRef.value?.focus()
    })
  } else {
    // Return focus to the element that was focused before the banner appeared
    nextTick(() => {
      previousFocusRef.value?.focus()
      previousFocusRef.value = null
    })
  }
})

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    dismiss()
  }

  // Trap Tab within the banner
  if (event.key === 'Tab' && bannerRef.value) {
    const focusableElements = bannerRef.value.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstEl = focusableElements[0]
    const lastEl = focusableElements[focusableElements.length - 1]

    if (event.shiftKey) {
      if (document.activeElement === firstEl) {
        event.preventDefault()
        lastEl?.focus()
      }
    } else {
      if (document.activeElement === lastEl) {
        event.preventDefault()
        firstEl?.focus()
      }
    }
  }
}
</script>

<template>
  <Transition name="pwa-banner">
    <div
      v-if="isPromptVisible"
      ref="bannerRef"
      role="dialog"
      aria-labelledby="pwa-prompt-heading"
      aria-describedby="pwa-prompt-description"
      aria-live="assertive"
      tabindex="-1"
      class="fixed bottom-0 inset-x-0 z-50 border-t-2 border-primary bg-surface-container shadow-elevation-2 px-4 py-4 sm:px-6 sm:py-5"
      @keydown="handleKeydown"
    >
      <div class="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
        <!-- Text content -->
        <div class="flex-1 min-w-0">
          <h2
            id="pwa-prompt-heading"
            class="font-display text-xl sm:text-2xl text-on-surface tracking-wide"
          >
            {{ t('pwa.heading') }}
          </h2>
          <p
            id="pwa-prompt-description"
            class="font-body text-sm text-on-surface-variant mt-1"
          >
            {{ t('pwa.description') }}
          </p>
        </div>

        <!-- Action buttons -->
        <div class="flex items-center gap-3 shrink-0">
          <button
            type="button"
            class="font-body text-sm font-medium px-5 py-2 rounded-md bg-primary text-on-primary hover:bg-inverse-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors duration-200"
            @click="install"
          >
            {{ t('pwa.install') }}
          </button>
          <button
            type="button"
            class="font-body text-sm text-on-surface-variant hover:text-on-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors duration-200 px-3 py-2 rounded-md"
            @click="dismiss"
          >
            {{ t('pwa.dismiss') }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.pwa-banner-enter-active,
.pwa-banner-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.pwa-banner-enter-from,
.pwa-banner-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .pwa-banner-enter-active,
  .pwa-banner-leave-active {
    transition: none;
  }

  .pwa-banner-enter-from,
  .pwa-banner-leave-to {
    transform: none;
  }
}
</style>
