'use client'

import { FC, PropsWithChildren } from 'react'

import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const ComponentWithProviders: FC<PropsWithChildren> = ({ children }) => {
  // DOCS: having the queryClient inside the provider makes a separate query client for testing
  // which avoid issues with data caching between tests
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  const emotionCache = createCache({ key: 'test-key' })
  const theme = {}

  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </CacheProvider>
    </QueryClientProvider>
  )
}

export default ComponentWithProviders
