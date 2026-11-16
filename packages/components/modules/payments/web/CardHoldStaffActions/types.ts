import type { CardHoldStaffActions_cardHold$key } from '../../../../__generated__/CardHoldStaffActions_cardHold.graphql'

export type CardHoldStaffDecision = 'keep' | 'cancel' | 'retry' | 'markPaid'

export interface CardHoldStaffActionsMessages {
  failureTitle: string
  /** Shown when Stripe gave no failure code. */
  unknownReason: string
  keptNotice: string
  keepButton: string
  cancelButton: string
  retryButton: string
  /** Shown under the actions of a failed hold that can still be retried. */
  retriesLeft: (retriesLeft: number) => string
  /** Shown instead when no retries are left. */
  noRetriesLeft: string
  keepTitle: string
  keepContent: string
  keepConfirm: string
  cancelTitle: string
  cancelContent: string
  cancelConfirm: string
  retryTitle: string
  retryContent: string
  retryConfirm: string
  partiallyPaidTitle: string
  partiallyPaidNotice: string
  markPaidButton: string
  markPaidTitle: string
  markPaidContent: string
  markPaidConfirm: string
  dismiss: string
}

export interface CardHoldStaffActionsProps {
  cardHold: CardHoldStaffActions_cardHold$key
  /**
   * Called after the backend accepted the decision. For `retry` that means the retry ran, not
   * that the card was held: the hold may come back `authorized` or `pending`, `scheduled` (the
   * hold date moved into the future, so it is placed later), or `failed` again with one retry
   * fewer.
   */
  onDecided?: (decision: CardHoldStaffDecision) => void
  /** Replaces the copy, e.g. with the project's translations. */
  messages?: Partial<CardHoldStaffActionsMessages>
}
