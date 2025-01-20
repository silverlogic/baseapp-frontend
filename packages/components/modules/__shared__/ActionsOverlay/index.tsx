import { forwardRef, useState } from 'react'

import {
  ConfirmDialog,
  SwipeableDrawer as DefaultSwipeableDrawer,
  IconButton,
  TrashCanIcon,
  usePopover,
} from '@baseapp-frontend/design-system'

import { LoadingButton } from '@mui/lab'
import { Box, Divider, Typography } from '@mui/material'
import { LongPressCallbackReason, useLongPress } from 'use-long-press'

import DefaultHoverOverlay from './DefaultHoverOverlay'
import ThreeDotsMenuHoverOverlay from './ThreeDotsMenuHoverOverlay'
import { HOVER_OVERLAY_MODES } from './constants'
import { IconButtonContentContainer } from './styled'
import { ActionOverlayProps, LongPressHandler } from './types'

const ActionsOverlay = forwardRef<HTMLDivElement, ActionOverlayProps>(
  (
    {
      actions = [],
      children,
      title = 'Item',
      enableDelete = false,
      isDeletingItem = false,
      handleDeleteItem = () => {},
      offsetTop = 0,
      offsetRight = 0,
      ContainerProps = {},
      SwipeableDrawerProps = {},
      SwipeableDrawer = DefaultSwipeableDrawer,
      hoverOverlayMode = HOVER_OVERLAY_MODES.DEFAULT,
    },
    ref,
  ) => {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [isHoveringItem, setIsHoveringItem] = useState(false)
    const [longPressHandler, setLongPressHandler] = useState<LongPressHandler>({
      isLongPressingItem: false,
      shouldOpenItemOptions: false,
    })

    const popover = usePopover()

    const handleClosePopover = () => {
      setIsHoveringItem(false)
      popover.onClose()
    }

    const longPressHandlers = useLongPress<HTMLDivElement>(
      (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
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

    const handleDeleteDialogClose = () => {
      setIsDeleteDialogOpen(false)
      setIsHoveringItem(false)
      popover.onClose()
    }

    const deviceHasHover =
      typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches

    const onDeleteItemClick = () => {
      setIsDeleteDialogOpen(false)
      handleDeleteItem?.()
      handleLongPressItemOptionsClose()
      setIsHoveringItem(false)
      popover.onClose()
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
        onClose={handleDeleteDialogClose}
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
          <SwipeableDrawer
            open={longPressHandler.shouldOpenItemOptions && longPressHandler.isLongPressingItem}
            onClose={handleDrawerClose}
            aria-label="actions overlay"
            {...SwipeableDrawerProps}
          >
            <Box display="grid" gridTemplateColumns="1fr" justifySelf="start" gap={1}>
              {actions?.map(({ label, icon, onClick, disabled, hasPermission, closeOnClick }) => {
                if (!hasPermission) return null

                const handleClick = () => {
                  onClick?.()
                  if (closeOnClick) {
                    handleLongPressItemOptionsClose()
                  }
                }

                return (
                  <IconButton
                    key={label}
                    onClick={handleClick}
                    disabled={disabled}
                    sx={{ width: 'fit-content' }}
                    aria-label={label}
                  >
                    <IconButtonContentContainer>
                      <Box display="grid" justifySelf="center" height="min-content">
                        {icon}
                      </Box>
                      <Typography variant="body2" color="text.primary">
                        {label}
                      </Typography>
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
                    aria-label="delete item"
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
            </Box>
          </SwipeableDrawer>
        )
      }

      if (deviceHasHover && isHoveringItem) {
        if (hoverOverlayMode === HOVER_OVERLAY_MODES.DEFAULT) {
          return (
            <DefaultHoverOverlay
              {...{
                offsetRight,
                offsetTop,
                enableDelete,
                isDeletingItem,
                handleDeleteDialogOpen,
                actions,
                handleLongPressItemOptionsClose,
              }}
            />
          )
        }

        if (hoverOverlayMode === HOVER_OVERLAY_MODES.THREE_DOTS_MENU) {
          return (
            <ThreeDotsMenuHoverOverlay
              {...{
                offsetRight,
                offsetTop,
                enableDelete,
                isDeletingItem,
                handleDeleteDialogOpen,
                actions,
                handleClosePopover,
                popover,
              }}
            />
          )
        }
      }
      return <div />
    }

    return (
      <Box
        ref={ref}
        onMouseEnter={() => setIsHoveringItem(true)}
        onMouseLeave={handleClosePopover}
        position="relative"
        {...longPressHandlers()}
        {...(hoverOverlayMode === HOVER_OVERLAY_MODES.THREE_DOTS_MENU && {
          sx: {
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
          },
        })}
        {...ContainerProps}
      >
        {renderDeleteDialog()}
        {renderActionsOverlay()}
        {children}
      </Box>
    )
  },
)

export default ActionsOverlay
