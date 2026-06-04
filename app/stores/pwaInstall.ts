import { defineStore } from 'pinia'

const STORAGE_KEY = 'pwa-prompt-dismissed'

/** Browser's BeforeInstallPromptEvent (not in standard lib types) */
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

type PromptState = 'hidden' | 'visible' | 'installing' | 'dismissed'

export const usePwaInstallStore = defineStore('pwaInstall', {
  state: () => ({
    promptState: 'hidden' as PromptState,
    deferredPrompt: null as BeforeInstallPromptEvent | null,
    canInstall: false,
  }),

  getters: {
    isPromptVisible: (state) => state.promptState === 'visible',
  },

  actions: {
    initialize() {
      if (!import.meta.client) return

      const logger = useLogger({ tag: 'PwaInstallStore' })
      const isDismissed = this._checkDismissed()

      // Show banner immediately if not dismissed (even before beforeinstallprompt)
      // This ensures users see the prompt on first visit
      if (!isDismissed) {
        this.promptState = 'visible'
        logger.debug('Install banner shown (awaiting beforeinstallprompt)')
      }

      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault()
        this.deferredPrompt = e as BeforeInstallPromptEvent
        this.canInstall = true
        logger.debug('beforeinstallprompt captured — install ready')

        // Show if not already visible and not dismissed
        if (!isDismissed && this.promptState === 'hidden') {
          this.promptState = 'visible'
        }
      })

      window.addEventListener('appinstalled', () => {
        this.promptState = 'hidden'
        this.deferredPrompt = null
        this.canInstall = false
        this._setDismissed()
        logger.info('App installed successfully')
      })

      // Hide if already installed (standalone mode)
      if (window.matchMedia('(display-mode: standalone)').matches) {
        this.promptState = 'hidden'
        this._setDismissed()
      }
    },

    async install() {
      if (!import.meta.client) return

      const logger = useLogger({ tag: 'PwaInstallStore' })

      if (!this.deferredPrompt) {
        // Fallback: no beforeinstallprompt yet, guide user to browser menu
        logger.debug('No deferred prompt — browser may not support install')
        this.dismiss()
        return
      }

      this.promptState = 'installing'

      try {
        await this.deferredPrompt.prompt()
        const { outcome } = await this.deferredPrompt.userChoice
        logger.debug(`User choice: ${outcome}`)
      } catch (error) {
        logger.warn('Install prompt error', error)
      } finally {
        this.promptState = 'hidden'
        this.deferredPrompt = null
      }
    },

    dismiss() {
      const logger = useLogger({ tag: 'PwaInstallStore' })
      this.promptState = 'hidden'
      this._setDismissed()
      logger.debug('User dismissed install prompt')
    },

    _checkDismissed(): boolean {
      try {
        return localStorage.getItem(STORAGE_KEY) === 'true'
      } catch {
        return false
      }
    },

    _setDismissed() {
      try {
        localStorage.setItem(STORAGE_KEY, 'true')
      } catch {
        // localStorage unavailable
      }
    },
  },
})
