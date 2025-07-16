import type { BoxProps } from '@mui/system'

import type { PageBodyBlock } from '../../StreamField/types'

export type RichTextBlockBodyItem = PageBodyBlock

export interface RichTextBlockProps extends RichTextBlockBodyItem {
  WrapperProps?: BoxProps
}
