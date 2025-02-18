import React, { FC } from 'react'

import { IconButton } from '@baseapp-frontend/design-system/components/web/buttons'
import { ThreeDotsIcon, TrashCanIcon } from '@baseapp-frontend/design-system/components/web/icons'
import { Popover } from '@baseapp-frontend/design-system/components/web/popovers'

import { MenuItem, MenuList, Typography } from '@mui/material'

import { ActionOverlayTooltipContainer } from '../styled'
import { ThreeDotsMenuHoverOverlayProps } from './types'

const ThreeDotsMenuHoverOverlay: FC<ThreeDotsMenuHoverOverlayProps> = ({
  offsetRight,
  offsetTop,
  showDeleteButton,
  isDeletingItem,
  disableDeleteButton,
  handleDeleteDialogOpen,
  actions = [],
  handleClosePopover,
  popover,
}) => (
  <ActionOverlayTooltipContainer
    offsetRight={offsetRight}
    offsetTop={offsetTop}
    aria-label="actions overlay"
    sx={{
      position: 'unset',
      marginX: '4px',
      borderRadius: '500px',
      alignSelf: 'baseline',
    }}
  >
    <IconButton onClick={popover.onOpen} aria-label="Show menu options">
      <ThreeDotsIcon sx={{ fontSize: '18px' }} />
    </IconButton>
    <Popover open={popover.open} onClose={handleClosePopover}>
      <MenuList>
        {actions?.map(({ label, icon, onClick, disabled, hasPermission }) => {
          if (!hasPermission) return null

          return (
            <MenuItem
              key={label}
              onClick={() => {
                onClick?.()
                handleClosePopover()
              }}
              disabled={disabled}
            >
              {icon}
              <Typography variant="body2" color="text.primary">
                {label}
              </Typography>
            </MenuItem>
          )
        })}
        {showDeleteButton && (
          <MenuItem
            onClick={handleDeleteDialogOpen}
            disabled={isDeletingItem || disableDeleteButton}
            color="disabled"
          >
            <TrashCanIcon sx={{ color: disableDeleteButton ? 'text.disabled' : 'error.main' }} />
            <Typography
              variant="body2"
              color={disableDeleteButton ? 'text.disabled' : 'error.main'}
            >
              Delete
            </Typography>
          </MenuItem>
        )}
      </MenuList>
    </Popover>
  </ActionOverlayTooltipContainer>
)

export default ThreeDotsMenuHoverOverlay
