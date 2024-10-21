import { FC } from 'react'

import type { SocialInputProps } from '../../__shared__/SocialInput/types'

export interface CommentCreateProps {
  targetObjectId: string
  autoFocusInput?: boolean
  profileId?: string
  SocialInput?: FC<SocialInputProps>
  SocialInputProps?: Partial<SocialInputProps>
}
