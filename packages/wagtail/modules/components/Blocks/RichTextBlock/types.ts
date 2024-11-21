import type { BoxProps } from '@mui/system'

import type { PageBodyItem } from '../../../services/Wagtail/PagesAPI/types'

export interface RichTextBlockBodyItem extends PageBodyItem {
  value: string
  type: 'rich_text_block'
}

export interface RichTextBlockProps extends Omit<RichTextBlockBodyItem, 'type'> {
  WrapperProps?: BoxProps
}
