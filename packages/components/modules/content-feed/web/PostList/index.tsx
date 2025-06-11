'use client'

import React, { FC } from 'react'

import { LoadingState } from '@baseapp-frontend/design-system/components/web/displays'

import { Box } from '@mui/material'
import { Components, Virtuoso } from 'react-virtuoso'

import { useContentPosts } from '../../common'
import { ContentFeedProps, ContentPostEdges } from '../ContentFeed/types'
import PostItem from '../PostItem'
import { PostsListContainer } from './styled'

const Scroller: Components['List'] = React.forwardRef(({ style, children }, ref) => (
  <PostsListContainer style={style} ref={ref}>
    {children}
  </PostsListContainer>
))

const PostList: FC<ContentFeedProps> = ({ preloadedQuery }) => {
  const {
    data: { contentPosts },
    loadNext,
    isLoadingNext,
    hasNext,
  } = useContentPosts(preloadedQuery)

  const renderPostItem = (post: ContentPostEdges[number]) => {
    if (!post?.node) return null
    return <PostItem postRef={post.node} />
  }

  const renderLoadingState = () => {
    if (!isLoadingNext) return <Box sx={{ paddingTop: 3 }} />

    return (
      <LoadingState
        sx={{ paddingTop: 3, paddingBottom: 1 }}
        CircularProgressProps={{ size: 15 }}
        aria-label="loading more posts"
      />
    )
  }

  const renderHeader = () => {
    if (contentPosts?.edges?.length === 0) return null

    return <div className="h-2" />
  }

  return (
    <Virtuoso
      useWindowScroll
      data={contentPosts?.edges}
      overscan={2000}
      itemContent={(_index, post) => renderPostItem(post)}
      components={{
        Header: renderHeader,
        Footer: renderLoadingState,
        List: Scroller,
      }}
      endReached={() => {
        if (hasNext) {
          loadNext(5)
        }
      }}
    />
  )
}

export default PostList
