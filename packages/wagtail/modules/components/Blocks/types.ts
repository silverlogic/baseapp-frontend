import type { FC } from 'react'

import type { PageBodyBlock, PageBodyItem, PageBodySectionStreamBlock } from '../StreamField/types'

export type AvailableBlocksType = {
  [field in PageBodyItem['field']]: FC<PageBodyBlock> | FC<PageBodySectionStreamBlock>
}
