// MessageList.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { create } from 'zustand'

import { UseChatRoom } from '../../../common'
import { ChatRoomContext } from '../../../common/context/ChatRoomProvider'
import MessageListWithQuery from './MessageListWithQuery'
import { mockResolvers } from './mockResolvers'

const mockChatRoomStore = create<UseChatRoom>((set) => ({
  id: 'room-123',
  setChatRoom: (newState) => set(newState),
  resetChatRoom: () => set({ id: '' }),
}))

const meta: Meta<typeof MessageListWithQuery> = {
  title: '@baseapp-frontend | components/Messages/MessageList',
  component: MessageListWithQuery,
  decorators: [
    (Story) => (
      <ChatRoomContext.Provider value={mockChatRoomStore}>
        <div style={{ height: 600, padding: 20, background: 'rgba(145, 158, 171, 0.12)' }}>
          <Story />
        </div>
      </ChatRoomContext.Provider>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof MessageListWithQuery>

export const Default: Story = {
  name: 'MessagesList (default)',
  parameters: {
    mockResolvers,
    initialProfile: {
      id: 'profile-123',
      name: 'Profile Name',
      image: '',
      urlPath: 'profile',
    },
    chatRoom: {
      id: 'room-123',
    },
  },
}
