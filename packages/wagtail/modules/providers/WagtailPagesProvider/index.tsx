'use client'

import { FC, useMemo, useState } from 'react'

import { ComponentWithQueryRef, withRelay } from '@baseapp-frontend/graphql'

import { usePreloadedQuery } from 'react-relay'

import PageQueryNode, { PageURLPathQuery } from '../../../__generated__/PageURLPathQuery.graphql'
import { getPageByURLPathQuery } from '../../graphql/queries/Page'
import { PROVIDER_INITIAL_STATE } from './constants'
import { WagtailPagesContext } from './context'
import { WagtailPagesContextState, WagtailPagesProviderProps } from './types'

const WagtailPagesProvider: FC<
  ComponentWithQueryRef<PageURLPathQuery> & WagtailPagesProviderProps
> = ({ children, queryRef, defaultSettings }) => {
  const currentPage = usePreloadedQuery(getPageByURLPathQuery, queryRef)
  if (!currentPage?.page) {
    throw new Error('Current page not found in provider')
  }

  const [state, setState] = useState<WagtailPagesContextState>({
    ...PROVIDER_INITIAL_STATE,
    ...defaultSettings,
    currentPage: currentPage.page,
    availablePageTypes: {
      ...PROVIDER_INITIAL_STATE.availablePageTypes,
      ...defaultSettings.availablePageTypes,
    },
    availableBlocks: {
      ...PROVIDER_INITIAL_STATE.availableBlocks,
      ...defaultSettings.availableBlocks,
    },
  })

  const memoizedValue = useMemo(
    () => ({
      ...state,
      update: (
        name: keyof WagtailPagesContextState,
        updateValue: WagtailPagesContextState[keyof WagtailPagesContextState],
      ) => {
        setState((prev: WagtailPagesContextState) => ({ ...prev, [name]: updateValue }))
      },
    }),
    [state, setState],
  )

  return (
    <WagtailPagesContext.Provider value={memoizedValue}>{children}</WagtailPagesContext.Provider>
  )
}

// TODO send the props to the provider
export default withRelay<typeof PageQueryNode, PageURLPathQuery, WagtailPagesProviderProps>(
  WagtailPagesProvider,
)
