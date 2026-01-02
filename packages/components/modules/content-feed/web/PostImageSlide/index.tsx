'use client'

import { FC } from 'react'

import { useFragment } from 'react-relay'

import { ContentPostImageFragment } from '../../common/graphql/fragments/ContentPostImage'
import { ImageSlide } from './styled'
import { PostImageSlideProps } from './types'

const PostImageSlide: FC<PostImageSlideProps> = ({ imagesRef }) => {
  const target = useFragment(ContentPostImageFragment, imagesRef)

  if (!target?.image) return null

  return <ImageSlide draggable={false} src={target.image} alt="Post Image" />
}

export default PostImageSlide
