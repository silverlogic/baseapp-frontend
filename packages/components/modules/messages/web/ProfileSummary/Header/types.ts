import { IconifyProps } from '@baseapp-frontend/design-system/components/web/images'

export interface HeaderProps {
  backIcon?: IconifyProps['icon']
  backIconProps?: Partial<Omit<IconifyProps, 'ref'>>
  onBackButtonClicked: VoidFunction
}
