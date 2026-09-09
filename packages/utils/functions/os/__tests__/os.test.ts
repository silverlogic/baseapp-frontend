describe('isMobilePlatform Tests', () => {
  afterEach(() => {
    vi.resetModules()
    vi.doUnmock('react-native')
  })

  it('returns true for ios', async () => {
    vi.doMock('react-native', () => ({ Platform: { OS: 'ios' } }))
    const { isMobilePlatform } = await import('..')
    expect(isMobilePlatform()).toBe(true)
  })

  it('returns true for android', async () => {
    vi.doMock('react-native', () => ({ Platform: { OS: 'android' } }))
    const { isMobilePlatform } = await import('..')
    expect(isMobilePlatform()).toBe(true)
  })

  it('returns false for web', async () => {
    vi.doMock('react-native', () => ({ Platform: { OS: 'web' } }))
    const { isMobilePlatform } = await import('..')
    expect(isMobilePlatform()).toBe(false)
  })

  it('returns false if Platform is undefined', async () => {
    vi.doMock('react-native', () => ({ Platform: undefined }))
    const { isMobilePlatform } = await import('..')
    expect(isMobilePlatform()).toBe(false)
  })
})
