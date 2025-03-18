import { FC } from 'react'

import { SocialInputProps } from '../../../__shared__/web'

export interface MessageCreateProps {
  roomId: string
  SocialInput?: FC<SocialInputProps>
  SocialInputProps?: Partial<SocialInputProps>
}
