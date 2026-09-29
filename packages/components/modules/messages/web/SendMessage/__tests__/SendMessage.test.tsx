import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import ChatRoomProvider from '../../../common/context/ChatRoomProvider'
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

// stands in for the rich SocialInput: a plain input bound to the same form
const SocialInput = ({ form, submit }: any) => (
  <form onSubmit={form.handleSubmit(submit)}>
    <input aria-label="message" {...form.register('body')} />
    <button type="submit">send</button>
  </form>
)

const renderRoom = (roomId: string) => (
  <ChatRoomProvider>
    <SendMessage key={roomId} roomId={roomId} SocialInput={SocialInput} />
  </ChatRoomProvider>
)

const messageInput = () => screen.getByLabelText('message') as HTMLInputElement

describe('SendMessage', () => {
  beforeEach(() => mockCommitMutation.mockClear())

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
    fireEvent.click(screen.getByText('send'))
    await waitFor(() => expect(mockCommitMutation).toHaveBeenCalledTimes(1))
    expect(messageInput().value).toBe('')

    rerender(renderRoom('room-2'))
    rerender(renderRoom('room-1'))
    expect(messageInput().value).toBe('')
  })
})
