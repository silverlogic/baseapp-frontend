import type { Meta, StoryObj } from '@storybook/react'

import MessagesGroupWithQuery from './MessagesGroupWithQuery'
import { mockResolvers } from './mockResolvers'

const meta: Meta<typeof MessagesGroupWithQuery> = {
  title: '@baseapp-frontend | components/Messages/MessagesGroup',
  component: MessagesGroupWithQuery,
  decorators: [
    (Story) => (
      <div style={{ padding: 20, background: 'rgba(145, 158, 171, 0.12)' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof MessagesGroupWithQuery>

export const Default: Story = {
  name: 'Own Message',
  parameters: {
    mockResolvers,
    initialProfile: {
      id: 'profile-123',
      name: 'Profile',
    },
  },
}

export const FromOtherUser: Story = {
  name: 'Group Member Message',
  parameters: {
    mockResolvers: {
      Node: () => ({
        ...mockResolvers.Node(),
        content: 'Hello, how are you?',
        profile: {
          id: 'profile-456',
          name: 'Alice',
          image: { url: '' },
        },
        messageType: 'USER_MESSAGE',
      }),
    },
    initialProfile: {
      id: 'profile-123',
      name: 'Profile',
    },
  },
}

export const SystemMessage: Story = {
  name: 'System Message',
  parameters: {
    mockResolvers: {
      Node: () => ({
        ...mockResolvers.Node(),
        content: 'David created group "TSL"',
        messageType: 'SYSTEM_GENERATED',
        profile: null,
      }),
    },
  },
}
