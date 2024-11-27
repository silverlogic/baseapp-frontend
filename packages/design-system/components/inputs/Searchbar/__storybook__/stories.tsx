import { Meta, StoryObj } from '@storybook/react'

import Searchbar from '..'
import { SearchbarProps } from '../types'

export default {
  title: '@baseapp-frontend | designSystem/Searchbar',
  component: Searchbar,
  tags: ['autodocs'],
  argTypes: {
    isPending: {
      control: 'boolean',
      description: 'Loading state provided by the transition hook.',
    },
    onClear: {
      action: 'clear search',
      description: 'Function to clear the search input.',
      table: {
        type: { summary: 'VoidFunction' },
      },
    },
    onChange: {
      action: 'change input',
      description: 'Function to handle input change.',
      table: {
        type: { summary: 'NonUndefined<TextFieldProps["onChange"]>' },
      },
    },
  },
} as Meta<SearchbarProps>

type Story = StoryObj<SearchbarProps>

export const Default: Story = {
  args: {
    isPending: false,
  },
}