'use client'

import { FC } from 'react'

import { ComponentWithQueryRef, withRelay } from '@baseapp-frontend/graphql'

import { notFound } from 'next/navigation'
import { usePreloadedQuery } from 'react-relay'

import { PageWagtailTokenQuery } from '../../../__generated__/PageWagtailTokenQuery.graphql'
import PageQueryNode, {
  PageWagtailURLPathQuery,
} from '../../../__generated__/PageWagtailURLPathQuery.graphql'
import {
  getPageWagtailByTokenQuery,
  getPageWagtailByURLPathQuery,
} from '../../graphql/queries/Page'
import WagtailPagesProvider from '../../providers/WagtailPagesProvider'
import { WagtailPageProps } from './types'

const PreloadedWagtailPagesProvider: FC<
  ComponentWithQueryRef<PageWagtailURLPathQuery | PageWagtailTokenQuery> & WagtailPageProps
> = ({ children, queryRef, defaultSettings }) => {
  const isTokenQuery = 'token' in queryRef.variables && 'contentType' in queryRef.variables

  const currentPage = usePreloadedQuery(
    isTokenQuery ? getPageWagtailByTokenQuery : getPageWagtailByURLPathQuery,
    queryRef,
  )

  if (!currentPage?.page) {
    notFound()
  }
  return (
    <WagtailPagesProvider
      currentPage={currentPage.page}
      defaultSettings={{
        ...(defaultSettings ?? {}),
      }}
    >
      {children}
    </WagtailPagesProvider>
  )
}

export default withRelay<
  typeof PageQueryNode,
  PageWagtailURLPathQuery | PageWagtailTokenQuery,
  WagtailPageProps
>(PreloadedWagtailPagesProvider)
