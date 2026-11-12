import { FC } from 'react'

import { ProfileComponentFragment$key } from '../../../../__generated__/ProfileComponentFragment.graphql'

export interface ProfileComponentMessageButtonProps {
  profileId: string
}

export interface ProfileComponentProps {
  profile: ProfileComponentFragment$key
  currentProfileId?: string
  bannerFallback?: string
  /**
   * Rendered next to the follow button on other profiles, e.g. `MessageProfileButton` from
   * `@baseapp-frontend/components/messages/web`. Nothing is rendered by default.
   */
  MessageButton?: FC<ProfileComponentMessageButtonProps> | null
}
