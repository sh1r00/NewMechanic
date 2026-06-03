import { ref, onUnmounted, type Ref } from 'vue'

export interface UseScrollSpyReturn {
  activeSection: Ref<string>
}

export function useScrollSpy(sectionIds: string[]): UseScrollSpyReturn {
  const activeSection = ref<string>('')

  // Graceful degradation if IntersectionObserver is not available
  if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
    return { activeSection }
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      }
    },
    {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    }
  )

  // Observe each section element by ID
  for (const id of sectionIds) {
    const element = document.getElementById(id)
    if (element) {
      observer.observe(element)
    }
  }

  // Clean up observer on component unmount
  onUnmounted(() => {
    observer.disconnect()
  })

  return { activeSection }
}
