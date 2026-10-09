'use client'

import { FC } from 'react'

import { Box, Typography } from '@mui/material'
import Image from 'next/image'

import { PageLayoutProvider } from '../../../providers/PageLayoutProvider'
import { useWagtailPagesContext } from '../../../providers/WagtailPagesProvider/context'
import { PageType } from '../types'
import { ImageBox, PageContainer } from './styled'

const StandardPage: FC<PageType> = ({ children }) => {
  const { currentPage } = useWagtailPagesContext()
  return (
    <PageLayoutProvider>
      <PageContainer>
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
      </PageContainer>
    </PageLayoutProvider>
  )
}

export default StandardPage
