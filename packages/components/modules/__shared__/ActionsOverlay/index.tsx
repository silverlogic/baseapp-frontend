import { forwardRef, useState } from 'react'

import {
  ConfirmDialog,
  SwipeableDrawer as DefaultSwipeableDrawer,
  IconButton,
  TrashCanIcon,
} from '@baseapp-frontend/design-system'

import { LoadingButton } from '@mui/lab'
import { Box, BoxProps, Divider, Typography } from '@mui/material'
import { LongPressCallbackReason, useLongPress } from 'use-long-press'

import { ActionOverlayContainer, IconButtonContentContainer } from './styled'
import { ActionOverlayProps, LongPressHandler } from './types'

const ActionsOverlay = forwardRef<BoxProps, ActionOverlayProps>(
  (
    {
      ContainerProps = {},
      children,
      title,
      isDeletingItem,
      handleDeleteItem,
      enableDelete,
      actions: options,
      SwipeableDrawerProps,
      SwipeableDrawer = DefaultSwipeableDrawer,
      offsetRight = 0,
      offsetTop = 0,
    },
    ref,
  ) => {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [isHoveringItem, setIsHoveringItem] = useState(false)
    const [longPressHandler, setLongPressHandler] = useState<LongPressHandler>({
      isLongPressingItem: false,
      shouldOpenItemOptions: false,
    })

    const longPressHandlers = useLongPress<HTMLDivElement>(
      (e: any) => {
        e.stopPropagation()
        setLongPressHandler({ isLongPressingItem: true, shouldOpenItemOptions: true })
      },
      {
        onCancel: (e, { reason }) => {
          // This is a workaround to prevent the comment options's drawer from closing when the user clicks on the drawer's content.
          // Ideally, we would call setLongPressHandler({ isLongPressingComment: false }) on `onFinished` instead of `onCancel`.
          // But, on mobile google chrome devices, the long press click is being wrongly propagated to the backdrop and closing the comment options's drawer right after it opens.
          const className = (e?.target as HTMLElement)?.className || ''
          const classNameString = typeof className === 'string' ? className : ''
          const isClickOnBackdrop = classNameString.includes('MuiBackdrop')
          if (reason === LongPressCallbackReason.CancelledByRelease && isClickOnBackdrop) {
            setLongPressHandler((prevState) => ({ ...prevState, isLongPressingItem: false }))
          }
        },
        cancelOutsideElement: true,
        threshold: 400,
      },
    )
    const handleLongPressItemOptionsClose = () => {
      setLongPressHandler({ isLongPressingItem: false, shouldOpenItemOptions: false })
    }

    const handleDeleteDialogOpen = () => {
      setIsDeleteDialogOpen(true)
    }

    const deviceHasHover = window.matchMedia('(hover: hover)').matches

    const onDeleteItemClick = () => {
      setIsDeleteDialogOpen(false)
      handleDeleteItem?.()
    }

    const renderDeleteDialog = () => (
      <ConfirmDialog
        title={`Delete ${title}?`}
        content="Are you sure you want to delete? This action cannot be undone."
        action={
          <LoadingButton
            color="error"
            onClick={onDeleteItemClick}
            disabled={isDeletingItem}
            loading={isDeletingItem}
          >
            Delete
          </LoadingButton>
        }
        onClose={() => setIsDeleteDialogOpen(false)}
        open={isDeleteDialogOpen}
      />
    )

    const renderActionsOverlay = () => {
      if (!deviceHasHover) {
        const handleDrawerClose = () => {
          if (!longPressHandler.isLongPressingItem) {
            handleLongPressItemOptionsClose()
          }
        }

        return (
          <>
            {renderDeleteDialog()}
            <SwipeableDrawer
              open={longPressHandler.shouldOpenItemOptions && longPressHandler.isLongPressingItem}
              onClose={handleDrawerClose}
              aria-label="actions overlay"
              {...SwipeableDrawerProps}
            >
              <div className="grid grid-cols-[1fr] justify-start gap-2">
                {options?.map(({ label, icon, onClick, disabled, hasPermission }) => {
                  if (!hasPermission) return null

                  return (
                    <IconButton
                      key={label}
                      onClick={onClick}
                      disabled={disabled}
                      sx={{ width: 'fit-content' }}
                    >
                      <IconButtonContentContainer>
                        <Box display="grid" justifySelf="center" height="min-content">
                          {icon}
                        </Box>
                        <Typography variant="body2">{label}</Typography>
                      </IconButtonContentContainer>
                    </IconButton>
                  )
                })}
                {enableDelete && (
                  <>
                    <Divider />
                    <IconButton
                      onClick={handleDeleteDialogOpen}
                      disabled={isDeletingItem}
                      sx={{ width: 'fit-content' }}
                    >
                      <IconButtonContentContainer>
                        <Box display="grid" justifySelf="center" height="min-content">
                          <TrashCanIcon />
                        </Box>
                        <Typography variant="body2" color="error.main">
                          {`Delete ${title}`}
                        </Typography>
                      </IconButtonContentContainer>
                    </IconButton>
                  </>
                )}
              </div>
            </SwipeableDrawer>
          </>
        )
      }

      if (deviceHasHover && isHoveringItem) {
        return (
          <>
            {renderDeleteDialog()}
            <ActionOverlayContainer
              offsetRight={offsetRight}
              offsetTop={offsetTop}
              aria-label="actions overlay"
            >
              {enableDelete && (
                <IconButton
                  onClick={handleDeleteDialogOpen}
                  disabled={isDeletingItem}
                  aria-label="delete item"
                >
                  <TrashCanIcon />
                </IconButton>
              )}
              {options?.map(({ label, icon, onClick, disabled, hasPermission }) => {
                if (!hasPermission) return null

                return (
                  <IconButton key={label} onClick={onClick} disabled={disabled} aria-label={label}>
                    {icon}
                  </IconButton>
                )
              })}
            </ActionOverlayContainer>
          </>
        )
      }
      return renderDeleteDialog()
    }

    return (
      <Box
        ref={ref}
        onMouseEnter={() => setIsHoveringItem(true)}
        onMouseLeave={() => setIsHoveringItem(false)}
        {...longPressHandlers()}
        {...ContainerProps}
        sx={{ position: 'relative' }}
      >
        {renderActionsOverlay()}
        {children}
      </Box>
    )
  },
)

export default ActionsOverlay
