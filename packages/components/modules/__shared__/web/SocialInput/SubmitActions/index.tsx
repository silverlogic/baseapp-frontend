import React, { FC } from 'react'

import { IconButton } from '@baseapp-frontend/design-system/components/web/buttons'
import { SendMessageIcon as DefaultSendMessageIcon } from '@baseapp-frontend/design-system/components/web/icons'

import { SubmitActionsProps } from './types'

const SubmitActions: FC<SubmitActionsProps> = ({
  formId,
  disabled = false,
  ariaLabel = 'submit actions',
  SendMessageIcon = DefaultSendMessageIcon,
  SendMessageIconProps = {},
}) => (
  <IconButton type="submit" form={formId} disabled={disabled} aria-label={ariaLabel}>
    <SendMessageIcon {...SendMessageIconProps} />
  </IconButton>
)

export default SubmitActions
