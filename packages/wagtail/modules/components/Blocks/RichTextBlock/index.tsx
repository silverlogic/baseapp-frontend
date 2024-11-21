'use client'

import { RichTextBlockWrapper } from './styled'
import { RichTextBlockProps } from './types'

const RichTextBlock = ({ value, WrapperProps }: RichTextBlockProps) => (
  <RichTextBlockWrapper
    {...WrapperProps}
    // TODO (Tech Debt): Sanitize the HTML content with, for example, DOMPurify.
    // eslint-disable-nex-line react/no-danger
    dangerouslySetInnerHTML={{ __html: value }}
  />
)

export default RichTextBlock
