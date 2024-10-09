import { MockFetchError } from './types'

export const mockFetchError: MockFetchError = (url, options = {}) => {
  global.fetch = jest.fn((requestUrl: string, requestOptions: RequestInit) => {
    const { method = 'GET', status = 500, error = 'Error message' } = options
    const path = `/${requestUrl.split('/').slice(1).join('/')}`

    if (path === url && (requestOptions.method ?? 'GET') === method) {
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
