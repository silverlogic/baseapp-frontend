import { ChevronIcon, bgBlur } from '@baseapp-frontend/design-system'

import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'

import { NAV } from '../../constants'
import { NavToggleButtonProps } from './types'

export default function NavToggleButton({
  settings,
  setSettings,
  sx,
  ...other
}: NavToggleButtonProps) {
  const theme = useTheme()

  return (
    <IconButton
      size="small"
      onClick={() =>
        setSettings({ themeLayout: settings.themeLayout === 'vertical' ? 'mini' : 'vertical' })
      }
      sx={{
        p: 0.5,
        top: 32,
        position: 'fixed',
        left: NAV.W_VERTICAL - 12,
        zIndex: theme.zIndex.appBar + 1,
        border: `solid 1px ${theme.palette.divider}`,
        ...bgBlur({ opacity: 0.48, color: theme.palette.background.default }),
        '&:hover': {
          bgcolor: 'background.default',
        },
        ...sx,
      }}
      {...other}
    >
      <ChevronIcon isOpen={settings.themeLayout === 'vertical'} position="right" />
    </IconButton>
  )
}
