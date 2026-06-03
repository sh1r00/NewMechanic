export function useScrollSpy(sectionIds: string[]) {
  const activeSection = ref<string>('')

  if (import.meta.server) {
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
      threshold: 0
    }
  )

  onMounted(() => {
    for (const id of sectionIds) {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    }
  })

  onUnmounted(() => {
    observer.disconnect()
  })

  return { activeSection }
}
