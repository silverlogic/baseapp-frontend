import React, { useState } from 'react'
import MockAdapter from "axios-mock-adapter"
import Cookies from 'js-cookie'
import { QueryClientProvider } from "react-query"
import { BaseAppProvider, buildQueryClient, axios } from '../src/api'

jest.mock('js-cookie')

export type CookiesGetByNameFn = (name: string) => string

export const cookiesMock = jest.mocked(Cookies, true)

export const createWrapper = () => {
  const wrapper = ({ children }) => {
    return <BaseAppProvider queryClientOptions={{
      queries: {
        cacheTime: Infinity,
        staleTime: 0
      }
    }}>
      {children}
    </BaseAppProvider>
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
