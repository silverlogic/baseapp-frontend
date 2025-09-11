import { FC } from 'react'

import { useMediaQuery } from '@mui/material'

import { useProductGalleryStore } from '../../store'
import { ImageCarouselProps } from '../../types'
import { CarouselContainer, ImageContainer } from './styled'

const ImageCarousel: FC<ImageCarouselProps> = ({ product }) => {
  const { setSelectedProduct } = useProductGalleryStore()
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'))
  // TODO: enable carousel controls later when we decide how we want to handle uploading multiple images

  // const [activeIndex, setActiveIndex] = useState<number>(0)
  // const handlePrev = (): void => {
  //   setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  // }

  // const handleNext = (): void => {
  //   setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  // }

  return (
    <CarouselContainer isMobile={isMobile}>
      <ImageContainer src={product?.images[0]} onClick={() => setSelectedProduct(product)} />
      {/* TODO: enable carousel controls later when we decide how we want to handle uploading multiple images */}
      {/* <OverlayContainer>
        <StyledIconButton onClick={handlePrev}>
          <ChevronIcon position="left" color="action" />
        </StyledIconButton>
        <StyledIconButton onClick={handleNext}>
          <ChevronIcon position="right" color="action" />
        </StyledIconButton>
      </OverlayContainer>
      <IndicatorContainer>
        {images.map((_, index) => (
          <Indicator key={index} active={index === activeIndex} />
        ))}
      </IndicatorContainer> */}
    </CarouselContainer>
  )
}

export default ImageCarousel
