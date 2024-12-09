import { ChatRoomHeaderFragment$data } from '../../../__generated__/ChatRoomHeaderFragment.graphql'

export const isGroupChat = (chatRoom: ChatRoomHeaderFragment$data) => chatRoom.title !== null

export const getParticipantCount = (chatRoom: ChatRoomHeaderFragment$data) =>
  chatRoom.participants?.edges.length
