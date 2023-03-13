import { FC } from 'react'

import { CircularProgressProps, CircularProgress as MuiCircularProgress } from '@mui/material'
import { styled } from '@mui/material/styles'

export const CircularProgress = styled(MuiCircularProgress)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  marginTop: '-10px',
  marginLeft: '-10px',
}) as unknown as FC<CircularProgressProps>
