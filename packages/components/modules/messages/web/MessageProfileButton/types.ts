import { ReactNode } from 'react'

import { LoadingButtonProps } from '@mui/lab'

export interface MessageProfileButtonProps {
  /** The profile to open a chat with. */
  profileId: string
  /**
   * The profile the chat is created as. Defaults to the current (active) profile, so a user who
   * switched to an organization messages as that organization.
   */
  actorProfileId?: string
  /** Called with the room's relay id once it exists, whether it was created or already there. */
  onRoomReady?: (roomId: string) => void
  label?: ReactNode
  ButtonProps?: Omit<LoadingButtonProps, 'onClick' | 'loading'>
}
