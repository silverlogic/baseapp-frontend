import type { WagtailPagesContextState } from './types'

export const PROVIDER_INITIAL_STATE: Omit<WagtailPagesContextState, 'currentPage'> = {
  availablePageTypes: () => require('../../components/PageTypes').default,
  availableBlocks: () => require('../../components/Blocks').default,
}
