'use client'

import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { get } from 'lodash'

import AllAuthApi from '../../../../services/allAuth'
import type { UseAllAuthRecoveryCodes } from './types'

export const useAllAuthRecoveryCodes = ({
  getRecoveryCodesQueryOptions = {},
}: UseAllAuthRecoveryCodes) => {
  const getRecoveryCodesQuery = useQuery({
    queryFn: () => AllAuthApi.getRecoveryCodes(),
    queryKey: AllAuthApi.QUERY_KEYS.getRecoveryCodes(),
    ...getRecoveryCodesQueryOptions, // needs to be placed below all overridable options
    retry(failureCount, error) {
      const response = get(error as any, 'response') as AxiosResponse<any, any>
      if (response && [401, 404].includes(response.status)) {
        return false
      }
      return true
    },
    retryOnMount: false,
  })

  return {
    getRecoveryCodesQuery,
  }
}
