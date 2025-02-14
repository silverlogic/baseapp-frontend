import { LinkProps } from '@mui/material'

import {
  NavItemProps as GenericNavItemProps,
  NavItemBaseProps,
  NavItemStateProps,
} from '../../../../types'

export interface StyledNavItemProps extends NavItemStateProps {
  hasTabLayout?: boolean
}

export interface StyledLinkProps
  extends LinkProps,
    Pick<NavItemStateProps, 'active'>,
    Pick<NavItemBaseProps, 'disabled'> {
  hasTabLayout?: boolean
}

export interface NavItemProps extends GenericNavItemProps {
  hasTabLayout?: boolean
}
