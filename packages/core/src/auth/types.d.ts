import type { UseQueryResult } from 'react-query'
import type {
  GetServerSidePropsResult,
  GetServerSidePropsContext,
  ParsedUrlQuery,
  PreviewData,
} from 'next'
import { MfaMethod } from '../mfa'

export interface IUser {
  id: number
  email: string
  firstName: string
  lastName: string
  isEmailVerified: boolean
  isNewEmailConfirmed: boolean
  newEmail?: string
  referralCode: string
}

export interface IUserResult {
  user: IUser | null
  isLoading: boolean
  isSuccess: boolean
  isIdle: boolean
  status: string
}

export interface IAuthHookProps {
  validationSchema?: any
  defaultValues?: any
  // eslint-disable-next-line @typescript-eslint/ban-types
  onError?: Function
  // eslint-disable-next-line @typescript-eslint/ban-types
  onSuccess?: Function
}

export interface ILoginHookProps {
  validationSchema?: any
  defaultValues?: any
  // eslint-disable-next-line @typescript-eslint/ban-types
  onError?: Function
  // eslint-disable-next-line @typescript-eslint/ban-types
  onSuccess?: Function
  // eslint-disable-next-line @typescript-eslint/ban-types
  onMfaError?: Function
  // eslint-disable-next-line @typescript-eslint/ban-types
  onMfaSuccess?: Function
}

export interface ILogin {
  form: UseFormReturn<any>
  mutation: UseMutationResult<unknown, unknown, void, unknown>
  mfaForm: UseFormReturn<any>
}

export interface ILoginMfaRequest {
  ephemeralToken: string
  token: string
}

export interface ILoginResponse {
  token: string
}

export interface ILoginMfaResponse {
  ephemeralToken: string
  method: MfaMethod
}

export interface ISignUp {
  form: UseFormReturn<any>
  mutation: UseMutationResult<unknown, unknown, void, unknown>
}

export interface IRecoverPassword {
  form: UseFormReturn<any>
  mutation: UseMutationResult<unknown, unknown, void, unknown>
}

export interface IResetPassword {
  form: UseFormReturn<any>
  mutation: UseMutationResult<unknown, unknown, void, unknown>
}

export interface IUserContext {
  user: IUser | null
  isLoading: boolean
  isSuccess: boolean
  isIdle: boolean
  status: string
  // eslint-disable-next-line @typescript-eslint/ban-types
  setUser: Function
  refetchUser:
    | ((options?: { throwOnError?: boolean; cancelRefetch?: boolean }) => Promise<UseQueryResult>)
    // eslint-disable-next-line @typescript-eslint/ban-types
    | Function
}

export interface LoginRequiredOptions {
  redirectTo: string
}

export type LoginRequiredServerSideProps<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData,
> = (
  context: GetServerSidePropsContext<Q, D>,
  options: LoginRequiredOptions,
) => Promise<GetServerSidePropsResult<P>>
