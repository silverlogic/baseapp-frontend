import { FC } from 'react'

import { SvgIconProps } from '@baseapp-frontend/design-system/components/native/icons'

export interface SubmitActionsProps {
  disabled?: boolean
  handleSubmit: VoidFunction
  SendMessageIcon?: FC<SvgIconProps>
  SendMessageIconProps?: SvgIconProps
  shouldUseBottomSheetSafeComponents?: boolean
}
