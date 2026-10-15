import { isRelativeUrl } from '..'

describe('isRelativeUrl', () => {
  it.each(['/v1', '/graphql', '/'])('treats %s as relative', (url) => {
    expect(isRelativeUrl(url)).toBe(true)
  })

  it.each([
    'https://api.example.com/v1',
    'http://localhost:8000/graphql',
    'wss://api.example.com/graphql',
    '//api.example.com/v1',
    'v1',
    '',
    undefined,
    null,
  ])('does not treat %s as relative', (url) => {
    expect(isRelativeUrl(url)).toBe(false)
  })
})
