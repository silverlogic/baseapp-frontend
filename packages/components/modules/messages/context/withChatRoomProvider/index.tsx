import { FC } from 'react'

import ChatRoomProvider from '../ChatRoomProvider'

const withChatRoomProvider =
  <TProps extends {}>(Component: FC<TProps>) =>
  (props: TProps) => (
    <ChatRoomProvider>
      <Component {...props} />
    </ChatRoomProvider>
  )

export default withChatRoomProvider
