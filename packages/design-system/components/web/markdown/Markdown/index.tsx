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
  className,
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
    // `className` is applied here, not spread onto ReactMarkdown below — react-markdown
    // doesn't document a className prop, so a styled(Markdown) wrapper's generated class
    // must land on a node this component controls directly, not on react-markdown's
    // internal output (whose shape varies across versions).
    <StyledMarkdown className={className} variant={variant} sx={sx}>
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
