import { ref, type Ref } from 'vue'

export interface UseDarkModeReturn {
  isDark: Ref<boolean>
  toggle: () => void
}

const STORAGE_KEY = 'dark-mode'

function isLocalStorageAvailable(): boolean {
  try {
    const testKey = '__dark_mode_test__'
    localStorage.setItem(testKey, '1')
    localStorage.removeItem(testKey)
    return true
  } catch {
    return false
  }
}

function getInitialDarkMode(storageAvailable: boolean): boolean {
  if (storageAvailable) {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved !== null) {
      return saved === 'true'
    }
  }

  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  return false
}

function applyDarkClass(isDark: boolean): void {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', isDark)
  }
}

export function useDarkMode(): UseDarkModeReturn {
  const storageAvailable = isLocalStorageAvailable()
  const isDark = ref(getInitialDarkMode(storageAvailable))

  // Apply initial state
  applyDarkClass(isDark.value)

  function toggle(): void {
    isDark.value = !isDark.value
    applyDarkClass(isDark.value)

    if (storageAvailable) {
      localStorage.setItem(STORAGE_KEY, String(isDark.value))
    }
  }

  return { isDark, toggle }
}
