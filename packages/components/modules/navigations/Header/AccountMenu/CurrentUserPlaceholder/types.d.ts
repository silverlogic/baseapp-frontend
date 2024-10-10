import type { User } from '@baseapp-frontend/authentication'
import type { JWTContent } from '@baseapp-frontend/utils'

export interface CurrentUserPlaceholderProps {
  user: User & JWTContent
}
