import { MockFetch } from './types'

export const mockFetch: MockFetch = (url, options = {}) => {
  const { method = 'GET', ok = true, status = 200, response = {} } = options
  global.fetch = jest.fn((requestUrl: string, requestOptions: RequestInit) => {
    const path = `/${requestUrl.split('/').slice(1).join('/')}`

    if (path === url && (requestOptions.method ?? 'GET') === method) {
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
