import { MessageDescriptor, defineMessages } from 'react-intl'

/** Characters of an invoice's description shown in the list before it is cut with "…". */
export const INVOICE_DESCRIPTION_MAX_LENGTH = 60

export const INVOICE_STATUS_MESSAGES: Record<string, MessageDescriptor> = defineMessages({
  draft: {
    id: 'payments.invoices.status.draft',
    defaultMessage: 'draft',
  },
  open: {
    id: 'payments.invoices.status.open',
    defaultMessage: 'open',
  },
  paid: {
    id: 'payments.invoices.status.paid',
    defaultMessage: 'paid',
  },
  uncollectible: {
    id: 'payments.invoices.status.uncollectible',
    defaultMessage: 'uncollectible',
  },
  // A `void` invoice was cancelled and never charged - e.g. a one-time purchase whose card
  // was declined - so it reads "canceled" to the customer rather than Stripe's own name.
  void: {
    id: 'payments.invoices.status.void',
    defaultMessage: 'canceled',
  },
  failed: {
    id: 'payments.invoices.status.failed',
    defaultMessage: 'failed',
  },
  pending: {
    id: 'payments.invoices.status.pending',
    defaultMessage: 'pending',
  },
})

export const INVOICE_TABLE_MESSAGES = defineMessages({
  description: {
    id: 'payments.invoices.header.description',
    defaultMessage: 'Description',
  },
  receipt: {
    id: 'payments.invoices.receipt',
    defaultMessage: 'Receipt',
  },
})
