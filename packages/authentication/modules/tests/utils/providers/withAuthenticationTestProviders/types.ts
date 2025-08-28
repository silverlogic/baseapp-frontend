import { PropsWithChildren } from 'react'

import { StoryContext } from '@storybook/react'

export interface WithAuthenticationTestProvidersProps extends PropsWithChildren {
  initialCookies?: Record<string, any>
  context?: StoryContext
}
