import { useState } from 'react'

import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import ChatRoom from '../index'

vi.mock('react-relay', async () => ({
  ...(await vi.importActual('react-relay')),
  useLazyLoadQuery: () => ({ chatRoom: { isArchived: false, participantsCount: 2 } }),
}))

vi.mock('../../../common', () => ({ ChatRoomQuery: {} }))
vi.mock('../ChatRoomHeader', () => ({ default: () => null }))
vi.mock('../../MessagesList', () => ({ default: () => null }))
vi.mock('../../SendMessage', () => ({ default: () => null }))

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
