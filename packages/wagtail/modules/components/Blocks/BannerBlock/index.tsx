'use client'

import { Typography } from '@mui/material'
import Image from 'next/image'
import { useFragment } from 'react-relay'

import { PageBannerBlockFields$key } from '../../../../__generated__/PageBannerBlockFields.graphql'
import { PageFragments } from '../../../graphql/queries/Page'
import BlockContainer from '../../BlockContainer'
import BannerDescriptionRichText from './BannerDescriptionRichText'
import { BannerContainer, ContentContainer, ImageContainer, TextContainer } from './styled'
import { BannerBlockProps } from './types'

const BannerBlock = (props: BannerBlockProps) => {
  const { imagePosition, title, description, featuredImage } =
    useFragment<PageBannerBlockFields$key>(PageFragments, props)
  return (
    <BlockContainer>
      <BannerContainer imagePosition={imagePosition}>
        <ContentContainer>
          <TextContainer>
            <Typography component="h2" variant="h3" color="common.white">
              {title}
            </Typography>
            {description && <BannerDescriptionRichText value={description} />}
          </TextContainer>
        </ContentContainer>
        <ImageContainer>
          {featuredImage?.url && (
            <Image
              loader={({ src, width }) => `${src}?w=${width}`}
              src={featuredImage.url}
              alt={featuredImage.altText ?? ''}
              style={{ objectFit: 'cover' }}
              fill
            />
          )}
        </ImageContainer>
      </BannerContainer>
    </BlockContainer>
  )
}

export default BannerBlock
