import type { FC } from 'react'

import type { PageBodyItem } from '../../services/Wagtail/PagesAPI/types'

export type AvailableBlocksType = {
  [key in PageBodyItem as key['type']]: FC<Extract<PageBodyItem, { type: key['type'] }>>
}
