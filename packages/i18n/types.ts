/**
 * Supported locales in the application
 */
export const SUPPORTED_LOCALES = ['en', 'es', 'pt'] as const

/**
 * Locale type - one of the supported locales
 */
export type Locale = (typeof SUPPORTED_LOCALES)[number]

/**
 * Default locale for the application
 */
export const DEFAULT_LOCALE: Locale = 'en'

/**
 * Human-readable labels for each locale
 */
export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  pt: 'Português',
}

/**
 * Cookie name for storing the user's language preference
 */
export const LANGUAGE_COOKIE_NAME = 'Language'
