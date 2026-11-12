import type { AlertProps } from '@mui/material'

import type {
  CardHoldNoticeMessageOptions,
  CardHoldNoticeMessages,
  CardHoldNoticeStatus,
} from '../../common'

export interface CardHoldNoticeProps
  extends CardHoldNoticeMessageOptions, Omit<AlertProps, 'children'> {
  /**
   * What happens to the card: held now (`placed`), held later (`scheduled`, with `holdOn`),
   * saved and charged on the date (`card_saved`, with `chargeOn`), or charged now.
   */
  status: CardHoldNoticeStatus
  /** Replaces the copy per status, e.g. with the project's translations. */
  messages?: Partial<CardHoldNoticeMessages>
}
