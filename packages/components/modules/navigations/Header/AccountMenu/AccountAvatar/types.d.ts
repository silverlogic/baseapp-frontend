import { ClickableAvatarProps } from '@baseapp-frontend/design-system'

export interface AccountAvatarProps extends ClickableAvatarProps {
  popoverOpen: boolean
  popoverOnOpen: (event: MouseEvent<HTMLElement>) => void
}
