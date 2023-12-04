import { TokenTypes } from '@baseapp-frontend/utils'

import { UseQueryOptions } from '@tanstack/react-query'

import AuthApi from '../../../services/auth'
import { ICookieName, IPreAuthRequest, PreAuthResponse } from '../../../types/auth'

type ApiClass = Pick<typeof AuthApi, 'preAuth'>

export interface IUsePreAuth extends ICookieName {
  token: string
  queryOptions?: UseQueryOptions<PreAuthResponse, unknown, IPreAuthRequest, any>
  tokenType?: TokenTypes
  ApiClass?: ApiClass
}
