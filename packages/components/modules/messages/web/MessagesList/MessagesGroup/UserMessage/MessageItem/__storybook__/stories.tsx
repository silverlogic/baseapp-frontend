import { Meta, StoryObj } from '@storybook/react'

import MessageItemWithQuery from './MessageItemWithQuery'
import { mockResolvers } from './mockResolvers'

const meta: Meta<typeof MessageItemWithQuery> = {
  title: '@baseapp-frontend | components/Messages/MessageItem',
  component: MessageItemWithQuery,
  decorators: [
    (Story) => (
      <div style={{ padding: 20, background: 'rgba(145, 158, 171, 0.12)' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof MessageItemWithQuery>

export const Default: Story = {
  name: 'Default Message',
  parameters: {
    mockResolvers,
  },
}

export const DeletedMessage: Story = {
  name: 'Deleted Message',
  parameters: {
    mockResolvers: {
      Node: () => ({
        ...mockResolvers.Node(),
        deleted: true,
        content: '[This message was removed]',
      }),
    },
  },
}

export const GroupedMessage: Story = {
  name: 'Grouped Message (not first)',
  args: {
    isGroup: true,
    isFirstGroupedMessage: false,
  },
  parameters: {
    mockResolvers: {
      Node: () => ({
        ...mockResolvers.Node(),
        content: 'Not first grouped message',
      }),
    },
  },
}

export const OwnGroupedMessage: Story = {
  name: 'Own Grouped Message (not first)',
  args: {
    isGroup: true,
    isFirstGroupedMessage: false,
  },
  parameters: {
    mockResolvers: {
      Node: () => ({
        ...mockResolvers.Node(),
        content: 'Default Message',
      }),
    },
    initialProfile: {
      id: 'profile-123',
      name: 'Profile Name',
      image: '',
      urlPath: 'profile',
    },
  },
}

export const OwnMessage: Story = {
  name: 'Own Message',
  args: {
    isFirstGroupedMessage: false,
  },
  parameters: {
    mockResolvers: {
      Node: () => ({
        ...mockResolvers.Node(),
        content: 'Default Message',
      }),
    },
    initialProfile: {
      id: 'profile-123',
      name: 'Profile Name',
      image: '',
      urlPath: 'profile',
    },
  },
}

export const OwnDeletedMessage: Story = {
  name: 'Own Deleted Message',
  parameters: {
    mockResolvers: {
      Node: () => ({
        ...mockResolvers.Node(),
        deleted: true,
        content: '[This message was removed]',
      }),
    },
    initialProfile: {
      id: 'profile-123',
      name: 'Profile Name',
      image: '',
      urlPath: 'profile',
    },
  },
}
