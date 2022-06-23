import type { UseQueryResult } from 'react-query'
import type {
  GetServerSidePropsResult,
  GetServerSidePropsContext,
  ParsedUrlQuery,
  PreviewData,
} from 'next'

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

export interface ILogin {
  formik: FormikProps<any>
  mutation: UseMutationResult<unknown, unknown, void, unknown>
}

export interface IRecoverPassword {
  formik: FormikProps<any>
  mutation: UseMutationResult<unknown, unknown, void, unknown>
}

export interface IResetPassword {
  formik: FormikProps<any>
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
