import { FC } from 'react'

import { MessageItemFragment$data } from '../../../__generated__/MessageItemFragment.graphql'
import { type SocialInputProps } from '../../__shared__/SocialInput/types'

export interface MessageUpdateProps {
  message: MessageItemFragment$data
  onCancel: () => void
  SocialInput?: FC<SocialInputProps>
  SocialInputProps?: Partial<SocialInputProps>
}
