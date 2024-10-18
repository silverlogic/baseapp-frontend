import { Typography } from '@mui/material'
import Image from 'next/image'

import BlockContainer from '../../BlockContainer'
import BannerDescriptionRichText from './BannerDescriptionRichText'
import { BannerContainer, ContentContainer, ImageContainer, TextContainer } from './styles'
import { IBannerBlockProps } from './types'

const BannerBlock = ({ value }: IBannerBlockProps) => (
  <BlockContainer>
    <BannerContainer imagePosition={value.imagePosition}>
      <ContentContainer>
        <TextContainer>
          <Typography component="h2" variant="h3" color="common.white">
            {value.title}
          </Typography>
          {value.description && <BannerDescriptionRichText value={value.description} />}
        </TextContainer>
      </ContentContainer>
      <ImageContainer>
        {value.featuredImage?.imageSizes?.medium && (
          <Image
            loader={({ src, width }) => `${src}?w=${width}`}
            src={value.featuredImage.imageSizes.medium.imageUrl}
            alt={value.featuredImage.altText ?? ''}
            style={{ objectFit: 'cover' }}
            fill
          />
        )}
      </ImageContainer>
    </BannerContainer>
  </BlockContainer>
)

export default BannerBlock
