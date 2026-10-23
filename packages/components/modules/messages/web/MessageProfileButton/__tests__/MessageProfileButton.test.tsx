import { useContext } from 'react'

import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import ChatRoomProvider, { ChatRoomContext } from '../../../common/context/ChatRoomProvider'
import MessageProfileButton from '../index'

const { mockCommit, mockCurrentProfile, usedStores } = vi.hoisted(() => ({
  mockCommit: vi.fn(),
  mockCurrentProfile: { value: { id: 'me' } as { id: string } | null },
  usedStores: [] as unknown[],
}))

vi.mock('@baseapp-frontend/authentication', () => ({
  useCurrentProfile: () => ({ currentProfile: mockCurrentProfile.value }),
}))

// the barrel pulls in relay documents, which the transform can't compile here; the stand-in
// mutation hook records the chat room store it runs under, like the real one reads it
vi.mock('../../../common', async () => {
  const provider = await vi.importActual<typeof import('../../../common/context/ChatRoomProvider')>(
    '../../../common/context/ChatRoomProvider',
  )
  const { useContext: useReactContext } = await vi.importActual<typeof import('react')>('react')
  return {
    ChatRoomProvider: provider.default,
    useCreateChatRoomMutation: () => {
      const store = useReactContext(provider.ChatRoomContext)
      if (!store) throw new Error('Missing ChatRoomProvider')
      usedStores.push(store)
      return [mockCommit, false]
    },
  }
})

const button = () => screen.queryByRole('button', { name: 'Message' })

const completeWith = (response: unknown, errors: unknown = null) =>
  mockCommit.mock.calls[0][0].onCompleted(response, errors)

describe('MessageProfileButton', () => {
  beforeEach(() => {
    mockCommit.mockClear()
    usedStores.length = 0
    mockCurrentProfile.value = { id: 'me' }
  })

  it('opens a chat as the current profile and reports the room', () => {
    const onRoomReady = vi.fn()
    render(<MessageProfileButton profileId="them" onRoomReady={onRoomReady} />)

    fireEvent.click(button()!)

    expect(mockCommit).toHaveBeenCalledTimes(1)
    const { variables } = mockCommit.mock.calls[0][0]
    expect(variables.input).toEqual({ profileId: 'me', participants: ['them'] })
    expect(variables.connections).toEqual([
      'client:me:__roomsList_chatRooms_connection(archived:false,q:"",unreadMessages:false)',
      'client:me:__roomsList_chatRooms_connection(archived:false,q:"",unreadMessages:true)',
    ])

    completeWith({ chatRoomCreate: { room: { node: { id: 'room-1' } }, errors: null } })
    expect(onRoomReady).toHaveBeenCalledWith('room-1')
  })

  it('sends as the given actor profile', () => {
    render(<MessageProfileButton profileId="them" actorProfileId="my-org" />)

    fireEvent.click(button()!)

    const { variables } = mockCommit.mock.calls[0][0]
    expect(variables.input).toEqual({ profileId: 'my-org', participants: ['them'] })
    expect(variables.connections[0]).toContain('client:my-org:')
  })

  it('does not report a room when the payload has errors', () => {
    const onRoomReady = vi.fn()
    render(<MessageProfileButton profileId="them" onRoomReady={onRoomReady} />)

    fireEvent.click(button()!)
    completeWith({
      chatRoomCreate: { room: null, errors: [{ field: 'participants', messages: ['no'] }] },
    })

    expect(onRoomReady).not.toHaveBeenCalled()
  })

  it('renders nothing for an anonymous user', () => {
    mockCurrentProfile.value = null
    render(<MessageProfileButton profileId="them" />)

    expect(button()).toBeNull()
  })

  it('renders nothing on the profile it would send as', () => {
    const { rerender } = render(<MessageProfileButton profileId="me" />)
    expect(button()).toBeNull()

    rerender(<MessageProfileButton profileId="my-org" actorProfileId="my-org" />)
    expect(button()).toBeNull()
  })

  it('uses the label and button props it is given', () => {
    render(
      <MessageProfileButton profileId="them" label="Chat" ButtonProps={{ variant: 'contained' }} />,
    )

    expect(screen.getByRole('button', { name: 'Chat' }).className).toContain('MuiButton-contained')
  })

  it('joins a surrounding ChatRoomProvider instead of bringing its own', () => {
    let outerStore: unknown
    const CaptureStore = () => {
      outerStore = useContext(ChatRoomContext)
      return null
    }

    render(
      <ChatRoomProvider>
        <CaptureStore />
        <MessageProfileButton profileId="them" />
      </ChatRoomProvider>,
    )

    expect(usedStores.at(-1)).toBe(outerStore)
  })
})
