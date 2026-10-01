import { MessageDraftStorage } from '../../common/useMessageDraft/types'

const isBrowser = () => typeof window !== 'undefined'

// storage can be unavailable (SSR, privacy mode) or full; a draft that can't be saved is simply not kept
export const LOCAL_STORAGE_MESSAGE_DRAFT_STORAGE: MessageDraftStorage = {
  getItem: (key) => {
    try {
      return isBrowser() ? window.localStorage.getItem(key) : null
    } catch {
      return null
    }
  },
  setItem: (key, value) => {
    try {
      if (isBrowser()) window.localStorage.setItem(key, value)
    } catch {
      // ignore
    }
  },
  removeItem: (key) => {
    try {
      if (isBrowser()) window.localStorage.removeItem(key)
    } catch {
      // ignore
    }
  },
}
