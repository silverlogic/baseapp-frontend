import React, { FC } from 'react'

import { IconButton } from '@baseapp-frontend/design-system/components/web/buttons'
import { TrashCanIcon } from '@baseapp-frontend/design-system/components/web/icons'

import { ActionOverlayTooltipContainer } from '../styled'
import { DefaultHoverOverlayProps } from './types'

const DefaultHoverOverlay: FC<DefaultHoverOverlayProps> = ({
  offsetRight,
  offsetTop,
  showDeleteButton,
  isDeletingItem,
  disableDeleteButton,
  handleDeleteDialogOpen,
  actions = [],
  handleLongPressItemOptionsClose,
}) => (
  <ActionOverlayTooltipContainer
    offsetRight={offsetRight}
    offsetTop={offsetTop}
    aria-label="actions overlay"
  >
    {showDeleteButton && (
      <IconButton
        onClick={handleDeleteDialogOpen}
        disabled={isDeletingItem || disableDeleteButton}
        aria-label="delete item"
      >
        <TrashCanIcon />
      </IconButton>
    )}
    {actions?.map(({ label, icon, onClick, disabled, hasPermission, closeOnClick }) => {
      if (!hasPermission) return null

      const handleClick = () => {
        onClick?.()
        if (closeOnClick) {
          handleLongPressItemOptionsClose()
        }
      }

      return (
        <IconButton key={label} onClick={handleClick} disabled={disabled} aria-label={label}>
          {icon}
        </IconButton>
      )
    })}
  </ActionOverlayTooltipContainer>
)

export default DefaultHoverOverlay
