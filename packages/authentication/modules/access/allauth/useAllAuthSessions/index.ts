'use client'

import { useState } from 'react'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import AllAuthApi from '../../../../services/allAuth'
import type * as AllAuthTypes from '../../../../types/allAuth'
import type { UseAllAuthSessions } from './types'

export const useAllAuthSessions = ({
  endSessionsMutationOptions = {},
}: UseAllAuthSessions = {}) => {
  const queryClient = useQueryClient()
  const [selectedSessions, setSelectedSessions] = useState<number[]>([])

  const sessionsQuery = useQuery({
    queryFn: () => AllAuthApi.sessions(),
    queryKey: AllAuthApi.QUERY_KEYS.sessions(),
  })

  const endSessionsMutation = useMutation({
    mutationFn: (data: AllAuthTypes.EndSessionsRequest) => AllAuthApi.endSessions(data),
    ...endSessionsMutationOptions, // needs to be placed below all overridable options
    onError: (err, variables, context) => {
      endSessionsMutationOptions?.onError?.(err, variables, context)
    },
    onSuccess: async (response, variables, context) => {
      endSessionsMutationOptions?.onSuccess?.(response, variables, context)
      queryClient.invalidateQueries({ queryKey: AllAuthApi.QUERY_KEYS.sessions() })
    },
  })

  return {
    sessionsQuery,
    selectedSessions,
    setSelectedSessions,
    endSessionsMutation,
  }
}
