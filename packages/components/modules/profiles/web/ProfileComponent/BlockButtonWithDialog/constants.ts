import { defineMessages } from 'react-intl'

export const BLOCK_UNBLOCK_DIALOG_MESSAGES = defineMessages({
  blockTitle: {
    id: 'profiles.blockDialog.block.title',
    defaultMessage: 'Block {name}?',
  },
  blockContent: {
    id: 'profiles.blockDialog.block.content',
    defaultMessage:
      "This person won’t be able to send you messages, find your profile or content. They won’t see your comments and reactions, and won't be able to mention or follow your profile. We won't notify them that they have been blocked.",
  },
  blockAction: {
    id: 'profiles.blockDialog.block.action',
    defaultMessage: 'Block',
  },
  unblockTitle: {
    id: 'profiles.blockDialog.unblock.title',
    defaultMessage: 'Unblock {name}?',
  },
  unblockContent: {
    id: 'profiles.blockDialog.unblock.content',
    defaultMessage:
      "This person will be able to send you messages, find your profile or content. They will see your comments and reactions, and will be able to mention or follow your profile. We won't notify them that they have been unblocked.",
  },
  unblockAction: {
    id: 'profiles.blockDialog.unblock.action',
    defaultMessage: 'Unblock',
  },
  blockProfile: {
    id: 'profiles.blockDialog.blockProfile',
    defaultMessage: 'Block profile',
  },
  unblockProfile: {
    id: 'profiles.blockDialog.unblockProfile',
    defaultMessage: 'Unblock profile',
  },
  blockedToast: {
    id: 'profiles.blockDialog.blockedToast',
    defaultMessage: '{name} is blocked',
  },
  unblockedToast: {
    id: 'profiles.blockDialog.unblockedToast',
    defaultMessage: '{name} is unblocked',
  },
})
