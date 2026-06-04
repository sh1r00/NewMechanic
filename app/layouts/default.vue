<template>
  <div class="min-h-screen bg-background text-on-background font-body transition-colors duration-300">
    <!-- Skip to content: invisible until keyboard-focused, then appears at top -->
    <a
      href="#main-content"
      class="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[9999] focus-visible:px-4 focus-visible:py-2 focus-visible:bg-primary focus-visible:text-on-primary focus-visible:rounded-lg focus-visible:font-body focus-visible:text-sm focus-visible:shadow-elevation-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {{ $t('accessibility.skipToContent') }}
    </a>

    <Navbar />
    <main id="main-content" tabindex="-1" class="outline-none">
      <slot />
    </main>
    <FooterSection />
    <PwaInstallPrompt />
  </div>
</template>

<script setup lang="ts">
const darkModeStore = useDarkModeStore()
darkModeStore.initialize()

const pwaInstallStore = usePwaInstallStore()
pwaInstallStore.initialize()

// Enable locale-aware head management (html lang, dir, and SEO meta tags)
useLocaleHead({ addDirAttribute: true, addSeoAttributes: true })

// Focus management on route changes
if (import.meta.client) {
  const route = useRoute()
  watch(() => route.fullPath, () => {
    nextTick(() => {
      const mainContent = document.getElementById('main-content')
      if (mainContent) {
        mainContent.focus()
      }
    })
  })
}
</script>
