import { PropsWithChildren } from 'react'

export interface IPageParams {
  params: {
    path: string[]
  }
}

export interface IWagtailPageProps extends PropsWithChildren {
  defaultSettings?: ProviderDefaultSettingsType
}

export type ProviderDefaultSettingsType = Partial<Omit<WagtailPagesContextState, 'currentPage'>>
