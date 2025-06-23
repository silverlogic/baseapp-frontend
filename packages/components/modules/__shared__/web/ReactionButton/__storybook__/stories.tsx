import type { Meta, StoryObj } from '@storybook/react'

import ReactionButton from '../../../common/ReactionButton'
import ReactionButtonWithQuery from './ReactionButtonWithQuery'
import { mockResolvers } from './mockResolvers'

const meta: Meta<typeof ReactionButton> = {
  title: '@baseapp-frontend | components/Shared/ReactionButton',
  component: ReactionButtonWithQuery,
}

export default meta

type Story = StoryObj<typeof ReactionButton>

export const DefaultComments: Story = {
  name: 'Default ReactionButton',
  parameters: {
    mockResolvers,
  },
}
