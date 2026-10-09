import { defineMessages } from 'react-intl'

export const CHAT_ROOM_ITEM_MESSAGES = defineMessages({
  itemTitle: {
    id: 'messages.chatRoomItem.itemTitle',
    defaultMessage: 'Chat',
  },
  markAsUnread: {
    id: 'messages.chatRoomItem.markAsUnread',
    defaultMessage: 'Mark as Unread',
  },
  deleteDialogTitle: {
    id: 'messages.chatRoomItem.deleteDialog.title',
    defaultMessage: 'Delete Chat?',
  },
  monthsAgo: {
    id: 'messages.chatRoomItem.date.monthsAgo',
    defaultMessage: '{count, plural, one {# month ago} other {# months ago}}',
  },
  weeksAgo: {
    id: 'messages.chatRoomItem.date.weeksAgo',
    defaultMessage: '{count, plural, one {# week ago} other {# weeks ago}}',
  },
  daysAgo: {
    id: 'messages.chatRoomItem.date.daysAgo',
    defaultMessage: '{count, plural, one {# day ago} other {# days ago}}',
  },
})
