import { InvoiceLines } from '../types'
import { INVOICE_DESCRIPTION_MAX_LENGTH } from './constants'

/**
 * One line's text with its quantity: `2 × Coffee mug`. Stripe writes a subscription line's
 * description with the quantity already in it (`1 × Plan (at $10.00 / month)`, or
 * `1 seat × Plan ...` when the product has a unit label), so those are left as they are.
 */
export const formatInvoiceLine = ({ description, quantity, type }: InvoiceLines): string => {
  if (!description) return ''
  if (!quantity || type === 'subscription') return description
  return `${quantity} × ${description}`
}

/** Every line of an invoice, e.g. `1 × QA One-time A, 2 × QA One-time B`. */
export const formatInvoiceDescription = (lines: InvoiceLines[] = []): string =>
  lines.map(formatInvoiceLine).filter(Boolean).join(', ')

/** Cuts the text at `maxLength` characters, ending it with "…" when anything was left out. */
export const truncateText = (
  text: string,
  maxLength: number = INVOICE_DESCRIPTION_MAX_LENGTH,
): string => (text.length > maxLength ? `${text.slice(0, maxLength).trimEnd()}…` : text)
