# Implementation Plan: Mechanic Portfolio

## Overview

Build a personal portfolio website for Elias (mechanic, 5 years experience) as a Vue 3 single-page application with Tailwind CSS, dark mode, smooth scroll navigation, and mobile-first responsive design. Implementation uses TypeScript with Composition API and deploys to GitHub Pages via Vite.

## Tasks

- [x] 1. Initialize project and configure tooling
  - [x] 1.1 Scaffold Vue 3 + TypeScript project with Vite
    - Run `npm create vite@latest` with Vue + TypeScript template
    - Install Tailwind CSS 3, PostCSS, and Autoprefixer
    - Configure `tailwind.config.js` with dark mode class strategy and content paths
    - Configure `postcss.config.js` with Tailwind and Autoprefixer plugins
    - Add Tailwind directives to main CSS file
    - Set up Vitest and @vue/test-utils as dev dependencies
    - _Requirements: 8.1, 9.3_

  - [x] 1.2 Create project structure and static data file
    - Create `src/data/portfolio-data.ts` with PersonalInfo, Skill[], Project[], and SocialLinks interfaces
    - Populate with Elias's data: name, title, bio, 5 years experience, photo placeholder URL
    - Add 5-8 mechanic skills (e.g., Engine Diagnostics, Brake Systems, Electrical Repair, Suspension, Transmission, Oil Change, Welding, AC Repair) with levels 1-100
    - Add 3 placeholder projects with titles, descriptions, placeholder images, and tags
    - Add GitHub and LinkedIn social links
    - _Requirements: 3.1, 4.1, 5.2, 5.3_

- [x] 2. Implement composables
  - [x] 2.1 Implement useDarkMode composable
    - Create `src/composables/useDarkMode.ts`
    - Initialize from localStorage or system preference via `matchMedia('(prefers-color-scheme: dark)')`
    - Implement toggle function that flips state, persists to localStorage, and updates `document.documentElement` class
    - Handle localStorage unavailability gracefully (in-session only)
    - Return `isDark` ref and `toggle` function
    - _Requirements: 7.2, 7.3, 7.4, 7.5_

  - [x]* 2.2 Write property tests for useDarkMode
    - **Property 7: Dark mode toggle inverts state**
    - **Property 8: Dark mode persistence round trip**
    - **Validates: Requirements 7.2, 7.3**

  - [x] 2.3 Implement useScrollSpy composable
    - Create `src/composables/useScrollSpy.ts`
    - Accept array of section IDs
    - Use IntersectionObserver to track visible sections
    - Update `activeSection` ref when sections enter viewport
    - Clean up observer on component unmount with `onUnmounted`
    - _Requirements: 6.4_

  - [x]* 2.4 Write property test for useScrollSpy
    - **Property 5: Scroll spy tracks active section**
    - **Validates: Requirements 6.4**

- [x] 3. Implement layout and navigation components
  - [x] 3.1 Implement App.vue root component
    - Apply dark mode class from useDarkMode composable to root element
    - Add `scroll-behavior: smooth` to html element
    - Import and render all section components in order
    - _Requirements: 7.2, 6.3_

  - [x] 3.2 Implement Navbar.vue
    - Create fixed top navbar with backdrop blur (`fixed top-0 w-full backdrop-blur`)
    - Add navigation links for About, Skills, Projects, Contact sections with anchor hrefs
    - Integrate useScrollSpy to highlight active section link
    - Add mobile menu toggle button visible below 768px
    - Implement show/hide toggle for mobile nav links
    - Include DarkModeToggle component
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_

  - [x] 3.3 Implement DarkModeToggle.vue
    - Display sun icon when isDark is true, moon icon when isDark is false
    - Call toggle() from useDarkMode on click
    - Add icon transition animation
    - _Requirements: 7.1, 7.2_

  - [x]* 3.4 Write property test for DarkModeToggle icon state
    - **Property 6: Dark mode icon matches state**
    - **Validates: Requirements 7.1**

- [x] 4. Checkpoint - Verify navigation and dark mode
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Implement content sections
  - [x] 5.1 Implement HeroSection.vue
    - Full-viewport section with name, title "Mechanic", and tagline from portfolio-data
    - Profile photo with fallback to initials placeholder on error (use @error event)
    - CTA button with href="#contact" for smooth scroll
    - Subtle entrance transition animation
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

  - [x] 5.2 Implement AboutSection.vue
    - Display bio text from portfolio-data
    - Show "5 years of experience" stat
    - Two-column layout at md breakpoint and above (`md:grid-cols-2`)
    - Single column on mobile
    - _Requirements: 2.1, 2.2, 2.3_

  - [x] 5.3 Implement SkillsSection.vue and SkillCard.vue
    - SkillsSection renders skills from portfolio-data in a responsive grid
    - SkillCard accepts name, level, icon props
    - SkillCard displays progress bar with width based on level percentage
    - Add IntersectionObserver for scroll-triggered progress bar animation
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

  - [x]* 5.4 Write property tests for SkillCard rendering
    - **Property 1: Skill card renders all required fields**
    - **Property 10: Skills count matches data**
    - **Validates: Requirements 3.1, 3.2**

  - [x] 5.5 Implement ProjectsSection.vue and ProjectCard.vue
    - ProjectsSection renders project cards from portfolio-data in responsive grid
    - ProjectCard accepts title, description, image, tags, liveUrl?, repoUrl? props
    - Render links only when liveUrl or repoUrl is provided
    - Add hover effect classes (`hover:scale-105 hover:shadow-lg transition`)
    - Display technology tags as styled badges
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

  - [x]* 5.6 Write property tests for ProjectCard rendering
    - **Property 2: Project card renders all required fields**
    - **Property 3: Project card links conditional rendering**
    - **Validates: Requirements 4.2, 4.3**

  - [x] 5.7 Implement ContactSection.vue
    - Display call-to-action message
    - Render GitHub and LinkedIn links from portfolio-data
    - All external links use target="_blank" and rel="noopener noreferrer"
    - Use recognizable icons for each social platform
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

  - [x] 5.8 Implement FooterSection.vue
    - Display copyright with dynamically computed current year
    - Display Elias's name
    - _Requirements: 10.1, 10.2_

- [x] 6. Implement accessibility and performance
  - [x] 6.1 Add lazy loading and semantic HTML
    - Add `loading="lazy"` to all images below the fold (projects section images)
    - Use semantic elements: `<nav>`, `<main>`, `<section>`, `<footer>`
    - Add appropriate alt text to all images
    - Ensure all external links have `rel="noopener noreferrer"`
    - _Requirements: 9.1, 9.2, 9.3, 9.4_

  - [x]* 6.2 Write property tests for accessibility attributes
    - **Property 4: External links have security attributes**
    - **Property 9: All images have alt text**
    - **Validates: Requirements 5.4, 9.2, 9.4**

- [x] 7. Configure deployment
  - [x] 7.1 Configure Vite for GitHub Pages deployment
    - Set `base` in `vite.config.ts` for GitHub Pages path
    - Verify production build with `npm run build`
    - _Requirements: 8.1_

- [x] 8. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- Implementation language: TypeScript with Vue 3 Composition API

## Task Dependency Graph

```json
{
  "waves": [
    {
      "wave": 1,
      "tasks": ["1"]
    },
    {
      "wave": 2,
      "tasks": ["2"]
    },
    {
      "wave": 3,
      "tasks": ["3"]
    },
    {
      "wave": 4,
      "tasks": ["4"]
    },
    {
      "wave": 5,
      "tasks": ["5"]
    },
    {
      "wave": 6,
      "tasks": ["6"]
    },
    {
      "wave": 7,
      "tasks": ["7"]
    },
    {
      "wave": 8,
      "tasks": ["8"]
    }
  ]
}
```
