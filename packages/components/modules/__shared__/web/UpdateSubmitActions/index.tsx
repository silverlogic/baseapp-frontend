import React, { FC } from 'react'

import { IconButton } from '@baseapp-frontend/design-system/components/web/buttons'
import { CheckMarkIcon, CloseIcon } from '@baseapp-frontend/design-system/components/web/icons'

import { UpdateSubmitActionsProps } from './types'

const UpdateSubmitActions: FC<UpdateSubmitActionsProps> = ({
  formId,
  disabled = false,
  ariaLabel = 'save comment edit',
  cancelAriaLabel = 'cancel comment edit',
  handleEditCancel = () => {},
}) => (
  <div className="grid grid-cols-[max-content_max-content] gap-2">
    <IconButton onClick={handleEditCancel} aria-label={cancelAriaLabel}>
      <CloseIcon />
    </IconButton>
    <IconButton type="submit" form={formId} aria-label={ariaLabel} disabled={disabled}>
      <CheckMarkIcon />
    </IconButton>
  </div>
)

export default UpdateSubmitActions
