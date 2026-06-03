<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useDarkMode } from './composables/useDarkMode'
import Navbar from './components/Navbar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import FooterSection from './components/FooterSection.vue'

const ProjectsSection = defineAsyncComponent(() => import('./components/ProjectsSection.vue'))
const ContactSection = defineAsyncComponent(() => import('./components/ContactSection.vue'))

// Initialize dark mode composable to sync with the inline script in index.html
useDarkMode()
</script>

<template>
  <div class="min-h-screen bg-bg-primary text-text-primary font-body transition-colors duration-300">
    <Navbar />
    <main>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </main>
    <FooterSection />
  </div>
</template>
