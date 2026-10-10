'use client'

import { FC } from 'react'

import { useIntl } from 'react-intl'
import { useFragment } from 'react-relay'

import { ContentPostImageFragment } from '../../common/graphql/fragments/ContentPostImage'
import { ImageSlide } from './styled'
import { PostImageSlideProps } from './types'

const PostImageSlide: FC<PostImageSlideProps> = ({ imagesRef }) => {
  const intl = useIntl()
  const target = useFragment(ContentPostImageFragment, imagesRef)

  if (!target?.image) return null

  return (
    <ImageSlide
      draggable={false}
      src={target.image ?? undefined}
      alt={intl.formatMessage({
        id: 'contentFeed.postImageSlide.alt',
        defaultMessage: 'Post Image',
      })}
    />
  )
}

export default PostImageSlide
