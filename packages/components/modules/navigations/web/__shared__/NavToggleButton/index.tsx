import { ChevronIcon } from '@baseapp-frontend/design-system/components/web/icons'
import { useUISettings } from '@baseapp-frontend/design-system/hooks/web'
import { bgBlur } from '@baseapp-frontend/design-system/styles/web'

import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'

import { NAV_WIDTH } from '../../constants'
import { NavToggleButtonProps } from './types'

export default function NavToggleButton({ sx, ...other }: NavToggleButtonProps) {
  const { settings, setSettings } = useUISettings()
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
        left: NAV_WIDTH.VERTICAL - 12,
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
