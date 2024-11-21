import type { AvailableBlocksType } from '../../components/Blocks/types'
import type { AvailablePageTypesType } from '../../components/PageTypes/types'
import type { Page } from '../../services/Wagtail/PagesAPI/types'
import type { PartialExcept } from '../../services/Wagtail/types'

export type WagtailPagesProviderProps = {
  children: React.ReactNode
  defaultSettings: PartialExcept<WagtailPagesContextState, 'currentPage'>
}

export type WagtailPagesContextState = {
  currentPage: Page
  availablePageTypes: AvailablePageTypesType
  availableBlocks: AvailableBlocksType
}

export type WagtailPagesContextProps = WagtailPagesContextState & {
  update: (
    name: keyof WagtailPagesContextState,
    updateValue: WagtailPagesContextState[keyof WagtailPagesContextState],
  ) => void
}
