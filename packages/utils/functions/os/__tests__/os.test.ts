describe('isMobilePlatform Tests', () => {
  afterEach(() => {
    jest.resetModules()
  })

  it('returns true for ios', () => {
    jest.doMock('react-native', () => ({
      Platform: { OS: 'ios' },
    }))

    const { isMobilePlatform } = require('..')
    expect(isMobilePlatform()).toBe(true)
  })

  it('returns true for android', () => {
    jest.doMock('react-native', () => ({
      Platform: { OS: 'android' },
    }))

    const { isMobilePlatform } = require('..')
    expect(isMobilePlatform()).toBe(true)
  })

  it('returns false for web', () => {
    jest.doMock('react-native', () => ({
      Platform: { OS: 'web' },
    }))

    const { isMobilePlatform } = require('..')
    expect(isMobilePlatform()).toBe(false)
  })

  it('returns false if Platform is undefined', () => {
    jest.doMock('react-native', () => ({
      Platform: undefined,
    }))

    const { isMobilePlatform } = require('..')
    expect(isMobilePlatform()).toBe(false)
  })
})
