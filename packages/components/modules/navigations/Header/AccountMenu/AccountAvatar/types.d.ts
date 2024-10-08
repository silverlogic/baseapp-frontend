import { ClickableAvatarProps } from '@baseapp-frontend/design-system'

import { UserOrProfile } from '../../../hooks/useUserOrProfile/types'

export interface AccountAvatarProps extends ClickableAvatarProps {
  userOrProfile: UserOrProfile | null
  popoverOpen: boolean
  popoverOnOpen: (event: MouseEvent<HTMLElement>) => void
}
