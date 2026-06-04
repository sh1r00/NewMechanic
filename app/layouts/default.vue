<template>
  <div class="min-h-screen bg-background text-on-background font-body transition-colors duration-300">
    <!-- Skip to content link for keyboard/screen reader users -->
    <a
      href="#main-content"
      class="skip-to-content sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-primary focus:text-on-primary focus:rounded-lg focus:font-body focus:text-sm focus:shadow-elevation-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
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
