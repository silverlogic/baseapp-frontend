import { Box, Button, styled } from '@mui/material'

export const ContentFeedImageContainer = styled(Box)(({ theme }) => ({
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

export const MiniatureFileWrapper = styled(Box)(({ theme }) => ({
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
}))

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
