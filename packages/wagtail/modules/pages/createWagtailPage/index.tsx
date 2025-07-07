import { SerializablePreloadedQuery, loadSerializableQuery } from '@baseapp-frontend/graphql'

import { notFound } from 'next/navigation'
import type { ConcreteRequest, GraphQLResponseWithData } from 'relay-runtime'

import PageQueryNode, { PageURLPathQuery } from '../../../__generated__/PageURLPathQuery.graphql'
import PageTypes from '../../components/PageTypes'
import WagtailPagesProvider from '../../providers/WagtailPagesProvider'
import { PageParams, WagtailPageProps } from './types'

const getCurrentPage = async (
  path: string,
): Promise<SerializablePreloadedQuery<ConcreteRequest, PageURLPathQuery>> => {
  const preloadedQuery = await loadSerializableQuery<typeof PageQueryNode, PageURLPathQuery>(
    PageQueryNode.params,
    {
      path,
    },
  )

  const response = (preloadedQuery.response as GraphQLResponseWithData).data
  const page = response?.page

  if (!page) {
    notFound()
  }

  return preloadedQuery
}

export const generateWagtailPageComponents = (
  preloadedPageQueryRef: SerializablePreloadedQuery<ConcreteRequest, PageURLPathQuery>,
) => ({
  preloadedPageQueryRef,
  WagtailPagesProvider: ({ children, defaultSettings }: WagtailPageProps) => (
    <WagtailPagesProvider
      preloadedQuery={preloadedPageQueryRef}
      defaultSettings={{
        ...(defaultSettings ?? {}),
      }}
    >
      {children}
    </WagtailPagesProvider>
  ),
  WagtailPageTypes: PageTypes,
})

const createWagtailPage = async ({ params }: PageParams) => {
  const currentPage = await getCurrentPage(params.path?.join('/') ?? '/')

  return generateWagtailPageComponents(currentPage)
}

// TODO: (wagtail) add metadata method here.

export default createWagtailPage
