import React from 'react'

import {
  CreditCardIcon,
  MastercardCreditCardIcon,
  VisaCreditCardIcon,
} from '@baseapp-frontend/design-system/components/web/icons'

export const formatPrice = (
  unitAmount: number | undefined,
  locale: string = 'en-US',
  currency: string = 'USD',
): string => {
  if (!Number.isFinite(unitAmount)) {
    return ''
  }

  return ((unitAmount ?? 0) / 100).toLocaleString(locale, {
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
      return <VisaCreditCardIcon sx={{ mr: 1, fontSize: 28 }} />
    case 'mastercard':
      return <MastercardCreditCardIcon sx={{ mr: 1, fontSize: 28 }} />
    default:
      return <CreditCardIcon sx={{ mr: 1, color: 'primary.main' }} />
  }
}
