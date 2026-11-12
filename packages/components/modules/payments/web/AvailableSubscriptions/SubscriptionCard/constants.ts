import { TypographyProps } from '@mui/material'

import { PricePartStyle } from './types'

export const PRICE_SEGMENT_TYPOGRAPHY: Record<PricePartStyle, TypographyProps> = {
  currency: { variant: 'h4', color: 'text.secondary' },
  major: { variant: 'h2' },
  minor: { variant: 'body1' },
}
