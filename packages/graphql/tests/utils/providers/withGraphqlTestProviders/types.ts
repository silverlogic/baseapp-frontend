import { StoryContext } from '@storybook/react'

import { RelayTestProviderProps } from '../RelayTestProvider/types'

export interface WithGraphqlTestProvidersProps extends RelayTestProviderProps {
  context?: StoryContext
}
