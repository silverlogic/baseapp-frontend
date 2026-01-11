import { ChevronIcon } from '@baseapp-frontend/design-system/components/web/icons'
import { useUISettings } from '@baseapp-frontend/design-system/hooks/web'
import { bgBlur } from '@baseapp-frontend/design-system/styles/web'

import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'

import { ToggleButtonProps } from './types'

export default function ToggleButton({ sx, onClick, ...other }: ToggleButtonProps) {
  const { settings, setSettings } = useUISettings()
  const theme = useTheme()

  return (
    <IconButton
      size="small"
      onClick={() => {
        if (onClick) {
          onClick()
        }
        setSettings({ themeLayout: settings.themeLayout === 'sidebar' ? 'mini' : 'sidebar' })
      }}
      sx={{
        p: 0.5,
        height: '24px',
        width: '24px',
        top: 32,
        position: 'relative',
        transform: 'translateX(-50%)',
        transformOrigin: 'center',
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
