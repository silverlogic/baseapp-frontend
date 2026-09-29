import { act, renderHook, waitFor } from '@testing-library/react'
import { useForm } from 'react-hook-form'

import { DEFAULT_SOCIAL_UPSERT_FORM_VALUES } from '../../../../__shared__/common/constants'
import { SocialUpsertForm } from '../../../../__shared__/common/types'
import useMessageDraft from '../index'
import { MessageDraftStorage } from '../types'

// behaves like AsyncStorage: every call resolves on a later tick
const createAsyncStorage = (initial: Record<string, string> = {}) => {
  const items = { ...initial }
  const storage: MessageDraftStorage = {
    getItem: async (key) => items[key] ?? null,
    setItem: async (key, value) => {
      items[key] = value
    },
    removeItem: async (key) => {
      delete items[key]
    },
  }
  return { items, storage }
}

const renderDraft = (storage: MessageDraftStorage, roomId = 'room-1') =>
  renderHook(() => {
    const form = useForm<SocialUpsertForm>({ defaultValues: DEFAULT_SOCIAL_UPSERT_FORM_VALUES })
    const draft = useMessageDraft({ form, roomId, profileId: 'profile-1', storage })
    return { form, ...draft }
  })

const draftKey = 'baseapp:messages:draft:profile-1:room-1'

describe('useMessageDraft', () => {
  it('loads the saved draft from an async storage', async () => {
    const { storage } = createAsyncStorage({ [draftKey]: JSON.stringify({ body: 'Hello' }) })
    const { result } = renderDraft(storage)

    await waitFor(() => expect(result.current.form.getValues('body')).toBe('Hello'))
  })

  it('does not overwrite text typed before the draft finished loading', async () => {
    const { storage } = createAsyncStorage({ [draftKey]: JSON.stringify({ body: 'Old' }) })
    const { result } = renderDraft(storage)

    act(() => result.current.form.setValue('body', 'New'))
    await act(async () => {})

    expect(result.current.form.getValues('body')).toBe('New')
  })

  it('saves the draft per room and profile, and clears it', async () => {
    const { items, storage } = createAsyncStorage()
    const { result } = renderDraft(storage)

    act(() => result.current.form.setValue('body', 'Hello'))
    await waitFor(() => expect(JSON.parse(items[draftKey]!).body).toBe('Hello'))

    act(() => result.current.clearDraft())
    await waitFor(() => expect(items[draftKey]).toBeUndefined())
  })

  it('ignores a corrupted draft', async () => {
    const { storage } = createAsyncStorage({ [draftKey]: '{not json' })
    const { result } = renderDraft(storage)
    await act(async () => {})

    expect(result.current.form.getValues('body')).toBe('')
  })
})
