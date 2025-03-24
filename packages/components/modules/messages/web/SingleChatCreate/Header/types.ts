import { IconifyProps } from '@baseapp-frontend/design-system/components/web/images'

import { TypographyProps } from '@mui/material'

export interface HeaderProps {
  backIcon?: IconifyProps['icon']
  backIconProps?: Partial<Omit<IconifyProps, 'ref'>>
  onHeaderClick: () => void
  title?: string
  titleProps?: TypographyProps
}
