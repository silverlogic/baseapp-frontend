import { FC } from 'react'

import { SocialInputProps } from '../../SocialInput/types'

export interface SendMessageProps {
  profileId: string
  roomId: string
  SocialInput?: FC<SocialInputProps>
  SocialInputProps?: Partial<SocialInputProps>
}
