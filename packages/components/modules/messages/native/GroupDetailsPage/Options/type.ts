import { FC } from 'react'

import { SvgIconProps } from '@baseapp-frontend/design-system/components/native/illustrations'

export interface OptionsProps {
  handleArchiveChat: () => void
  handleLeaveGroup: () => void
  isArchiveMutationInFlight: boolean
  isArchived: boolean
  ArchiveIcon?: FC<SvgIconProps>
  ArchiveIconProps?: Partial<SvgIconProps>
  LeaveIcon?: FC<SvgIconProps>
  LeaveIconProps?: Partial<SvgIconProps>
}
