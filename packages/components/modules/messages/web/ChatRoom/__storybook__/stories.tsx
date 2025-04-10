import type { Meta, StoryObj } from '@storybook/react'

import { CommentReplyProvider } from '../../../../comments/common'
import { ChatRoomProvider } from '../../../common'
import ChatRoomWithQuery from './ChatRoomWithQuery'
import { mockResolverGroup, mockResolverPrivate } from './mockResolvers'

const meta: Meta<typeof ChatRoomWithQuery> = {
  title: '@baseapp-frontend | components/Messages/ChatRoom',
  component: ChatRoomWithQuery,
  decorators: [
    (Story) => (
      <CommentReplyProvider>
        <ChatRoomProvider>
          <div style={{ height: '600px', background: 'rgba(145, 158, 171, 0.12)' }}>
            <Story />
          </div>
        </ChatRoomProvider>
      </CommentReplyProvider>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof ChatRoomWithQuery>

export const GroupChat: Story = {
  name: 'Group Chat',
  parameters: {
    mockResolvers: mockResolverGroup,
    initialProfile: {
      id: 'UHJvZmlsZToxNzM=',
      name: 'John',
      image: '',
    },
  },
}

export const PrivateChat: Story = {
  name: 'Private Chat',
  parameters: {
    mockResolvers: mockResolverPrivate,
    initialProfile: {
      id: 'UHJvZmlsZToxNzM=',
      name: 'John',
      image: '',
    },
  },
}
