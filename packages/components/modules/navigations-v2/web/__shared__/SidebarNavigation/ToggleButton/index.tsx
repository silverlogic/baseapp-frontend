import { ChevronIcon } from '@baseapp-frontend/design-system/components/web/icons'
import { useUISettings } from '@baseapp-frontend/design-system/hooks/web'
import { bgBlur } from '@baseapp-frontend/design-system/styles/web'

import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'

import { ToggleButtonProps } from './types'

export default function ToggleButton({ onClick, ...props }: ToggleButtonProps) {
  const { settings, setSettings } = useUISettings()
  const theme = useTheme()

  const handleOnClick = () => {
    onClick?.()
    setSettings({ collapsedSidebar: !settings.collapsedSidebar })
  }

  return (
    <IconButton
      size="small"
      onClick={handleOnClick}
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
        ...props.sx,
      }}
      {...props}
    >
      <ChevronIcon isOpen={!settings.collapsedSidebar} position="right" />
    </IconButton>
  )
}
