import { FC } from 'react'

import { ChevronIcon } from '@baseapp-frontend/design-system'

import { ButtonBase, MenuItem, Stack } from '@mui/material'

import { PopoverContentBox } from '../../../navigations/Header/AccountMenu/AccountPopover/styled'
import { SwitchProfileMenuProps } from './types'

const SwitchProfileMenu: FC<SwitchProfileMenuProps> = ({
  openProfilesList,
  switchProfileLabel = 'Switch Profile',
}) => (
  <PopoverContentBox>
    <Stack>
      <MenuItem
        component={ButtonBase}
        sx={{ justifyContent: 'space-between' }}
        onClick={openProfilesList}
      >
        {switchProfileLabel}
        <ChevronIcon position="right" color="action" />
      </MenuItem>
    </Stack>
  </PopoverContentBox>
)

export default SwitchProfileMenu
