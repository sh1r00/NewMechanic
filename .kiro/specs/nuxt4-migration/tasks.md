# Implementation Plan: Nuxt 4 Migration

## Overview

Migrate the existing Vue 3 + Vite mechanic portfolio website to Nuxt 3 with the Nuxt 4 compatibility flag. The implementation restructures the project to Nuxt conventions (file-based routing, auto-imports, layouts), adds PWA support, security headers, SEO management, and replaces the custom dark mode composable with a Pinia store while preserving all existing functionality and the Industrial Craftsman visual design.

## Tasks

- [x] 1. Initialize Nuxt project and configuration
  - [x] 1.1 Create `nuxt.config.ts` with Nuxt 4 compatibility flag, SSR, modules array, app head config, CSS reference, and nitro preset
    - Configure `compatibilityVersion: 4`, `ssr: true`, modules (`@nuxtjs/tailwindcss`, `@pinia/nuxt`, `@vite-pwa/nuxt`, `nuxt-security`, `@nuxtjs/seo`)
    - Set `app.baseURL`, head tags with Google Fonts, inline dark mode script, and `nitro.preset: 'github-pages'`
    - _Requirements: 1.1, 1.2, 2.1, 2.3, 2.4, 4.4, 9.2_
  - [x] 1.2 Create `package.json` with Nuxt dependencies and scripts
    - Include scripts: dev, build, generate, preview, test, postinstall
    - Add all module dependencies (`@nuxtjs/seo` replaces standalone `@nuxtjs/robots`)
    - _Requirements: 1.1, 12.1_
  - [x] 1.3 Create `tsconfig.json` extending `.nuxt/tsconfig.json` with strict compiler options
    - _Requirements: 1.3_
  - [x] 1.4 Create `tailwind.config.ts` with dark mode class strategy, custom font families, and CSS variable color tokens
    - _Requirements: 10.1, 10.2, 10.3, 10.4_
  - [x] 1.5 Run `npm install` to install all dependencies and generate `.nuxt` types
    - _Requirements: 1.1_

- [x] 2. Create directory structure and migrate assets
  - [x] 2.1 Create `app/assets/css/main.css` with Tailwind directives, CSS custom properties for light/dark themes, base body styles, and grain overlay
    - _Requirements: 3.5, 9.1, 9.4_
  - [x] 2.2 Create `app/app.vue` root component with `<NuxtLayout>` and `<NuxtPage>`
    - _Requirements: 3.1_
  - [x] 2.3 Create `app/layouts/default.vue` with Navbar, main slot, FooterSection, and dark mode store initialization
    - _Requirements: 3.4_
  - [x] 2.4 Create `app/pages/index.vue` with all section components (Hero, About, Skills, Projects, Contact) and useHead meta
    - _Requirements: 3.1, 8.1_
  - [x] 2.5 Move static assets to `public/` directory (favicon.svg) and create placeholder PWA icons in `public/icons/`
    - _Requirements: 3.6, 5.1_

- [x] 3. Migrate components to Nuxt auto-import structure
  - [x] 3.1 Move `Navbar.vue` to `app/components/` — remove explicit imports, use auto-imported composables/stores
    - _Requirements: 3.2, 8.1, 8.2_
  - [x] 3.2 Move `HeroSection.vue` to `app/components/` — remove explicit imports
    - _Requirements: 3.2, 8.1_
  - [x] 3.3 Move `AboutSection.vue` to `app/components/` — remove explicit imports
    - _Requirements: 3.2, 8.1_
  - [x] 3.4 Move `SkillsSection.vue` and `SkillCard.vue` to `app/components/` — remove explicit imports
    - _Requirements: 3.2, 8.1_
  - [x] 3.5 Move `ProjectsSection.vue` and `ProjectCard.vue` to `app/components/` — remove explicit imports
    - _Requirements: 3.2, 8.1_
  - [x] 3.6 Move `ContactSection.vue` and `ContactForm.vue` to `app/components/` — remove explicit imports
    - _Requirements: 3.2, 8.1, 8.5, 8.6_
  - [x] 3.7 Move `FooterSection.vue` to `app/components/` — remove explicit imports
    - _Requirements: 3.2, 8.1_
  - [x] 3.8 Move `DarkModeToggle.vue` to `app/components/` — update to use `useDarkModeStore()` instead of `useDarkMode()`
    - _Requirements: 3.2, 4.3_

- [x] 4. Implement Pinia dark mode store and migrate composables
  - [x] 4.1 Create `app/stores/darkMode.ts` Pinia store with `isDark` state, `initialize()` and `toggle()` actions, `applyClass()` helper
    - Initialize from localStorage, fallback to OS preference, toggle with persistence
    - _Requirements: 4.1, 4.2, 4.3_
  - [x] 4.2 Create `app/composables/useScrollSpy.ts` with SSR guard using `import.meta.server`, `onMounted` for DOM access, and `onUnmounted` cleanup
    - _Requirements: 3.3, 8.2_
  - [x] 4.3 Move `app/data/portfolio-data.ts` with all interfaces and portfolio data
    - _Requirements: 8.1_

- [x] 5. Checkpoint - Verify core structure builds
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Configure PWA, security, and SEO modules
  - [x] 6.1 Configure `@vite-pwa/nuxt` in `nuxt.config.ts` with manifest (name, icons, colors, display), workbox settings, and register type
    - _Requirements: 5.1, 5.2, 5.3, 5.4_
  - [x] 6.2 Configure `nuxt-security` in `nuxt.config.ts` with CSP directives allowing Google Fonts, placeholder images, inline scripts, and map embeds
    - Set X-Content-Type-Options, X-Frame-Options, and Referrer-Policy headers
    - _Requirements: 6.1, 6.2, 6.3_
  - [x] 6.3 Configure `@nuxtjs/seo` site metadata in `nuxt.config.ts` with url, name, description, and defaultLocale
    - _Requirements: 7.1, 7.2, 7.3, 13.1, 13.2, 13.4, 13.6_
  - [x] 6.4 Add `useSeoMeta()` in `app/pages/index.vue` for Open Graph tags (og:title, og:description, og:image, og:type)
    - _Requirements: 13.3_
  - [x] 6.5 Add `useSchemaOrg()` with `defineWebSite` and `defineWebPage` in `app/pages/index.vue` for structured data
    - _Requirements: 13.5_

- [x] 7. Update GitHub Actions workflow
  - [x] 7.1 Update `.github/workflows/deploy.yml` to use `npx nuxi generate` build command and `.output/public` artifact path
    - Maintain push-to-main trigger, use Node.js 20
    - _Requirements: 11.1, 11.2, 11.3, 11.4_

- [x] 8. Checkpoint - Verify modules and deployment config
  - Ensure all tests pass, ask the user if questions arise.

- [x] 9. Migrate and create tests
  - [x] 9.1 Create `vitest.config.ts` configured for Nuxt with `@nuxt/test-utils`
    - _Requirements: 12.1, 12.2_
  - [ ]* 9.2 Create `tests/stores/darkMode.test.ts` — test initialize from localStorage, OS preference fallback, toggle idempotence, and persistence round-trip
    - **Property 1: Dark Mode Toggle Idempotence**
    - **Property 2: Dark Mode Persistence Round-Trip**
    - **Validates: Requirements 4.1, 4.2, 4.3**
  - [ ]* 9.3 Create `tests/composables/useScrollSpy.test.ts` — test active section tracking with mocked IntersectionObserver
    - **Property 3: Scroll Spy Active Section Invariant**
    - **Validates: Requirements 8.2**

- [x] 10. Cleanup old files
  - [x] 10.1 Remove old Vite-specific files: `index.html`, `vite.config.ts`, `vitest.config.ts` (root), `postcss.config.js`, `env.d.ts`, `tsconfig.node.json`
    - _Requirements: 1.2, 3.1_
  - [x] 10.2 Remove old `src/` directory after confirming all files are migrated
    - _Requirements: 3.1_
  - [x] 10.3 Update `.gitignore` for Nuxt patterns (`.nuxt/`, `.output/`, `node_modules/`)
    - _Requirements: 1.2_

- [x] 11. Final checkpoint - Verify build and full functionality
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation after each major phase
- Property tests validate the dark mode toggle idempotence and persistence round-trip correctness properties from the design
- The design uses TypeScript throughout — all implementation should use TypeScript
- Components migrated to `app/components/` benefit from Nuxt auto-imports (no explicit import statements needed)
- The `@nuxtjs/seo` module replaces standalone `@nuxtjs/robots` — do not install both

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2", "1.3", "1.4"] },
    { "id": 1, "tasks": ["1.5"] },
    { "id": 2, "tasks": ["2.1", "2.2", "2.5", "4.1", "4.3"] },
    { "id": 3, "tasks": ["2.3", "2.4", "4.2"] },
    { "id": 4, "tasks": ["3.1", "3.2", "3.3", "3.4", "3.5", "3.6", "3.7", "3.8"] },
    { "id": 5, "tasks": ["6.1", "6.2", "6.3", "7.1"] },
    { "id": 6, "tasks": ["6.4", "6.5"] },
    { "id": 7, "tasks": ["9.1"] },
    { "id": 8, "tasks": ["9.2", "9.3"] },
    { "id": 9, "tasks": ["10.1", "10.2", "10.3"] }
  ]
}
```
