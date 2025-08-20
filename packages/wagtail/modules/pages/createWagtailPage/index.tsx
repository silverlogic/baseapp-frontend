import { SerializablePreloadedQuery, loadSerializableQuery } from '@baseapp-frontend/graphql'

import { notFound } from 'next/navigation'
import type { ConcreteRequest, GraphQLResponseWithData } from 'relay-runtime'

import PageQueryByTokenNode, {
  PageWagtailTokenQuery,
  PageWagtailTokenQuery$variables,
} from '../../../__generated__/PageWagtailTokenQuery.graphql'
import PageQueryByPathNode, {
  PageWagtailURLPathQuery,
  PageWagtailURLPathQuery$variables,
} from '../../../__generated__/PageWagtailURLPathQuery.graphql'
import { PageTypes } from '../../components'
import WagtailPagesProvider from '../../providers/WagtailPagesProvider'
import PreloadedWagtailPagesProvider from './PreloadedWagtailPagesProvider'
import {
  CreateWagtailPageProviderParams,
  PageParams,
  PageSearchParams,
  WagtailPageProps,
} from './types'

type PageQueryOptions =
  | {
      node: typeof PageQueryByPathNode
      variables: PageWagtailURLPathQuery$variables
    }
  | {
      node: typeof PageQueryByTokenNode
      variables: PageWagtailTokenQuery$variables
    }

const getCurrentPage = async (
  path?: string,
  token?: string,
  contentType?: string,
): Promise<
  SerializablePreloadedQuery<ConcreteRequest, PageWagtailURLPathQuery | PageWagtailTokenQuery>
> => {
  let queryOptions: PageQueryOptions | null = null

  if (token !== undefined && contentType !== undefined) {
    queryOptions = {
      node: PageQueryByTokenNode,
      variables: { token, contentType },
    }
  } else if (path !== undefined) {
    queryOptions = {
      node: PageQueryByPathNode,
      variables: { path },
    }
  } else {
    notFound()
  }

  const { node, variables } = queryOptions

  const preloadedQuery = await loadSerializableQuery<
    typeof node,
    PageWagtailURLPathQuery | PageWagtailTokenQuery
  >(node.params, variables)

  const response = (preloadedQuery.response as GraphQLResponseWithData).data
  const page = response?.page

  if (!page) {
    notFound()
  }

  return preloadedQuery
}

export const generateWagtailPageComponents = (
  preloadedPageQueryRef: SerializablePreloadedQuery<
    ConcreteRequest,
    PageWagtailURLPathQuery | PageWagtailTokenQuery
  >,
) => ({
  preloadedPageQueryRef,
  WagtailPagesProvider: ({ children, defaultSettings }: WagtailPageProps) => (
    <PreloadedWagtailPagesProvider
      preloadedQuery={preloadedPageQueryRef}
      defaultSettings={defaultSettings}
    >
      {children}
    </PreloadedWagtailPagesProvider>
  ),
  WagtailPageTypes: PageTypes,
})

export const createWagtailPageProviderFromFragment = ({
  pageFragment,
}: CreateWagtailPageProviderParams) => ({
  WagtailPagesProvider: ({ children, defaultSettings }: WagtailPageProps) => (
    <WagtailPagesProvider
      currentPage={pageFragment}
      defaultSettings={{
        ...(defaultSettings ?? {}),
      }}
    >
      {children}
    </WagtailPagesProvider>
  ),
  WagtailPageTypes: PageTypes,
})

export const createWagtailPage = async ({ params }: PageParams) => {
  const currentPage = await getCurrentPage(params.path?.join('/') ?? '/')

  return generateWagtailPageComponents(currentPage)
}

export const createWagtailPagePreview = async ({ searchParams }: PageSearchParams) => {
  const currentPage = await getCurrentPage(undefined, searchParams.token, searchParams.contentType)
  return generateWagtailPageComponents(currentPage)
}

export default createWagtailPage
