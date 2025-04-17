'use client'

import { MouseEvent, MouseEventHandler } from 'react'

import { PillIcon } from '@baseapp-frontend/design-system/components/web/icons'

import { ChevronLeft, ChevronRight, Circle } from '@mui/icons-material'
import { Fab, IconButton } from '@mui/material'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import { ContentPost_post$data } from '../../../../__generated__/ContentPost_post.graphql'
import PostImage from './PostImageSlide'
import { ImageCarouselContainer } from './styled'

const CustomDot = ({
  onClick,
  active,
}: {
  onClick?: MouseEventHandler<HTMLButtonElement>
  active?: boolean
}) => (
  <IconButton
    sx={{ p: 0.5 }}
    onClick={(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      onClick?.(e)
      e.preventDefault()
    }}
  >
    {active ? (
      <PillIcon sx={{ color: '#fff' }} />
    ) : (
      <Circle sx={{ color: '#fff', fontSize: 8, opacity: active ? 1 : 0.5 }} />
    )}
  </IconButton>
)

const CustomArrow = ({
  onClick,
  orientation,
}: {
  onClick?: MouseEventHandler<HTMLButtonElement>
  orientation: 'left' | 'right'
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
    {orientation === 'left' ? <ChevronLeft /> : <ChevronRight />}
  </Fab>
)

const PostItemImages = ({ post }: { post: ContentPost_post$data }) => {
  if (!post?.images?.edges?.length) return null

  const images = post.images?.edges.filter((img) => !!img?.node)

  return (
    <Carousel
      ssr
      additionalTransfrom={0}
      arrows={post.images.edges.length > 1}
      className=""
      containerClass="content-feed-swiper"
      customLeftArrow={<CustomArrow orientation="left" />}
      customRightArrow={<CustomArrow orientation="right" />}
      customDot={<CustomDot />}
      dotListClass="content-feed-swiper-custom-dot"
      draggable={post.images.edges.length > 1}
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
              <PostImage imagesRef={image.node} />
            </ImageCarouselContainer>
          ),
      )}
    </Carousel>
  )
}

export default PostItemImages
