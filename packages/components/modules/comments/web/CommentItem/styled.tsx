import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

import { CommentContainerWrapperProps } from './types'

export const CommentContainerWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'currentThreadDepth',
})<CommentContainerWrapperProps>(({ theme, currentThreadDepth }) => {
  const currentThreadDepthHigherThanOne = currentThreadDepth > 1
  const marginLeft = currentThreadDepthHigherThanOne ? 3 * (currentThreadDepth - 1) - 3 : 0

  return {
    borderLeft: currentThreadDepthHigherThanOne ? `1px solid ${theme.palette.divider}` : 'none',
    paddingLeft: currentThreadDepthHigherThanOne ? theme.spacing(3) : 0,
    marginLeft: theme.spacing(marginLeft),
    paddingTop: theme.spacing(1),
  }
})

export const ContentContainer = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(1.5),
}))

export const TitleContainer = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
  justifyContent: 'flex-start',
})

export const NameRow = styled('div')(({ theme }) => ({
  alignItems: 'center',
  display: 'grid',
  gap: theme.spacing(1),
  gridTemplateColumns: 'repeat(2, max-content)',
}))

export const FooterRow = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
})

export const ActionsRow = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(2),
  gridTemplateColumns: 'repeat(2, max-content)',
}))

export const CommentContainer = styled(Box)(({ theme }) => ({
  alignItems: 'self-start',
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.spacing(1),
  display: 'grid',
  gap: theme.spacing(1.5),
  gridTemplateColumns: 'min-content 1fr',
  minWidth: 334,
  padding: theme.spacing(1, 1.5),
  position: 'relative',
  width: '100%',
  '&:hover, &:focus-within': {
    backgroundColor: theme.palette.action.hover,
    transition: 'background-color 0.25s ease',
  },
}))
