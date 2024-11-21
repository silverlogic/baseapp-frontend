import { FC } from 'react'

import { PageBodyItem } from '../../services/Wagtail/PagesAPI/types'

export interface StreamFieldProps {
  body: PageBodyItem[]
  availableBlocks: StreamFieldsTableType
}

export type StreamFieldsTableType = {
  [key: string]: ExtractFC<PageBodyItem>
}

// helper type to transform PageBodyItem into FC<RichTextBlockProps> | FC<ImageBlockProps> | ...
export type ExtractFC<T> = T extends { type: string } ? FC<T> : never
