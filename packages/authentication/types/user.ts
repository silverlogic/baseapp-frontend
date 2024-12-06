import { MinimalProfile } from './profile'

export interface User {
  id: number
  email: string
  isEmailVerified: boolean
  newEmail: string
  isNewEmailConfirmed: boolean
  referralCode: string
  firstName: string
  lastName: string
  profile: MinimalProfile
  phoneNumber: string
  preferredLanguage: string
}

export interface UserUpdateParams<TUser extends Partial<User>> {
  userId: TUser['id']
  data: Partial<Omit<TUser, 'id'>> & {
    avatar?: File | string
  }
}
