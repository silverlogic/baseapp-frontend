import { FC } from 'react'

import { Box, List, MenuItem, Stack } from '@mui/material'

import { MenuItemsProps } from './types'

const MenuItems: FC<MenuItemsProps> = ({ handlePopoverOnClose, menuItems }) => {
  if (!menuItems || !menuItems.length) return null
  return (
    <Box margin={1.5}>
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
    </Box>
  )
}

export default MenuItems
