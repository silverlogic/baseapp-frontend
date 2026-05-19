import { CHAT_TAB_VALUES } from '../RoomsList/RoomsListComponent/constants'
import { ChatTabValues } from '../RoomsList/RoomsListComponent/types'

export const DEFAULT_TAB_ORDER: ChatTabValues[] = [
  CHAT_TAB_VALUES.active,
  CHAT_TAB_VALUES.unread,
  CHAT_TAB_VALUES.groups,
  CHAT_TAB_VALUES.archived,
]

export const getVisibleTabs = (hiddenTabs: ChatTabValues[] = []): ChatTabValues[] =>
  DEFAULT_TAB_ORDER.filter((value) => !hiddenTabs.includes(value))
