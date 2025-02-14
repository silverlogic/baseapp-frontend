'use client'

import { ComponentType } from 'react'

import { Box, BoxProps, styled } from '@mui/material'

export const StreamFieldWrapper: ComponentType<BoxProps> = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}))
