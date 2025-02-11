import { FC } from 'react'

import type { SocialInputProps } from '../../../__shared__/web'

export interface CommentCreateProps {
  targetObjectId: string
  autoFocusInput?: boolean
  SocialInput?: FC<SocialInputProps>
  SocialInputProps?: Partial<SocialInputProps>
}
