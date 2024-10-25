import { AccountPopoverProps } from '../../navigations/Header/AccountMenu/AccountPopover/types'
import { ProfilesSubmenusListProps } from './ProfilesList/types'

export interface ProfilePopoverProps extends AccountPopoverProps {
  switchProfileLabel?: string
  addNewProfileLabel?: string
  ProfilesSubmenusListProps?: Partial<ProfilesSubmenusListProps>
}
