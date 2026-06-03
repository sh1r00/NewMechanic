<template>
  <div>
    <HeroSection />
    <AboutSection />
    <SkillsSection />
    <ProjectsSection />
    <ContactSection />
  </div>
</template>

<script setup lang="ts">
const { t, locale, locales } = useI18n()

// Resolve BCP 47 language tag for the active locale
const currentLocaleObj = computed(() =>
  locales.value.find(l => (typeof l === 'string' ? l : l.code) === locale.value)
)
const ogLocale = computed(() =>
  typeof currentLocaleObj.value === 'string'
    ? locale.value
    : currentLocaleObj.value?.language || locale.value
)

useHead({
  title: () => t('og.title'),
  meta: [
    { name: 'description', content: () => t('og.description') }
  ]
})

useSeoMeta({
  ogTitle: () => t('og.title'),
  ogDescription: () => t('og.description'),
  ogLocale: () => ogLocale.value,
  ogType: 'website'
})

// OG images are generated at build time via nuxt-og-image (zeroRuntime mode)
// The module reads ogTitle/ogDescription from useSeoMeta automatically

useSchemaOrg([
  defineWebSite({
    name: 'Elias | Mechanic Portfolio'
  }),
  defineWebPage({
    name: 'Elias | Mechanic Portfolio',
    description: 'Professional mechanic portfolio — Engine diagnostics, brake systems, electrical repair, and custom fabrication.'
  })
])
</script>
