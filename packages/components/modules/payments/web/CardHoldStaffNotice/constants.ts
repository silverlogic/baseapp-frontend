import { defineMessages } from 'react-intl'

import type { CardHoldStaffDecision, CardHoldStaffNoticeMessages } from './types'

/**
 * The notice's default copy; the `messages` prop replaces any of it. `retriesLeft` takes the
 * count as `{count}`.
 */
export const CARD_HOLD_STAFF_NOTICE_MESSAGES = defineMessages({
  failureTitle: {
    id: 'payments.cardHold.staffNotice.failureTitle',
    defaultMessage: 'The card hold failed',
  },
  unknownReason: {
    id: 'payments.cardHold.staffNotice.unknownReason',
    defaultMessage: 'No reason given',
  },
  keptNotice: {
    id: 'payments.cardHold.staffNotice.keptNotice',
    defaultMessage: 'Kept: the card will be charged afresh when this closes.',
  },
  keepButton: {
    id: 'payments.cardHold.staffNotice.keepButton',
    defaultMessage: 'Keep',
  },
  cancelButton: {
    id: 'payments.cardHold.staffNotice.cancelButton',
    defaultMessage: 'Cancel',
  },
  retryButton: {
    id: 'payments.cardHold.staffNotice.retryButton',
    defaultMessage: 'Retry hold',
  },
  retriesLeft: {
    id: 'payments.cardHold.staffNotice.retriesLeft',
    defaultMessage: '{count, plural, one {# retry left} other {# retries left}}',
  },
  noRetriesLeft: {
    id: 'payments.cardHold.staffNotice.noRetriesLeft',
    defaultMessage: 'No retries left: only Keep or Cancel remain.',
  },
  keepTitle: {
    id: 'payments.cardHold.staffNotice.keepTitle',
    defaultMessage: 'Keep despite the failed hold?',
  },
  keepContent: {
    id: 'payments.cardHold.staffNotice.keepContent',
    defaultMessage:
      'Nothing is held on the card. When this closes, the card is charged afresh, and that charge can still be declined. This cannot be undone.',
  },
  keepConfirm: {
    id: 'payments.cardHold.staffNotice.keepConfirm',
    defaultMessage: 'Keep',
  },
  cancelTitle: {
    id: 'payments.cardHold.staffNotice.cancelTitle',
    defaultMessage: 'Cancel it?',
  },
  cancelContent: {
    id: 'payments.cardHold.staffNotice.cancelContent',
    defaultMessage: 'It is cancelled and nothing is charged. This cannot be undone.',
  },
  cancelConfirm: {
    id: 'payments.cardHold.staffNotice.cancelConfirm',
    defaultMessage: 'Cancel it',
  },
  retryTitle: {
    id: 'payments.cardHold.staffNotice.retryTitle',
    defaultMessage: 'Retry the hold now?',
  },
  retryContent: {
    id: 'payments.cardHold.staffNotice.retryContent',
    defaultMessage:
      'The same saved card will be tried again now, off-session: the customer is not asked to confirm. If it is declined again, the hold stays failed with one retry fewer.',
  },
  retryConfirm: {
    id: 'payments.cardHold.staffNotice.retryConfirm',
    defaultMessage: 'Retry now',
  },
  partiallyPaidTitle: {
    id: 'payments.cardHold.staffNotice.partiallyPaidTitle',
    defaultMessage: 'Partially paid',
  },
  partiallyPaidNotice: {
    id: 'payments.cardHold.staffNotice.partiallyPaidNotice',
    defaultMessage:
      'The hold was charged, but the charge for the difference above it was declined.',
  },
  markPaidButton: {
    id: 'payments.cardHold.staffNotice.markPaidButton',
    defaultMessage: 'Mark paid',
  },
  markPaidTitle: {
    id: 'payments.cardHold.staffNotice.markPaidTitle',
    defaultMessage: 'Mark it paid?',
  },
  markPaidContent: {
    id: 'payments.cardHold.staffNotice.markPaidContent',
    defaultMessage:
      'Records the rest as paid outside the app. The difference is never charged to the card. This cannot be undone.',
  },
  markPaidConfirm: {
    id: 'payments.cardHold.staffNotice.markPaidConfirm',
    defaultMessage: 'Mark paid',
  },
  dismiss: {
    id: 'payments.cardHold.staffNotice.dismiss',
    defaultMessage: 'Back',
  },
})

/** Which copy and confirm color each decision's dialog uses. */
export const CARD_HOLD_STAFF_DECISION_DIALOGS = {
  keep: { title: 'keepTitle', content: 'keepContent', confirm: 'keepConfirm', color: 'primary' },
  cancel: {
    title: 'cancelTitle',
    content: 'cancelContent',
    confirm: 'cancelConfirm',
    color: 'error',
  },
  retry: {
    title: 'retryTitle',
    content: 'retryContent',
    confirm: 'retryConfirm',
    color: 'primary',
  },
  markPaid: {
    title: 'markPaidTitle',
    content: 'markPaidContent',
    confirm: 'markPaidConfirm',
    color: 'primary',
  },
} as const satisfies Record<
  CardHoldStaffDecision,
  {
    title: keyof CardHoldStaffNoticeMessages
    content: keyof CardHoldStaffNoticeMessages
    confirm: keyof CardHoldStaffNoticeMessages
    color: 'primary' | 'error'
  }
>
