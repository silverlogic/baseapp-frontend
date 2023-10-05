import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '.'

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
}
export default meta

type Story = StoryObj<typeof Button>

export const ButtonPrimary: Story = {
  args: {
    children: 'My button',
    variant: 'contained',
  },
}

export const ButtonSecondary: Story = {
  args: {
    children: 'My button',
    variant: 'contained',
    color: 'secondary',
  },
}

export const ButtonFullwidth: Story = {
  args: {
    children: 'My button',
    fullWidth: true,
    variant: 'outlined',
  },
}

export const ButtonDisabled: Story = {
  args: {
    children: 'My button',
    variant: 'contained',
    disabled: true,
  },
}

export const ButtonLoading: Story = {
  args: {
    children: 'My button',
    loading: true,
    variant: 'outlined',
  },
}
