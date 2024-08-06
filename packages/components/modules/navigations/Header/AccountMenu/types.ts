import { PropsWithChildren } from 'react'

import { ButtonProps } from '@mui/material'

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
  menuItems?: MenuItemProps[]
  additionalComponent?: React.ReactNode
}
