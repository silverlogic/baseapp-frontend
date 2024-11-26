import { useTransition } from 'react'

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
    refetch: {
      action: 'refetch query',
      description: 'The refetch function provided by the graphql query hook.',
      table: {
        type: { summary: 'VoidFunction' },
      },
    },
    startTransition: {
      action: 'start transition',
      description: 'The transition function provided by the transition hook.',
      table: {
        type: { summary: 'VoidFunction' },
      },
    },
  },
} as Meta<SearchbarProps>

type Story = StoryObj<SearchbarProps>

const SearchbarTemplate = (args: any) => {
  const [, startTransition] = useTransition()

  const refetch = () => {}

  return <Searchbar refetch={refetch} startTransition={startTransition} {...args} />
}

export const Default: Story = {
  args: {
    isPending: false,
  },
  render: (args) => <SearchbarTemplate {...args} />,
}
