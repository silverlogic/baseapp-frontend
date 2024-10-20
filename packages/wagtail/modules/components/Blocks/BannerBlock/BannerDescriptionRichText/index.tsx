'client side'

import { RichTextBlockWrapper } from './styled'

const BannerDescriptionRichText = ({ value }: { value: string }) => (
  <RichTextBlockWrapper>
    <div dangerouslySetInnerHTML={{ __html: value }} /> {/* eslint-disable-line react/no-danger */}
  </RichTextBlockWrapper>
)

export default BannerDescriptionRichText
