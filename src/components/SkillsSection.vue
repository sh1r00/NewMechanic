<script setup lang="ts">
import { portfolioData } from '../data/portfolio-data'
import SkillCard from './SkillCard.vue'

const skills = portfolioData.skills
</script>

<template>
  <section
    id="skills"
    class="py-20 px-6 bg-bg-secondary"
    style="content-visibility: auto; contain-intrinsic-size: auto 500px;"
  >
    <div class="max-w-6xl mx-auto">
      <!-- Section heading -->
      <h2 class="font-display text-4xl md:text-5xl text-text-primary mb-12 tracking-wide">
        Skills
        <span class="block mt-2 w-16 h-1 bg-accent rounded"></span>
      </h2>

      <!-- Responsive grid with masonry-like offset -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        <div
          v-for="(skill, index) in skills"
          :key="skill.name"
          :class="{ 'mt-4 md:mt-6': index % 2 !== 0 }"
        >
          <SkillCard
            :name="skill.name"
            :level="skill.level"
            :icon="skill.icon"
          />
        </div>
      </div>
    </div>
  </section>
</template>
