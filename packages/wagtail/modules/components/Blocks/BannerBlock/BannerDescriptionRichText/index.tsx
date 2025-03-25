'use client'

import { RichTextBlockWrapper } from './styled'

const BannerDescriptionRichText = ({ value }: { value: string }) => (
  <RichTextBlockWrapper>
    {/* TODO (Tech Debt): Sanitize the HTML content with, for example, DOMPurify. */}
    <div dangerouslySetInnerHTML={{ __html: value }} /> {/* eslint-disable-line react/no-danger */}
  </RichTextBlockWrapper>
)

export default BannerDescriptionRichText
