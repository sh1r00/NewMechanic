# Implementation Plan: i18n, OG Image & PWA Install Prompt

## Overview

This plan implements internationalization support, dynamic OG image generation, and a PWA install prompt banner for the NewMechanic Nuxt 4 portfolio. Tasks are ordered to build foundational i18n infrastructure first, then layer OG image and PWA capabilities on top, with testing woven throughout.

## Tasks

- [x] 1. Set up i18n translation files and module configuration
  - [x] 1.1 Complete translation file content for all locales (en.json, es.json, fr.json)
    - Populate all translation keys defined in the `TranslationSchema` interface from the design document
    - Include keys for: nav, hero, about, skills, projects, contact (with form sub-keys), footer, pwa, accessibility, og
    - Ensure every key present in `en.json` is also present in `es.json` and `fr.json`
    - _Requirements: 2.1, 2.3_

  - [x] 1.2 Update nuxt.config.ts i18n and module configuration
    - Verify `@nuxtjs/i18n` module is positioned before `@nuxtjs/seo` in the modules array
    - Add `bundle: { optimizeTranslationDirective: true }` to i18n config
    - Ensure `langDir: '../i18n/locales'` and `lazy: true` settings are correct
    - Update `app.head.htmlAttrs.lang` to be dynamically managed by i18n (remove static `lang: 'en'`)
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

  - [ ]* 1.3 Write property test for translation key completeness (Property 2)
    - **Property 2: Translation key completeness**
    - Load all locale JSON files and all `$t()`/`t()` calls from Vue component source files
    - For any translation key used in components, verify it exists in every configured locale file
    - **Validates: Requirements 2.1, 2.3**

  - [ ]* 1.4 Write property test for translation fallback to English (Property 3)
    - **Property 3: Translation fallback to English**
    - For any key present in en.json but absent from a non-default locale, verify i18n resolves to the English value
    - **Validates: Requirements 2.2**

- [x] 2. Implement LanguageSwitcher component and i18n integration in existing components
  - [x] 2.1 Create or update the LanguageSwitcher component
    - Implement `app/components/LanguageSwitcher.vue` with dropdown showing available locales
    - Use `useI18n()` composable for locale state and `setLocale()` for switching
    - Apply `role="listbox"`, `aria-expanded`, `aria-activedescendant` for accessibility
    - Support keyboard navigation (Arrow keys, Enter to select, Escape to close)
    - Visually indicate the currently active locale
    - Style using existing design system (amber accent, DM Sans body)
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

  - [x] 2.2 Integrate i18n into all existing page components
    - Replace hardcoded text in Navbar, HeroSection, AboutSection, SkillsSection, ProjectsSection, ContactSection, ContactForm, and FooterSection with `$t('key')` calls
    - Add `useLocaleHead()` in the page/layout for locale-aware meta tags
    - Ensure the `<html lang>` attribute updates dynamically via i18n module
    - _Requirements: 2.3, 13.7_

  - [ ]* 2.3 Write property test for route prefix correctness (Property 1)
    - **Property 1: Route prefix correctness**
    - For any route path and locale combination, verify default locale has no prefix and non-default locales are prefixed with locale code
    - **Validates: Requirements 1.4**

  - [ ]* 2.4 Write property test for HTML lang attribute (Property 12)
    - **Property 12: HTML lang attribute matches active locale**
    - For any active locale, verify the `<html>` element's `lang` attribute equals the locale code
    - **Validates: Requirements 13.7**

  - [ ]* 2.5 Write unit tests for LanguageSwitcher component
    - Test renders available locale options excluding current locale
    - Test keyboard navigation (Escape closes, Enter selects)
    - Test ARIA attributes are present and correct
    - Test locale switch triggers navigation
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [x] 3. Checkpoint - Ensure i18n integration is working
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Enable OG Image module and create custom template
  - [x] 4.1 Update nuxt.config.ts OG image configuration
    - Change `ogImage: { enabled: false }` to enabled with full configuration
    - Set `zeroRuntime: true` for static site compatibility
    - Configure defaults: width 1200, height 630, extension 'png', cacheMaxAgeSeconds 7 days
    - Configure fonts: `['Bebas Neue:400', 'DM Sans:400']`
    - _Requirements: 4.1, 4.2, 4.3_

  - [x] 4.2 Create OG image Satori template component
    - Create `app/components/OgImage/OgImageDefault.satori.vue`
    - Implement template with dark background (#0f0f0f), amber accent bar (#d97706), site title, and page description
    - Use Bebas Neue for title and DM Sans for description
    - Accept props: `title`, `description`, `siteName` with sensible fallbacks
    - _Requirements: 5.1, 5.2, 5.3_

  - [x] 4.3 Add locale-aware OG metadata to pages
    - Use `useSeoMeta()` in pages/layout to set `og:title`, `og:description` from i18n translations
    - Set `og:locale` meta tag to match the active locale's BCP 47 language tag
    - Use `defineOgImage()` to pass translated title and description to the OG template
    - _Requirements: 5.4, 6.1, 6.2_

  - [ ]* 4.4 Write property test for OG image metadata passthrough (Property 4)
    - **Property 4: OG image metadata passthrough**
    - For any title/description string provided as props, verify the rendered OG template output contains both strings
    - **Validates: Requirements 5.2, 5.4**

  - [ ]* 4.5 Write property test for og:locale meta tag (Property 6)
    - **Property 6: og:locale meta tag matches active locale**
    - For any active locale, verify the `og:locale` meta tag equals the BCP 47 language tag for that locale
    - **Validates: Requirements 6.2**

  - [ ]* 4.6 Write unit tests for OgImageDefault.satori.vue
    - Test renders title and description from props
    - Test uses fallback values when props are empty
    - Test style attributes match brand colors
    - _Requirements: 5.1, 5.2, 5.3_

- [x] 5. Checkpoint - Ensure OG image generation works
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Implement PWA install prompt
  - [x] 6.1 Create usePwaInstall composable
    - Create `app/composables/usePwaInstall.ts`
    - Implement state machine: Hidden → Visible → Installing/Dismissed → Hidden
    - Listen for `beforeinstallprompt` event and store the deferred prompt
    - Implement `install()` method that calls `event.prompt()` with error handling
    - Implement `dismiss()` method that sets `sessionStorage` key `pwa-prompt-dismissed`
    - Guard all browser API calls with `import.meta.client`
    - Listen to `appinstalled` event to hide banner post-install
    - Wrap `sessionStorage` access in try/catch for private browsing compatibility
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

  - [x] 6.2 Create PwaInstallPrompt component
    - Create `app/components/PwaInstallPrompt.vue`
    - Use `usePwaInstall()` composable for state and actions
    - Display install button (labeled via `$t('pwa.install')`) and dismiss button (`$t('pwa.dismiss')`)
    - Style with amber accent, dark surface, Bebas Neue heading, DM Sans body text
    - Position as fixed bottom banner that does not obscure primary content
    - Add `role="dialog"`, `aria-labelledby`, `aria-describedby` attributes
    - Implement keyboard support: Tab navigation within banner, Escape to dismiss
    - Manage focus: move focus to banner on appear, return focus on dismiss
    - Use ARIA live region or focus management to announce appearance to screen readers
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 9.1, 9.2, 9.3_

  - [x] 6.3 Add PwaInstallPrompt to the default layout
    - Add `<PwaInstallPrompt />` to `app/layouts/default.vue`
    - Ensure it renders at the bottom of the layout, outside main content flow
    - _Requirements: 7.5_

  - [ ]* 6.4 Write property test for PWA prompt text reactivity (Property 7)
    - **Property 7: PWA prompt text reactivity across locales**
    - For any configured locale, when active and prompt visible, verify all text matches that locale's translation keys
    - **Validates: Requirements 10.1, 10.2**

  - [ ]* 6.5 Write unit tests for usePwaInstall composable
    - Test initial state is hidden
    - Test becomes visible when beforeinstallprompt fires and not dismissed
    - Test stays hidden when sessionStorage has dismissed key
    - Test install() calls event.prompt()
    - Test dismiss() sets sessionStorage and hides banner
    - Test appinstalled event hides banner
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

  - [ ]* 6.6 Write unit tests for PwaInstallPrompt component
    - Test renders when isPromptVisible is true
    - Test hidden when isPromptVisible is false
    - Test accessibility attributes (role, aria-labelledby, aria-describedby)
    - Test keyboard Escape dismisses the prompt
    - Test translated text is displayed
    - _Requirements: 7.1, 7.2, 7.3, 9.1, 9.2, 10.1_

- [x] 7. Checkpoint - Ensure PWA install prompt works
  - Ensure all tests pass, ask the user if questions arise.

- [x] 8. Configure service worker caching strategies
  - [x] 8.1 Update workbox configuration for translation and OG image caching
    - Add `json` to `globPatterns` to include translation files in precache
    - Add runtime caching rule for translation files: StaleWhileRevalidate with `i18n-translations` cache name
    - Add runtime caching rule for OG images: CacheFirst with 7-day expiry and `og-images` cache name
    - Add runtime caching rules for Google Fonts (stylesheets and webfont files)
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 12.1, 12.2, 12.3_

- [x] 9. Implement accessibility enhancements
  - [x] 9.1 Add application-wide accessibility improvements
    - Add skip-to-content link at the top of the layout
    - Ensure all semantic HTML landmarks have appropriate ARIA labels
    - Verify all images/icons have alt text or `aria-hidden="true"` for decorative elements
    - Add visible focus indicators on all interactive elements using Tailwind `focus-visible:` utilities
    - Implement focus management on route/section navigation changes
    - Ensure no keyboard traps exist in interactive components
    - _Requirements: 13.2, 13.3, 13.4, 13.5, 13.6_

  - [x] 9.2 Add reduced motion support
    - Add `@media (prefers-reduced-motion: reduce)` rules to disable non-essential animations
    - Target loading spinner, loader bar, section entrance transitions
    - Preserve functional transitions (page navigation, modal open/close) in reduced form
    - _Requirements: 15.1, 15.2_

  - [x] 9.3 Ensure ContactForm accessibility compliance
    - Verify all input fields have associated labels with matching `for` and `id` attributes
    - Add `aria-describedby` linking error messages to their fields
    - Add `aria-required="true"` to required fields
    - Add ARIA live region for form submission success/failure announcements
    - _Requirements: 14.1, 14.2, 14.3, 14.4_

  - [ ]* 9.4 Write property test for WCAG AA contrast compliance (Property 8)
    - **Property 8: WCAG AA contrast compliance**
    - For any text/background color pair in the application's CSS custom properties, verify contrast ratio ≥4.5:1 for normal text, ≥3:1 for large text
    - **Validates: Requirements 13.1**

  - [ ]* 9.5 Write property test for focus indicators (Property 9)
    - **Property 9: Focus indicators on interactive elements**
    - For any interactive element (button, anchor, input, select, textarea), verify a visible focus indicator style is applied on `:focus-visible`
    - **Validates: Requirements 13.2**

  - [ ]* 9.6 Write property test for image alt text coverage (Property 10)
    - **Property 10: Image and icon alt text coverage**
    - For any `<img>` or `<svg>` element, verify it has a non-empty `alt` attribute or `aria-hidden="true"`
    - **Validates: Requirements 13.4**

  - [ ]* 9.7 Write property test for reduced motion (Property 13)
    - **Property 13: Reduced motion disables non-essential animations**
    - For any CSS animation/transition on non-essential decorative elements, verify a `prefers-reduced-motion: reduce` media query disables or minimizes it
    - **Validates: Requirements 15.1**

- [x] 10. Final integration and wiring
  - [x] 10.1 Wire all components together and verify build
    - Ensure `PwaInstallPrompt` is rendered in the default layout
    - Ensure `LanguageSwitcher` is rendered in the Navbar
    - Ensure OG image template is discoverable by the module at `app/components/OgImage/OgImageDefault.satori.vue`
    - Ensure `useLocaleHead()` is called in the default layout for automatic head management
    - Verify `nuxi generate` completes without errors and produces OG image files in build output
    - _Requirements: 1.1, 4.3, 7.5_

  - [ ]* 10.2 Write integration test for build output verification
    - Verify translation JSON files exist in `.output/public` for all configured locales
    - Verify OG image PNG files exist in expected paths in build output
    - Verify Service Worker precache manifest includes translation and OG image files
    - _Requirements: 4.3, 11.4, 12.2_

- [x] 11. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- The project uses TypeScript with Vue 3 Composition API (`<script setup lang="ts">`)
- Test framework: Vitest with `@nuxt/test-utils` and `@vue/test-utils` (already configured)
- Property-based testing: requires adding `fast-check` and `@fast-check/vitest` as dev dependencies
- OG image uses Satori renderer (`.satori.vue`) for Chromium-free static generation
- All locale files (en.json, es.json, fr.json) already exist but may need content completion

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2"] },
    { "id": 1, "tasks": ["1.3", "1.4", "2.1", "2.2", "4.1"] },
    { "id": 2, "tasks": ["2.3", "2.4", "2.5", "4.2", "6.1"] },
    { "id": 3, "tasks": ["4.3", "6.2", "8.1", "9.1", "9.2"] },
    { "id": 4, "tasks": ["4.4", "4.5", "4.6", "6.3", "6.4", "9.3"] },
    { "id": 5, "tasks": ["6.5", "6.6", "9.4", "9.5", "9.6", "9.7"] },
    { "id": 6, "tasks": ["10.1"] },
    { "id": 7, "tasks": ["10.2"] }
  ]
}
```
