import { Meta, StoryObj } from '@storybook/react'

import BlockButtonWithDialog from '..'
import BlockButtonWithDialogWithQuery from './BlockButtonWithDialogWithQuery'
import { mockResolvers } from './mockResolvers'

const meta: Meta<typeof BlockButtonWithDialog> = {
  title: '@baseapp-frontend | components/Profiles/ProfileComponent/BlockButtonWithDialog',
  component: BlockButtonWithDialogWithQuery,
}

export default meta

type Story = StoryObj<typeof BlockButtonWithDialog>

export const NotBlocked: Story = {
  name: 'Not Blocked',
  parameters: {
    mockResolvers,
  },
}

export const Blocked: Story = {
  name: 'Blocked',
  parameters: {
    mockResolvers: {
      Node: () => ({
        ...mockResolvers.Node(),
        isBlockedByMe: true,
      }),
    },
  },
}
