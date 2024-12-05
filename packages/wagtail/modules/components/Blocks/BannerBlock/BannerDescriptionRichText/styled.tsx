'use client'

import { Box, styled } from '@mui/material'

export const RichTextBlockWrapper = styled(Box)(({ theme }) => ({
  '& p': {
    ...theme.typography.body1,
    color: theme.palette.common.white,
  },
  '& li': {
    ...theme.typography.body1,
    color: theme.palette.common.white,
  },
  '& a': {
    ...theme.typography.subtitle2,
    color: theme.palette.common.white,
    textDecoration: 'underline',
    cursor: 'pointer',
    overflowWrap: 'anywhere',
  },
  '& hr': {
    borderColor: theme.palette.common.white,
  },
  '& ul': {
    listStyle: 'inside',
  },
}))
