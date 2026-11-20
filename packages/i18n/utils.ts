import enMessages from './locales/en.json'
import esMessages from './locales/es.json'
import ptMessages from './locales/pt.json'
import { DEFAULT_LOCALE, Locale } from './types'

/**
 * Get all base messages for a specific locale
 *
 * @param locale - The locale to get messages for
 * @param additionalMessages - Optional additional messages to merge with base messages
 * @returns Record of message IDs to translated strings
 */
export const getMessages = (
  locale: Locale,
  additionalMessages?: Record<string, string>,
): Record<string, string> => {
  const messages: Record<Locale, Record<string, string>> = {
    en: enMessages,
    es: esMessages,
    pt: ptMessages,
  }

  const baseMessages = messages[locale] || messages[DEFAULT_LOCALE]

  // Merge with additional messages if provided
  return additionalMessages ? { ...baseMessages, ...additionalMessages } : baseMessages
}
