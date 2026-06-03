/**
 * Composable managing the PWA install prompt lifecycle.
 *
 * State machine:
 *   Hidden → Visible: beforeinstallprompt fired & not dismissed this session
 *   Visible → Installing: User clicks install
 *   Visible → Dismissed: User clicks dismiss
 *   Installing → Hidden: Install accepted/rejected
 *   Dismissed → Hidden: Session ends (sessionStorage cleared)
 */

const SESSION_KEY = 'pwa-prompt-dismissed'

/** Browser's BeforeInstallPromptEvent (not in standard lib types) */
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

type PromptState = 'hidden' | 'visible' | 'installing' | 'dismissed'

export interface UsePwaInstallReturn {
  /** Whether the install prompt banner should be visible */
  isPromptVisible: Readonly<Ref<boolean>>
  /** Trigger the native browser install dialog */
  install: () => Promise<void>
  /** Dismiss the banner for the current session */
  dismiss: () => void
}

/** Module-scoped ref holding the deferred prompt event */
const deferredPrompt = ref<BeforeInstallPromptEvent | null>(null)

/** Module-scoped state for the prompt lifecycle */
const state = ref<PromptState>('hidden')

export function usePwaInstall(): UsePwaInstallReturn {
  const logger = useLogger({ tag: 'PwaInstall' })

  const isPromptVisible = computed(() => state.value === 'visible')

  if (import.meta.client) {
    const isDismissedThisSession = checkDismissed()

    // Listen for the browser's install prompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      deferredPrompt.value = e as BeforeInstallPromptEvent

      if (!isDismissedThisSession && state.value === 'hidden') {
        state.value = 'visible'
        logger.debug('Install prompt ready — banner shown')
      }
    })

    // Listen for successful app installation
    window.addEventListener('appinstalled', () => {
      state.value = 'hidden'
      deferredPrompt.value = null
      logger.info('App installed successfully')
    })
  }

  async function install(): Promise<void> {
    if (!import.meta.client) return
    if (!deferredPrompt.value) return

    state.value = 'installing'

    try {
      await deferredPrompt.value.prompt()
      const { outcome } = await deferredPrompt.value.userChoice

      logger.debug(`User choice: ${outcome}`)
    } catch (error) {
      logger.warn('Install prompt error', error)
    } finally {
      state.value = 'hidden'
      deferredPrompt.value = null
    }
  }

  function dismiss(): void {
    state.value = 'dismissed'
    setDismissed()
    logger.debug('User dismissed install prompt')

    // Transition to hidden after dismissal is recorded
    state.value = 'hidden'
  }

  return {
    isPromptVisible: readonly(isPromptVisible),
    install,
    dismiss,
  }
}

/** Check if the prompt was already dismissed this session */
function checkDismissed(): boolean {
  if (!import.meta.client) return false

  try {
    return sessionStorage.getItem(SESSION_KEY) === 'true'
  } catch {
    // sessionStorage unavailable (e.g., private browsing restrictions)
    return false
  }
}

/** Persist dismissal for the current session */
function setDismissed(): void {
  if (!import.meta.client) return

  try {
    sessionStorage.setItem(SESSION_KEY, 'true')
  } catch {
    // sessionStorage unavailable — prompt won't persist but that's acceptable
  }
}
