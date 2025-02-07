import { PropsWithChildren } from 'react'

import { ButtonProps } from '@mui/material'

import { AccountPopoverProps } from './AccountPopover/types'

export interface MenuItemProps {
  onClick: () => void
  label: string
}

export interface AccountMenuProps extends PropsWithChildren {
  onRegisterClick?: () => void
  onLoginClick?: () => void
  registerButtonLabel?: string
  loginButtonLabel?: string
  registerButtonProps?: ButtonProps
  loginButtonProps?: ButtonProps
  AccountPopoverProps?: Partial<AccountPopoverProps>
  additionalComponent?: React.ReactNode
}
