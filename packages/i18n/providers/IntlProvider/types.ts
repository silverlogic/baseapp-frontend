import { ReactNode } from 'react'

import { Locale } from '../../types'

export interface IntlProviderWrapperProps {
  children: ReactNode
  locale?: Locale
  defaultLocale?: Locale
  additionalMessages?: Record<string, string>
  initialCookies?: Record<string, string>
}
