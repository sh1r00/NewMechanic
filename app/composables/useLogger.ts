import { createConsola, type ConsolaInstance } from 'consola'

interface UseLoggerOptions {
  /** Tag prefix for log messages (e.g., component or module name) */
  tag?: string
}

/**
 * Composable providing structured logging via consola.
 * Logs are tagged by component/module name for easy filtering.
 *
 * Usage:
 *   const logger = useLogger({ tag: 'ContactForm' })
 *   logger.info('Form submitted', { name: 'John' })
 *   logger.error('Submission failed', error)
 */
export function useLogger(options: UseLoggerOptions = {}) {
  const { tag = 'app' } = options

  const logger: ConsolaInstance = createConsola({
    level: import.meta.dev ? 4 : 3, // verbose in dev, info+ in production
  }).withTag(tag)

  return {
    /** Debug-level message (only visible in dev) */
    debug: (message: string, ...args: unknown[]) => logger.debug(message, ...args),
    /** Informational message */
    info: (message: string, ...args: unknown[]) => logger.info(message, ...args),
    /** Success message */
    success: (message: string, ...args: unknown[]) => logger.success(message, ...args),
    /** Warning message */
    warn: (message: string, ...args: unknown[]) => logger.warn(message, ...args),
    /** Error message */
    error: (message: string, ...args: unknown[]) => logger.error(message, ...args),
    /** Fatal error message */
    fatal: (message: string, ...args: unknown[]) => logger.fatal(message, ...args),
    /** Start a named timer */
    start: (message: string, ...args: unknown[]) => logger.start(message, ...args),
    /** Raw consola instance for advanced use */
    raw: logger,
  }
}
