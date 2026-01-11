import { FC, useCallback, useState } from 'react'

import { Collapse, ListSubheader } from '@mui/material'

import { SidebarMenuListHeaderProps } from './types'

const SidebarMenuListHeader: FC<SidebarMenuListHeaderProps> = ({ children, title, ...props }) => {
  const [open, setOpen] = useState(false)

  const handleToggle = useCallback(() => {
    setOpen((prev) => !prev)
  }, [])

  return (
    <>
      <ListSubheader
        disableGutters
        disableSticky
        onClick={handleToggle}
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
      <Collapse in={open}>{children}</Collapse>
    </>
  )
}

export default SidebarMenuListHeader
