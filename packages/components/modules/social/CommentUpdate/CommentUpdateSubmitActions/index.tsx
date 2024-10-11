import React, { FC } from 'react'

import { CheckMarkIcon, CloseIcon, IconButton } from '@baseapp-frontend/design-system'

import { CommentUpdateSubmitActionsProps } from './types'

const CommentUpdateSubmitActions: FC<CommentUpdateSubmitActionsProps> = ({
  formId,
  disabled = false,
  ariaLabel = 'save comment edit',
  handleEditCancel = () => {},
}) => (
  <div className="grid grid-cols-[max-content_max-content] gap-2">
    <IconButton onClick={handleEditCancel} aria-label="cancel comment edit">
      <CloseIcon />
    </IconButton>
    <IconButton type="submit" form={formId} aria-label={ariaLabel} disabled={disabled}>
      <CheckMarkIcon />
    </IconButton>
  </div>
)

export default CommentUpdateSubmitActions
