import { Profile } from '@baseapp-frontend/components/modules/profiles/types'

export interface User {
  id: number
  email: string
  isEmailVerified: boolean
  newEmail: string
  isNewEmailConfirmed: boolean
  referralCode: string
  profile: Profile
  phoneNumber: string
  preferredLanguage: string
}

export interface UserUpdateParams<TUser extends Partial<User>> {
  userId: TUser['id']
  data: Partial<Omit<TUser, 'profile.avatar' | 'id'>> & {
    avatar?: File | string
  }
}
