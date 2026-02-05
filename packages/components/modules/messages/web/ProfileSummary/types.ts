import { PreloadedQuery } from 'react-relay'

import { ChatRoomQuery } from '../../../../__generated__/ChatRoomQuery.graphql'

export type ProfileSummaryProps = {
  queryRef: PreloadedQuery<ChatRoomQuery>
  onBackButtonClicked: () => void
}
