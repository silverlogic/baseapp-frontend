'use client'

import { FC, useCallback, useState } from 'react'

import Collapse from '@mui/material/Collapse'
import Stack from '@mui/material/Stack'

import NavList from './NavList'
import { GroupSubheader } from './styled'
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
          <GroupSubheader
            disableGutters
            disableSticky
            onClick={handleToggle}
            gap={slotProps?.gap}
            sx={slotProps?.subheader}
          >
            {subheader}
          </GroupSubheader>

          <Collapse in={open}>{content}</Collapse>
        </>
      ) : (
        content
      )}
    </Stack>
  )
}

export default Group
