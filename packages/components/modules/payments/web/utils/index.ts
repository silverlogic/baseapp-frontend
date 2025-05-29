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
