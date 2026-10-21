import { getNotificationUrl } from '../utils'

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
