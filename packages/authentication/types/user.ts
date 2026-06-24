import { MinimalProfile } from './profile'

export interface User {
  // `string | number`: the backend exposes integer pks by default, or opaque
  // public ids (UUID strings) when public-id logic is enabled. Identity is
  // never used for arithmetic, so consumers should treat it as an opaque key.
  id: string | number
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
