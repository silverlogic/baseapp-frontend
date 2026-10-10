import { MessageDescriptor, defineMessages } from 'react-intl'

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
  void: {
    id: 'payments.invoices.status.void',
    defaultMessage: 'void',
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
