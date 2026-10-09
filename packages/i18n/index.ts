// Types and constants
export * from './types'

// Utilities
export * from './utils'
export * from './utilsMessages'

// Locale loading
export {
  loadLocales,
  loadAllLocales,
  loadDefaultLocales,
  loadLocaleFromPackage,
  DEFAULT_LOCALE_PACKAGES,
} from './localeLoader'

// Functions
export { getCurrentLocale } from './functions/getCurrentLocale'
export { getLanguage } from './functions/getLanguage'
export { setLanguage } from './functions/setLanguage'
export {
  formatDateI18n,
  formatTimeI18n,
  formatRelativeTimeI18n,
  formatDateWithDiffNowI18n,
} from './functions/date'

// Hooks
export { useDateFormatter } from './hooks/useDateFormatter'

// Providers
export { default as IntlProvider } from './providers/IntlProvider'
export { useLocale } from './providers/IntlProvider/hooks'
export type { IntlProviderWrapperProps } from './providers/IntlProvider/types'
