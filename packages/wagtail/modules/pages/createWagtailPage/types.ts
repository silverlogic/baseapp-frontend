import type { PropsWithChildren } from 'react'

import type { WagtailPagesContextState } from '../../providers/WagtailPagesProvider/types'

export interface PageParams {
  params: {
    path: string[]
  }
}

export interface WagtailPageProps extends PropsWithChildren {
  defaultSettings?: ProviderDefaultSettingsType
}

export type ProviderDefaultSettingsType = Partial<Omit<WagtailPagesContextState, 'currentPage'>>
