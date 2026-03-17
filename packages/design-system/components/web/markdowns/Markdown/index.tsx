import { Divider } from '@mui/material'
import Link from '@mui/material/Link'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
// markdown plugins
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

import { LazyLoadImage } from '../../images'
import './highlight'
import StyledMarkdown from './styled'
import { MarkdownProps } from './types'

const components = {
  img: ({ ...props }) => <LazyLoadImage alt={props.alt} ratio="16/9" {...props} />,
  a: ({ ...props }) => {
    const isHttp = props.href.startsWith('http')

    if (!isHttp && props.target) {
      // eslint-disable-next-line no-param-reassign
      delete props.target
    }

    return isHttp ? (
      <Link target="_blank" rel="noopener" {...props} />
    ) : (
      <Link href={props.href} {...props}>
        {props.children}
      </Link>
    )
  },
  hr: ({ ...props }) => <Divider {...props} />,
}

export default function Markdown({ sx, ...other }: MarkdownProps) {
  return (
    <StyledMarkdown sx={sx}>
      <ReactMarkdown
        rehypePlugins={[
          rehypeRaw,
          rehypeHighlight,
          [remarkGfm, { singleTilde: false, allowDangerousHtml: true }],
        ]}
        components={components}
        {...other}
      />
    </StyledMarkdown>
  )
}
