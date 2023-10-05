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
}
