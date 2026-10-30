import type { BoxProps } from '@mui/material'

import type { UseImpersonationBannerOptions } from '../../common'

export interface ImpersonationBannerProps extends UseImpersonationBannerOptions {
  /** Label of the button that ends the session. Default "End session". */
  endButtonLabel?: string
  /** Props for the banner's container, e.g. `sx` to change where it sticks. */
  ContainerProps?: Partial<BoxProps>
}
