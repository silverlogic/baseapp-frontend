'use client'

import { useFragment } from 'react-relay'

import { PageRichTextBlockFields$key } from '../../../../__generated__/PageRichTextBlockFields.graphql'
import { PageRichTextBlockFields } from '../../../graphql/queries/Page'
import { RichTextBlockWrapper } from './styled'
import { RichTextBlockProps } from './types'

const RichTextBlock = ({ WrapperProps, ...props }: RichTextBlockProps) => {
  const notificationSettings = useFragment<PageRichTextBlockFields$key>(
    PageRichTextBlockFields,
    props,
  )
  return (
    <RichTextBlockWrapper
      {...WrapperProps}
      // TODO (Tech Debt): Sanitize the HTML content with, for example, DOMPurify.
      // eslint-disable-nex-line react/no-danger
      dangerouslySetInnerHTML={{ __html: notificationSettings.value ?? '' }}
    />
  )
}

export default RichTextBlock
