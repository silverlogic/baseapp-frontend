'use client'

import { FC, useMemo, useState } from 'react'

import { useFragment } from 'react-relay'

import { PageWagtailFieldsFragment$data } from '../../../__generated__/PageWagtailFieldsFragment.graphql'
import { PageWagtailFieldsFragment } from '../../graphql/queries/Page'
import { PROVIDER_INITIAL_STATE } from './constants'
import { WagtailPagesContext } from './context'
import { WagtailPagesContextState, WagtailPagesProviderProps } from './types'

const WagtailPagesProvider: FC<WagtailPagesProviderProps> = ({
  children,
  currentPage,
  defaultSettings,
}) => {
  const currentPageFragment = useFragment(
    PageWagtailFieldsFragment,
    currentPage,
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

export default WagtailPagesProvider
