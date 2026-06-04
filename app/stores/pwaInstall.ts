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
  }),

  getters: {
    isPromptVisible: (state) => state.promptState === 'visible',
  },

  actions: {
    initialize() {
      if (!import.meta.client) return

      const logger = useLogger({ tag: 'PwaInstallStore' })
      const isDismissed = this._checkDismissed()

      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault()
        this.deferredPrompt = e as BeforeInstallPromptEvent

        if (!isDismissed && this.promptState === 'hidden') {
          this.promptState = 'visible'
          logger.debug('Install prompt ready — banner shown')
        }
      })

      window.addEventListener('appinstalled', () => {
        this.promptState = 'hidden'
        this.deferredPrompt = null
        this._setDismissed()
        logger.info('App installed successfully')
      })
    },

    async install() {
      if (!import.meta.client) return
      if (!this.deferredPrompt) return

      const logger = useLogger({ tag: 'PwaInstallStore' })
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
