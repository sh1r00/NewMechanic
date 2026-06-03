/**
 * Global loading state composable.
 * Use `startLoading()` / `stopLoading()` to show/hide the overlay between actions.
 *
 * Usage:
 *   const { isLoading, startLoading, stopLoading, withLoading } = useLoading()
 *   await withLoading(() => fetchData())
 */
export function useLoading() {
  const isLoading = useState<boolean>('global-loading', () => false)

  function startLoading() {
    isLoading.value = true
  }

  function stopLoading() {
    isLoading.value = false
  }

  /**
   * Wraps an async action with loading state.
   * Automatically starts/stops loading around the provided function.
   */
  async function withLoading<T>(fn: () => T | Promise<T>): Promise<T> {
    startLoading()
    try {
      return await fn()
    } finally {
      stopLoading()
    }
  }

  return { isLoading: readonly(isLoading), startLoading, stopLoading, withLoading }
}
