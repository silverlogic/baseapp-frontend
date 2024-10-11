import { FC } from 'react'

import { SocialTextFieldFormProps } from '../SocialTextFieldForm/types'

export interface SendMessageProps {
  profileId: string
  roomId: string
  SocialTextFieldForm?: FC<SocialTextFieldFormProps>
  SocialTextFieldFormProps?: Partial<SocialTextFieldFormProps>
}
