import { FC } from 'react'

import { ChevronIcon as DefaultChevronIcon } from '@baseapp-frontend/design-system/components/web/icons'
import { useUISettings } from '@baseapp-frontend/design-system/hooks/web'

import { ToggleButton } from './styled'
import { NavToggleButtonProps } from './types'

const NavToggleButton: FC<NavToggleButtonProps> = ({
  sx,
  ChevronIcon = DefaultChevronIcon,
  ChevronIconProps = {},
  ...other
}) => {
  const { settings, setSettings } = useUISettings()

  return (
    <ToggleButton
      size="small"
      onClick={() =>
        setSettings({ themeLayout: settings.themeLayout === 'vertical' ? 'mini' : 'vertical' })
      }
      sx={sx}
      {...other}
    >
      <ChevronIcon
        isOpen={settings.themeLayout === 'vertical'}
        position="right"
        {...ChevronIconProps}
      />
    </ToggleButton>
  )
}

export default NavToggleButton
