import { Meta, StoryFn, StoryObj } from '@storybook/react'

import { withMutationResolver } from '../../../../../.storybook/decorators'
import { ProfileSettingsComponentProps } from '../types'
import ProfileSettingsComponentWithQuery from './index'
import { mockResolvers, mockResolversWithMutationError } from './mockResolver'

export default {
  title: '@baseapp-frontend | components/Profiles/ProfileSettingsComponent',
  component: ProfileSettingsComponentWithQuery,
  decorators: [withMutationResolver],
  args: {
    profile: {},
  },
  argTypes: {
    profile: {
      description: 'Graphql reference to extract the Profile fragment.',
      table: {
        type: {
          summary: 'AccountProfileFragment$key | null',
        },
      },
      control: false,
    },
  },
  parameters: {
    layout: 'centered',
  },
} as Meta

const Template: StoryFn = (args) => <ProfileSettingsComponentWithQuery {...args} />

type Story = StoryObj<ProfileSettingsComponentProps>

export const Default: Story = Template.bind({})
Default.storyName = 'AccountProfile'
Default.parameters = {
  mockResolvers,
}

export const ErrorStatus: Story = Template.bind({})
ErrorStatus.storyName = 'AccountProfile with Error'
ErrorStatus.parameters = {
  mockResolvers: mockResolversWithMutationError,
}
