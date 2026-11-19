import type { CardHoldStaffDecision, CardHoldStaffNoticeMessages } from './types'

export const DEFAULT_CARD_HOLD_STAFF_NOTICE_MESSAGES: CardHoldStaffNoticeMessages = {
  failureTitle: 'The card hold failed',
  unknownReason: 'No reason given',
  keptNotice: 'Kept: the card will be charged afresh when this closes.',
  keepButton: 'Keep',
  cancelButton: 'Cancel',
  retryButton: 'Retry hold',
  retriesLeft: (retriesLeft) => `${retriesLeft} ${retriesLeft === 1 ? 'retry' : 'retries'} left`,
  noRetriesLeft: 'No retries left: only Keep or Cancel remain.',
  keepTitle: 'Keep despite the failed hold?',
  keepContent:
    'Nothing is held on the card. When this closes, the card is charged afresh, and that charge can still be declined. This cannot be undone.',
  keepConfirm: 'Keep',
  cancelTitle: 'Cancel it?',
  cancelContent: 'It is cancelled and nothing is charged. This cannot be undone.',
  cancelConfirm: 'Cancel it',
  retryTitle: 'Retry the hold now?',
  retryContent:
    'The same saved card will be tried again now, off-session: the customer is not asked to confirm. If it is declined again, the hold stays failed with one retry fewer.',
  retryConfirm: 'Retry now',
  partiallyPaidTitle: 'Partially paid',
  partiallyPaidNotice:
    'The hold was charged, but the charge for the difference above it was declined.',
  markPaidButton: 'Mark paid',
  markPaidTitle: 'Mark it paid?',
  markPaidContent:
    'Records the rest as paid outside the app. The difference is never charged to the card. This cannot be undone.',
  markPaidConfirm: 'Mark paid',
  dismiss: 'Back',
}

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
