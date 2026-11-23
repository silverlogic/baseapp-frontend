import { defineMessages } from 'react-intl'

/** The notice's default copy; the `messages` prop replaces any of it. */
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
  dismiss: {
    id: 'payments.cardHold.staffNotice.dismiss',
    defaultMessage: 'Back',
  },
})
