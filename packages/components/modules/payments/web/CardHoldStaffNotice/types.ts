import type { CardHoldStaffNotice_cardHold$key } from '../../../../__generated__/CardHoldStaffNotice_cardHold.graphql'

export type CardHoldStaffDecision = 'keep' | 'cancel'

export interface CardHoldStaffNoticeMessages {
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

export interface CardHoldStaffNoticeProps {
  cardHold: CardHoldStaffNotice_cardHold$key
  /** Called after the backend accepted the decision. */
  onDecided?: (decision: CardHoldStaffDecision) => void
  /** Replaces any of the copy; the rest comes from react-intl (`payments.cardHold.staffNotice.*`). */
  messages?: Partial<CardHoldStaffNoticeMessages>
}
