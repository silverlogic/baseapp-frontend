import React from 'react'

import type { StoryContext, StoryFn } from '@storybook/react'

import { ThemeProvider } from '../../providers/web'
import defaultTheme from '../__mocks__/theme'

const withProviders = (Story: StoryFn, context: StoryContext) => {
  return (
    <ThemeProvider {...defaultTheme}>
      <Story />
    </ThemeProvider>
  )
}

export default withProviders
