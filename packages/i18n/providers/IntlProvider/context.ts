import { createContext } from 'react'

import { Locale } from '../../types'

export const LocaleUpdateContext = createContext<((locale: Locale) => void) | undefined>(undefined)
