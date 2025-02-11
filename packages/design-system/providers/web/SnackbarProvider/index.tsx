'use client'

import { FC, SyntheticEvent, useRef } from 'react'

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

  if (!timeoutID.current && open) {
    timeoutID.current = setTimeout(() => {
      timeoutID.current = null
      handleClose()
    }, HIDE_DURATION) // MUI would resume with different remaining time after user interaction
    // so we explicitly set this timeout ourselves to make sure that the progress bar is right
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
