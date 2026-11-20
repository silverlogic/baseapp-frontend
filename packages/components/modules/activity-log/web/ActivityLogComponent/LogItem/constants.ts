import { defineMessages } from 'react-intl'

export const VERB_MESSAGES = defineMessages({
  'comments.add_comment': {
    id: 'activityLog.logItem.verb.addComment',
    defaultMessage: 'Created a comment',
  },
  'comments.change_comment': {
    id: 'activityLog.logItem.verb.changeComment',
    defaultMessage: 'Edited a comment',
  },
  'comments.delete_comment': {
    id: 'activityLog.logItem.verb.deleteComment',
    defaultMessage: 'Deleted a comment',
  },
  'comments.reply_comment': {
    id: 'activityLog.logItem.verb.replyComment',
    defaultMessage: 'Replied to a comment',
  },
  'comments.pin_comment': {
    id: 'activityLog.logItem.verb.pinComment',
    defaultMessage: 'Pinned a comment',
  },
  'baseapp_reactions.add_reaction': {
    id: 'activityLog.logItem.verb.addReaction',
    defaultMessage: 'Added a reaction',
  },
})
