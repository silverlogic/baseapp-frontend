'use client'

import { FC, SyntheticEvent, useEffect, useRef } from 'react'

import { useNotification } from '@baseapp-frontend/utils'

import { Alert, Snackbar, useTheme } from '@mui/material'

import ProgressAnimation from './ProgressBar'
import { HIDE_DURATION, OUTLINED_ALERT_ICONS } from './constants'
import { SnackbarContentContainer } from './styled'
import { SnackbarProviderProps } from './types'

const SnackbarProvider: FC<SnackbarProviderProps> = ({ children, ...props }) => {
  const { closeToast, open, shouldShowProgress, message, type } = useNotification()
  const timeoutID = useRef<NodeJS.Timeout | null>(null)
  const theme = useTheme()

  const handleClose = (_event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    closeToast()
    if (timeoutID.current) clearTimeout(timeoutID.current)
  }

  useEffect(() => {
    // MUI has no option to just ignore user interactions with a snackbar.
    // It always pauses its timer and restarts it at a (customizable fixed) value.
    // Therefore, if we show a 'progress bar', we explicitly set the timeout for closing the snackbar ourselves.
    if (shouldShowProgress && open && !timeoutID.current) {
      timeoutID.current = setTimeout(() => {
        timeoutID.current = null
        handleClose()
      }, HIDE_DURATION)
    }
    return () => {
      if (timeoutID.current) {
        clearTimeout(timeoutID.current)
        timeoutID.current = null
      }
    }
  }, [open, shouldShowProgress])

  if (!shouldShowProgress) {
    return (
      <>
        {children}
        <Snackbar
          key={message}
          onClose={handleClose}
          open={open}
          autoHideDuration={HIDE_DURATION}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          resumeHideDuration={HIDE_DURATION}
          {...props}
        >
          <Alert onClose={handleClose} severity={type} variant="filled" sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      </>
    )
  }

  return (
    <>
      {children}
      <Snackbar
        key={message}
        onClose={handleClose}
        open={open}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        sx={{ width: 'calc(100% - 16px)' }}
        {...props}
      >
        <SnackbarContentContainer>
          <Alert
            onClose={handleClose}
            severity={type}
            variant="standard"
            sx={{
              width: '100%',
              border: 'none',
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
            }}
            iconMapping={OUTLINED_ALERT_ICONS}
            slotProps={{ closeIcon: { sx: { color: theme.palette.action.active } } }}
          >
            {message}
          </Alert>
          <ProgressAnimation severity={type} animationTime={HIDE_DURATION} />
        </SnackbarContentContainer>
      </Snackbar>
    </>
  )
}

export default SnackbarProvider
