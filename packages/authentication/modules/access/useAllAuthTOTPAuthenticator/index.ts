'use client'

import { useQuery } from '@tanstack/react-query'

import AllAuthApi from '../../../services/allAuth'
import type { UseAllAuthTOTPAuthenticator } from './types'

const useAllAuthTOTPAuthenticator = ({
  getTOTPAuthenticatorQueryOptions = {},
}: UseAllAuthTOTPAuthenticator) => {
  const getTOTPAuthenticatorQuery = useQuery({
    queryFn: () => AllAuthApi.getTOTPAuthenticator(),
    queryKey: AllAuthApi.QUERY_KEYS.getTOTPAuthenticator(),
    ...getTOTPAuthenticatorQueryOptions, // needs to be placed below all overridable options
  })

  return {
    getTOTPAuthenticatorQuery,
  }
}

export default useAllAuthTOTPAuthenticator
