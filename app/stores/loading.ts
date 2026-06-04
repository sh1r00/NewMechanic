import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', {
  state: () => ({
    isLoading: false,
  }),

  actions: {
    start() {
      this.isLoading = true
    },

    stop() {
      this.isLoading = false
    },

    /**
     * Wraps an async action with loading state.
     * Automatically starts/stops loading around the provided function.
     */
    async withLoading<T>(fn: () => T | Promise<T>): Promise<T> {
      this.start()
      try {
        return await fn()
      } finally {
        this.stop()
      }
    },
  },
})
