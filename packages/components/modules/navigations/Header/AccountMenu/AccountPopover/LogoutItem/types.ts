import type { PropsWithChildren } from 'react'

export interface LogoutItemProps extends PropsWithChildren {
  handlePopoverOnClose: () => void
  logoutButtonLabel?: string
}
