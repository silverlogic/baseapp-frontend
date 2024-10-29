import type { FC } from 'react'

import type { IPageBodyItem } from '../../services/Wagtail/PagesAPI/types'

export type AvailableBlocksType = {
  [key in IPageBodyItem as key['type']]: FC<Extract<IPageBodyItem, { type: key['type'] }>>
}
