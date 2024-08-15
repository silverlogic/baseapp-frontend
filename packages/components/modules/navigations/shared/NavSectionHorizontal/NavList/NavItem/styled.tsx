import { Link, ListItemButton } from '@mui/material'
import { styled } from '@mui/material/styles'

import { StyledLinkProps, StyledNavItemProps } from './types'

export const StyledNavItem = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active',
})<StyledNavItemProps>(({ active, open, depth, theme, hasTabLayout }) => {
  const subItem = depth !== 1

  const opened = open && !active

  const baseStyles = {
    item: {
      ...theme.typography.body2,
      borderRadius: 6,
      color: theme.palette.text.secondary,
      fontWeight: theme.typography.fontWeightMedium,
    },
    icon: {
      width: 22,
      height: 22,
      flexShrink: 0,
      marginRight: theme.spacing(1),
    },
    label: {
      textTransform: 'capitalize',
    },
    caption: {
      marginLeft: theme.spacing(0.75),
      color: theme.palette.text.disabled,
    },
    info: {
      display: 'inline-flex',
      marginLeft: theme.spacing(0.75),
    },
    arrow: {
      marginLeft: theme.spacing(0.75),
    },
  } as const

  return {
    // Root item
    ...(!subItem && {
      ...baseStyles.item,
      minHeight: 32,
      flexShrink: 0,
      padding: theme.spacing(0, 0.75),
      '& .icon': {
        ...baseStyles.icon,
      },
      '& .label': {
        ...baseStyles.label,
        whiteSpace: 'nowrap',
      },
      '& .caption': {
        ...baseStyles.caption,
      },
      '& .info': {
        ...baseStyles.info,
      },
      '& .arrow': {
        ...baseStyles.arrow,
      },
      ...(active && {
        color: theme.palette.text.primary,
        backgroundColor: hasTabLayout ? 'transparent' : theme.palette.action.selected,
        fontWeight: theme.typography.fontWeightSemiBold,
      }),
      ...(opened && {
        color: theme.palette.text.primary,
        backgroundColor: hasTabLayout ? 'transparent' : theme.palette.action.hover,
      }),
    }),

    // Sub item
    ...(subItem && {
      ...baseStyles.item,
      minHeight: 34,
      padding: theme.spacing(0, 1),
      '& .icon': {
        ...baseStyles.icon,
      },
      '& .label': {
        ...baseStyles.label,
        flexGrow: 1,
      },
      '& .caption': {
        ...baseStyles.caption,
      },
      '& .info': {
        ...baseStyles.info,
      },
      '& .arrow': {
        ...baseStyles.arrow,
        marginRight: theme.spacing(-0.5),
      },
      ...(active && {
        color: theme.palette.text.primary,
        backgroundColor: hasTabLayout ? 'transparent' : theme.palette.action.selected,
        fontWeight: theme.typography.fontWeightSemiBold,
      }),
      ...(opened && {
        color: theme.palette.text.primary,
        backgroundColor: hasTabLayout ? 'transparent' : theme.palette.action.hover,
      }),
    }),
    '&:hover': {
      ...(hasTabLayout && {
        backgroundColor: 'transparent',
      }),
      color: theme.palette.grey[800],
      svg: {
        color: theme.palette.grey[800],
      },
    },
    svg: {
      color: active ? theme.palette.grey[800] : theme.palette.grey[600],
    },
  }
})

export const StyledLink = styled(Link)<StyledLinkProps>(
  ({ theme, disabled, hasTabLayout, active }) => ({
    pointerEvents: disabled ? 'none' : 'cursor',
    display: 'flex',
    alignItems: 'center',
    borderBottom: hasTabLayout && active ? `2px solid ${theme.palette.grey[800]}` : 'none',
    '&:hover': {
      backgroundColor: hasTabLayout ? theme.palette.action.hover : 'transparent',
    },
    variants: [],
  }),
)
