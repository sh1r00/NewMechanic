import { defineStore } from 'pinia'

const STORAGE_KEY = 'dark-mode'

export const useDarkModeStore = defineStore('darkMode', {
  state: () => ({
    isDark: false
  }),

  actions: {
    initialize() {
      const logger = useLogger({ tag: 'DarkModeStore' })

      if (import.meta.client) {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved !== null) {
          this.isDark = saved === 'true'
          logger.debug('Initialized from localStorage', { isDark: this.isDark })
        } else if (window.matchMedia) {
          this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
          logger.debug('Initialized from OS preference', { isDark: this.isDark })
        }
        this.applyClass()
        logger.info('Dark mode initialized', { isDark: this.isDark })
      }
    },

    toggle() {
      const logger = useLogger({ tag: 'DarkModeStore' })

      this.isDark = !this.isDark
      this.applyClass()
      if (import.meta.client) {
        localStorage.setItem(STORAGE_KEY, String(this.isDark))
      }
      logger.debug('Dark mode toggled', { isDark: this.isDark })
    },

    applyClass() {
      if (import.meta.client) {
        document.documentElement.classList.toggle('dark', this.isDark)
      }
    }
  }
})
