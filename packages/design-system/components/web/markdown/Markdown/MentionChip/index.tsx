'use client'

import type { FC } from 'react'

import { removeLeadingSlash } from '@baseapp-frontend/utils'

import NextLink from 'next/link'

import { StyledMentionLink } from './styled'
import type { MentionChipProps } from './types'

const MentionChip: FC<MentionChipProps> = ({ urlPath, children }) => {
  if (!urlPath) {
    return <span>{children}</span>
  }

  return (
    <StyledMentionLink
      component={NextLink}
      href={`/profile/${removeLeadingSlash(urlPath)}`}
      underline="hover"
    >
      {children}
    </StyledMentionLink>
  )
}

export default MentionChip
