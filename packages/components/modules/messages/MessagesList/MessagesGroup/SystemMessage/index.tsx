import { FC } from 'react'

import { useFragment } from 'react-relay'

import { MessageItemFragment } from '../../../graphql/queries/MessageItem'
import { useParsedMessageContent } from '../../../utils'
import { SystemMessageTypography } from './styled'
import { SystemMessageProps } from './types'

const SystemMessage: FC<SystemMessageProps> = ({ messageRef }) => {
  const message = useFragment(MessageItemFragment, messageRef)
  const content = useParsedMessageContent(message)

  return (
    <SystemMessageTypography color="grey.600" variant="caption">
      {content}
    </SystemMessageTypography>
  )
}

export default SystemMessage
