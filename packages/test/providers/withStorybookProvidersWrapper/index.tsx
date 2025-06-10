import { FC } from 'react'

import { StoryContext, StoryFn } from '@storybook/react'

const withTestProviders =
  (provider: (Component: FC<any>) => any) => (Story: StoryFn, context: StoryContext) => {
    const StoryComponent: FC<any> = (props) => Story(props, context)
    const StoryWithProviders = provider(StoryComponent)
    return <StoryWithProviders />
  }

export default withTestProviders
