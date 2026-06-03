import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useDarkMode } from './useDarkMode'

describe('useDarkMode', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  it('initializes from localStorage when preference is saved as true', () => {
    localStorage.setItem('dark-mode', 'true')
    const { isDark } = useDarkMode()
    expect(isDark.value).toBe(true)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('initializes from localStorage when preference is saved as false', () => {
    localStorage.setItem('dark-mode', 'false')
    const { isDark } = useDarkMode()
    expect(isDark.value).toBe(false)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('falls back to system preference when no localStorage value', () => {
    const matchMediaMock = vi.fn().mockReturnValue({ matches: true })
    vi.stubGlobal('matchMedia', matchMediaMock)

    const { isDark } = useDarkMode()
    expect(isDark.value).toBe(true)
    expect(matchMediaMock).toHaveBeenCalledWith('(prefers-color-scheme: dark)')

    vi.unstubAllGlobals()
  })

  it('toggle flips isDark from false to true', () => {
    localStorage.setItem('dark-mode', 'false')
    const { isDark, toggle } = useDarkMode()
    expect(isDark.value).toBe(false)

    toggle()
    expect(isDark.value).toBe(true)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(localStorage.getItem('dark-mode')).toBe('true')
  })

  it('toggle flips isDark from true to false', () => {
    localStorage.setItem('dark-mode', 'true')
    const { isDark, toggle } = useDarkMode()
    expect(isDark.value).toBe(true)

    toggle()
    expect(isDark.value).toBe(false)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(localStorage.getItem('dark-mode')).toBe('false')
  })

  it('persists preference to localStorage on toggle', () => {
    localStorage.setItem('dark-mode', 'false')
    const { toggle } = useDarkMode()

    toggle()
    expect(localStorage.getItem('dark-mode')).toBe('true')

    toggle()
    expect(localStorage.getItem('dark-mode')).toBe('false')
  })

  it('applies dark class to document.documentElement on initialization', () => {
    localStorage.setItem('dark-mode', 'true')
    useDarkMode()
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('removes dark class from document.documentElement when toggled off', () => {
    localStorage.setItem('dark-mode', 'true')
    const { toggle } = useDarkMode()
    expect(document.documentElement.classList.contains('dark')).toBe(true)

    toggle()
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })
})
