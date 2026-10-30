import type { StyleProp, ViewStyle } from 'react-native'

import type { ImpersonationEndedResult, UseImpersonationBannerOptions } from '../../common'

export interface ImpersonationBannerProps extends Omit<
  UseImpersonationBannerOptions,
  'onEnded' | 'redirectTo'
> {
  /**
   * Called once the impersonator's tokens are back (or the user was logged out). Native apps
   * can't reload, so this must recreate the Relay environment and navigate.
   */
  onEnded: (result: ImpersonationEndedResult) => void
  /** Label of the button that ends the session. Default "End session". */
  endButtonLabel?: string
  style?: StyleProp<ViewStyle>
}
