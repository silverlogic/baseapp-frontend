import { defineMessages } from 'react-intl'

export const LEAVE_GROUP_DIALOG_TEXT_COPY_ACTION_KEYS = {
  IS_LEAVING: 'IS_LEAVING',
  IS_REMOVING: 'IS_REMOVING',
} as const

export const LEAVE_GROUP_DIALOG_TEXT_COPY_ROLE_KEYS = {
  ADMIN: 'ADMIN',
  MEMBER: 'MEMBER',
} as const

export const LEAVE_GROUP_DIALOG_TEXT_COPY_TYPE_KEYS = {
  TITLE: 'TITLE',
  CONTENT: 'CONTENT',
} as const

/** @deprecated English-only; use `LEAVE_GROUP_DIALOG_COPY_MESSAGES`. */
// ast-grep-ignore: intl-no-text-constants
export const LEAVE_GROUP_DIALOG_TEXT_COPY = {
  [LEAVE_GROUP_DIALOG_TEXT_COPY_ACTION_KEYS.IS_LEAVING]: {
    [LEAVE_GROUP_DIALOG_TEXT_COPY_ROLE_KEYS.ADMIN]: {
      [LEAVE_GROUP_DIALOG_TEXT_COPY_TYPE_KEYS.TITLE]: 'Leave without choosing an admin?',
      [LEAVE_GROUP_DIALOG_TEXT_COPY_TYPE_KEYS.CONTENT]:
        'You can choose a new admin from the people listed under members. If you leave the group without choosing a new admin, the most senior group member will become admin.',
    },
    [LEAVE_GROUP_DIALOG_TEXT_COPY_ROLE_KEYS.MEMBER]: {
      [LEAVE_GROUP_DIALOG_TEXT_COPY_TYPE_KEYS.TITLE]: 'Leave group chat?',
      [LEAVE_GROUP_DIALOG_TEXT_COPY_TYPE_KEYS.CONTENT]:
        'You will stop receiving messages from this conversation and people will see that you left.',
    },
  },
  [LEAVE_GROUP_DIALOG_TEXT_COPY_ACTION_KEYS.IS_REMOVING]: {
    [LEAVE_GROUP_DIALOG_TEXT_COPY_ROLE_KEYS.ADMIN]: {
      [LEAVE_GROUP_DIALOG_TEXT_COPY_TYPE_KEYS.TITLE]: 'Remove group member?',
      [LEAVE_GROUP_DIALOG_TEXT_COPY_TYPE_KEYS.CONTENT]:
        'Are you sure you want to remove this person from the conversation? They will no longer be able to send or receive new messages.',
    },
  },
} as const

export const LEAVE_GROUP_DIALOG_MESSAGES = defineMessages({
  removeNamedTitle: {
    id: 'messages.leaveGroupDialog.removeNamed.title',
    defaultMessage: 'Remove {name}?',
  },
  leaveGroupButton: {
    id: 'messages.leaveGroupDialog.leaveGroupButton',
    defaultMessage: 'Leave group',
  },
  removeSuccess: {
    id: 'messages.leaveGroupDialog.removeSuccess',
    defaultMessage: 'Member was successfully removed',
  },
})

export const LEAVE_GROUP_DIALOG_COPY_MESSAGES = {
  [LEAVE_GROUP_DIALOG_TEXT_COPY_ACTION_KEYS.IS_LEAVING]: {
    [LEAVE_GROUP_DIALOG_TEXT_COPY_ROLE_KEYS.ADMIN]: defineMessages({
      title: {
        id: 'messages.leaveGroupDialog.leaveAsSoleAdmin.title',
        defaultMessage: 'Leave without choosing an admin?',
      },
      content: {
        id: 'messages.leaveGroupDialog.leaveAsSoleAdmin.content',
        defaultMessage:
          'You can choose a new admin from the people listed under members. If you leave the group without choosing a new admin, the most senior group member will become admin.',
      },
    }),
    [LEAVE_GROUP_DIALOG_TEXT_COPY_ROLE_KEYS.MEMBER]: defineMessages({
      title: {
        id: 'messages.leaveGroupDialog.leave.title',
        defaultMessage: 'Leave group chat?',
      },
      content: {
        id: 'messages.leaveGroupDialog.leave.content',
        defaultMessage:
          'You will stop receiving messages from this conversation and people will see that you left.',
      },
    }),
  },
  [LEAVE_GROUP_DIALOG_TEXT_COPY_ACTION_KEYS.IS_REMOVING]: {
    [LEAVE_GROUP_DIALOG_TEXT_COPY_ROLE_KEYS.ADMIN]: defineMessages({
      title: {
        id: 'messages.leaveGroupDialog.remove.title',
        defaultMessage: 'Remove group member?',
      },
      content: {
        id: 'messages.leaveGroupDialog.remove.content',
        defaultMessage:
          'Are you sure you want to remove this person from the conversation? They will no longer be able to send or receive new messages.',
      },
    }),
  },
} as const
