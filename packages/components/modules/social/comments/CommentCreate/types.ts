import { FC } from 'react'

import { SocialInputProps } from '../../SocialInput/types'

export interface CommentCreateProps {
  targetObjectId: string
  autoFocusInput?: boolean
  profileId?: string
  SocialInput?: FC<SocialInputProps>
  SocialInputProps?: Partial<SocialInputProps>
}
