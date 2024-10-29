import type { BoxProps } from '@mui/system'

import type { IPageBodyItem } from '../../../services/Wagtail/PagesAPI/types'

export interface IRichTextBlock extends IPageBodyItem {
  value: string
  type: 'rich_text_block'
}

export interface IRichTextBlockProps extends Omit<IRichTextBlock, 'type'> {
  WrapperProps?: BoxProps
}
