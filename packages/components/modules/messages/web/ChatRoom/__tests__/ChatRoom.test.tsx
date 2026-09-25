import { useState } from 'react'

import { fireEvent, render, screen } from '@testing-library/react'

import ChatRoom from '../index'

jest.mock('react-relay', () => ({
  ...jest.requireActual('react-relay'),
  useLazyLoadQuery: () => ({ chatRoom: { isArchived: false, participantsCount: 2 } }),
}))

jest.mock('../../../common', () => ({ ChatRoomQuery: {} }))
jest.mock('../ChatRoomHeader', () => () => null)
jest.mock('../../MessagesList', () => () => null)
jest.mock('../../SendMessage', () => () => null)

const MessagesList = () => null

// stands in for SendMessage: holds its draft in local state, like the real form does
const DraftInput = () => {
  const [draft, setDraft] = useState('')
  return <input aria-label="draft" value={draft} onChange={(e) => setDraft(e.target.value)} />
}

const renderRoom = (roomId: string) => (
  <ChatRoom roomId={roomId} MessagesList={MessagesList} SendMessage={DraftInput as any} />
)

describe('ChatRoom', () => {
  it('does not carry an unsent draft over to another room', () => {
    const { rerender } = render(renderRoom('room-1'))

    fireEvent.change(screen.getByLabelText('draft'), { target: { value: 'Hello' } })
    expect((screen.getByLabelText('draft') as HTMLInputElement).value).toBe('Hello')

    rerender(renderRoom('room-2'))

    expect((screen.getByLabelText('draft') as HTMLInputElement).value).toBe('')
  })
})
