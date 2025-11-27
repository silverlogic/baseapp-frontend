import { ChatRoomsQuery$data } from '../../../../__generated__/ChatRoomsQuery.graphql'

export interface RoomsListProps {
  targetRef: ChatRoomsQuery$data
  searchParam: string
  selectedTab: string
}
