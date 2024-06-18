export interface User {
  id: number
  email: string
  isEmailVerified: boolean
  newEmail: string
  isNewEmailConfirmed: boolean
  referralCode: string
  avatar: {
    fullSize: string
    small: string
  }
  firstName: string
  lastName: string
  phoneNumber: string
}

export interface UserUpdateParams<TUser extends Partial<User>> {
  userId: TUser['id']
  data: Partial<Omit<TUser, 'avatar' | 'id'>> & {
    avatar?: File | string
  }
}
