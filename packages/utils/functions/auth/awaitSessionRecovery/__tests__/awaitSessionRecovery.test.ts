import { awaitSessionRecovery } from '..'
import { AUTH_SESSION_REFRESHED, AUTH_UNAUTHORIZED_EVENT } from '../../../../constants/events'
import { eventEmitter } from '../../../events'

jest.mock('../../../events', () => ({
  eventEmitter: {
    emit: jest.fn(),
    on: jest.fn(),
    removeListener: jest.fn(),
  },
}))

const mockedEventEmitter = jest.mocked(eventEmitter)

describe('awaitSessionRecovery', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('shares the in-flight recovery promise and emits unauthorized once', async () => {
    let refreshedHandler: (() => void) | undefined

    mockedEventEmitter.on.mockImplementation((event, handler) => {
      if (event === AUTH_SESSION_REFRESHED) {
        refreshedHandler = handler as () => void
      }
      return mockedEventEmitter
    })

    const firstRecovery = awaitSessionRecovery({
      source: 'fetch',
      path: '/test',
      status: 401,
      hasRefreshToken: true,
    })
    const secondRecovery = awaitSessionRecovery({
      source: 'axios',
      path: '/test',
      status: 401,
      hasRefreshToken: true,
    })

    expect(firstRecovery).toBe(secondRecovery)
    expect(mockedEventEmitter.emit).toHaveBeenCalledTimes(1)
    expect(mockedEventEmitter.emit).toHaveBeenCalledWith(AUTH_UNAUTHORIZED_EVENT, {
      type: AUTH_UNAUTHORIZED_EVENT,
      source: 'fetch',
      path: '/test',
      status: 401,
      hasRefreshToken: true,
    })

    refreshedHandler?.()

    await expect(firstRecovery).resolves.toBe('refreshed')
    await expect(secondRecovery).resolves.toBe('refreshed')
  })
})
