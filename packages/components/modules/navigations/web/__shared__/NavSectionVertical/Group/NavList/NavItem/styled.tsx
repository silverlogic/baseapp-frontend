import ListItemButton from '@mui/material/ListItemButton'
import { alpha, styled } from '@mui/material/styles'

import type { NavItemStateProps } from '../../../../../types'

export const StyledNavItem = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active',
})<NavItemStateProps>(({ active, open, depth, theme }) => {
  const subItem = depth !== 1

  const opened = open && !active

  const deepSubItem = Number(depth) > 2

  const noWrapStyles = {
    width: '100%',
    maxWidth: '100%',
    display: 'block',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  } as const

  const baseStyles = {
    item: {
      marginBottom: 4,
      borderRadius: 8,
      color: theme.palette.primary.main,
      padding: theme.spacing(0.5, 1, 0.5, 1.5),
    },
    icon: {
      width: 24,
      height: 24,
      flexShrink: 0,
      marginRight: theme.spacing(2),
    },
    label: {
      ...noWrapStyles,
      ...theme.typography.body2,
      textTransform: 'capitalize',
      fontWeight: theme.typography[active ? 'fontWeightSemiBold' : 'fontWeightMedium'],
    },
    caption: {
      ...noWrapStyles,
      ...theme.typography.caption,
      color: theme.palette.text.disabled,
    },
    info: {
      display: 'inline-flex',
      marginLeft: theme.spacing(0.75),
    },
    arrow: {
      flexShrink: 0,
      marginLeft: theme.spacing(0.75),
    },
  } as const

  return {
    // Root item
    ...(!subItem && {
      ...baseStyles.item,
      minHeight: 44,
      '& .icon': {
        ...baseStyles.icon,
      },
      '& .sub-icon': {
        display: 'none',
      },
      '& .label': {
        ...baseStyles.label,
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
        color:
          theme.palette.mode === 'light' ? theme.palette.primary.dark : theme.palette.primary.main,
        backgroundColor: alpha(theme.palette.primary.main, 0.08),
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.16),
        },
      }),
      ...(opened && {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.action.hover,
      }),
    }),

    // Sub item
    ...(subItem && {
      ...baseStyles.item,
      minHeight: 36,
      '& .icon': {
        ...baseStyles.icon,
      },
      '& .sub-icon': {
        ...baseStyles.icon,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:before': {
          content: '""',
          width: 4,
          height: 4,
          borderRadius: '50%',
          backgroundColor: theme.palette.text.disabled,
          transition: theme.transitions.create(['transform'], {
            duration: theme.transitions.duration.shorter,
          }),
          ...(active && {
            transform: 'scale(2)',
            backgroundColor: theme.palette.primary.main,
          }),
        },
      },
      '& .label': {
        ...baseStyles.label,
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
      }),
    }),
    '&:hover': {
      svg: {
        color: active ? theme.palette.primary.dark : theme.palette.primary.main,
      },
    },
    svg: {
      color: active ? theme.palette.primary.dark : theme.palette.primary.main,
    },

    // Deep sub item
    ...(deepSubItem && {
      paddingLeft: `${theme.spacing(Number(depth))} !important`,
    }),
  }
})
