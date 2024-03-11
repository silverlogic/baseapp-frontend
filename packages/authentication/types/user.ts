export interface IUser {
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

export interface UserUpdateParams<TUser extends Partial<IUser>> {
  userId: TUser['id']
  data: Partial<Omit<TUser, 'avatar' | 'id'>> & {
    avatar?: File | string
  }
}
