'use client'

import { ReplyIcon, SharePostIcon } from '@baseapp-frontend/design-system/components/web/icons'

import { Circle as CircleIcon } from '@mui/icons-material'
import { IconButton, Stack, Typography } from '@mui/material'
import { DateTime } from 'luxon'

import { ContentPost_post$data } from '../../../../__generated__/ContentPost_post.graphql'
import PostReactionButton from '../PostReactionButton'

const PostFooter = ({ post }: { post: ContentPost_post$data }) => {
  const created = DateTime.fromISO(post.created)
  return (
    <Stack p={1.5} gap={1.5} direction="row" justifyContent="space-between">
      <Stack direction="row" gap={1.5}>
        <PostReactionButton target={post} />
        <IconButton aria-label="Reply" disableRipple sx={{ p: 0 }}>
          <ReplyIcon />
        </IconButton>
        <IconButton aria-label="Share" disableRipple sx={{ p: 0 }}>
          <SharePostIcon />
        </IconButton>
      </Stack>
      <Typography variant="caption">
        {created.toFormat('hh:mm a')} <CircleIcon color="disabled" sx={{ fontSize: 4 }} />{' '}
        {created.toFormat('DDD')}
      </Typography>
    </Stack>
  )
}

export default PostFooter
