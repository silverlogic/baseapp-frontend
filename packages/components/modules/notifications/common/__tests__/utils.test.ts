import { Environment, Network, RecordSource, Store, commitLocalUpdate } from 'relay-runtime'

import {
  getNotificationSettingChannels,
  getNotificationUrl,
  setNotificationSettingChannels,
  toNotificationSettingChanges,
} from '../utils'

describe('getNotificationUrl', () => {
  it('returns app-relative paths and http(s) URLs', () => {
    expect(getNotificationUrl({ url: '/events/12' })).toBe('/events/12')
    expect(getNotificationUrl({ url: ' https://example.com/a ' })).toBe('https://example.com/a')
    expect(getNotificationUrl({ url: 'http://example.com' })).toBe('http://example.com')
  })

  it('ignores missing, non-string and unsafe values', () => {
    expect(getNotificationUrl(null)).toBeUndefined()
    expect(getNotificationUrl('/events/12')).toBeUndefined()
    expect(getNotificationUrl({})).toBeUndefined()
    expect(getNotificationUrl({ url: 12 })).toBeUndefined()
    expect(getNotificationUrl({ url: '' })).toBeUndefined()
    expect(getNotificationUrl({ url: 'javascript:alert(1)' })).toBeUndefined()
    expect(getNotificationUrl({ url: '//evil.example.com' })).toBeUndefined()
    expect(getNotificationUrl({ url: 'events/12' })).toBeUndefined()
  })
})

describe('getNotificationSettingChannels', () => {
  it('lists every channel once, in the order it first appears', () => {
    expect(
      getNotificationSettingChannels([
        { channels: [{ channel: 'IN_APP', isActive: true }] },
        {
          channels: [
            { channel: 'EMAIL', isActive: true },
            { channel: 'IN_APP', isActive: false },
          ],
        },
        { channels: [] },
      ]),
    ).toEqual(['IN_APP', 'EMAIL'])
  })
})

describe('toNotificationSettingChanges', () => {
  it('flattens groups into one change per channel', () => {
    expect(
      toNotificationSettingChanges([
        {
          key: 'EVENTS',
          channels: [
            { channel: 'IN_APP', isActive: true },
            { channel: 'EMAIL', isActive: false },
          ],
        },
      ]),
    ).toEqual([
      { group: 'EVENTS', channel: 'IN_APP', isActive: true },
      { group: 'EVENTS', channel: 'EMAIL', isActive: false },
    ])
  })
})

describe('setNotificationSettingChannels', () => {
  const groupChannel = (id: string, channel: string, isActive: boolean) => ({
    __id: id,
    __typename: 'NotificationSettingGroupChannel',
    channel,
    isActive,
  })

  const createEnvironment = () =>
    new Environment({
      network: Network.create(() => Promise.resolve({ data: {} })),
      store: new Store(
        new RecordSource({
          'user-1': {
            __id: 'user-1',
            __typename: 'User',
            id: 'user-1',
            notificationSettingGroups: { __refs: ['events', 'billing'] },
          },
          events: {
            __id: 'events',
            __typename: 'NotificationSettingGroup',
            key: 'EVENTS',
            channels: { __refs: ['events-in-app', 'events-email'] },
          },
          billing: {
            __id: 'billing',
            __typename: 'NotificationSettingGroup',
            key: 'BILLING',
            channels: { __refs: ['billing-email'] },
          },
          'events-in-app': groupChannel('events-in-app', 'IN_APP', true),
          'events-email': groupChannel('events-email', 'EMAIL', true),
          'billing-email': groupChannel('billing-email', 'EMAIL', true),
        }),
      ),
    })

  const isActive = (environment: Environment, id: string) =>
    environment.getStore().getSource().get(id)?.isActive

  it('sets only the channels named in the changes', () => {
    const environment = createEnvironment()

    commitLocalUpdate(environment, (store) =>
      setNotificationSettingChannels(store, 'user-1', [
        { group: 'EVENTS', channel: 'EMAIL', isActive: false },
      ]),
    )

    expect(isActive(environment, 'events-email')).toBe(false)
    expect(isActive(environment, 'events-in-app')).toBe(true)
    expect(isActive(environment, 'billing-email')).toBe(true)
  })

  it('ignores unknown groups, unknown channels and unknown users', () => {
    const environment = createEnvironment()

    commitLocalUpdate(environment, (store) => {
      setNotificationSettingChannels(store, 'user-1', [
        { group: 'UNKNOWN', channel: 'EMAIL', isActive: false },
        { group: 'BILLING', channel: 'PUSH', isActive: false },
      ])
      setNotificationSettingChannels(store, 'user-2', [
        { group: 'EVENTS', channel: 'EMAIL', isActive: false },
      ])
    })

    expect(isActive(environment, 'events-email')).toBe(true)
    expect(isActive(environment, 'billing-email')).toBe(true)
  })
})
