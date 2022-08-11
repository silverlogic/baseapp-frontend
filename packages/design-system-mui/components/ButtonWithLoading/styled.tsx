import { styled } from '@mui/material/styles'
import { CircularProgress as MuiCircularProgress, CircularProgressProps } from '@mui/material'
import { FC } from 'react'

export const CircularProgress = styled(MuiCircularProgress)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  marginTop: '-10px',
  marginLeft: '-10px',
})) as unknown as FC<CircularProgressProps>
