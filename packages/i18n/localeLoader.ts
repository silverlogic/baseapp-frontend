import { Locale, SUPPORTED_LOCALES } from './types'

/**
 * Load locale messages from a package path
 * @param packagePath - Path to the package's locale exports (e.g., '@baseapp-frontend/i18n/locales')
 * @param locale - The locale to load
 * @returns The locale messages
 */
export async function loadLocaleFromPackage(
  packagePath: string,
  locale: Locale,
): Promise<Record<string, string>> {
  try {
    // Dynamic import of the locale module
    // Using Function constructor to prevent TypeScript from trying to resolve at compile time
    // This is necessary to avoid 14+ minute build hangs when TypeScript tries to resolve
    // all possible module paths with workspace dependencies
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    const dynamicImport = new Function('path', 'return import(path)')
    const localeModule = (await dynamicImport(packagePath)) as Record<
      string,
      Record<string, string>
    >

    // Return the specific locale
    return localeModule[locale] || {}
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Failed to load locale "${locale}" from package "${packagePath}":`, error)
    return {}
  }
}

/**
 * Load locale messages from multiple package paths
 * @param packagePaths - Array of package paths to load from
 * @param locale - The locale to load
 * @returns Merged locale messages from all packages
 */
export async function loadLocales(
  locale: Locale,
  packagePaths: string[],
  options?: {
    /** Additional messages to merge in */
    additionalMessages?: Record<string, string>
  },
): Promise<Record<string, string>> {
  // Load messages from all packages in parallel
  const messagesArrays = await Promise.all(
    packagePaths.map((packagePath) => loadLocaleFromPackage(packagePath, locale)),
  )

  // Merge all messages, with later packages overriding earlier ones
  const mergedMessages = messagesArrays.reduce((acc, messages) => ({ ...acc, ...messages }), {})

  // Merge additional messages if provided
  if (options?.additionalMessages) {
    return { ...mergedMessages, ...options.additionalMessages }
  }

  return mergedMessages
}

/**
 * Load all locales for all packages (useful for SSR)
 * @param packagePaths - Array of package paths to load from
 * @param locales - Array of locales to load (defaults to all supported locales)
 * @returns Map of locale to merged messages
 */
export async function loadAllLocales(
  packagePaths: string[],
  locales: readonly Locale[] = SUPPORTED_LOCALES,
  options?: {
    additionalMessages?: Record<Locale, Record<string, string>>
  },
): Promise<Map<Locale, Record<string, string>>> {
  const localeMap = new Map<Locale, Record<string, string>>()

  await Promise.all(
    locales.map(async (locale) => {
      const messages = await loadLocales(locale, packagePaths, {
        additionalMessages: options?.additionalMessages?.[locale],
      })
      localeMap.set(locale, messages)
    }),
  )

  return localeMap
}

/**
 * Default package paths for BaseApp packages
 */
export const DEFAULT_LOCALE_PACKAGES = [
  '@baseapp-frontend/i18n/locales',
  '@baseapp-frontend/utils/locales',
] as const

/**
 * Load locales using default BaseApp packages
 * @param locale - The locale to load
 * @param options - Additional options
 */
export async function loadDefaultLocales(
  locale: Locale,
  options?: {
    additionalPackages?: string[]
    additionalMessages?: Record<string, string>
  },
): Promise<Record<string, string>> {
  const packages = [...DEFAULT_LOCALE_PACKAGES, ...(options?.additionalPackages || [])]

  return loadLocales(locale, packages, {
    additionalMessages: options?.additionalMessages,
  })
}
