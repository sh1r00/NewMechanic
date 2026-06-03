<script setup lang="ts">
import { portfolioData } from '../data/portfolio-data'

const { social } = portfolioData

// Random garage location: South Congress Ave, Austin, TX
const mapLat = 30.2500
const mapLon = -97.7500
const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${mapLon - 0.005}%2C${mapLat - 0.003}%2C${mapLon + 0.005}%2C${mapLat + 0.003}&layer=mapnik&marker=${mapLat}%2C${mapLon}`
</script>

<template>
  <section
    id="contact"
    class="py-20 px-6 bg-bg-secondary"
    style="content-visibility: auto; contain-intrinsic-size: auto 800px"
  >
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="font-display text-5xl md:text-6xl text-text-primary mb-4">
        Let's Connect
      </h2>
      <p class="font-body text-text-secondary text-lg md:text-xl mb-10">
        Have a project in mind or need a reliable mechanic? Let's talk.
      </p>

      <div class="flex items-center justify-center gap-6 mb-12">
        <!-- GitHub -->
        <a
          :href="social.github"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          class="w-14 h-14 rounded-full border border-border bg-surface flex items-center justify-center transition-all hover:ring-2 hover:ring-accent hover:ring-offset-2 hover:ring-offset-bg-secondary"
        >
          <svg
            class="w-6 h-6 text-text-primary"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </a>

        <!-- LinkedIn -->
        <a
          :href="social.linkedin"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          class="w-14 h-14 rounded-full border border-border bg-surface flex items-center justify-center transition-all hover:ring-2 hover:ring-accent hover:ring-offset-2 hover:ring-offset-bg-secondary"
        >
          <svg
            class="w-6 h-6 text-text-primary"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
      </div>

      <!-- Interactive Map -->
      <div class="rounded-lg overflow-hidden border border-border shadow-lg">
        <iframe
          :src="mapSrc"
          width="100%"
          height="350"
          frameborder="0"
          scrolling="no"
          class="w-full"
          title="Elias's Garage Location"
          loading="lazy"
          allowfullscreen
        ></iframe>
        <div class="bg-surface px-4 py-3 flex items-center gap-2 text-left">
          <svg class="w-5 h-5 text-accent flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
          </svg>
          <span class="font-body text-sm text-text-secondary">742 South Congress Ave, Austin, TX 78704</span>
        </div>
      </div>
    </div>
  </section>
</template>
