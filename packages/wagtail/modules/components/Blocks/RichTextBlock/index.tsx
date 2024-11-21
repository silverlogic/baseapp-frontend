'client side'

import { RichTextBlockWrapper } from './styled'
import { RichTextBlockProps } from './types'

const RichTextBlock = ({ value, WrapperProps }: RichTextBlockProps) => (
  <RichTextBlockWrapper
    {...WrapperProps}
    // eslint-disable-nex-line react/no-danger
    dangerouslySetInnerHTML={{ __html: value }}
  />
)

export default RichTextBlock
