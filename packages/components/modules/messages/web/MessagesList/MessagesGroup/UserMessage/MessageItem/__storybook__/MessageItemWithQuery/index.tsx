import { graphql, useLazyLoadQuery } from 'react-relay'

import MessageItem from '../..'
import { MessageItemFragment$key } from '../../../../../../../../../__generated__/MessageItemFragment.graphql'
import { MessageItemWithQuery as Query } from '../../../../../../../../../__generated__/MessageItemWithQuery.graphql'

interface Props {
  isGroup?: boolean
  isFirstGroupedMessage?: boolean
}

const MessageItemWithQuery = ({ isGroup = false, isFirstGroupedMessage = true }: Props) => {
  const data = useLazyLoadQuery<Query>(
    graphql`
      query MessageItemWithQuery @relay_test_operation {
        node(id: "msg-1") {
          ... on Message {
            ...MessageItemFragment
            profile {
              id
            }
          }
        }
      }
    `,
    {},
  )

  return (
    <MessageItem
      messageRef={data.node as MessageItemFragment$key}
      isGroup={isGroup}
      isFirstGroupedMessage={isFirstGroupedMessage}
    />
  )
}

export default MessageItemWithQuery
