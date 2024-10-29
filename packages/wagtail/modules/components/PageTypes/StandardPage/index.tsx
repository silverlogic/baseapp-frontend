'use client'

import { FC } from 'react'

import { Box, Container, Typography } from '@mui/material'
import Image from 'next/image'

import { PageLayoutProvider } from '../../../providers/PageLayoutProvider'
import { useWagtailPagesContext } from '../../../providers/WagtailPagesProvider/context'
import { IPageType } from '../types'
import { ImageBox } from './styled'

const StandardPage: FC<IPageType> = ({ children }) => {
  const { currentPage } = useWagtailPagesContext()
  return (
    <PageLayoutProvider>
      <Container sx={{ mb: 4, gap: 3, display: 'flex', flexDirection: 'column' }}>
        {currentPage.featuredImage?.image?.imageSizes?.medium && (
          <ImageBox>
            <Image
              loader={({ src, width }) => `${src}?w=${width}`}
              src={currentPage.featuredImage.image.imageSizes.full.imageUrl}
              alt={currentPage.featuredImage.image.altText ?? ''}
              style={{ objectFit: 'cover' }}
              fill
            />
          </ImageBox>
        )}
        <Typography variant="h2" component="h1">
          {currentPage.title}
        </Typography>
        <Box display="flex" flexDirection="column" gap={4}>
          {children}
        </Box>
      </Container>
    </PageLayoutProvider>
  )
}

export default StandardPage
