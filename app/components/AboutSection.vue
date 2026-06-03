<script setup lang="ts">
import { portfolioData } from '~/data/portfolio-data'

const { yearsExperience } = portfolioData.personal
</script>

<template>
  <section
    id="about"
    class="py-20 px-6 bg-bg-secondary"
    style="content-visibility: auto; contain-intrinsic-size: auto 600px;"
  >
    <!-- Section divider: thin gradient accent line -->
    <div
      class="mx-auto max-w-6xl mb-12 h-px"
      style="background: linear-gradient(to right, transparent, var(--color-accent), transparent);"
    ></div>

    <div class="max-w-6xl mx-auto">
      <!-- Section heading -->
      <h2 class="font-display text-4xl md:text-5xl text-text-primary mb-10 tracking-wide">
        {{ $t('about.heading') }}
        <span class="block mt-2 w-16 h-1 bg-accent rounded"></span>
      </h2>

      <!-- Two-column layout: single column mobile, two columns at md+ -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <!-- Left column: Bio text -->
        <div>
          <p class="font-body text-text-secondary text-lg leading-relaxed">
            {{ $t('about.description') }}
          </p>
        </div>

        <!-- Right column: Experience stat -->
        <div class="flex flex-col items-center md:items-start justify-center">
          <span class="font-display text-7xl md:text-8xl text-accent leading-none">
            {{ yearsExperience }}+
          </span>
          <span class="font-body text-text-secondary text-lg mt-2 tracking-wide uppercase">
            Years Experience
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
