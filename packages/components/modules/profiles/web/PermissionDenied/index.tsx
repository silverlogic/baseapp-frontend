'use client'

import { FC } from 'react'

import { Alert, Button, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

import { Container } from './styled'

const PermissionDenied: FC = () => {
  const router = useRouter()

  return (
    <Container>
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
    </Container>
  )
}

export default PermissionDenied
