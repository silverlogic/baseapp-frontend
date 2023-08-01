import MockAdapter from 'axios-mock-adapter'
import Cookies from 'js-cookie'

jest.mock('js-cookie')

export type CookiesGetByNameFn = (name: string) => string

export const cookiesMock = jest.mocked(Cookies, true)

beforeEach(() => {
  jest.clearAllMocks()
})

export { MockAdapter }
