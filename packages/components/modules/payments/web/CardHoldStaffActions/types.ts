import type { CardHoldStaffActions_cardHold$key } from '../../../../__generated__/CardHoldStaffActions_cardHold.graphql'

export type CardHoldStaffDecision = 'keep' | 'cancel'

export interface CardHoldStaffActionsMessages {
  failureTitle: string
  /** Shown when Stripe gave no failure code. */
  unknownReason: string
  keptNotice: string
  keepButton: string
  cancelButton: string
  keepTitle: string
  keepContent: string
  keepConfirm: string
  cancelTitle: string
  cancelContent: string
  cancelConfirm: string
  dismiss: string
}

export interface CardHoldStaffActionsProps {
  cardHold: CardHoldStaffActions_cardHold$key
  /** Called after the backend accepted the decision. */
  onDecided?: (decision: CardHoldStaffDecision) => void
  /** Replaces the copy, e.g. with the project's translations. */
  messages?: Partial<CardHoldStaffActionsMessages>
}
