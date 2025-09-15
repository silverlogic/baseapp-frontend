import { TextField } from '@mui/material'
import { Meta, StoryObj } from '@storybook/react'

import AutocompleteField from '..'
import { AutocompleteFieldProps } from '../types'

const meta: Meta<typeof AutocompleteField> = {
  title: '@baseapp-frontend | designSystem/Inputs/AutoCompleteField',
  component: AutocompleteField,
}

export default meta

type Story = StoryObj<AutocompleteFieldProps>

const sampleOptions = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Date', value: 'date' },
  { label: 'Elderberry', value: 'elderberry' },
]

export const Default: Story = {
  args: {
    options: sampleOptions,
    isPending: false,
    renderInput: (params: any) => (
      <TextField {...params} placeholder="Type to search..." label="Select a fruit" />
    ),
  },
}

export const WithLoading: Story = {
  args: {
    options: sampleOptions,
    isPending: true,
    renderInput: (params: any) => (
      <TextField {...params} placeholder="Loading options..." label="Select a fruit" />
    ),
  },
}

export const Disabled: Story = {
  args: {
    options: sampleOptions,
    disabled: true,
    isPending: false,
    renderInput: (params: any) => (
      <TextField {...params} placeholder="This field is disabled..." label="Disabled field" />
    ),
  },
}

export const FreeSolo: Story = {
  args: {
    options: sampleOptions,
    freeSolo: true,
    isPending: false,
    renderInput: (params: any) => (
      <TextField {...params} placeholder="Type or select a fruit..." label="Fruit selection" />
    ),
  },
}
