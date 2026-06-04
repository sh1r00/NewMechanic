<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)
const activeDescendantIndex = ref(-1)

interface LocaleObject {
  code: string
  name?: string
  language?: string
}

const allLocales = computed(() => locales.value as LocaleObject[])

const availableLocales = computed(() =>
  allLocales.value.filter((l) => l.code !== locale.value)
)

const currentLocaleName = computed(() => {
  const current = allLocales.value.find((l) => l.code === locale.value)
  return current?.name || locale.value.toUpperCase()
})

const localeFlags: Record<string, string> = {
  en: '🇺🇸',
  fr: '🇫🇷',
  es: '🇪🇸',
}

const activeDescendantId = computed(() => {
  if (activeDescendantIndex.value < 0) return undefined
  const loc = availableLocales.value[activeDescendantIndex.value]
  return loc ? `locale-option-${loc.code}` : undefined
})

function toggleDropdown() {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    activeDescendantIndex.value = 0
  } else {
    activeDescendantIndex.value = -1
  }
}

function openDropdown() {
  if (!isOpen.value) {
    isOpen.value = true
    activeDescendantIndex.value = 0
  }
}

function closeDropdown() {
  isOpen.value = false
  activeDescendantIndex.value = -1
}

function selectLocale(code: string) {
  setLocale(code)
  closeDropdown()
}

function handleKeydown(event: KeyboardEvent) {
  if (!isOpen.value) {
    // Open dropdown on arrow keys or Enter/Space when closed
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      openDropdown()
    }
    return
  }

  switch (event.key) {
    case 'Escape':
      event.preventDefault()
      closeDropdown()
      break
    case 'ArrowDown':
      event.preventDefault()
      activeDescendantIndex.value = Math.min(
        activeDescendantIndex.value + 1,
        availableLocales.value.length - 1
      )
      break
    case 'ArrowUp':
      event.preventDefault()
      activeDescendantIndex.value = Math.max(activeDescendantIndex.value - 1, 0)
      break
    case 'Enter':
      event.preventDefault()
      if (activeDescendantIndex.value >= 0 && activeDescendantIndex.value < availableLocales.value.length) {
        selectLocale(availableLocales.value[activeDescendantIndex.value].code)
      }
      break
    case 'Tab':
      closeDropdown()
      break
  }
}

// Close dropdown when clicking outside
function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div ref="dropdownRef" class="relative" @keydown="handleKeydown">
    <!-- Toggle Button -->
    <button
      type="button"
      class="flex items-center gap-1.5 p-2 rounded-lg text-on-surface-variant hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors duration-200"
      :aria-expanded="isOpen"
      :aria-label="$t('accessibility.languageSwitcher')"
      aria-haspopup="listbox"
      :aria-activedescendant="activeDescendantId"
      @click="toggleDropdown"
    >
      <span class="text-base" aria-hidden="true">{{ localeFlags[locale] || '🌐' }}</span>
      <span class="text-xs font-body uppercase tracking-wider hidden sm:inline">{{ locale }}</span>
      <svg
        class="w-3 h-3 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
        viewBox="0 0 12 12"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M2.22 4.47a.75.75 0 0 1 1.06 0L6 7.19l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L2.22 5.53a.75.75 0 0 1 0-1.06Z" />
      </svg>
    </button>

    <!-- Dropdown -->
    <Transition name="dropdown">
      <div
        v-if="isOpen"
        role="listbox"
        :aria-label="$t('language.label')"
        class="absolute right-0 top-full mt-2 min-w-[140px] bg-surface-container border border-outline-variant rounded-lg shadow-elevation-3 overflow-hidden z-50"
      >
        <!-- Current locale (active indicator) -->
        <div
          :id="`locale-option-${locale}`"
          role="option"
          :aria-selected="true"
          class="flex items-center gap-3 px-4 py-2.5 text-primary bg-primary/5 border-b border-outline-variant cursor-default"
        >
          <span class="text-base" aria-hidden="true">{{ localeFlags[locale] }}</span>
          <span class="font-body text-sm">{{ currentLocaleName }}</span>
          <svg class="w-3.5 h-3.5 ml-auto" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" />
          </svg>
        </div>

        <!-- Other locales -->
        <div
          v-for="(loc, index) in availableLocales"
          :id="`locale-option-${loc.code}`"
          :key="loc.code"
          role="option"
          :aria-selected="false"
          class="flex items-center gap-3 px-4 py-2.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors duration-150 cursor-pointer"
          :class="{ 'bg-surface-container-low text-on-surface': activeDescendantIndex === index }"
          @click="selectLocale(loc.code)"
          @mouseenter="activeDescendantIndex = index"
        >
          <span class="text-base" aria-hidden="true">{{ localeFlags[loc.code] }}</span>
          <span class="font-body text-sm">{{ loc.name }}</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
