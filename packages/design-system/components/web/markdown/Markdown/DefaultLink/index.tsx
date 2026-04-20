'use client'

import { FC } from 'react'

import MuiLink from '@mui/material/Link'
import NextLink from 'next/link'

import { DefaultLinkProps } from './types'

const DefaultLink: FC<DefaultLinkProps> = ({ href, children, extraLinkProps, ...rest }) => {
  const isExternal = href?.startsWith('http')

  if (isExternal) {
    return (
      <MuiLink href={href} target="_blank" rel="noopener noreferrer" {...extraLinkProps} {...rest}>
        {children}
      </MuiLink>
    )
  }

  return (
    <MuiLink component={NextLink} href={href ?? ''} {...extraLinkProps} {...rest}>
      {children}
    </MuiLink>
  )
}

export default DefaultLink
