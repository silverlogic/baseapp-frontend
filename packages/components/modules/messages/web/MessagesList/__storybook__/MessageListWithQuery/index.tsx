import { graphql, useLazyLoadQuery } from 'react-relay'

import MessagesList from '../..'
import { MessageListWithQuery as Query } from '../../../../../../__generated__/MessageListWithQuery.graphql'
import { MessagesListFragment$key } from '../../../../../../__generated__/MessagesListFragment.graphql'

const MessageListWithQuery = () => {
  const data = useLazyLoadQuery<Query>(
    graphql`
      query MessageListWithQuery @relay_test_operation {
        chatRoom(id: "room-123") {
          ...MessagesListFragment
        }
      }
    `,
    {},
  )

  return <MessagesList roomRef={data.chatRoom as MessagesListFragment$key} />
}

export default MessageListWithQuery
