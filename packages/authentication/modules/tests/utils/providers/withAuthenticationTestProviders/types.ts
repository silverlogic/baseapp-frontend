import { PropsWithChildren } from 'react'

import { StoryContext } from '@storybook/react'

import { InitialProfileProviderForTestingProps } from '../InitialProfileProviderForTesting/types'

export interface WithAuthenticationTestProvidersProps extends PropsWithChildren {
  InitialProfileProviderForTestingProps?: InitialProfileProviderForTestingProps
  context?: StoryContext
}
