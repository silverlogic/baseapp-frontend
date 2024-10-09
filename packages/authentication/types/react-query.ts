import type { QueryKey, UseQueryOptions } from '@tanstack/react-query'

/**
 * This utility type allows the `queryKey` to be optional, as the custom hook may provide a default `queryKey` internally.
 *
 * If the `queryKey` is not provided, the default `queryKey` will be used.
 */
export interface CustomUseQueryOptions<
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> {
  options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey'> & {
    queryKey?: QueryKey
  }
}
