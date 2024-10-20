'client side'

import { RichTextBlockWrapper } from './styled'
import { IRichTextBlockProps } from './types'

const RichTextBlock = ({ value, WrapperProps }: IRichTextBlockProps) => (
  <RichTextBlockWrapper
    {...WrapperProps}
    // eslint-disable-nex-line react/no-danger
    dangerouslySetInnerHTML={{ __html: value }}
  />
)

export default RichTextBlock
