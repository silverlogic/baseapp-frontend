import React, { useState } from 'react'
import MockAdapter from "axios-mock-adapter"
import Cookies from 'js-cookie'
import { QueryClient, QueryClientProvider } from "react-query"
import { BaseAppProvider, buildQueryClient, axios } from '../src/api'

jest.mock('js-cookie')

export type CookiesGetByNameFn = (name: string) => string

export const cookiesMock = jest.mocked(Cookies, true)

export const createWrapper = () => {
  const wrapper = ({ children }) => {
    const [queryClient] = useState(() => buildQueryClient({
      queries: {
        cacheTime: Infinity,
        staleTime: 0
      }
    }))

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  }

  return wrapper;
};

export const axiosMock = new MockAdapter(axios);

beforeEach(() => {
  jest.clearAllMocks()})

afterEach(() => {
  axiosMock.reset();
});

afterAll(() => {
  axiosMock.restore();
});