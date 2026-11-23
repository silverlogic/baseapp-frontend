import React, { FC } from 'react'

import { IconButton } from '@baseapp-frontend/design-system/components/web/buttons'
import { CheckMarkIcon, CloseIcon } from '@baseapp-frontend/design-system/components/web/icons'

import { useIntl } from 'react-intl'

import { ActionsContainer } from './styled'
import { UpdateSubmitActionsProps } from './types'

const UpdateSubmitActions: FC<UpdateSubmitActionsProps> = ({
  formId,
  disabled = false,
  ariaLabel,
  cancelAriaLabel,
  handleEditCancel = () => {},
}) => {
  const intl = useIntl()

  return (
    <ActionsContainer>
      <IconButton
        onClick={handleEditCancel}
        aria-label={
          cancelAriaLabel ??
          intl.formatMessage({
            id: 'shared.updateSubmitActions.cancel.ariaLabel',
            defaultMessage: 'cancel comment edit',
          })
        }
      >
        <CloseIcon />
      </IconButton>
      <IconButton
        type="submit"
        form={formId}
        aria-label={
          ariaLabel ??
          intl.formatMessage({
            id: 'shared.updateSubmitActions.save.ariaLabel',
            defaultMessage: 'save comment edit',
          })
        }
        disabled={disabled}
      >
        <CheckMarkIcon />
      </IconButton>
    </ActionsContainer>
  )
}

export default UpdateSubmitActions
