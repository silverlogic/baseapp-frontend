'use client'

import { Box, styled } from '@mui/material'

export const StreamFieldWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}))
