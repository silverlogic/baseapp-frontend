import { DateTime } from 'luxon'
import { useIntl } from 'react-intl'

import {
  formatDateI18n,
  formatDateWithDiffNowI18n,
  formatRelativeTimeI18n,
  formatTimeI18n,
} from '../functions/date'

/**
 * Hook to format dates with i18n support
 */
export const useDateFormatter = () => {
  const intl = useIntl()

  return {
    formatDate: (date?: string | Date | null, options?: Intl.DateTimeFormatOptions) =>
      formatDateI18n(intl, date, options),
    formatTime: (date?: string | Date | null, options?: Intl.DateTimeFormatOptions) =>
      formatTimeI18n(intl, date, options),
    formatRelativeTime: (date?: string | null, reference?: DateTime) =>
      formatRelativeTimeI18n(intl, date, reference),
    formatDateWithDiffNow: (date?: string | null) => formatDateWithDiffNowI18n(intl, date),
  }
}
