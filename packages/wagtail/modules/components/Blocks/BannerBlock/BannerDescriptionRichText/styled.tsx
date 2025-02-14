'use client'

import { ComponentType } from 'react'

import { Box, BoxProps, styled } from '@mui/material'

export const RichTextBlockWrapper: ComponentType<BoxProps> = styled(Box)(({ theme }) => ({
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
