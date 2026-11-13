import { defineMessages } from 'react-intl'

export const MESSAGE_ITEM_MESSAGES = defineMessages({
  itemTitle: {
    id: 'messages.messageItem.itemTitle',
    defaultMessage: 'message',
  },
  deleted: {
    id: 'messages.messageItem.deletedToast',
    defaultMessage: 'Your message was deleted',
  },
  copied: {
    id: 'messages.messageItem.copiedToast',
    defaultMessage: 'Message copied to clipboard.',
  },
  copy: {
    id: 'messages.messageItem.actions.copy',
    defaultMessage: 'Copy',
  },
  edit: {
    id: 'common.edit',
    defaultMessage: 'Edit',
  },
  downloadAttachments: {
    id: 'messages.messageItem.actions.downloadAttachments',
    defaultMessage: 'Download Attachments',
  },
  deleteDialogTitle: {
    id: 'messages.messageItem.deleteDialog.title',
    defaultMessage: 'Delete message?',
  },
  deleteDialogContentGroup: {
    id: 'messages.messageItem.deleteDialog.contentGroup',
    defaultMessage:
      'Are you sure you want to delete this message? The message will be deleted for everyone in this chat.',
  },
  deleteDialogContentDirect: {
    id: 'messages.messageItem.deleteDialog.contentDirect',
    defaultMessage:
      'Are you sure you want to delete this message? The message will be deleted for both you and the other person.',
  },
})
