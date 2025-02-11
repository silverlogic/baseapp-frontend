'use client'

import { FC, useCallback, useState } from 'react'

import Collapse from '@mui/material/Collapse'
import ListSubheader from '@mui/material/ListSubheader'
import Stack from '@mui/material/Stack'

import NavList from './NavList'
import type { GroupProps } from './types'

const Group: FC<GroupProps> = ({ subheader, items, slotProps }) => {
  const [open, setOpen] = useState(true)

  const handleToggle = useCallback(() => {
    setOpen((prev) => !prev)
  }, [])

  const content = items.map((list) => (
    <NavList key={list.title} data={list} depth={1} slotProps={slotProps} />
  ))

  return (
    <Stack sx={{ px: 2 }}>
      {subheader ? (
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
              mb: `${slotProps?.gap ?? 4}px`,
              p: (theme) => theme.spacing(2, 1, 1, 1.5),
              transition: (theme) =>
                theme.transitions.create(['color'], {
                  duration: theme.transitions.duration.shortest,
                }),
              '&:hover': {
                color: 'text.primary',
              },
              ...slotProps?.subheader,
            }}
          >
            {subheader}
          </ListSubheader>

          <Collapse in={open}>{content}</Collapse>
        </>
      ) : (
        content
      )}
    </Stack>
  )
}

export default Group
