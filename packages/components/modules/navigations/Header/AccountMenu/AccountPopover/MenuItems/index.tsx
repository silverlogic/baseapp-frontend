import { FC } from 'react'

import { List, MenuItem, Stack } from '@mui/material'

import { PopoverContentBox } from '../styled'
import { MenuItemsProps } from './types'

const MenuItems: FC<MenuItemsProps> = ({ handlePopoverOnClose, menuItems }) => {
  if (!menuItems || !menuItems.length) return null
  return (
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
}

export default MenuItems
