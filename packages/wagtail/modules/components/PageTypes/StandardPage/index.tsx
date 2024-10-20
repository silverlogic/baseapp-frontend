'use client'

import { FC } from 'react'

import { Box, Container, Typography } from '@mui/material'

import { PageLayoutProvider } from '../../../providers/PageLayoutProvider'
import { useWagtailPagesContext } from '../../../providers/WagtailPagesProvider/context'
import { IPageType } from '../types'

const StandardPage: FC<IPageType> = ({ children }) => {
  const { currentPage } = useWagtailPagesContext()
  return (
    <PageLayoutProvider>
      <Container>
        <Typography variant="h2" component="h1">
          {currentPage.title}
        </Typography>
        <Box display="flex" flexDirection="column" gap={4} my={4}>
          {children}
        </Box>
      </Container>
    </PageLayoutProvider>
  )
}

export default StandardPage
