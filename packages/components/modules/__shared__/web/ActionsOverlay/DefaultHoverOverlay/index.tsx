import React, { FC } from 'react'

import { IconButton } from '@baseapp-frontend/design-system/components/web/buttons'
import { TrashCanIcon } from '@baseapp-frontend/design-system/components/web/icons'

import { useIntl } from 'react-intl'

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
}) => {
  const intl = useIntl()

  return (
    <ActionOverlayTooltipContainer
      offsetRight={offsetRight}
      offsetTop={offsetTop}
      aria-label={intl.formatMessage({
        id: 'shared.actionsOverlay.ariaLabel',
        defaultMessage: 'actions overlay',
      })}
    >
      {showDeleteButton && (
        <IconButton
          onClick={handleDeleteDialogOpen}
          disabled={isDeletingItem || disableDeleteButton}
          aria-label={intl.formatMessage({
            id: 'shared.actionsOverlay.deleteItem.ariaLabel',
            defaultMessage: 'delete item',
          })}
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
}

export default DefaultHoverOverlay
