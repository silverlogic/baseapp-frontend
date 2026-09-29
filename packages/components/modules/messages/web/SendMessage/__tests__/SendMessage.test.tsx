import { Suspense } from 'react'

import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { useController, useFormState } from 'react-hook-form'

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
    SOCIAL_UPSERT_FORM: { body: 'body', mentionedProfileIds: 'mentionedProfileIds', id: 'id' },
    DEFAULT_SOCIAL_UPSERT_FORM_VALUES: { body: '', mentionedProfileIds: [], id: '' },
    SOCIAL_UPSERT_FORM_VALIDATION_SCHEMA: z.object({ body: z.string().min(1) }),
  }
})

jest.mock('../../../../__shared__/web', () => ({
  SocialInput: jest.requireActual('../../../../__shared__/web/SocialInput').default,
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

// the real SocialInput, with a plain input instead of the markdown editor
const PlainTextField = ({ name, control, children }: any) => {
  const { field } = useController({ name, control })
  return (
    <>
      <input aria-label="message" {...field} />
      {children}
    </>
  )
}

// suspends like ChatRoom does while it loads the room it switched to
let pendingRoom: Promise<void> | undefined
const RoomQuery = () => {
  if (pendingRoom) throw pendingRoom
  return null
}

const renderSuspendingRoom = (roomId: string) => (
  <Suspense fallback="loading">
    <RoomQuery />
    <SendMessage
      key={roomId}
      roomId={roomId}
      SocialInputProps={{ SocialTextField: PlainTextField }}
    />
  </Suspense>
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

  it('enables sending a restored draft when the room loads after switching', async () => {
    const { rerender } = render(renderSuspendingRoom('room-1'))
    fireEvent.change(messageInput(), { target: { value: 'Hello' } })
    rerender(renderSuspendingRoom('room-2'))

    let loadRoom = () => {}
    pendingRoom = new Promise<void>((resolve) => {
      loadRoom = resolve
    })
    rerender(renderSuspendingRoom('room-1'))
    await act(async () => {
      pendingRoom = undefined
      loadRoom()
    })

    expect(messageInput().value).toBe('Hello')
    await waitFor(() =>
      expect((screen.getByLabelText('submit actions') as HTMLButtonElement).disabled).toBe(false),
    )
  })

  it('removes the saved draft once the text is deleted', () => {
    render(renderRoom('room-1'))

    fireEvent.change(messageInput(), { target: { value: 'Hello' } })
    expect(window.localStorage).toHaveLength(1)

    fireEvent.change(messageInput(), { target: { value: '' } })
    expect(window.localStorage).toHaveLength(0)
  })
})
