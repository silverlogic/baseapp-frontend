import { FC } from 'react'

import { useProductGalleryStore } from '../store'
import { DrawerCarouselContainer, DrawerImageContainer } from './styled'

const DrawerCarousel: FC = () => {
  const { selectedProduct } = useProductGalleryStore()
  const images = selectedProduct?.images || []

  // TODO: enable carousel controls later when we decide how we want to handle uploading multiple images

  //   const handlePrev = (): void => {
  //     setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  //   }

  //   const handleNext = (): void => {
  //     setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  //   }

  return (
    <DrawerCarouselContainer>
      <DrawerImageContainer src={images[0]} />
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
    </DrawerCarouselContainer>
  )
}

export default DrawerCarousel
