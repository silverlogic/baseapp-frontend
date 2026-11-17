/** Characters of an invoice's description shown in the list before it is cut with "…". */
export const INVOICE_DESCRIPTION_MAX_LENGTH = 60

/**
 * Labels for Stripe invoice statuses whose own name reads poorly to a customer. A `void`
 * invoice was cancelled and never charged - e.g. a one-time purchase whose card was declined.
 */
export const INVOICE_STATUS_LABELS: Record<string, string> = {
  void: 'canceled',
}
