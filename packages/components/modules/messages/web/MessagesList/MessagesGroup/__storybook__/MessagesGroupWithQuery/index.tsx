import { graphql, useLazyLoadQuery } from 'react-relay'

import MessagesGroup from '../..'
import { MessagesGroupWithQuery as Query } from '../../../../../../../__generated__/MessagesGroupWithQuery.graphql'
import { MESSAGE_TYPE } from '../../../../../common'

const MessagesGroupWithQuery = () => {
  const data = useLazyLoadQuery<Query>(
    graphql`
      query MessagesGroupWithQuery @relay_test_operation {
        node(id: "msg-1") {
          __typename
          ... on Message {
            id
            messageType
            created
            profile {
              id
              name
              image(width: 32, height: 32) {
                url
              }
            }
            isRead
            ...MessageItemFragment
          }
        }
      }
    `,
    {},
  )

  const allMessages = [
    {
      ...data.node,
      id: 'msg-0',
      messageType: MESSAGE_TYPE.user,
      created: new Date().toISOString(),
      profile: {
        id: 'profile-456',
        name: 'Alice',
        image: { url: '' },
      },
      isRead: true,
    },
    data.node,
  ]

  return (
    <MessagesGroup
      allMessages={allMessages}
      allMessagesLastIndex={1}
      message={data.node}
      messageIndex={1}
      hasNext={false}
      isGroup
    />
  )
}

export default MessagesGroupWithQuery
