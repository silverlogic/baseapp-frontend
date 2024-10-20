import { FC } from 'react'

import { IPageBodyItem } from '../../services/Wagtail/PagesAPI/types'

export interface IStreamFieldProps {
  body: IPageBodyItem[]
  availableBlocks: StreamFieldsTableType
}

export type StreamFieldsTableType = {
  [key: string]: ExtractFC<IPageBodyItem>
}

// helper type to transform IPageBodyItem into FC<IRichTextBlockProps> | FC<IImageBlockProps> | ...
export type ExtractFC<T> = T extends { type: string } ? FC<T> : never
