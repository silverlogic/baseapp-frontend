import React, { FC } from 'react'

import { IconButton } from '@baseapp-frontend/design-system/components/web/buttons'
import { SendMessageIcon as DefaultSendMessageIcon } from '@baseapp-frontend/design-system/components/web/icons'

import { useIntl } from 'react-intl'

import { SubmitActionsProps } from './types'

const SubmitActions: FC<SubmitActionsProps> = ({
  formId,
  disabled = false,
  ariaLabel,
  SendMessageIcon = DefaultSendMessageIcon,
  SendMessageIconProps = {},
}) => {
  const intl = useIntl()

  return (
    <IconButton
      type="submit"
      form={formId}
      disabled={disabled}
      aria-label={
        ariaLabel ??
        intl.formatMessage({
          id: 'shared.socialInput.submit.ariaLabel',
          defaultMessage: 'submit actions',
        })
      }
    >
      <SendMessageIcon {...SendMessageIconProps} />
    </IconButton>
  )
}

export default SubmitActions
