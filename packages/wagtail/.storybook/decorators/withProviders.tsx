import React, { useEffect } from 'react'

import { LoadingState } from '@baseapp-frontend/design-system/components/web/displays'
import { ThemeProvider } from '@baseapp-frontend/design-system/providers/web'
import { RelayTestProvider, createTestEnvironment } from '@baseapp-frontend/graphql'

import GlobalStyles from '@mui/material/GlobalStyles'
import type { StoryContext, StoryFn } from '@storybook/react'

import defaultTheme from '../__mocks__/theme'

const withProviders = (Story: StoryFn, context: StoryContext) => {
  // TODO: registering a few tailwind classes (used by @baseapp-frontend/design-system components), need to figure out why the @baseapp-frontend/components storybook are not including it correctly
  // pb-3 px-3 w-full rounded-md bg-background-neutral px-2 py-1
  const { environment, resolveMostRecentOperation } = createTestEnvironment()

  const mockResolvers = context.parameters.mockResolvers || {}

  useEffect(() => {
    try {
      resolveMostRecentOperation({ mockResolvers })
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
    }
  }, [mockResolvers, resolveMostRecentOperation])

  return (
    <RelayTestProvider environment={environment}>
      <React.Suspense fallback={<LoadingState />}>
        <ThemeProvider {...defaultTheme}>
          <GlobalStyles
            styles={{
              '*': {
                marginBlockStart: 0,
                marginBlockEnd: 0,
              },
            }}
          />
          <Story />
        </ThemeProvider>
      </React.Suspense>
    </RelayTestProvider>
  )
}

export default withProviders
