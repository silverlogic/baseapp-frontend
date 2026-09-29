import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { useFormState } from 'react-hook-form'

import SendMessage from '../index'

const mockCommitMutation = jest.fn()

jest.mock('@baseapp-frontend/authentication', () => ({
  useCurrentProfile: () => ({ currentProfile: { id: 'profile-1' } }),
}))

jest.mock('@baseapp-frontend/utils', () => ({
  ...jest.requireActual('@baseapp-frontend/utils'),
  useNotification: () => ({ sendToast: jest.fn() }),
}))

jest.mock('../../../common', () => ({
  MESSAGE_TYPE: { user: 'USER_MESSAGE' },
  useSendMessageMutation: () => [mockCommitMutation, false],
}))

// the shared barrels pull in relay fragments, which jest can't compile without the relay transform
jest.mock('../../../../__shared__/common', () => {
  const { z } = jest.requireActual('zod')
  return {
    DEFAULT_SOCIAL_UPSERT_FORM_VALUES: { body: '', mentionedProfileIds: [], id: '' },
    SOCIAL_UPSERT_FORM_VALIDATION_SCHEMA: z.object({ body: z.string().min(1) }),
  }
})

jest.mock('../../../../__shared__/web', () => ({
  SocialInput: () => null,
  useFormMentions: () => ({ mentions: { disabled: true } }),
  withMentionsInSocialInputProps: (props: object) => props,
}))

// stands in for the rich SocialInput: a plain input bound to the same form, with the same
// send button rule as the real one
const SocialInput = ({ form, submit }: any) => {
  const { isValid, isDirty } = useFormState({ control: form.control })
  return (
    <form onSubmit={form.handleSubmit(submit)}>
      <input aria-label="message" {...form.register('body')} />
      <button type="submit" disabled={!isValid || !isDirty}>
        send
      </button>
    </form>
  )
}

const renderRoom = (roomId: string) => (
  <SendMessage key={roomId} roomId={roomId} SocialInput={SocialInput} />
)

const messageInput = () => screen.getByLabelText('message') as HTMLInputElement
const sendButton = () => screen.getByText('send') as HTMLButtonElement

describe('SendMessage', () => {
  beforeEach(() => {
    mockCommitMutation.mockClear()
    window.localStorage.clear()
  })

  it('keeps an unsent draft under its own room', () => {
    const { rerender } = render(renderRoom('room-1'))

    fireEvent.change(messageInput(), { target: { value: 'Hello' } })

    rerender(renderRoom('room-2'))
    expect(messageInput().value).toBe('')

    fireEvent.change(messageInput(), { target: { value: 'Other room' } })

    rerender(renderRoom('room-1'))
    expect(messageInput().value).toBe('Hello')

    rerender(renderRoom('room-2'))
    expect(messageInput().value).toBe('Other room')
  })

  it('forgets the draft once the message is sent', async () => {
    const { rerender } = render(renderRoom('room-1'))

    fireEvent.change(messageInput(), { target: { value: 'Hello' } })
    await waitFor(() => expect(sendButton().disabled).toBe(false))
    fireEvent.click(sendButton())
    await waitFor(() => expect(mockCommitMutation).toHaveBeenCalledTimes(1))
    expect(messageInput().value).toBe('')

    rerender(renderRoom('room-2'))
    rerender(renderRoom('room-1'))
    expect(messageInput().value).toBe('')
  })

  it('restores the draft after a page reload', () => {
    const { unmount } = render(renderRoom('room-1'))
    fireEvent.change(messageInput(), { target: { value: 'Hello' } })
    unmount()

    render(renderRoom('room-1'))
    expect(messageInput().value).toBe('Hello')
  })

  it('enables sending a restored draft, and forgets it once sent', async () => {
    const { unmount } = render(renderRoom('room-1'))
    fireEvent.change(messageInput(), { target: { value: 'Hello' } })
    unmount()

    render(renderRoom('room-1'))
    expect(messageInput().value).toBe('Hello')
    await waitFor(() => expect(sendButton().disabled).toBe(false))

    fireEvent.click(sendButton())
    await waitFor(() => expect(mockCommitMutation).toHaveBeenCalledTimes(1))
    expect(mockCommitMutation.mock.calls[0][0].variables.input.content).toBe('Hello')
    expect(messageInput().value).toBe('')
    expect(window.localStorage).toHaveLength(0)
  })

  it('removes the saved draft once the text is deleted', () => {
    render(renderRoom('room-1'))

    fireEvent.change(messageInput(), { target: { value: 'Hello' } })
    expect(window.localStorage).toHaveLength(1)

    fireEvent.change(messageInput(), { target: { value: '' } })
    expect(window.localStorage).toHaveLength(0)
  })
})
