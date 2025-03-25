import type { BoxProps } from '@mui/system'

import type { PageRichTextBlockFields$key } from '../../../../__generated__/PageRichTextBlockFields.graphql'
import type { PageBodyBlockSharedProps } from '../../StreamField/types'

export type RichTextBlockBodyItem = PageBodyBlockSharedProps & PageRichTextBlockFields$key

export interface RichTextBlockProps extends RichTextBlockBodyItem {
  WrapperProps?: BoxProps
}
