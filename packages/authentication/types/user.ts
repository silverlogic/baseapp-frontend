export interface User {
  id: number
  email: string
  isEmailVerified: boolean
  newEmail: string
  isNewEmailConfirmed: boolean
  referralCode: string
  profile: MinimalProfile
  phoneNumber: string
  preferredLanguage: string
}

export interface MinimalProfile {
  id: string
  name: string | null | undefined
  image:
    | {
        url: string
      }
    | null
    | undefined
  urlPath:
    | {
        path: string
      }
    | null
    | undefined
}

export interface UserUpdateParams<TUser extends Partial<User>> {
  userId: TUser['id']
  data: Partial<Omit<TUser, 'id'>> & {
    avatar?: File | string
  }
}
