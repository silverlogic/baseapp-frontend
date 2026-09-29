import { useCallback, useEffect } from 'react'

import { DEFAULT_SOCIAL_UPSERT_FORM_VALUES } from '../../../__shared__/common/constants'
import { SocialUpsertForm } from '../../../__shared__/common/types'
import { getMessageDraftStorageKey } from './constants'
import { UseMessageDraftProps } from './types'

const parseMessageDraft = (value: string | null): SocialUpsertForm | null => {
  if (!value) return null
  try {
    const draft = JSON.parse(value)
    if (typeof draft?.body !== 'string' || !draft.body) return null
    return {
      ...DEFAULT_SOCIAL_UPSERT_FORM_VALUES,
      body: draft.body,
      mentionedProfileIds: Array.isArray(draft.mentionedProfileIds)
        ? draft.mentionedProfileIds.filter((id: unknown) => typeof id === 'string')
        : [],
    }
  } catch {
    return null
  }
}

// storage writes are fire-and-forget: a failed write only means the draft isn't kept
const ignoreStorageFailure = (result: void | Promise<void>) => {
  if (result instanceof Promise) result.catch(() => undefined)
}

/**
 * Keeps the unsent message of a chat room in `storage`, so it survives switching rooms,
 * leaving the screen and reloading the page (or restarting the app).
 *
 * The saved draft is loaded into `form` when the room opens, updated as the user types, and
 * removed when the text is deleted or `clearDraft` is called after sending.
 */
const useMessageDraft = ({ form, roomId, profileId, storage }: UseMessageDraftProps) => {
  const storageKey = profileId && roomId ? getMessageDraftStorageKey(profileId, roomId) : undefined

  useEffect(() => {
    if (!storageKey) return undefined
    let isActive = true

    const restoreDraft = (value: string | null) => {
      const draft = parseMessageDraft(value)
      // never overwrite text typed while an async storage was still loading the draft
      if (!isActive || !draft || form.getValues('body')) return
      // set the values instead of `form.reset(draft)`: resetting would make the draft the form's
      // default values, so the form wouldn't be dirty (send button disabled) and the `form.reset()`
      // after sending would bring the draft back
      const options = { shouldDirty: true, shouldValidate: true }
      form.setValue('mentionedProfileIds', draft.mentionedProfileIds, options)
      form.setValue('body', draft.body, options)
    }
    const storedValue = storage.getItem(storageKey)
    if (storedValue instanceof Promise) {
      storedValue.then(restoreDraft, () => undefined)
    } else {
      restoreDraft(storedValue)
    }

    const { unsubscribe } = form.watch((values) => {
      if (values.body) {
        const draft: SocialUpsertForm = {
          ...DEFAULT_SOCIAL_UPSERT_FORM_VALUES,
          body: values.body,
          mentionedProfileIds: (values.mentionedProfileIds ?? []).filter(
            (id): id is string => typeof id === 'string',
          ),
        }
        ignoreStorageFailure(storage.setItem(storageKey, JSON.stringify(draft)))
      } else {
        ignoreStorageFailure(storage.removeItem(storageKey))
      }
    })

    return () => {
      isActive = false
      unsubscribe()
    }
  }, [form, storage, storageKey])

  const clearDraft = useCallback(() => {
    if (storageKey) ignoreStorageFailure(storage.removeItem(storageKey))
  }, [storage, storageKey])

  return { clearDraft }
}

export default useMessageDraft
