'use client'

import { FC, useMemo } from 'react'

import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

import { StyledMarkdown } from './styled'
import { MarkdownProps } from './types'
import { allowMentionUrls, createDefaultComponents } from './utils'

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
        urlTransform={allowMentionUrls}
        components={{ ...defaultComponents, ...componentOverrides }}
        {...rest}
      >
        {children as string}
      </ReactMarkdown>
    </StyledMarkdown>
  )
}

export default Markdown
