'use client'

import { FC, memo } from 'react'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'

import type { NavSectionProps } from '../../types'
import Group from './Group'

const NavSectionVertical: FC<NavSectionProps> = ({ navData, slotProps, ...other }) => (
  <Stack component="nav" id="nav-section-vertical" {...other} sx={{flexGrow: 1, height: '100%', justifyContent: 'space-between'}}>
    <Box sx={{flexGrow: 1, flexDirection: 'column'}}>
    {navData.filter(({bottomFixed}) => !bottomFixed).map((group, index) => (
      <Group
      key={group.subheader || index}
      subheader={group.subheader}
      items={group.items}
      slotProps={slotProps}
      />
    ))}
    </Box>

    <Box justifySelf="flex-end" pb={3}>
    {navData.filter(({bottomFixed}) => bottomFixed).map((group, index) => (
      <Group
      key={group.subheader || index}
      subheader={group.subheader}
      items={group.items}
      slotProps={slotProps}
      />
    ))}
    </Box>
  </Stack>
)

export default memo(NavSectionVertical)
