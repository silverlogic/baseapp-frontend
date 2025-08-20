import React from 'react'

import type {
  PageWagtailFieldsFragment$data,
  PageWagtailFieldsFragment$key,
} from '../../../__generated__/PageWagtailFieldsFragment.graphql'
import type { AvailableBlocksType } from '../../components/Blocks/types'
import type { AvailablePageTypesType } from '../../components/PageTypes/types'

export type WagtailPagesProviderProps = {
  children: React.ReactNode
  currentPage: PageWagtailFieldsFragment$key
  defaultSettings: Partial<Omit<WagtailPagesContextState, 'currentPage'>>
}

export type WagtailPagesContextState = {
  currentPage: NonNullable<PageWagtailFieldsFragment$data>
  availablePageTypes: AvailablePageTypesType
  availableBlocks: AvailableBlocksType
}

export type WagtailPagesContextProps = WagtailPagesContextState & {
  update: (
    name: keyof WagtailPagesContextState,
    updateValue: WagtailPagesContextState[keyof WagtailPagesContextState],
  ) => void
}
