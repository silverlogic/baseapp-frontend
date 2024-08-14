import * as React from 'react'

import type { StoryContext, StoryFn } from '@storybook/react'

import LoadingState from '../../components/displays/LoadingState'
import ThemeProvider from '../../providers/ThemeProvider'
import defaultTheme from '../__mocks__/theme'

const withProviders = (Story: StoryFn, context: StoryContext) => {
  return (
    <React.Suspense fallback={<LoadingState />}>
      <ThemeProvider {...defaultTheme}>
        <Story />
      </ThemeProvider>
    </React.Suspense>
  )
}

export default withProviders
