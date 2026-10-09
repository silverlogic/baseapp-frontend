import { ReactNode } from 'react'

import { Locale } from '../../types'

export interface IntlProviderWrapperProps {
  children: ReactNode
  locale?: Locale
  defaultLocale?: Locale
  additionalMessages?: Record<string, string>
  additionalMessagesByLocale?: Partial<Record<Locale, Record<string, string>>>
  initialCookies?: Record<string, string>
}
