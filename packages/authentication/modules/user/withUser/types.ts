import { IJWTContent } from '@baseapp-frontend/utils'

export interface ComponentWithUser<TUser extends IJWTContent> {
  user: TUser | null
}
