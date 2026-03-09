'use client'

import { FC } from 'react'

import { Alert, Box, Button, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

const PermissionDenied: FC = () => {
  const router = useRouter()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
        px: 3,
      }}
    >
      <Alert severity="error" sx={{ mb: 3, maxWidth: 600 }}>
        <Typography variant="h6" gutterBottom>
          Permission Required
        </Typography>
        <Typography variant="body2">
          You don&apos;t have permission to access this page. Please contact an administrator if you
          believe this is an error.
        </Typography>
      </Alert>
      <Button variant="contained" onClick={() => router.back()}>
        Go Back
      </Button>
    </Box>
  )
}

export default PermissionDenied
