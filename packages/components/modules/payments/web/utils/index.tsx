import React from 'react'

import {
  CreditCardIcon,
  MastercardCreditCardIcon,
  VisaCreditCardIcon,
} from '@baseapp-frontend/design-system/components/web/icons'

import { CARD_ICON_FONT_SIZE } from '../constants'

// Stripe quotes amounts in the currency's minor unit, except for these, which have
// none: ¥500 arrives as 500, and dividing by 100 rendered it as ¥5.
// https://docs.stripe.com/currencies#zero-decimal
const ZERO_DECIMAL_CURRENCIES = new Set([
  'BIF',
  'CLP',
  'DJF',
  'GNF',
  'JPY',
  'KMF',
  'KRW',
  'MGA',
  'PYG',
  'RWF',
  'UGX',
  'VND',
  'VUV',
  'XAF',
  'XOF',
  'XPF',
])

export const formatPrice = (
  unitAmount: number | undefined,
  locale: string = 'en-US',
  currency: string = 'USD',
): string => {
  if (!Number.isFinite(unitAmount)) {
    return ''
  }

  const minorUnits = ZERO_DECIMAL_CURRENCIES.has(currency.toUpperCase()) ? 1 : 100

  return ((unitAmount ?? 0) / minorUnits).toLocaleString(locale, {
    style: 'currency',
    currency,
  })
}

export const CARD_BRANDS = {
  VISA: 'visa',
  MASTERCARD: 'mastercard',
}

export const getCardIcon = (brand?: string) => {
  const cardBrand = brand?.toLowerCase() || ''

  switch (cardBrand) {
    case 'visa':
      return <VisaCreditCardIcon sx={{ mr: 1, fontSize: CARD_ICON_FONT_SIZE }} />
    case 'mastercard':
      return <MastercardCreditCardIcon sx={{ mr: 1, fontSize: CARD_ICON_FONT_SIZE }} />
    default:
      return <CreditCardIcon sx={{ mr: 1, color: 'primary.main' }} />
  }
}

export const STATUS_COLORS = {
  paid: 'success' as const,
  failed: 'error' as const,
  pending: 'warning' as const,
}
