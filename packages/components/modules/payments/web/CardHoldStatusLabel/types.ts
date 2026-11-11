import type { ChipProps } from '@mui/material'

import type { CardHoldStatusLabel_cardHold$key } from '../../../../__generated__/CardHoldStatusLabel_cardHold.graphql'
import type { CardHoldStatusLabelDescriptor, CardHoldStatusLabelView } from '../../common'

export interface CardHoldStatusLabelProps extends Omit<ChipProps, 'label' | 'color'> {
  cardHold: CardHoldStatusLabel_cardHold$key
  /** `customer` (default) never shows a failed hold as failed; `staff` does. */
  view?: CardHoldStatusLabelView
  /** Replaces the label and color, e.g. with the project's translations. */
  getLabel?: (
    status: string,
    options: { kept: boolean; view: CardHoldStatusLabelView },
  ) => CardHoldStatusLabelDescriptor
}
