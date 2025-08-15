import type { PropsWithChildren } from 'react'

import type { PageWagtailFieldsFragment$key } from '../../../__generated__/PageWagtailFieldsFragment.graphql'
import type { WagtailPagesContextState } from '../../providers/WagtailPagesProvider/types'

export interface PageParams {
  params: {
    path?: string[]
  }
}

export interface PageSearchParams {
  searchParams: {
    token: string
    contentType: string
  }
}

export interface CreateWagtailPageProviderParams {
  pageFragment: PageWagtailFieldsFragment$key
}

export interface WagtailPageProps extends PropsWithChildren {
  defaultSettings?: ProviderDefaultSettingsType
}

export type ProviderDefaultSettingsType = Partial<Omit<WagtailPagesContextState, 'currentPage'>>
