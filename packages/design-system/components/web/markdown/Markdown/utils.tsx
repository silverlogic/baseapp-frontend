import type { ComponentProps } from 'react'

import type { LinkProps } from '@mui/material/Link'
import { defaultUrlTransform } from 'react-markdown'

import { LazyLoadImage } from '../../images'
import DefaultLink from './DefaultLink'
import MentionChip from './MentionChip'
import { MENTION_HREF_PREFIX } from './constants'

/**
 * react-markdown's default sanitizer drops any URL whose scheme isn't in
 * (https?|ircs?|mailto|xmpp), so `mention://` would be silently rewritten to
 * an empty string before reaching the `a` override. Allow the mention scheme
 * through; defer everything else to the default safe transform.
 */
export const allowMentionUrls = (url: string) =>
  url.startsWith(MENTION_HREF_PREFIX) ? url : defaultUrlTransform(url)

/**
 * react-markdown v9 passes a `node` prop with the mdast node — strip it so it
 * doesn't leak to the rendered DOM as `node="[object Object]"`.
 */
export const createDefaultComponents = (linkProps?: Partial<LinkProps>) => ({
  a: ({ node: _node, ...props }: ComponentProps<'a'> & { node?: unknown }) => {
    if (props.href?.startsWith(MENTION_HREF_PREFIX)) {
      return <MentionChip urlPath={props.title}>{props.children}</MentionChip>
    }
    return <DefaultLink {...props} extraLinkProps={linkProps} />
  },
  img: ({ node: _node, ...props }: ComponentProps<'img'> & { node?: unknown }) => (
    <LazyLoadImage alt={props.alt} src={props.src as string | undefined} />
  ),
})
