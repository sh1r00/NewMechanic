# Design Document

## Overview

This design describes the migration of the existing Vue 3 + Vite portfolio website to Nuxt 3 with the Nuxt 4 compatibility flag. The migration restructures the project to Nuxt conventions, adds PWA support, security headers, robots.txt generation, and replaces the custom dark mode composable with a Pinia store while preserving all existing functionality and visual design.

## Architecture

### High-Level Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    Nuxt 3 Application                      │
│                  (compatibilityVersion: 4)                 │
├──────────────────────────────────────────────────────────┤
│  nuxt.config.ts                                           │
│  ├── @nuxtjs/tailwindcss (styling)                       │
│  ├── @vite-pwa/nuxt (PWA)                                │
│  ├── nuxt-security (headers)                             │
│  ├── @nuxtjs/robots (robots.txt)                         │
│  └── @pinia/nuxt (state management)                      │
├──────────────────────────────────────────────────────────┤
│  app/                                                     │
│  ├── pages/index.vue          (single page route)        │
│  ├── layouts/default.vue      (navbar + footer wrapper)  │
│  ├── components/              (auto-imported)            │
│  │   ├── Navbar.vue                                      │
│  │   ├── HeroSection.vue                                 │
│  │   ├── AboutSection.vue                                │
│  │   ├── SkillsSection.vue                               │
│  │   ├── SkillCard.vue                                   │
│  │   ├── ProjectsSection.vue                             │
│  │   ├── ProjectCard.vue                                 │
│  │   ├── ContactSection.vue                              │
│  │   ├── ContactForm.vue                                 │
│  │   ├── FooterSection.vue                               │
│  │   └── DarkModeToggle.vue                              │
│  ├── composables/             (auto-imported)            │
│  │   └── useScrollSpy.ts                                 │
│  ├── stores/                                             │
│  │   └── darkMode.ts          (Pinia store)             │
│  ├── data/                                               │
│  │   └── portfolio-data.ts                               │
│  ├── assets/                                             │
│  │   └── css/main.css         (global styles)           │
│  └── app.vue                  (root app component)       │
├──────────────────────────────────────────────────────────┤
│  public/                       (static assets)           │
│  ├── favicon.svg                                         │
│  └── icons/                   (PWA icons)                │
├──────────────────────────────────────────────────────────┤
│  Nitro (Server Engine)                                    │
│  └── preset: github-pages (static output)                │
└──────────────────────────────────────────────────────────┘
```

### Directory Structure

```
project-root/
├── .github/workflows/deploy.yml    (updated for Nuxt)
├── .kiro/specs/                     (specs)
├── app/
│   ├── app.vue                      (root component)
│   ├── pages/
│   │   └── index.vue                (home page)
│   ├── layouts/
│   │   └── default.vue              (shared layout)
│   ├── components/
│   │   ├── Navbar.vue
│   │   ├── HeroSection.vue
│   │   ├── AboutSection.vue
│   │   ├── SkillsSection.vue
│   │   ├── SkillCard.vue
│   │   ├── ProjectsSection.vue
│   │   ├── ProjectCard.vue
│   │   ├── ContactSection.vue
│   │   ├── ContactForm.vue
│   │   ├── FooterSection.vue
│   │   └── DarkModeToggle.vue
│   ├── composables/
│   │   └── useScrollSpy.ts
│   ├── stores/
│   │   └── darkMode.ts
│   ├── data/
│   │   └── portfolio-data.ts
│   └── assets/
│       └── css/
│           └── main.css
├── public/
│   ├── favicon.svg
│   └── icons/
│       ├── icon-192x192.png
│       └── icon-512x512.png
├── tests/
│   ├── stores/
│   │   └── darkMode.test.ts
│   └── composables/
│       └── useScrollSpy.test.ts
├── nuxt.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── vitest.config.ts
```

## Components

### 1. Nuxt Configuration (`nuxt.config.ts`)

The central configuration file managing all modules, build settings, and runtime behavior.

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  future: {
    compatibilityVersion: 4
  },
  ssr: true,
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
    'nuxt-security',
    '@nuxtjs/seo'
  ],
  site: {
    url: 'https://YOUR-USERNAME.github.io/NewMechanic',
    name: 'Elias | Mechanic Portfolio',
    description: 'Professional mechanic portfolio — Engine diagnostics, brake systems, electrical repair, and custom fabrication.',
    defaultLocale: 'en'
  },
  app: {
    baseURL: '/NewMechanic/',
    head: {
      htmlAttrs: { lang: 'en' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Elias | Mechanic Portfolio',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap'
        }
      ],
      script: [
        {
          innerHTML: `(function(){try{var s=localStorage.getItem('dark-mode');if(s==='true'||(s===null&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          type: 'text/javascript'
        }
      ]
    }
  },
  css: ['~/assets/css/main.css'],
  nitro: {
    preset: 'github-pages'
  },
  pwa: {
    registerType: 'prompt',
    manifest: {
      name: 'Elias | Mechanic Portfolio',
      short_name: 'Elias Portfolio',
      description: 'Professional mechanic portfolio showcasing skills and projects',
      theme_color: '#d97706',
      background_color: '#f5f0eb',
      display: 'standalone',
      icons: [
        { src: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' }
      ]
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico,woff2}']
    }
  },
  security: {
    headers: {
      contentSecurityPolicy: {
        'default-src': ["'self'"],
        'script-src': ["'self'", "'unsafe-inline'"],
        'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        'font-src': ["'self'", 'https://fonts.gstatic.com'],
        'img-src': ["'self'", 'https://placehold.co', 'data:'],
        'connect-src': ["'self'"],
        'frame-src': ["'self'", 'https://*.google.com', 'https://*.openstreetmap.org']
      },
      xContentTypeOptions: 'nosniff',
      xFrameOptions: 'SAMEORIGIN',
      referrerPolicy: 'strict-origin-when-cross-origin'
    }
  },
  robots: {
    // Handled by @nuxtjs/seo — allows all by default
  }
})
```

### 2. Dark Mode Pinia Store (`app/stores/darkMode.ts`)

Replaces the current composable with a centralized Pinia store.

```typescript
// app/stores/darkMode.ts
import { defineStore } from 'pinia'

const STORAGE_KEY = 'dark-mode'

export const useDarkModeStore = defineStore('darkMode', {
  state: () => ({
    isDark: false
  }),

  actions: {
    initialize() {
      if (import.meta.client) {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved !== null) {
          this.isDark = saved === 'true'
        } else if (window.matchMedia) {
          this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        }
        this.applyClass()
      }
    },

    toggle() {
      this.isDark = !this.isDark
      this.applyClass()
      if (import.meta.client) {
        localStorage.setItem(STORAGE_KEY, String(this.isDark))
      }
    },

    applyClass() {
      if (import.meta.client) {
        document.documentElement.classList.toggle('dark', this.isDark)
      }
    }
  }
})
```

### 3. Default Layout (`app/layouts/default.vue`)

Shared layout providing the navbar and footer wrapping all pages.

```vue
<template>
  <div class="min-h-screen bg-bg-primary text-text-primary font-body transition-colors duration-300">
    <Navbar />
    <main>
      <slot />
    </main>
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
const darkModeStore = useDarkModeStore()
darkModeStore.initialize()
</script>
```

### 4. Index Page (`app/pages/index.vue`)

The single page composing all portfolio sections.

```vue
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
useHead({
  title: 'Elias | Mechanic Portfolio',
  meta: [
    { name: 'description', content: 'Professional mechanic portfolio - Engine diagnostics, brake systems, electrical repair, and custom fabrication.' }
  ]
})
</script>
```

### 5. Root App Component (`app/app.vue`)

Minimal root component using NuxtLayout and NuxtPage.

```vue
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

### 6. Scroll Spy Composable (`app/composables/useScrollSpy.ts`)

Migrated composable using Nuxt auto-import (no explicit Vue imports needed since they're auto-imported).

```typescript
// app/composables/useScrollSpy.ts
export function useScrollSpy(sectionIds: string[]) {
  const activeSection = ref<string>('')

  if (import.meta.server) {
    return { activeSection }
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      }
    },
    {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    }
  )

  onMounted(() => {
    for (const id of sectionIds) {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    }
  })

  onUnmounted(() => {
    observer.disconnect()
  })

  return { activeSection }
}
```

### 7. Tailwind Configuration (`tailwind.config.ts`)

Updated for Nuxt with the same custom theme tokens.

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default <Config>{
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', 'cursive'],
        body: ['"DM Sans"', 'sans-serif']
      },
      colors: {
        bg: {
          primary: 'var(--color-bg-primary)',
          secondary: 'var(--color-bg-secondary)'
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)'
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover: 'var(--color-accent-hover)'
        },
        surface: 'var(--color-surface)',
        border: 'var(--color-border)'
      }
    }
  }
}
```

### 8. GitHub Actions Workflow (`.github/workflows/deploy.yml`)

Updated to use Nuxt's generate command and correct output directory.

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ['main']
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Generate static site
        run: npx nuxi generate

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './.output/public'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 9. Package Dependencies

```json
{
  "name": "mechanic-portfolio",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "nuxi dev",
    "build": "nuxi build",
    "generate": "nuxi generate",
    "preview": "nuxi preview",
    "test": "vitest run",
    "test:watch": "vitest",
    "postinstall": "nuxi prepare"
  },
  "dependencies": {
    "nuxt": "^3.16.0",
    "vue": "^3.5.0",
    "pinia": "^2.3.0",
    "@pinia/nuxt": "^0.9.0"
  },
  "devDependencies": {
    "@nuxtjs/tailwindcss": "^6.13.0",
    "@nuxtjs/seo": "^2.0.0",
    "@vite-pwa/nuxt": "^0.10.0",
    "nuxt-security": "^2.1.0",
    "@nuxt/test-utils": "^3.17.0",
    "vitest": "^3.1.0",
    "@vue/test-utils": "^2.4.0",
    "typescript": "~5.7.0"
  }
}
```

## Data Flow

### Dark Mode Initialization Flow

```
Page Load → Inline <script> adds 'dark' class (before paint)
         → Nuxt hydration starts
         → Layout mounts → calls darkModeStore.initialize()
         → Store reads localStorage / matchMedia
         → Store sets isDark state and confirms class on <html>
         → Components reactively read store.isDark
```

### Static Generation Flow

```
nuxi generate → Nitro pre-renders all routes
             → Pages rendered to HTML with inlined critical CSS
             → PWA manifest + service worker generated
             → robots.txt generated
             → Security headers written to meta tags / _headers file
             → Output written to .output/public/
```

### Component Auto-Import Flow

```
app/components/Navbar.vue → Available as <Navbar /> in any template
app/composables/useScrollSpy.ts → Available as useScrollSpy() in any script
app/stores/darkMode.ts → Available as useDarkModeStore() via Pinia auto-import
```

## Correctness Properties

### Property 1: Dark Mode Toggle Idempotence (Requirement 4, Criterion 3)

**Type:** Idempotence  
**Description:** Toggling dark mode twice returns to the original state.  
**Formal:** For any initial state `s`, `toggle(toggle(s)) === s`  
**Test approach:** Property-based test generating random initial states and verifying double-toggle returns to original.

### Property 2: Dark Mode Persistence Round-Trip (Requirement 4, Criteria 1-3)

**Type:** Round-trip  
**Description:** The dark mode state persisted to localStorage can be read back to produce the same state.  
**Formal:** For any boolean `isDark`, `read(write(isDark)) === isDark`  
**Test approach:** Property-based test verifying localStorage write/read cycle preserves the boolean value.

### Property 3: Scroll Spy Active Section Invariant (Requirement 8, Criterion 2)

**Type:** Invariant  
**Description:** The active section value is always either empty or one of the registered section IDs.  
**Formal:** `activeSection ∈ {''} ∪ sectionIds`  
**Test approach:** Example-based test with mocked IntersectionObserver verifying activeSection only contains valid values.

### Property 4: Portfolio Data Structure Invariant (Requirement 8, Criterion 1)

**Type:** Invariant  
**Description:** All skill levels remain within the valid range after any data access.  
**Formal:** For all skills `s` in portfolioData: `1 <= s.level <= 100`  
**Test approach:** Example-based test iterating over portfolio data and asserting bounds.

### Property 5: Static Output Completeness (Requirement 2, Criterion 2)

**Type:** Invariant  
**Description:** The generated static output contains an index.html and all required asset types.  
**Formal:** `.output/public/index.html` exists and is valid HTML  
**Test approach:** Build integration test verifying output structure after `nuxi generate`.

## Migration Strategy

### Phase Approach

1. **Scaffold**: Initialize Nuxt project, install dependencies, create config
2. **Structure**: Move components, composables, and data to Nuxt directory layout
3. **State**: Implement Pinia dark mode store, remove old composable
4. **Modules**: Configure PWA, security, robots modules
5. **Deploy**: Update GitHub Actions workflow
6. **Test**: Migrate and expand test suite
7. **Cleanup**: Remove old Vite/Vue files (index.html, src/, vite.config.ts)

### Component Migration Notes

- Components move from `src/components/` → `app/components/` (remove explicit imports)
- The `useDarkMode` composable is replaced by the Pinia store; components using it switch to `useDarkModeStore()`
- The `useScrollSpy` composable moves to `app/composables/` with SSR guard updated to use `import.meta.server`
- `App.vue` is split into `app/app.vue` (root) + `app/layouts/default.vue` (layout) + `app/pages/index.vue` (content)
- Lazy loading of ProjectsSection/ContactSection is handled by Nuxt's built-in `<Lazy>` prefix convention
