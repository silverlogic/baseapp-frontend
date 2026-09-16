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

  it('does not re-render consumers when the group context is re-set to the same value', () => {
    let renders = 0
    const { result } = renderHook(
      () => {
        renders += 1
        return useGroupChatCreate()
      },
      { wrapper },
    )

    act(() => {
      result.current.setExistingParticipants(['profile-1', 'profile-2'])
      result.current.setRoomId('room-1')
    })
    const rendersAfterFirstWrite = renders

    // GroupDetailsPage re-runs this on every focus and on every Relay snapshot read
    act(() => {
      result.current.setExistingParticipants(['profile-1', 'profile-2'])
      result.current.setRoomId('room-1')
    })
    expect(renders).toBe(rendersAfterFirstWrite)

    act(() => {
      result.current.setExistingParticipants(['profile-1'])
    })
    expect(renders).toBeGreaterThan(rendersAfterFirstWrite)
    expect(result.current.existingParticipants).toEqual(['profile-1'])
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
