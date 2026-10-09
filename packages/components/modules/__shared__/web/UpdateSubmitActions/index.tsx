import React, { FC } from 'react'

import { IconButton } from '@baseapp-frontend/design-system/components/web/buttons'
import { CheckMarkIcon, CloseIcon } from '@baseapp-frontend/design-system/components/web/icons'

import { ActionsContainer } from './styled'
import { UpdateSubmitActionsProps } from './types'

const UpdateSubmitActions: FC<UpdateSubmitActionsProps> = ({
  formId,
  disabled = false,
  ariaLabel = 'save comment edit',
  cancelAriaLabel = 'cancel comment edit',
  handleEditCancel = () => {},
}) => (
  <ActionsContainer>
    <IconButton onClick={handleEditCancel} aria-label={cancelAriaLabel}>
      <CloseIcon />
    </IconButton>
    <IconButton type="submit" form={formId} aria-label={ariaLabel} disabled={disabled}>
      <CheckMarkIcon />
    </IconButton>
  </ActionsContainer>
)

export default UpdateSubmitActions
