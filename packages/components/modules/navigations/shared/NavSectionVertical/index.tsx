'use client'

import { FC, memo } from 'react'

import Stack from '@mui/material/Stack'

import type { NavSectionProps } from '../../types'
import Group from './Group'

const NavSectionVertical: FC<NavSectionProps> = ({ navData, slotProps, ...other }) => (
  <Stack component="nav" id="nav-section-vertical" {...other}>
    {navData.map((group, index) => (
      <Group
        key={group.subheader || index}
        subheader={group.subheader}
        items={group.items}
        slotProps={slotProps}
      />
    ))}
  </Stack>
)

export default memo(NavSectionVertical)
