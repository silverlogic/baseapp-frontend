'use client'

import { FC, useCallback } from 'react'

import { Button, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

import { HeaderContainer, RootContainer } from './styled'
import { ContentFeedProps } from './types'

const ContentFeed: FC<ContentFeedProps> = () => {
  const router = useRouter()

  const onNewPost = useCallback(() => {
    router.push('/posts/new')
  }, [router])

  return (
    <RootContainer>
      <HeaderContainer>
        <Typography component="h4" variant="h4">
          Content Feed
        </Typography>
        <Button
          variant="outlined"
          color="inherit"
          onClick={onNewPost}
          disableRipple
          sx={{ maxWidth: 'fit-content' }}
        >
          New Post
        </Button>
      </HeaderContainer>
    </RootContainer>
  )
}

export default ContentFeed
