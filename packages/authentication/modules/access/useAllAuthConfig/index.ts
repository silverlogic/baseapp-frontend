'use client'

import { useQuery } from '@tanstack/react-query'

import AllAuthApi from '../../../services/allAuth'
import type { UseAllAuthConfig } from './types'

const useAllAuthConfig = ({ configQueryOptions = {} }: UseAllAuthConfig) => {
  const configQuery = useQuery({
    queryFn: () => AllAuthApi.config(),
    queryKey: AllAuthApi.QUERY_KEYS.config(),
    ...configQueryOptions, // needs to be placed below all overridable options
  })

  return {
    configQuery,
  }
}

export default useAllAuthConfig
