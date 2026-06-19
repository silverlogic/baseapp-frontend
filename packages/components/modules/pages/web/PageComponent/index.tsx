import React from 'react'

import { Comments } from '@baseapp-frontend/components/comments/web'
import { PageComponentFragment } from '@baseapp-frontend/components/pages/common'
import { Markdown } from '@baseapp-frontend/design-system/components/web/markdown'

import { Box, Container, Link, Typography } from '@mui/material'
import 'highlight.js/styles/base16/tomorrow-night.css'
import { useFragment } from 'react-relay'
import rehypeHighlight from 'rehype-highlight'

import { PageComponentProps } from './types'

export const PageComponent = ({ page: pageRef }: PageComponentProps) => {
  const page = useFragment(PageComponentFragment, pageRef)

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" component="h1" sx={{ pb: 1.5, pt: 1.5 }}>
        {page.title}
      </Typography>

      {page.canChange || page.canDelete ? (
        <Box sx={{ pb: 1.5 }}>
          {page.canChange && (
            <Link
              href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/../admin/pages/page/${page.id}/change/`}
              target="_blank"
              rel="noopener"
            >
              Edit
            </Link>
          )}
          {page.canDelete && (
            <Link
              href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/../admin/pages/page/${page.id}/delete/`}
              sx={{ ml: 2 }}
              target="_blank"
              rel="noopener"
            >
              Delete
            </Link>
          )}
        </Box>
      ) : null}

      <Markdown rehypePlugins={[rehypeHighlight]}>{page.body}</Markdown>

      <Comments target={page} />
    </Container>
  )
}
