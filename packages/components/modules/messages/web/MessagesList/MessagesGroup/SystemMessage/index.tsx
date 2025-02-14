import { FC } from 'react'

import { useFragment } from 'react-relay'

import { MessageItemFragment } from '../../../../common'
import { SystemMessageTypography } from './styled'
import { SystemMessageProps } from './types'

const SystemMessage: FC<SystemMessageProps> = ({ messageRef }) => {
  const message = useFragment(MessageItemFragment, messageRef)

  return (
    <SystemMessageTypography color="grey.700" variant="caption">
      {message.content}
    </SystemMessageTypography>
  )
}

export default SystemMessage
