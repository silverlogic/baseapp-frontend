'use client'

import { useQuery } from '@tanstack/react-query'

import AllAuthApi from '../../../services/allAuth'
import type { UseAllAuthRecoveryCodes } from './types'

const useAllAuthRecoveryCodes = ({
  getRecoveryCodesQueryOptions = {},
}: UseAllAuthRecoveryCodes) => {
  const getRecoveryCodesQuery = useQuery({
    queryFn: () => AllAuthApi.getRecoveryCodes(),
    queryKey: AllAuthApi.QUERY_KEYS.getRecoveryCodes(),
    ...getRecoveryCodesQueryOptions, // needs to be placed below all overridable options
  })

  return {
    getRecoveryCodesQuery,
  }
}

export default useAllAuthRecoveryCodes
