'use client'

import { FC } from 'react'

import { ReplyIcon, SharePostIcon } from '@baseapp-frontend/design-system/components/web/icons'

import { Circle as CircleIcon } from '@mui/icons-material'
import { IconButton, Stack, Typography } from '@mui/material'
import { format, parseISO } from 'date-fns'

import PostReactionButton from '../PostReactionButton'
import { PostFooterProps } from './types'

const PostFooter: FC<PostFooterProps> = ({ post }) => {
  const created = parseISO(post.created)
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
        {format(created, 'hh:mm a')} <CircleIcon color="disabled" sx={{ fontSize: 4 }} />{' '}
        {format(created, 'DDD')}
      </Typography>
    </Stack>
  )
}

export default PostFooter
