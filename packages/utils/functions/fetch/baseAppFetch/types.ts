type NextFetchOptions = {
  next?: {
    tags?: string[]
    revalidate?: number
  }
}

type Config = {
  accessKeyName?: string
  refreshKeyName?: string
  languageCookieName?: string
  baseUrl?: string
  servicesWithoutToken?: RegExp[]
  params?: Record<string, any>
  decamelizeRequestBodyKeys?: boolean
  decamelizeRequestParamsKeys?: boolean
  camelizeResponseDataKeys?: boolean
  stringifyBody?: boolean
  setContentType?: boolean
  throwError?: boolean
  refreshToken?: boolean
  tokenType?: 'Bearer' | 'Token'
}

type GraphQLBody = {
  query: string | null
  variables?: Record<string, any>
  operationName?: string
  operationKind?: string
}

type ExtraHeaders = {
  Accept?: string
  'Content-Type'?: string
  Authorization?: string
  'Accept-Language'?: string
}

export interface RequestOptions extends Omit<RequestInit, 'body' | 'headers'> {
  body?: string | object | GraphQLBody
  headers?: RequestInit['headers'] & ExtraHeaders
}

export type BaseAppFetchOptions = RequestOptions & NextFetchOptions & Config

export type BaseAppFetch = <TOutput = any>(
  path: `/${string}` | '',
  options?: BaseAppFetchOptions,
) => Promise<TOutput>
