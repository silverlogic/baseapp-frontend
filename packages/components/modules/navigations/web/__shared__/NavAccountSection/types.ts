import { FC } from 'react'

import { NotificationsPopoverProps } from '../../../../notifications/web/NotificationsPopover/types'
import { AccountMenuProps } from '../../Header/AccountMenu/types'

export interface NavAccountSectionProps {
  AccountMenu?: FC<AccountMenuProps>
  AccountMenuProps?: Partial<AccountMenuProps>
  NotificationsPopover?: FC<NotificationsPopoverProps>
  NotificationsPopoverProps?: Partial<NotificationsPopoverProps>
  currentLayout: 'vertical' | 'mini' | 'horizontal' | 'centered'
}
