import { act, renderHook } from '@testing-library/react'
import { Environment, Network, RecordSource, Store, commitLocalUpdate } from 'relay-runtime'
import { vi } from 'vitest'

import useNotificationSettingsGroups from '../index'

const { mockCommit, mockUseFragment } = vi.hoisted(() => ({
  mockCommit: vi.fn(),
  mockUseFragment: vi.fn(),
}))

// the graphql tags need the relay babel transform, which this runner does not apply
vi.mock('react-relay', async () => ({
  ...(await vi.importActual('react-relay')),
  graphql: () => ({}),
  useFragment: mockUseFragment,
}))

vi.mock('../../../graphql/mutations/NotificationSettingsUpdate', () => ({
  useNotificationSettingsUpdateMutation: () => [mockCommit, false],
}))

const USER_ID = 'user-1'

const groups = [
  {
    key: 'NEWS',
    label: 'News',
    description: null,
    isLocked: false,
    channels: [
      { channel: 'ALL', isActive: true },
      { channel: 'IN_APP', isActive: true },
      { channel: 'EMAIL', isActive: true },
    ],
  },
  {
    key: 'ACCOUNT',
    label: 'Account',
    description: null,
    isLocked: true,
    channels: [{ channel: 'EMAIL', isActive: true }],
  },
  {
    key: 'DIGEST',
    label: 'Digest',
    description: null,
    isLocked: false,
    channels: [{ channel: 'EMAIL', isActive: true }],
  },
]

/** A store holding the user's groups the way the settings query normalizes them. */
const createEnvironment = () => {
  const environment = new Environment({
    network: Network.create(() => Promise.resolve({ data: {} })),
    store: new Store(new RecordSource()),
  })

  commitLocalUpdate(environment, (store) => {
    const user = store.create(USER_ID, 'User')
    user.setLinkedRecords(
      groups.map((group, groupIndex) => {
        const groupRecord = store.create(
          `${USER_ID}:group:${groupIndex}`,
          'NotificationSettingGroup',
        )
        groupRecord.setValue(group.key, 'key')
        groupRecord.setLinkedRecords(
          group.channels.map(({ channel, isActive }) => {
            const channelRecord = store.create(
              `${USER_ID}:group:${groupIndex}:${channel}`,
              'NotificationSettingGroupChannel',
            )
            channelRecord.setValue(channel, 'channel')
            channelRecord.setValue(isActive, 'isActive')
            return channelRecord
          }),
          'channels',
        )
        return groupRecord
      }),
      'notificationSettingGroups',
    )
  })

  return environment
}

const readChannels = (environment: Environment) => {
  const source = environment.getStore().getSource()
  return groups.map((group, groupIndex) => ({
    group: group.key,
    channels: group.channels.map(({ channel }) => [
      channel,
      source.get(`${USER_ID}:group:${groupIndex}:${channel}`)?.isActive,
    ]),
  }))
}

const applyUpdater = (environment: Environment, updater: (store: any) => void) =>
  commitLocalUpdate(environment, updater)

describe('useNotificationSettingsGroups', () => {
  beforeEach(() => {
    mockCommit.mockClear()
    mockUseFragment.mockReturnValue({ id: USER_ID, notificationSettingGroups: groups })
  })

  it('sends an ALL change as is and applies it to every channel of the group optimistically', () => {
    const { result } = renderHook(() => useNotificationSettingsGroups({ user: {} as any }))

    act(() => result.current.setChannelActive('NEWS', 'ALL', false))

    expect(mockCommit).toHaveBeenCalledTimes(1)
    const config = mockCommit.mock.lastCall?.[0]
    expect(config.variables).toEqual({
      input: { settings: [{ group: 'NEWS', channel: 'ALL', isActive: false }] },
    })

    const environment = createEnvironment()
    applyUpdater(environment, config.optimisticUpdater)

    expect(readChannels(environment)).toEqual([
      {
        group: 'NEWS',
        channels: [
          ['ALL', false],
          ['IN_APP', false],
          ['EMAIL', false],
        ],
      },
      { group: 'ACCOUNT', channels: [['EMAIL', true]] },
      { group: 'DIGEST', channels: [['EMAIL', true]] },
    ])
  })

  it('applies a single channel change to that channel only', () => {
    const { result } = renderHook(() => useNotificationSettingsGroups({ user: {} as any }))

    act(() => result.current.setChannelActive('NEWS', 'EMAIL', false))

    const environment = createEnvironment()
    applyUpdater(environment, mockCommit.mock.lastCall?.[0].optimisticUpdater)

    expect(readChannels(environment)[0]).toEqual({
      group: 'NEWS',
      channels: [
        ['ALL', true],
        ['IN_APP', true],
        ['EMAIL', false],
      ],
    })
  })

  it('writes the server state from the payload', () => {
    const { result } = renderHook(() => useNotificationSettingsGroups({ user: {} as any }))

    act(() => result.current.setChannelActive('DIGEST', 'EMAIL', false))

    const environment = createEnvironment()
    const { updater } = mockCommit.mock.lastCall?.[0]
    applyUpdater(environment, (store) =>
      updater(store, {
        notificationSettingsUpdate: {
          groups: [{ key: 'DIGEST', channels: [{ channel: 'EMAIL', isActive: true }] }],
          errors: null,
        },
      }),
    )

    expect(readChannels(environment)[2]).toEqual({ group: 'DIGEST', channels: [['EMAIL', true]] })
  })

  it('leaves locked and unknown groups alone', () => {
    const { result } = renderHook(() => useNotificationSettingsGroups({ user: {} as any }))

    act(() => {
      result.current.setChannelActive('ACCOUNT', 'EMAIL', false)
      result.current.setChannelActive('UNKNOWN', 'EMAIL', false)
    })

    expect(mockCommit).not.toHaveBeenCalled()
  })

  it('lists every channel the groups offer', () => {
    const { result } = renderHook(() => useNotificationSettingsGroups({ user: {} as any }))

    expect(result.current.channels).toEqual(['ALL', 'IN_APP', 'EMAIL'])
  })
})
