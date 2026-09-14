'use client'

import { FC } from 'react'

import { Markdown } from '@baseapp-frontend/design-system/components/web/markdown'

import { Stack } from '@mui/material'
import { useRefetchableFragment } from 'react-relay'

import { ContentPostRefetchQuery } from '../../../../__generated__/ContentPostRefetchQuery.graphql'
import { ContentPost_post$key } from '../../../../__generated__/ContentPost_post.graphql'
import { ContentPostFragmentQuery } from '../../common/graphql/fragments/ContentPost'
import PostFooter from '../PostFooter'
import PostHeader from '../PostHeader'
import PostItemImages from '../PostItemImages'
import { PostItemProps } from './types'

const PostItem: FC<PostItemProps> = ({ postRef }) => {
  const [post] = useRefetchableFragment<ContentPostRefetchQuery, ContentPost_post$key>(
    ContentPostFragmentQuery,
    postRef,
  )
  if (!post) return null

  return (
    <Stack>
      <PostHeader post={post} />
      <PostItemImages post={post} />
      <Stack px={1.5} gap={1}>
        <Markdown>{post.content}</Markdown>
      </Stack>
      <PostFooter post={post} />
    </Stack>
  )
}

export default PostItem
