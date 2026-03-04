import { FC } from 'react'

import { LeaveGroupDialogProps } from '../__shared__/LeaveGroupDialog/types'
import { GroupProfileProps } from './GroupProfile/types'
import { MembersProps } from './Members/type'
import { OptionsProps } from './Options/type'

export interface GroupDetailsPageProps {
  roomId: string
  LeaveGroupDialog?: FC<LeaveGroupDialogProps>
  LeaveGroupDialogProps?: Partial<LeaveGroupDialogProps>
  GroupProfile?: FC<GroupProfileProps>
  GroupProfileProps?: Partial<GroupProfileProps>
  Members?: FC<MembersProps>
  MembersProps?: Partial<MembersProps>
  Options?: FC<OptionsProps>
  OptionsProps?: Partial<OptionsProps>
}
