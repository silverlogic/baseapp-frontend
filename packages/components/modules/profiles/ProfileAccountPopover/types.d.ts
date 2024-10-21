import { AccountPopoverProps } from '../../navigations/Header/AccountMenu/AccountPopover/types'
import { ProfilesSubmenusListProps } from './ProfilesSubmenusList/types'

export interface ProfileAccountPopoverProps extends AccountPopoverProps {
  switchProfileLabel?: string
  addNewProfileLabel?: string
  ProfilesSubmenusListProps?: Partial<ProfilesSubmenusListProps>
}
