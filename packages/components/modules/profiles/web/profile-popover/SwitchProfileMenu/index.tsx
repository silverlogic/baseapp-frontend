import { FC } from 'react'

import { ChevronIcon } from '@baseapp-frontend/design-system/components/web/icons'

import { Box, ButtonBase, MenuItem, Stack } from '@mui/material'

import { SwitchProfileMenuProps } from './types'

const SwitchProfileMenu: FC<SwitchProfileMenuProps> = ({
  openProfilesList,
  switchProfileLabel = 'Switch Profile',
}) => (
  <Box sx={{ m: 1.5, mt: 0.5 }}>
    <Stack>
      <MenuItem
        tabIndex={0}
        component={ButtonBase}
        sx={{ justifyContent: 'space-between' }}
        onClick={openProfilesList}
      >
        {switchProfileLabel}
        <ChevronIcon position="right" color="action" />
      </MenuItem>
    </Stack>
  </Box>
)

export default SwitchProfileMenu
