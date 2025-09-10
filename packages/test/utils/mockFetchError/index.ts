import { MockFetchError } from './types'

export const mockFetchError: MockFetchError = (url, options = {}) => {
  global.fetch = jest.fn((requestUrl: string, requestOptions: RequestInit) => {
    const { method = 'GET', status = 500, error = 'Error message' } = options

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
      const errorInstance = new Error(error)
      ;(errorInstance as any).response = {
        status,
        data: {
          message: error,
        },
      }
      return Promise.reject(errorInstance)
    }
    return Promise.resolve(new Response(null, { status: 500 }))
  }) as jest.Mock

  return null
}
