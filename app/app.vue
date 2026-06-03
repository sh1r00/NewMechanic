<template>
  <div>
    <!-- Initial app loading screen (before hydration completes) -->
    <Transition name="app-loader-fade">
      <div
        v-if="appLoading"
        class="fixed inset-0 z-[10000] flex items-center justify-center bg-bg-primary"
        aria-live="assertive"
        aria-label="Application loading"
      >
        <div class="flex flex-col items-center gap-6">
          <!-- Animated gear -->
          <div class="app-loader-gear">
            <svg
              class="w-16 h-16 text-accent"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97s-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65A.488.488 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1s.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.98l2.49 1.01c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>
            </svg>
          </div>
          <!-- Brand name -->
          <h1 class="font-display text-3xl text-text-primary tracking-wide">ELIAS</h1>
          <!-- Loading bar -->
          <div class="w-48 h-1 bg-border rounded-full overflow-hidden">
            <div class="h-full bg-accent rounded-full app-loader-bar"></div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Action loading overlay (between interactions) -->
    <LoadingOverlay />

    <!-- Main app content -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const appLoading = ref(true)

onMounted(() => {
  // Dismiss the initial loader after a short delay to ensure smooth transition
  setTimeout(() => {
    appLoading.value = false
  }, 800)
})
</script>

<style>
.app-loader-gear {
  animation: app-gear-spin 2s linear infinite;
}

@keyframes app-gear-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.app-loader-bar {
  animation: app-loader-progress 1.5s ease-in-out infinite;
}

@keyframes app-loader-progress {
  0% { width: 0%; margin-left: 0; }
  50% { width: 60%; margin-left: 20%; }
  100% { width: 0%; margin-left: 100%; }
}

.app-loader-fade-enter-active,
.app-loader-fade-leave-active {
  transition: opacity 0.5s ease;
}

.app-loader-fade-enter-from,
.app-loader-fade-leave-to {
  opacity: 0;
}

/* Reduced motion: stop loading spinner and progress bar animations */
@media (prefers-reduced-motion: reduce) {
  .app-loader-gear {
    animation: none;
  }

  .app-loader-bar {
    animation: none;
    width: 100% !important;
    margin-left: 0 !important;
  }
}
</style>
