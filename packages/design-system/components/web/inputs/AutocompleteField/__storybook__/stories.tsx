import { WithControllerProps } from '@baseapp-frontend/utils'

import { Meta, StoryObj } from '@storybook/react'

import AutocompleteField from '..'
import { AutocompleteFieldProps } from '../types'

const meta: Meta<WithControllerProps<AutocompleteFieldProps>> = {
  title: '@baseapp-frontend | designSystem/Inputs/AutocompleteField',
  component: AutocompleteField,
}

export default meta

type Story = StoryObj<AutocompleteFieldProps>

export const Default: Story = {
  args: {
    isPending: false,
    placeholder: 'Search members by name or email',
    options: ['Alice', 'Bob', 'Charlie'],
  },
}

export const Loading: Story = {
  args: {
    isPending: true,
    placeholder: 'Search members by name or email',
    options: [],
  },
}
