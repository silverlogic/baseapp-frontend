import React from 'react'

import type { PageURLPathQuery$data } from '../../../__generated__/PageURLPathQuery.graphql'
import type { AvailableBlocksType } from '../../components/Blocks/types'
import type { AvailablePageTypesType } from '../../components/PageTypes/types'

export type WagtailPagesProviderProps = {
  children: React.ReactNode
  defaultSettings: Partial<Omit<WagtailPagesContextState, 'currentPage'>>
}

export type WagtailPagesContextState = {
  currentPage: NonNullable<PageURLPathQuery$data['page']>
  availablePageTypes: AvailablePageTypesType
  availableBlocks: AvailableBlocksType
}

export type WagtailPagesContextProps = WagtailPagesContextState & {
  update: (
    name: keyof WagtailPagesContextState,
    updateValue: WagtailPagesContextState[keyof WagtailPagesContextState],
  ) => void
}
