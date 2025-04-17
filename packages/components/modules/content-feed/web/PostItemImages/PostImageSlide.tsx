'use client'

import { useFragment } from 'react-relay'

import { ContentPostImageFragment$key } from '../../../../__generated__/ContentPostImageFragment.graphql'
import { ContentPostImageFragment } from '../../common/graphql/fragments/ContentPostImage'
import { ImageSlide } from './styled'

const PostImageSlide = ({ imagesRef }: { imagesRef: ContentPostImageFragment$key }) => {
  const target = useFragment(ContentPostImageFragment, imagesRef)

  if (!target.image) return null

  return <ImageSlide draggable={false} src={target.image} />
}

export default PostImageSlide
