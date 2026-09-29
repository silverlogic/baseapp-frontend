import { UseFormReturn } from 'react-hook-form'

import { SocialUpsertForm } from '../../../__shared__/common/types'

/**
 * Key/value storage for unsent messages. `localStorage` on web, `AsyncStorage` on native.
 * Implementations must not throw: a failed read or write just means the draft isn't kept.
 */
export type MessageDraftStorage = {
  getItem: (key: string) => string | null | Promise<string | null>
  setItem: (key: string, value: string) => void | Promise<void>
  removeItem: (key: string) => void | Promise<void>
}

export type UseMessageDraftProps = {
  form: UseFormReturn<SocialUpsertForm>
  roomId?: string
  profileId?: string
  storage: MessageDraftStorage
}
