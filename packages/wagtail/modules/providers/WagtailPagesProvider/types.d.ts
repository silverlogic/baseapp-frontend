import type { IPageType } from '../../components/PageTypes/types'
import type { DefaultStreamFieldsTableType } from '../../components/StreamField/types'
import type { IPage } from '../../services/Wagtail/PagesAPI/types'
import type { PartialExcept } from '../../services/Wagtail/types'

export type WagtailPagesProviderProps = {
  children: React.ReactNode
  defaultSettings: PartialExcept<WagtailPagesContextState, 'currentPage'>
}

export type WagtailPagesContextState = {
  currentPage: IPage
  availablePageTypes: {
    [key: string]: () => FC<IPageType>
  }
  streamFields: DefaultStreamFieldsTableType
}

export type WagtailPagesContextProps = WagtailPagesContextState & {
  update: (
    name: keyof WagtailPagesContextState,
    updateValue: WagtailPagesContextState[keyof WagtailPagesContextState],
  ) => void
}
