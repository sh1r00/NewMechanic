<script setup lang="ts">
const { t } = useI18n()

interface NavItem {
  key: string
  href: string
}

const navItems: NavItem[] = [
  { key: 'nav.about', href: '#about' },
  { key: 'nav.skills', href: '#skills' },
  { key: 'nav.projects', href: '#projects' },
  { key: 'nav.contact', href: '#contact' },
]

const sectionIds = navItems.map((item) => item.href.slice(1))
const { activeSection } = useScrollSpy(sectionIds)

const isMobileMenuOpen = ref(false)

function toggleMobileMenu(): void {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function closeMobileMenu(): void {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <nav
    aria-label="Main navigation"
    class="fixed top-0 w-full z-50 bg-bg-primary/80 backdrop-blur-md border-b border-border transition-colors duration-300"
  >
    <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
      <!-- Logo / Site Name -->
      <a href="#" class="font-display text-2xl text-text-primary tracking-wide">
        ELIAS
      </a>

      <!-- Desktop Navigation Links -->
      <div class="hidden md:flex items-center gap-8">
        <a
          v-for="item in navItems"
          :key="item.href"
          :href="item.href"
          class="nav-link font-body text-sm uppercase tracking-wider text-text-secondary hover:text-accent transition-colors duration-200 relative py-1"
          :class="{ active: activeSection === item.href.slice(1) }"
        >
          {{ $t(item.key) }}
        </a>
        <DarkModeToggle />
        <LanguageSwitcher />
      </div>

      <!-- Mobile Menu Button + Dark Mode Toggle -->
      <div class="flex items-center gap-2 md:hidden">
        <LanguageSwitcher />
        <DarkModeToggle />
        <button
          type="button"
          :aria-label="$t('accessibility.mobileMenuToggle')"
          :aria-expanded="isMobileMenuOpen"
          class="p-2 rounded-lg text-text-secondary hover:text-accent transition-colors duration-200"
          @click="toggleMobileMenu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
            aria-hidden="true"
          >
            <!-- Hamburger icon when closed, X icon when open -->
            <template v-if="!isMobileMenuOpen">
              <path
                fill-rule="evenodd"
                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clip-rule="evenodd"
              />
            </template>
            <template v-else>
              <path
                fill-rule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clip-rule="evenodd"
              />
            </template>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      class="md:hidden overflow-hidden transition-all duration-300 ease-in-out"
      :class="isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'"
      :aria-hidden="!isMobileMenuOpen"
    >
      <div class="px-4 pb-4 flex flex-col gap-2 border-t border-border">
        <a
          v-for="item in navItems"
          :key="item.href"
          :href="item.href"
          :tabindex="isMobileMenuOpen ? 0 : -1"
          class="nav-link font-body text-sm uppercase tracking-wider text-text-secondary hover:text-accent transition-colors duration-200 py-3 relative"
          :class="{ active: activeSection === item.href.slice(1) }"
          @click="closeMobileMenu"
        >
          {{ $t(item.key) }}
        </a>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--color-accent);
  transition: width 0.3s ease;
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 100%;
}

.nav-link.active {
  color: var(--color-accent);
}
</style>
