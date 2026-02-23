import { Dispatch, FC, SetStateAction } from 'react'

import { AddProfileMenuItemProps, ProfilesListProps } from '../../../../../../profiles/web'
import { CurrentProfileMenuProps } from '../../AccountPopover/CurrentProfileMenu/types'
import { LogoutItemProps } from '../../AccountPopover/LogoutItem/types'

export interface PopoverContentProps extends Omit<
  CurrentProfileMenuProps,
  'handlePopoverOnClose' | 'setOpenProfilesList'
> {
  ProfilesList?: FC<ProfilesListProps>
  ProfilesListProps?: Partial<ProfilesListProps>
  openProfilesList: boolean
  setOpenProfilesList: Dispatch<SetStateAction<boolean>>
  handlePopoverOnClose: () => void
  AddProfileMenuItem?: FC<AddProfileMenuItemProps> | null
  AddProfileMenuItemProps?: Partial<AddProfileMenuItemProps>
  LogoutItemProps?: Partial<LogoutItemProps>
}
