import { axios } from '@baseapp-frontend/utils'

import MockAdapter from 'axios-mock-adapter'
import Cookies from 'js-cookie'

jest.mock('js-cookie')

export type CookiesGetByNameFn = (name: string) => string

export const cookiesMock = jest.mocked(Cookies, true)
// @ts-ignore TODO: investigate AxiosRequestHeaders error
export const axiosMock = new MockAdapter(axios)

beforeEach(() => {
  jest.clearAllMocks()
})

afterEach(() => {
  axiosMock.reset()
})

afterAll(() => {
  axiosMock.restore()
})
