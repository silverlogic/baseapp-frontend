import { FC } from 'react'

import { type SocialInputProps } from '../../__shared__/SocialInput/types'

export interface SendMessageProps {
  roomId: string
  SocialInput?: FC<SocialInputProps>
  SocialInputProps?: Partial<SocialInputProps>
}
