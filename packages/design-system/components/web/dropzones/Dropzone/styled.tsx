import { ComponentType } from 'react'

import { CancelOutlined, PortraitOutlined } from '@mui/icons-material'
import { Box, BoxProps } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'

import { DropzoneTextProps, InputContainerProps } from './types'

const getColor = ({ theme, isDragAccept, isDragReject, isFocused }: InputContainerProps) => {
  if (isDragAccept) {
    return theme?.palette.success.main
  }
  if (isDragReject) {
    return theme?.palette.error.main
  }
  if (isFocused) {
    return theme?.palette.info.main
  }
  return theme?.palette.grey[300]
}

export const PortraitOutlinedIcon = styled(PortraitOutlined)(({ theme }) => ({
  color: theme.palette.grey[600],
})) as ComponentType

export const CancelIcon = styled(CancelOutlined)(({ theme }) => ({
  color: theme.palette.error.main,
})) as ComponentType

export const DropzoneText: ComponentType<DropzoneTextProps> = styled('span', {
  shouldForwardProp: (prop) => prop !== 'hasError',
})<DropzoneTextProps>(({ theme }) => ({
  color: theme.palette.primary.main,
  textAlign: 'center',
  width: '100%',
}))

export const InputContainer: ComponentType<InputContainerProps> = styled('div', {
  shouldForwardProp: (prop) =>
    prop !== 'isDragAccept' && prop !== 'isDragReject' && prop !== 'isFocused',
})<InputContainerProps>(({ theme, isDragAccept, isDragReject, isFocused }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 180,
  padding: 20,
  borderWidth: 1,
  borderRadius: 5,
  borderColor: getColor({ theme, isDragAccept, isDragReject, isFocused }),
  borderStyle: 'dashed',
  backgroundColor: alpha(theme.palette.primary.main, 0.08),
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  '&:hover': {
    cursor: 'pointer',
  },
}))

export const ButtonContainer: ComponentType<BoxProps> = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifySelf: 'center',
  width: 'fit-content',
  gap: theme.spacing(2),
}))
