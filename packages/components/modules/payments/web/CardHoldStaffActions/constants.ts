import type { CardHoldStaffActionsMessages } from './types'

export const DEFAULT_CARD_HOLD_STAFF_ACTIONS_MESSAGES: CardHoldStaffActionsMessages = {
  failureTitle: 'The card hold failed',
  unknownReason: 'No reason given',
  keptNotice: 'Kept: the card will be charged afresh when this closes.',
  keepButton: 'Keep',
  cancelButton: 'Cancel',
  keepTitle: 'Keep despite the failed hold?',
  keepContent:
    'Nothing is held on the card. When this closes, the card is charged afresh, and that charge can still be declined. This cannot be undone.',
  keepConfirm: 'Keep',
  cancelTitle: 'Cancel it?',
  cancelContent: 'It is cancelled and nothing is charged. This cannot be undone.',
  cancelConfirm: 'Cancel it',
  dismiss: 'Back',
}
