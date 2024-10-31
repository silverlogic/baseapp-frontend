import { FC } from 'react'

import { List, MenuItem, Stack } from '@mui/material'

import { PopoverContentBox } from '../styled'
import { MenuItemsProps } from './types'

const MenuItems: FC<MenuItemsProps> = ({ menuItems, handlePopoverOnClose }) => (
  <PopoverContentBox>
    <Stack component={List}>
      {menuItems?.map((item) => (
        <MenuItem
          key={item.label}
          onClick={() => {
            item.onClick()
            handlePopoverOnClose()
          }}
        >
          {item.label}
        </MenuItem>
      ))}
    </Stack>
  </PopoverContentBox>
)

export default MenuItems
