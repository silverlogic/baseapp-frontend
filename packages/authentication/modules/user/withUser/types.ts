import type { JWTContent } from '@baseapp-frontend/utils'

export interface ComponentWithUser<TUser extends JWTContent> {
  user: TUser | null
}
