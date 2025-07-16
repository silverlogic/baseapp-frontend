'use client'

import { FC, useMemo, useState } from 'react'

import { ComponentWithQueryRef, withRelay } from '@baseapp-frontend/graphql'

import { useFragment, usePreloadedQuery } from 'react-relay'

import { PageWagtailFieldsFragment$data } from '../../../__generated__/PageWagtailFieldsFragment.graphql'
import { PageWagtailTokenQuery } from '../../../__generated__/PageWagtailTokenQuery.graphql'
import PageQueryNode, {
  PageWagtailURLPathQuery,
} from '../../../__generated__/PageWagtailURLPathQuery.graphql'
import {
  PageWagtailFieldsFragment,
  getPageWagtailByTokenQuery,
  getPageWagtailByURLPathQuery,
} from '../../graphql/queries/Page'
import { PROVIDER_INITIAL_STATE } from './constants'
import { WagtailPagesContext } from './context'
import { WagtailPagesContextState, WagtailPagesProviderProps } from './types'

const WagtailPagesProvider: FC<
  ComponentWithQueryRef<PageWagtailURLPathQuery | PageWagtailTokenQuery> & WagtailPagesProviderProps
> = ({ children, queryRef, defaultSettings }) => {
  const isTokenQuery = 'token' in queryRef.variables && 'contentType' in queryRef.variables

  const currentPage = usePreloadedQuery(
    isTokenQuery ? getPageWagtailByTokenQuery : getPageWagtailByURLPathQuery,
    queryRef,
  )

  if (!currentPage?.page) {
    throw new Error('Current page not found in provider')
  }
  const currentPageFragment = useFragment(
    PageWagtailFieldsFragment,
    currentPage.page,
  ) as PageWagtailFieldsFragment$data

  const [state, setState] = useState<WagtailPagesContextState>({
    ...PROVIDER_INITIAL_STATE,
    ...defaultSettings,
    currentPage: currentPageFragment,
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
        setState((prev: WagtailPagesContextState) => ({
          ...prev,
          [name]: updateValue,
        }))
      },
    }),
    [state, setState],
  )

  return (
    <WagtailPagesContext.Provider value={memoizedValue}>{children}</WagtailPagesContext.Provider>
  )
}

export default withRelay<
  typeof PageQueryNode,
  PageWagtailURLPathQuery | PageWagtailTokenQuery,
  WagtailPagesProviderProps
>(WagtailPagesProvider)
