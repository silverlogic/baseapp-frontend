type NextFetchOptions = {
  next?: {
    tags?: string[]
    revalidate?: number
  }
}

type Config = {
  accessCookieName?: string
  refreshCookieName?: string
  baseUrl?: string
  servicesWithoutToken?: RegExp[]
  params?: Record<string, any>
  decamelizeRequestBodyKeys?: boolean
  decamelizeRequestParamsKeys?: boolean
  camelizeResponseDataKeys?: boolean
  stringifyBody?: boolean
  setContentType?: boolean
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
}

export interface RequestOptions extends Omit<RequestInit, 'body' | 'headers'> {
  body?: string | object | GraphQLBody
  headers?: RequestInit['headers'] & ExtraHeaders
}

export interface BaseAppFetchOptions extends RequestOptions, NextFetchOptions, Config {}
