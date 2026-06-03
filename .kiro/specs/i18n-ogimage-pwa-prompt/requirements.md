# Requirements Document

## Introduction

This feature adds three capabilities to the NewMechanic Nuxt 4 portfolio application: internationalization (i18n) support for multi-language content, dynamic Open Graph image generation for social sharing, and a user-facing PWA install prompt banner. Together these enhancements improve accessibility for non-English visitors, social media presentation, and mobile app discoverability.

## Glossary

- **Application**: The NewMechanic Nuxt 4 portfolio web application
- **i18n_Module**: The @nuxtjs/i18n Nuxt module responsible for internationalization routing and translation loading
- **OG_Image_Module**: The nuxt-og-image module responsible for generating dynamic Open Graph images at build time or on-demand
- **PWA_Install_Prompt**: The UI component that presents the user with an option to install the application as a Progressive Web App
- **Locale**: A language/region combination (e.g., "en" for English, "es" for Spanish) used to determine which translations to display
- **Translation_File**: A JSON file containing key-value pairs mapping translation keys to localized text strings
- **beforeinstallprompt**: A browser event fired when the browser determines the site meets PWA installability criteria
- **Open_Graph_Image**: A preview image rendered when the site URL is shared on social media platforms
- **Service_Worker**: A background script registered by the PWA module that enables offline support and caching
- **Precache_Manifest**: The list of static assets the Service_Worker caches during installation for offline availability
- **Stale_While_Revalidate**: A caching strategy that serves cached content immediately while fetching a fresh copy in the background

## Requirements

### Requirement 1: i18n Module Integration

**User Story:** As a site owner, I want my portfolio to support multiple languages, so that visitors who speak different languages can understand my content.

#### Acceptance Criteria

1. THE Application SHALL include @nuxtjs/i18n as a registered Nuxt module in nuxt.config.ts
2. THE i18n_Module SHALL be configured with at least two locales: English ("en") as the default locale and one additional locale
3. WHEN the Application is built, THE i18n_Module SHALL load Translation_Files from a dedicated locale directory structure
4. THE i18n_Module SHALL use a routing strategy that adds a locale prefix for non-default languages (e.g., "/es/..." for Spanish) while keeping the default locale unprefixed

### Requirement 2: Translation File Structure

**User Story:** As a developer, I want translation files organized by locale, so that I can maintain and extend translations easily.

#### Acceptance Criteria

1. THE Application SHALL provide a Translation_File for each configured Locale containing all user-visible text strings
2. WHEN a translation key is missing for the active Locale, THE i18n_Module SHALL fall back to the English translation for that key
3. THE Translation_Files SHALL contain keys for all static text in the Navbar, HeroSection, AboutSection, SkillsSection, ProjectsSection, ContactSection, ContactForm, and FooterSection components

### Requirement 3: Language Switcher Component

**User Story:** As a visitor, I want to switch between available languages, so that I can view the site in my preferred language.

#### Acceptance Criteria

1. THE Application SHALL display a language switcher control in the Navbar
2. WHEN the user selects a different Locale from the language switcher, THE Application SHALL navigate to the equivalent page in the selected Locale within 300ms
3. THE language switcher SHALL visually indicate which Locale is currently active
4. THE language switcher SHALL be keyboard-accessible and include appropriate ARIA attributes for screen readers

### Requirement 4: OG Image Module Re-enablement

**User Story:** As a site owner, I want dynamic Open Graph images generated for my pages, so that social media shares display a rich, branded preview.

#### Acceptance Criteria

1. THE Application SHALL enable the OG_Image_Module by removing or overriding the `ogImage: { enabled: false }` configuration in nuxt.config.ts
2. THE OG_Image_Module SHALL be configured to work with the static site generation (github-pages) preset
3. WHEN the Application is built with `nuxi generate`, THE OG_Image_Module SHALL produce Open_Graph_Image files without build errors

### Requirement 5: OG Image Template Design

**User Story:** As a site owner, I want my OG images to match my site's industrial craftsman branding, so that social shares are visually consistent with the portfolio.

#### Acceptance Criteria

1. THE Application SHALL define a custom OG image template that uses the site's amber accent color (#d97706) and dark background theme
2. THE OG image template SHALL display the site title "Elias | Mechanic Portfolio" and a page-specific description
3. THE OG image template SHALL use the Bebas Neue display font for headings consistent with the site's typography
4. WHEN a page defines custom OG metadata via `useSeoMeta`, THE OG_Image_Module SHALL use that metadata in the generated Open_Graph_Image

### Requirement 6: OG Image Locale Support

**User Story:** As a site owner, I want OG images to reflect the active language, so that social shares are relevant to the audience viewing them.

#### Acceptance Criteria

1. WHEN a page is rendered in a non-default Locale, THE OG_Image_Module SHALL generate an Open_Graph_Image with text in that Locale
2. THE Application SHALL set the `og:locale` meta tag to match the active Locale for each page

### Requirement 7: PWA Install Prompt UI

**User Story:** As a mobile visitor, I want to see a clear prompt to install the app, so that I can access the portfolio quickly from my home screen.

#### Acceptance Criteria

1. WHEN the browser fires the beforeinstallprompt event, THE PWA_Install_Prompt SHALL display a visible banner to the user
2. THE PWA_Install_Prompt SHALL include a call-to-action button labeled with install intent (e.g., "Install App")
3. THE PWA_Install_Prompt SHALL include a dismiss button allowing the user to close the banner without installing
4. THE PWA_Install_Prompt SHALL use the application's existing design system (amber accent, dark surface, Bebas Neue headings, DM Sans body text)
5. THE PWA_Install_Prompt SHALL be positioned so it does not obscure primary page content (e.g., fixed bottom banner or modal)

### Requirement 8: PWA Install Prompt Behavior

**User Story:** As a visitor, I want the install prompt to behave respectfully, so that it does not annoy me on repeat visits.

#### Acceptance Criteria

1. WHEN the user clicks the dismiss button, THE PWA_Install_Prompt SHALL hide the banner and not display it again for the current session
2. WHEN the user clicks the install button, THE PWA_Install_Prompt SHALL trigger the native browser install dialog via the stored beforeinstallprompt event
3. IF the browser does not fire the beforeinstallprompt event (e.g., app already installed, unsupported browser), THEN THE PWA_Install_Prompt SHALL remain hidden
4. WHEN the user completes the installation successfully, THE PWA_Install_Prompt SHALL hide the banner

### Requirement 9: PWA Install Prompt Accessibility

**User Story:** As a visitor using assistive technology, I want the install prompt to be fully accessible, so that I can interact with it using a keyboard or screen reader.

#### Acceptance Criteria

1. THE PWA_Install_Prompt SHALL have a role of "dialog" or "alertdialog" with an accessible name describing its purpose
2. THE PWA_Install_Prompt SHALL be operable via keyboard (Tab, Enter, Escape to dismiss)
3. THE PWA_Install_Prompt SHALL announce its appearance to screen readers using an appropriate ARIA live region or focus management

### Requirement 10: i18n Integration with PWA Install Prompt

**User Story:** As a non-English visitor, I want the install prompt text to appear in my selected language, so that I understand the prompt content.

#### Acceptance Criteria

1. THE PWA_Install_Prompt SHALL display all text (heading, description, button labels) using translated strings from the active Locale's Translation_File
2. WHEN the user switches Locale while the PWA_Install_Prompt is visible, THE PWA_Install_Prompt SHALL update its text to the newly selected Locale

### Requirement 11: Translation Caching

**User Story:** As a returning visitor, I want translation files to load quickly on subsequent visits, so that the site feels responsive regardless of locale.

#### Acceptance Criteria

1. THE Service_Worker SHALL cache Translation_Files so they are available on subsequent page loads without network requests
2. WHEN a cached Translation_File exists and the network is available, THE Service_Worker SHALL use a stale-while-revalidate strategy to serve the cached version immediately while fetching an updated version in the background
3. WHILE the network is unavailable, THE Application SHALL serve previously cached Translation_Files for all configured locales
4. WHEN the Application is built with `nuxi generate`, THE build output SHALL include all Translation_Files as static assets eligible for Service_Worker precaching

### Requirement 12: OG Image Caching

**User Story:** As a site owner, I want generated OG images to be cached efficiently, so that social crawlers and repeat visitors receive fast responses.

#### Acceptance Criteria

1. THE Application SHALL configure the Service_Worker to cache generated Open_Graph_Image files
2. WHEN a static site build is generated, THE OG_Image_Module SHALL produce Open_Graph_Image files as static assets included in the Service_Worker precache manifest
3. THE Application SHALL set appropriate cache-control headers or Service_Worker caching rules for Open_Graph_Image files with a cache duration of at least 7 days

### Requirement 13: Application-Wide Accessibility Compliance

**User Story:** As a visitor with disabilities, I want the entire application to meet accessibility standards, so that I can navigate and interact with all content using assistive technologies.

#### Acceptance Criteria

1. THE Application SHALL meet WCAG 2.1 Level AA contrast requirements for all text elements across both light and dark themes
2. THE Application SHALL provide visible focus indicators on all interactive elements (links, buttons, form inputs, language switcher)
3. THE Application SHALL use semantic HTML landmarks (header, nav, main, footer, section) with appropriate ARIA labels where landmark roles are ambiguous
4. THE Application SHALL ensure all images and icons have appropriate alternative text or are marked as decorative with `aria-hidden="true"`
5. WHEN a page section is navigated to via anchor link or route change, THE Application SHALL manage focus to announce the new content to screen readers
6. THE Application SHALL support full keyboard navigation through all interactive components without keyboard traps
7. THE Application SHALL declare the correct `lang` attribute on the HTML element matching the active Locale

### Requirement 14: Form Accessibility

**User Story:** As a visitor using assistive technology, I want all forms to be fully accessible, so that I can complete submissions without barriers.

#### Acceptance Criteria

1. THE ContactForm SHALL associate all input fields with their labels using matching `for` and `id` attributes
2. WHEN a form field has a validation error, THE ContactForm SHALL programmatically associate the error message with the field using `aria-describedby`
3. THE ContactForm SHALL announce form submission success or failure to screen readers using an ARIA live region
4. THE ContactForm SHALL indicate required fields both visually and programmatically using `aria-required="true"`

### Requirement 15: Motion and Animation Accessibility

**User Story:** As a visitor with motion sensitivity, I want to reduce or disable animations, so that the site does not trigger discomfort.

#### Acceptance Criteria

1. WHEN the user has enabled "prefers-reduced-motion" in their operating system settings, THE Application SHALL disable or minimize all non-essential animations (loading spinner, loader bar, section transitions)
2. THE Application SHALL preserve functional transitions (page navigation, modal open/close) in a reduced form that does not cause vestibular discomfort
