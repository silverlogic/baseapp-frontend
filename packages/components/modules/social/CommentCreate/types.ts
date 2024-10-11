import { FC } from 'react'

import { SocialTextFieldFormProps } from '../SocialTextFieldForm/types'

export interface CommentCreateProps {
  targetObjectId: string
  autoFocusInput?: boolean
  placeholder?: string
  profileId?: string
  SocialTextFieldForm?: FC<SocialTextFieldFormProps>
  SocialTextFieldFormProps?: Partial<SocialTextFieldFormProps>
}
