import { ArrowIosForwardIcon } from '@baseapp-frontend/design-system/components/web/icons'
import { useUISettings } from '@baseapp-frontend/design-system/hooks/web'
import { bgBlur } from '@baseapp-frontend/design-system/styles/web'

import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'

import { ToggleButtonProps } from './types'

export default function ToggleButton({ sx, onClick, Icon, ...other }: ToggleButtonProps) {
  const { settings, setSettings } = useUISettings()
  const theme = useTheme()

  const IconComponent = Icon ?? ArrowIosForwardIcon
  const deg = settings.themeLayout === 'sidebar' ? '180deg' : '0deg'

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
        height: '28px',
        width: '28px',
        top: 32,
        right: -28,
        position: 'absolute',
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
      <IconComponent sx={{ fontSize: '20px', transform: `rotate(${deg})`, transition: 'all 0.25s linear',}} />
    </IconButton>
  )
}
