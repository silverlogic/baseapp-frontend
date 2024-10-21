import type { Meta, StoryObj } from '@storybook/react'

import ReactionButton from '..'
import ReactionButtonWithQuery from './ReactionButtonWithQuery'
import { mockResolvers } from './mockResolvers'

const meta: Meta<typeof ReactionButton> = {
  title: '@baseapp-frontend | components/Shared/ReactionButton',
  component: ReactionButtonWithQuery,
  tags: ['autodocs'],
  argTypes: {
    target: {
      name: 'target',
      description: 'The target data for the reaction button.',
      control: 'object',
      table: {
        type: {
          summary: 'ReactionButton_target$key',
        },
      },
    },
    reactionType: {
      name: 'reactionType',
      description: 'Type of reaction (e.g., LIKE, DISLIKE).',
      control: 'text',
      table: {
        type: {
          summary: 'ReactionTypes',
        },
      },
    },
    children: {
      name: 'children',
      description: 'Function to render the children components with reaction handlers.',
      control: false,
      table: {
        type: {
          summary:
            '(props: { handleReaction: () => void, isLoading: boolean, target: ReactionButton_target$data }) => ReactElement | null',
        },
      },
    },
    handleError: {
      name: 'handleError',
      description: 'Callback function to handle errors.',
      control: false,
      table: {
        type: {
          summary: '() => void',
        },
      },
    },
    handleSuccess: {
      name: 'handleSuccess',
      description: 'Callback function to handle success.',
      control: false,
      table: {
        type: {
          summary: '() => void',
        },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof ReactionButton>

export const DefaultComments: Story = {
  name: 'Default ReactionButton',
  parameters: {
    mockResolvers,
  },
}
