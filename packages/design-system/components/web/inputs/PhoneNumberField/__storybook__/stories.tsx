import { WithControllerProps } from '@baseapp-frontend/utils'

import { Meta, StoryObj } from '@storybook/react'

import PhoneNumberField from '..'
import { PhoneNumberFieldProps } from '../types'

const meta: Meta<WithControllerProps<PhoneNumberFieldProps>> = {
  title: '@baseapp-frontend | designSystem/Inputs/PhoneNumberField',
  component: PhoneNumberField,
}
export default meta

type Story = StoryObj<PhoneNumberFieldProps>

export const Default: Story = {
  args: {
    label: 'Phone Number',
    placeholder: 'Enter your phone number',
    defaultCountry: 'US',
  },
}
