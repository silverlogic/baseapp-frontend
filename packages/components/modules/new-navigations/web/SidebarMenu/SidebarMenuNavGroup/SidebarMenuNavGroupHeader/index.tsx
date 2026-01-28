import { FC } from 'react'

import { ListSubheader } from '@mui/material'

import { SidebarMenuNavGroupHeaderProps } from './types'

const SidebarMenuNavGroupHeader: FC<SidebarMenuNavGroupHeaderProps> = ({
  children,
  title,
  disabled = false,
  ...props
}) => {

  return (
    <>
      <ListSubheader
        disableGutters
        disableSticky
        sx={{
          fontSize: 11,
          cursor: 'pointer',
          typography: 'overline',
          display: 'inline-flex',
          color: 'text.disabled',
          mb: (theme) => theme.spacing(0.5),
          p: (theme) => theme.spacing(2, 1, 1, 1.5),
          transition: (theme) =>
            theme.transitions.create(['color'], {
              duration: theme.transitions.duration.shortest,
            }),
          '&:hover': {
            color: 'text.primary',
          },
          ...props.sx,
        }}
        {...props}
      >
        {title}
      </ListSubheader>
    </>
  )
}

export default SidebarMenuNavGroupHeader
