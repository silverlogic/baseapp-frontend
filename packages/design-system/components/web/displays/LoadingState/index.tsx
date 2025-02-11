'use client'

import { FC } from 'react'

import { Box, CircularProgress } from '@mui/material'

import { LoadingStateProps } from './types'

const LoadingState: FC<LoadingStateProps> = ({ CircularProgressProps, ...props }) => (
  <Box
    width="100%"
    height="100%"
    display="flex"
    alignItems="center"
    justifyContent="center"
    {...props}
  >
    <CircularProgress {...CircularProgressProps} />
  </Box>
)

export default LoadingState
