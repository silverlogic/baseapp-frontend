'use client'

import { FC, MouseEvent } from 'react'

import { PillIcon } from '@baseapp-frontend/design-system/components/web/icons'

import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Circle as CircleIcon,
} from '@mui/icons-material'
import { Fab, IconButton } from '@mui/material'
import RMCarousel, { ArrowProps, DotProps } from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import PostImageSlide from '../PostImageSlide'
import { ImageCarouselContainer } from './styled'
import { PostItemImagesProps } from './types'

// @ts-ignore
const Carousel = RMCarousel.default ? RMCarousel.default : RMCarousel

const CustomDot: FC<DotProps> = ({ onClick, active }) => (
  <IconButton
    sx={{ p: 0.5 }}
    onClick={(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      onClick?.()
      e.preventDefault()
    }}
  >
    {active ? (
      <PillIcon sx={{ color: '#fff' }} />
    ) : (
      <CircleIcon sx={{ color: '#fff', fontSize: 8, opacity: active ? 1 : 0.5 }} />
    )}
  </IconButton>
)

const CustomArrow: FC<ArrowProps & { orientation: 'left' | 'right' }> = ({
  onClick,
  orientation,
}) => (
  <Fab
    onClick={onClick}
    sx={{
      position: 'absolute',
      left: orientation === 'left' ? 0 : undefined,
      right: orientation === 'right' ? 0 : undefined,
      opacity: 0.72,
      m: 1,
    }}
    color="default"
    variant="soft"
    size="small"
  >
    {orientation === 'left' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
  </Fab>
)

const PostItemImages: FC<PostItemImagesProps> = ({ post }) => {
  if (!post?.images?.edges?.length) return null

  const images = post?.images?.edges.filter((img) => !!img?.node) || []

  return (
    <Carousel
      ssr
      additionalTransfrom={0}
      arrows={images.length > 1}
      className=""
      containerClass="content-feed-swiper"
      customLeftArrow={<CustomArrow orientation="left" />}
      customRightArrow={<CustomArrow orientation="right" />}
      customDot={<CustomDot />}
      dotListClass="content-feed-swiper-custom-dot"
      draggable={images.length > 1}
      focusOnSelect={false}
      itemClass="content-feed-swiper-item"
      keyBoardControl
      minimumTouchDrag={80}
      renderArrowsWhenDisabled={false}
      infinite
      renderDotsOutside={false}
      responsive={{
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1,
          partialVisibilityGutter: 0,
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0,
          },
          items: 1,
          partialVisibilityGutter: 0,
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464,
          },
          items: 1,
          partialVisibilityGutter: 0,
        },
      }}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      showDots={post.images.edges.length > 1}
      sliderClass=""
      slidesToSlide={1}
      swipeable={post.images.edges.length > 1}
    >
      {images.map(
        (image) =>
          image?.node && (
            <ImageCarouselContainer key={image.node.id}>
              <PostImageSlide imagesRef={image.node} />
            </ImageCarouselContainer>
          ),
      )}
    </Carousel>
  )
}

export default PostItemImages
