'use client'

import {
  ACCESS_KEY_NAME,
  REFRESH_KEY_NAME,
  decodeJWT,
  setFormAllAuthApiErrors,
  setTokenAsync,
} from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import AllAuthApi from '../../../../services/allAuth'
import type * as AllAuthTypes from '../../../../types/allAuth'
import { User } from '../../../../types/user'
import { useCurrentProfile } from '../../../profile'
import { DEFAULT_INITIAL_VALUES, DEFAULT_VALIDATION_SCHEMA } from './constants'
import type { UseAllAuthLogin } from './types'

export const useAllAuthLogin = ({
  formOptions = {},
  mutationOptions = {},
  accessKeyName = ACCESS_KEY_NAME,
  refreshKeyName = REFRESH_KEY_NAME,
  enableFormApiErrors = true,
}: UseAllAuthLogin) => {
  const { setCurrentProfile } = useCurrentProfile()

  const form = useForm({
    defaultValues: DEFAULT_INITIAL_VALUES,
    resolver: zodResolver(DEFAULT_VALIDATION_SCHEMA),
    mode: 'onChange',
    ...formOptions,
  })

  const mutation = useMutation({
    mutationFn: (data: AllAuthTypes.LoginRequest) => AllAuthApi.login(data),
    ...mutationOptions, // needs to be placed below all overridable options
    onError: (err, variables, context) => {
      mutationOptions?.onError?.(err, variables, context)
      if (enableFormApiErrors) {
        setFormAllAuthApiErrors(form, err)
      }
    },
    onSuccess: async (response, variables, context) => {
      const sessionInfo = response as AllAuthTypes.SessionInfo
      if (sessionInfo.response.status === 200 && sessionInfo.response.data.meta.isAuthenticated) {
        const accessToken = sessionInfo.response.data.meta.accessToken!
        const user = decodeJWT<User>(accessToken)

        if (user) {
          // TODO: handle the absolute image path on the backend
          const baseUrl = (
            process.env.NEXT_PUBLIC_API_BASE_URL ?? process.env.EXPO_PUBLIC_API_BASE_URL
          )?.replace('/v1', '')
          const absoluteImagePath = user?.profile?.image ? `${baseUrl}${user.profile.image}` : null
          setCurrentProfile({
            ...user.profile,
            image: absoluteImagePath,
          })
        }

        await setTokenAsync(accessKeyName, accessToken.access, {
          secure: process.env.NODE_ENV === 'production',
        })
        await setTokenAsync(refreshKeyName, accessToken.refresh, {
          secure: process.env.NODE_ENV === 'production',
        })

        mutationOptions?.onSuccess?.(response, variables, context)
      }
    },
  })

  return {
    form: {
      ...form,
      handleSubmit: form.handleSubmit(async (values) => {
        await mutation.mutateAsync(values as AllAuthTypes.LoginRequest)
      }) as any,
    },
    mutation,
  }
}
