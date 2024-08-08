import { FC, memo } from 'react'

import Stack from '@mui/material/Stack'

import type { NavSectionProps } from '../../types'
import NavList from './NavList'

const NavSectionMini: FC<NavSectionProps> = ({ navData, slotProps, ...other }) => (
  <Stack component="nav" id="nav-section-mini" spacing={`${slotProps?.gap ?? 4}px`} {...other}>
    {navData.map((group) =>
      group.items.map((list) => (
        <NavList key={list.title} data={list} depth={1} slotProps={slotProps} />
      )),
    )}
  </Stack>
)

export default memo(NavSectionMini)
