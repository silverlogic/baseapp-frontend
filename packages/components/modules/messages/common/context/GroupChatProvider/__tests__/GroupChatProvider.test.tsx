import { PropsWithChildren } from 'react'

import { act, renderHook } from '@testing-library/react'

import { ProfileItemFragment$data } from '../../../../../../__generated__/ProfileItemFragment.graphql'
import GroupChatProvider, { useGroupChatCreate } from '../index'

const wrapper = ({ children }: PropsWithChildren) => (
  <GroupChatProvider>{children}</GroupChatProvider>
)

const PROFILE = { id: 'profile-1' } as ProfileItemFragment$data

describe('GroupChatProvider', () => {
  it('starts with an empty draft', () => {
    const { result } = renderHook(() => useGroupChatCreate(), { wrapper })

    expect(result.current.participants).toEqual([])
    expect(result.current.existingParticipants).toEqual([])
    expect(result.current.roomId).toBeUndefined()
  })

  it('clears every draft field on reset', () => {
    const { result } = renderHook(() => useGroupChatCreate(), { wrapper })

    act(() => {
      result.current.setGroupChat({ id: 'room-1', title: 'Team', image: 'file:///avatar.jpg' })
      result.current.setParticipants([PROFILE])
      result.current.setExistingParticipants(['profile-2'])
      result.current.setRoomId('room-1')
    })

    act(() => {
      result.current.resetGroupChat()
    })

    expect(result.current).toMatchObject({
      id: undefined,
      participants: [],
      existingParticipants: [],
      image: undefined,
      title: '',
      roomId: undefined,
    })
  })
})
