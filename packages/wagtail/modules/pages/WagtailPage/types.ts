import type { PropsWithChildren } from 'react'

import type { WagtailPagesContextState } from '../../providers/WagtailPagesProvider/types'

export interface IPageParams {
  params: {
    path: string[]
  }
}

export interface IWagtailPageProps extends PropsWithChildren {
  defaultSettings?: ProviderDefaultSettingsType
}

export type ProviderDefaultSettingsType = Partial<Omit<WagtailPagesContextState, 'currentPage'>>
