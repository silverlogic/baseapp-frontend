import AsyncStorage from '@react-native-async-storage/async-storage'

import { MessageDraftStorage } from '../../common/useMessageDraft/types'

// a draft that can't be read or saved is simply not kept
export const ASYNC_STORAGE_MESSAGE_DRAFT_STORAGE: MessageDraftStorage = {
  getItem: (key) => AsyncStorage.getItem(key).catch(() => null),
  setItem: (key, value) => AsyncStorage.setItem(key, value).catch(() => undefined),
  removeItem: (key) => AsyncStorage.removeItem(key).catch(() => undefined),
}
