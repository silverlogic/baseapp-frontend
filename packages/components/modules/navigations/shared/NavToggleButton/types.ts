import { UISettings } from '@baseapp-frontend/design-system'

import { IconButtonProps } from '@mui/material/IconButton'

export interface NavToggleButtonProps extends IconButtonProps {
  settings: UISettings
  setSettings: (newSettings: Partial<UISettings>) => void
}
