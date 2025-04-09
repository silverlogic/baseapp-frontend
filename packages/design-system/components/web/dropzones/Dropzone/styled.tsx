import { ComponentType } from 'react'

import { CancelOutlined, PortraitOutlined } from '@mui/icons-material'
import { Box, BoxProps, Button } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'

import { DropzoneTextProps, InputContainerProps } from './types'

export const DropzoneContainer = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== 'isDragAccept' && prop !== 'isDragReject' && prop !== 'isFocused',
})(({ theme }) => ({
  display: 'flex',
  marginBottom: '16px',
  overflow: 'auto',
  paddingBottom: '6px',
  '::-webkit-scrollbar': {
    height: '6px',
  },
  '::-webkit-scrollbar-track': {
    boxShadow: `inset 0 0 1px ${theme.palette.grey[400]}`,
    borderRadius: '10px',
  },
  '::-webkit-scrollbar-thumb': {
    background: theme.palette.grey[400],
    borderRadius: '10px',
  },
  '::-webkit-scrollbar-thumb:hover': {
    background: theme.palette.grey[600],
  },
}))

export const AddFileButton = styled(Button)(({ theme }) => ({
  width: '72px',
  height: '72px',
  backgroundColor: theme.palette.grey[200],
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: theme.palette.grey[300],
  },
}))

export const AddFileWrapper = styled(Box)(({ theme }) => ({
  border: `2px dashed ${theme.palette.grey[200]}`,
  borderRadius: '12px',
  padding: '4px',
  display: 'inline-block',
  flexShrink: 0,
}))

export const FileWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isMini',
})<{ isMini: boolean }>(({ theme, isMini }) =>
  isMini
    ? {
        position: 'relative',
        flexShrink: 0,
        width: '80px',
        height: '80px',
        border: `2px solid ${theme.palette.grey[200]}`,
        borderRadius: '12px',
        padding: '4px',
        display: 'inline-block',
        '&:hover': {
          border: `2px solid black`,
        },
      }
    : {
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
)

export const RemoveFileButton = styled('button')(({ theme }) => ({
  position: 'absolute',
  top: '4px',
  right: '4px',
  width: '28px',
  height: '28px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '0 6px 0 6px',
  backgroundColor: theme.palette.grey[800],
  '&:hover': {
    backgroundColor: theme.palette.grey[800],
  },
}))

export const DropFilesContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  border: `1px dashed ${theme.palette.grey[400]}`,
  borderImageSlice: 1,
  width: '100%',
  height: '144px',
  borderRadius: '8px',
  marginBottom: '8px',
}))

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
