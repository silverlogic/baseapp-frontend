import { FC } from 'react'

import { ChevronIcon } from '@baseapp-frontend/design-system/components/web/icons'

import { Box, ButtonBase, MenuItem, Stack } from '@mui/material'
import { FormattedMessage } from 'react-intl'

import { SwitchProfileMenuProps } from './types'

const SwitchProfileMenu: FC<SwitchProfileMenuProps> = ({
  openProfilesList,
  switchProfileLabel,
}) => (
  <Box sx={{ m: 1.5, mt: 0.5 }}>
    <Stack>
      <MenuItem
        tabIndex={0}
        component={ButtonBase}
        sx={{ justifyContent: 'space-between' }}
        onClick={openProfilesList}
      >
        {switchProfileLabel ?? (
          <FormattedMessage id="profiles.switchProfileMenu.label" defaultMessage="Switch Profile" />
        )}
        <ChevronIcon position="right" color="action" />
      </MenuItem>
    </Stack>
  </Box>
)

export default SwitchProfileMenu
