'use client'

import { FC, SyntheticEvent } from 'react'

import { useNotification } from '@baseapp-frontend/utils'

import { Alert, Snackbar } from '@mui/material'

import { SnackbarProviderProps } from './types'

const SnackbarProvider: FC<SnackbarProviderProps> = ({ children, ...props }) => {
  const { closeToast, open, message, type } = useNotification()

  const handleClose = (_event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    closeToast()
  }

  return (
    <>
      {children}
      <Snackbar
        key={message}
        onClose={handleClose}
        open={open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        resumeHideDuration={3000}
        {...props}
      >
        <Alert onClose={handleClose} severity={type} variant="filled" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default SnackbarProvider
