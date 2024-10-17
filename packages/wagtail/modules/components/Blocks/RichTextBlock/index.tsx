import { RichTextBlockWrapper } from './styled'
import { IRichTextBlockProps } from './types'

const RichTextBlock = ({ value }: IRichTextBlockProps) => (
  <RichTextBlockWrapper
    // eslint-disable-nex-line react/no-danger
    dangerouslySetInnerHTML={{ __html: value }}
  />
)

export default RichTextBlock
