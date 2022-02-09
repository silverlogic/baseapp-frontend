export interface IUser {
  id: number,
  email: string,
  firstName: string,
  lastName: string,
  isEmailVerified: boolean,
  isNewEmailConfirmed: boolean,
  newEmail?: string,
  referralCode: string,
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

export interface IUserContext {
  user: IUser | null
  isLoading: boolean
  isSuccess: boolean
  isIdle: boolean
  status: string
  setUser: Function
}
