import { MockFetch } from './types'

export const mockFetch: MockFetch = (url, options = {}) => {
  const { method = 'GET', ok = true, status = 200, response = {} } = options
  global.fetch = jest.fn((requestUrl: string, requestOptions: RequestInit) => {
    // Handle different URL formats:
    // - Full URL: http://api/v1/auth/login
    // - Relative URL: /auth/login
    // - Path only: auth/login
    let normalizedRequestUrl = requestUrl

    // Remove protocol and domain if present
    if (requestUrl.includes('://')) {
      const urlParts = requestUrl.split('/')
      const pathStartIndex = urlParts.findIndex((_, index) => index > 2)
      normalizedRequestUrl = `/${urlParts.slice(pathStartIndex).join('/')}`
    }

    // Remove /v1 prefix if present (from NEXT_PUBLIC_API_BASE_URL)
    normalizedRequestUrl = normalizedRequestUrl.replace(/^\/v\d+/, '')

    // Ensure path starts with /
    if (!normalizedRequestUrl.startsWith('/')) {
      normalizedRequestUrl = `/${normalizedRequestUrl}`
    }

    // Normalize the expected URL the same way
    let normalizedExpectedUrl = url
    if (!normalizedExpectedUrl.startsWith('/')) {
      normalizedExpectedUrl = `/${normalizedExpectedUrl}`
    }

    if (
      normalizedRequestUrl === normalizedExpectedUrl &&
      (requestOptions.method ?? 'GET') === method
    ) {
      return Promise.resolve({
        ok,
        status,
        json: () => Promise.resolve(response),
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      })
    }

    return Promise.resolve({
      ok: false,
      status: 404,
      json: () => Promise.resolve({ error: 'Not Found' }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
  }) as jest.Mock

  return null
}
