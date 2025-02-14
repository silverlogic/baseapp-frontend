import { FC } from 'react'

import { MessageItemFragment$data } from '../../../../__generated__/MessageItemFragment.graphql'
import { SocialInputProps } from '../../../__shared__/web'

export interface MessageUpdateProps {
  message: MessageItemFragment$data
  onCancel: () => void
  SocialInput?: FC<SocialInputProps>
  SocialInputProps?: Partial<SocialInputProps>
}
