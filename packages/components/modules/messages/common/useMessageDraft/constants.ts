export const MESSAGE_DRAFT_STORAGE_KEY_PREFIX = 'baseapp:messages:draft'

// drafts are kept per profile, so switching profiles (or users on a shared device) never shows someone else's text
export const getMessageDraftStorageKey = (profileId: string, roomId: string) =>
  `${MESSAGE_DRAFT_STORAGE_KEY_PREFIX}:${profileId}:${roomId}`
