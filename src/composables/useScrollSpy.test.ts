import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useScrollSpy } from './useScrollSpy'

// Mock onUnmounted since we're testing outside a component lifecycle
vi.mock('vue', async () => {
  const actual = await vi.importActual('vue')
  return {
    ...actual,
    onUnmounted: vi.fn((cb) => cb),
  }
})

describe('useScrollSpy', () => {
  let mockObserve: ReturnType<typeof vi.fn>
  let mockDisconnect: ReturnType<typeof vi.fn>
  let observerCallback: IntersectionObserverCallback

  beforeEach(() => {
    mockObserve = vi.fn()
    mockDisconnect = vi.fn()

    // Mock IntersectionObserver
    vi.stubGlobal(
      'IntersectionObserver',
      class MockIntersectionObserver {
        constructor(callback: IntersectionObserverCallback) {
          observerCallback = callback
        }
        observe = mockObserve
        disconnect = mockDisconnect
        unobserve = vi.fn()
      }
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('should return an activeSection ref initialized to empty string', () => {
    const { activeSection } = useScrollSpy(['about', 'skills'])
    expect(activeSection.value).toBe('')
  })

  it('should observe elements matching section IDs', () => {
    const aboutEl = document.createElement('section')
    aboutEl.id = 'about'
    const skillsEl = document.createElement('section')
    skillsEl.id = 'skills'
    document.body.appendChild(aboutEl)
    document.body.appendChild(skillsEl)

    useScrollSpy(['about', 'skills'])

    expect(mockObserve).toHaveBeenCalledTimes(2)

    document.body.removeChild(aboutEl)
    document.body.removeChild(skillsEl)
  })

  it('should not observe elements that do not exist in the DOM', () => {
    useScrollSpy(['nonexistent'])
    expect(mockObserve).not.toHaveBeenCalled()
  })

  it('should update activeSection when a section intersects', () => {
    const aboutEl = document.createElement('section')
    aboutEl.id = 'about'
    document.body.appendChild(aboutEl)

    const { activeSection } = useScrollSpy(['about'])

    // Simulate intersection
    observerCallback(
      [
        {
          isIntersecting: true,
          target: aboutEl,
        } as unknown as IntersectionObserverEntry,
      ],
      {} as IntersectionObserver
    )

    expect(activeSection.value).toBe('about')

    document.body.removeChild(aboutEl)
  })

  it('should not update activeSection when a section leaves the viewport', () => {
    const aboutEl = document.createElement('section')
    aboutEl.id = 'about'
    document.body.appendChild(aboutEl)

    const { activeSection } = useScrollSpy(['about'])

    // Simulate leaving viewport
    observerCallback(
      [
        {
          isIntersecting: false,
          target: aboutEl,
        } as unknown as IntersectionObserverEntry,
      ],
      {} as IntersectionObserver
    )

    expect(activeSection.value).toBe('')

    document.body.removeChild(aboutEl)
  })

  it('should gracefully degrade when IntersectionObserver is unavailable', () => {
    vi.stubGlobal('IntersectionObserver', undefined)

    const { activeSection } = useScrollSpy(['about', 'skills'])
    expect(activeSection.value).toBe('')
  })
})
