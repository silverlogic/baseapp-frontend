import { FC } from 'react'

import { SocialInputProps } from '../../../__shared__/web'

export interface SendMessageProps {
  roomId: string
  SocialInput?: FC<SocialInputProps>
  SocialInputProps?: Partial<SocialInputProps>
}
