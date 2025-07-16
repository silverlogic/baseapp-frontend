import type { FC } from 'react'

import type { PageWagtailFieldsFragment$data } from '../../../__generated__/PageWagtailFieldsFragment.graphql'
import type { AvailableBlocksType } from '../Blocks/types'

export type PageBody = NonNullable<NonNullable<PageWagtailFieldsFragment$data>['body']>
export type PageBodySectionStreamBlock = NonNullable<PageBody[number]>
export type PageBodyBlock = NonNullable<NonNullable<PageBodySectionStreamBlock['blocks']>[number]>
export type PageBodyItem = PageBodySectionStreamBlock | PageBodyBlock

export interface StreamFieldProps {
  body: PageBody | NonNullable<PageBodySectionStreamBlock['blocks']>
  availableBlocks: AvailableBlocksType
}

// helper type to transform PageBodyItem into FC<RichTextBlockProps> | FC<ImageBlockProps> | ...
export type ExtractFC<T> = T extends { field: string } ? FC<T> : never
