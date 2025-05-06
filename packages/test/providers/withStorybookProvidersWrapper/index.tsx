import { FC } from 'react'

import { StoryContext, StoryFn } from '@storybook/react'

const withTestProviders =
  (provider: (Component: FC<any>) => any) => (Story: StoryFn, context: StoryContext) => {
    const StoryWithProviders = provider(Story)
    return <StoryWithProviders context={context} />
  }

export default withTestProviders
