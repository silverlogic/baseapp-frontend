import type { FC } from 'react'

import type { PageURLPathQuery$data } from '../../../__generated__/PageURLPathQuery.graphql'
import type { AvailableBlocksType } from '../Blocks/types'

export type PageBody = NonNullable<NonNullable<PageURLPathQuery$data['page']>['body']>
export type PageBodySectionStreamBlock = NonNullable<PageBody[number]>
export type PageBodyBlock = NonNullable<NonNullable<PageBodySectionStreamBlock['blocks']>[number]>
export type PageBodyItem = PageBodySectionStreamBlock | PageBodyBlock
export type PageBodyBlockSharedProps = Pick<PageBodyBlock, 'id' | 'field' | 'blockType'>

export interface StreamFieldProps {
  body: PageBody | NonNullable<PageBodySectionStreamBlock['blocks']>
  availableBlocks: AvailableBlocksType
}

// helper type to transform PageBodyItem into FC<RichTextBlockProps> | FC<ImageBlockProps> | ...
export type ExtractFC<T> = T extends { type: string } ? FC<T> : never
