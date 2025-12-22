import { FC } from 'react'

import { MessageItemFragment } from '@baseapp-frontend/components/messages/common'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'

import { useFragment } from 'react-relay'

import { SystemMessageProps } from './types'

const SystemMessage: FC<SystemMessageProps> = ({ messageRef }) => {
  const message = useFragment(MessageItemFragment, messageRef)

  return <Text variant="caption">{message.content}</Text>
}

export { SystemMessage }
