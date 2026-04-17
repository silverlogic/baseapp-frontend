'use client'

import { ComponentProps, FC, useMemo } from 'react'

import type { LinkProps } from '@mui/material/Link'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

import { LazyLoadImage } from '../../images'
import DefaultLink from './DefaultLink'
import { StyledMarkdown } from './styled'
import { MarkdownProps } from './types'

const createDefaultComponents = (linkProps?: Partial<LinkProps>) => ({
  a: (props: ComponentProps<'a'>) => <DefaultLink {...props} extraLinkProps={linkProps} />,
  img: (props: ComponentProps<'img'>) => (
    <LazyLoadImage alt={props.alt} src={props.src as string | undefined} />
  ),
})

const Markdown: FC<MarkdownProps> = ({
  children,
  sx,
  variant = 'body2',
  LinkComponentProps,
  components: componentOverrides,
  remarkPlugins,
  rehypePlugins,
  ...rest
}) => {
  const defaultComponents = useMemo(
    () => createDefaultComponents(LinkComponentProps),
    [LinkComponentProps],
  )

  if (!children) return null

  return (
    <StyledMarkdown variant={variant} sx={sx}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, ...(remarkPlugins ?? [])]}
        rehypePlugins={[rehypeRaw, ...(rehypePlugins ?? [])]}
        components={{ ...defaultComponents, ...componentOverrides }}
        {...rest}
      >
        {children as string}
      </ReactMarkdown>
    </StyledMarkdown>
  )
}

export default Markdown
