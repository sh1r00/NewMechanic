# Requirements Document

## Introduction

Migrate the existing Vue 3 + Vite mechanic portfolio website to Nuxt 3 with the Nuxt 4 compatibility flag enabled. The migration preserves all current functionality and visual design (Industrial Craftsman aesthetic) while gaining Nuxt conventions (file-based routing, auto-imports, layouts), static site generation for GitHub Pages deployment, PWA capabilities, security headers via nuxt-security, robots.txt generation, and Pinia-based state management.

## Glossary

- **Nuxt_App**: The Nuxt 3 application configured with the Nuxt 4 compatibility flag (`compatibilityVersion: 4`)
- **SSG_Engine**: The Nuxt static site generation pre-renderer that produces a fully static output deployable without a server
- **Dark_Mode_Store**: The Pinia store managing dark mode state, persistence, and class toggling
- **PWA_Module**: The `@vite-pwa/nuxt` module providing service worker registration, web app manifest, and offline support
- **Security_Module**: The `nuxt-security` module providing HTTP security headers and protections for the static site
- **Robots_Module**: The `@nuxtjs/robots` module generating a `robots.txt` file for search engine crawlers
- **Layout_System**: The Nuxt layouts directory providing shared page structure (navbar, footer, transitions)
- **Auto_Import_System**: The Nuxt mechanism that automatically imports components and composables without explicit import statements
- **GitHub_Actions_Workflow**: The CI/CD pipeline that builds and deploys the static site to GitHub Pages
- **Scroll_Spy_Composable**: The composable tracking which page section is currently in the viewport
- **Portfolio_Data**: The static TypeScript data module providing personal info, skills, projects, and social links

## Requirements

### Requirement 1: Nuxt 4 Compatibility Configuration

**User Story:** As a developer, I want the project configured as Nuxt 3 with the Nuxt 4 compatibility flag, so that the codebase follows Nuxt 4 conventions and is ready for seamless upgrade when Nuxt 4 releases.

#### Acceptance Criteria

1. THE Nuxt_App SHALL use Nuxt 3 as the framework with `compatibilityVersion: 4` set in `nuxt.config.ts`
2. THE Nuxt_App SHALL use the Nuxt 4 directory structure with source files in an `app/` directory
3. THE Nuxt_App SHALL configure TypeScript as the primary language with strict type checking enabled

### Requirement 2: Static Site Generation

**User Story:** As a developer, I want the site statically pre-rendered at build time, so that it deploys to GitHub Pages without requiring a Node.js server.

#### Acceptance Criteria

1. THE Nuxt_App SHALL set `ssr: true` and `nitro.prerender.routes` to pre-render all pages at build time
2. WHEN the build command is executed, THE SSG_Engine SHALL produce a fully static output in the `.output/public` directory
3. THE Nuxt_App SHALL configure `nitro.preset` to `'github-pages'` for correct static output structure
4. THE Nuxt_App SHALL set `app.baseURL` to match the GitHub Pages deployment path

### Requirement 3: Project Structure Migration

**User Story:** As a developer, I want the project restructured to follow Nuxt 4 conventions, so that I benefit from file-based routing, auto-imports, and layouts.

#### Acceptance Criteria

1. THE Nuxt_App SHALL place page components in an `app/pages/` directory with an `index.vue` serving the root route
2. THE Nuxt_App SHALL place reusable components in an `app/components/` directory for automatic import
3. THE Nuxt_App SHALL place composables in an `app/composables/` directory for automatic import
4. THE Nuxt_App SHALL place the default layout in an `app/layouts/` directory containing shared structure (Navbar, FooterSection)
5. THE Nuxt_App SHALL place global CSS and asset files in an `app/assets/` directory
6. THE Nuxt_App SHALL place static files (favicon, images) in a `public/` directory at the project root

### Requirement 4: Dark Mode State Management with Pinia

**User Story:** As a developer, I want dark mode state managed through a Pinia store, so that the state is centralized, reactive, and accessible from any component without prop drilling.

#### Acceptance Criteria

1. THE Dark_Mode_Store SHALL initialize dark mode from localStorage if a saved preference exists
2. WHEN no saved preference exists, THE Dark_Mode_Store SHALL default to the user's OS color scheme preference
3. WHEN the toggle action is called, THE Dark_Mode_Store SHALL invert the dark mode state, persist it to localStorage, and toggle the `dark` class on the document root element
4. THE Nuxt_App SHALL include an inline script in the HTML head to apply the `dark` class before hydration to prevent flash of unstyled content

### Requirement 5: PWA Functionality

**User Story:** As a site visitor, I want the portfolio to be installable as a Progressive Web App with offline support, so that I can access it reliably on any device.

#### Acceptance Criteria

1. THE PWA_Module SHALL generate a web app manifest with the site name, icons, theme color, and display mode set to `standalone`
2. THE PWA_Module SHALL register a service worker that caches static assets for offline access
3. WHEN the site is loaded without network connectivity, THE PWA_Module SHALL serve cached pages and assets
4. THE PWA_Module SHALL provide prompt-based install functionality on supported browsers

### Requirement 6: Security Headers

**User Story:** As a developer, I want security headers applied to the static site, so that the site follows web security best practices.

#### Acceptance Criteria

1. THE Security_Module SHALL generate security headers including Content-Security-Policy, X-Content-Type-Options, X-Frame-Options, and Referrer-Policy
2. THE Security_Module SHALL configure Content-Security-Policy to allow Google Fonts, placeholder image services, and inline scripts required for dark mode initialization
3. IF a Content-Security-Policy violation would block required resources, THEN THE Security_Module SHALL include appropriate source directives to permit those resources

### Requirement 7: Robots.txt Generation

**User Story:** As a developer, I want an automatically generated robots.txt file, so that search engines can properly crawl the portfolio site.

#### Acceptance Criteria

1. THE Robots_Module SHALL generate a `robots.txt` file during the build process
2. THE Robots_Module SHALL allow all user agents to crawl all public pages by default
3. THE Robots_Module SHALL include a reference to the sitemap if one is configured

### Requirement 8: Preserve Existing Functionality

**User Story:** As a site visitor, I want all current features to work identically after the migration, so that the user experience is unchanged.

#### Acceptance Criteria

1. THE Nuxt_App SHALL render all existing sections: Hero, About, Skills, Projects, Contact, and Footer
2. THE Scroll_Spy_Composable SHALL highlight the active navigation link based on the currently visible section
3. THE Nuxt_App SHALL preserve responsive design behavior across mobile, tablet, and desktop viewports
4. THE Nuxt_App SHALL preserve all CSS animations and transitions from the original site
5. WHEN a user submits the contact form, THE Nuxt_App SHALL handle the submission identically to the current implementation
6. THE Nuxt_App SHALL render the embedded map in the contact section

### Requirement 9: Preserve Visual Design

**User Story:** As a site visitor, I want the site to look identical after migration, so that the Industrial Craftsman aesthetic is maintained.

#### Acceptance Criteria

1. THE Nuxt_App SHALL use the same CSS custom properties for theming (colors, surface, border values for both light and dark modes)
2. THE Nuxt_App SHALL load the Bebas Neue and DM Sans font families from Google Fonts
3. THE Nuxt_App SHALL apply the same Tailwind CSS configuration including custom color tokens, font families, and dark mode class strategy
4. THE Nuxt_App SHALL render the grain/noise texture overlay on the body element

### Requirement 10: Tailwind CSS Configuration

**User Story:** As a developer, I want Tailwind CSS properly configured in the Nuxt project, so that all existing utility classes and custom tokens continue to work.

#### Acceptance Criteria

1. THE Nuxt_App SHALL use the `@nuxtjs/tailwindcss` module for Tailwind CSS integration
2. THE Nuxt_App SHALL configure Tailwind with the same custom color tokens mapped to CSS variables
3. THE Nuxt_App SHALL configure Tailwind dark mode with the `class` strategy
4. THE Nuxt_App SHALL include the same custom font family definitions (display and body)

### Requirement 11: GitHub Actions Deployment Update

**User Story:** As a developer, I want the CI/CD pipeline updated for Nuxt static builds, so that the site automatically deploys to GitHub Pages on push to main.

#### Acceptance Criteria

1. THE GitHub_Actions_Workflow SHALL run `npx nuxi generate` to produce the static site output
2. THE GitHub_Actions_Workflow SHALL upload the `.output/public` directory as the deployment artifact
3. THE GitHub_Actions_Workflow SHALL maintain the existing trigger on push to the `main` branch
4. THE GitHub_Actions_Workflow SHALL use Node.js 20 for the build environment

### Requirement 12: Testing Configuration

**User Story:** As a developer, I want the testing setup migrated to work with the Nuxt project, so that existing tests continue to pass and new tests can be written.

#### Acceptance Criteria

1. THE Nuxt_App SHALL configure Vitest with `@nuxt/test-utils` for Nuxt-aware testing
2. THE Nuxt_App SHALL support testing Pinia stores and composables
3. WHEN the test command is executed, THE Nuxt_App SHALL run all tests in a non-watch mode and report results

### Requirement 13: SEO Management with @nuxtjs/seo

**User Story:** As a developer, I want comprehensive SEO handling via @nuxtjs/seo, so that the portfolio site has optimal search engine visibility with proper meta tags, Open Graph data, sitemap, and structured data.

#### Acceptance Criteria

1. THE Nuxt_App SHALL include the `@nuxtjs/seo` module which bundles nuxt-site-config, nuxt-og-image, nuxt-link-checker, nuxt-simple-sitemap, nuxt-schema-org, and nuxt-seo-experiments
2. THE Nuxt_App SHALL configure site metadata including site name ("Elias | Mechanic Portfolio"), site URL, and default description via the `site` config in nuxt.config.ts
3. THE Nuxt_App SHALL generate Open Graph meta tags (og:title, og:description, og:image, og:type) for the index page
4. THE Nuxt_App SHALL generate a sitemap.xml during the build process listing all public pages
5. THE Nuxt_App SHALL output schema.org structured data (JSON-LD) for the site using `defineWebSite` and `defineWebPage` composables
6. IF the `@nuxtjs/robots` module is already configured separately, THEN it SHALL be removed in favor of the robots handling included in `@nuxtjs/seo`
