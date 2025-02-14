import MockAdapter from 'axios-mock-adapter'
import Cookies from 'js-cookie'

jest.mock('js-cookie')

export type CookiesGetByNameFn = (name: string) => string | undefined

export const cookiesMock: jest.Mocked<typeof Cookies> = jest.mocked(Cookies)

beforeEach(() => {
  jest.clearAllMocks()
})

export { MockAdapter }
