import { ComponentType } from 'react'

import { IconifyProps } from '@baseapp-frontend/design-system/components/web/images'

export interface HeaderProps {
  backIcon?: IconifyProps['icon']
  backIconProps?: Partial<Omit<IconifyProps, 'ref'>>
  EditIcon?: ComponentType
  onBackButtonClicked: VoidFunction
  onEditButtonClicked?: VoidFunction
  shouldDisplayEditButton: boolean
}
