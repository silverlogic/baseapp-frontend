import { WithControllerProps } from '@baseapp-frontend/utils'

import { Meta, StoryObj } from '@storybook/react'

import Searchbar from '..'
import { SearchbarProps } from '../types'

const meta: Meta<WithControllerProps<SearchbarProps>> = {
  title: '@baseapp-frontend | designSystem/Inputs/Searchbar',
  component: Searchbar,
}

export default meta

type Story = StoryObj<SearchbarProps>

export const Default: Story = {
  args: {
    isPending: false,
  },
}
