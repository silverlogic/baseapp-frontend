import type { Meta, StoryObj } from '@storybook/react'

import PageTypes from '../..'
import PageTypesWithProvider from '../../__storybook__/PageTypesWithProvider'
import { mockCurrentPage } from './mockCurrentPage'

const meta: Meta<typeof PageTypes> = {
  title: '@baseapp-frontend | wagtail/PageTypes/StandardPage',
  component: PageTypesWithProvider,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof PageTypes>

export const DefaultRichTextBlock: Story = {
  name: 'Default StandardPage',
  args: {
    currentPage: mockCurrentPage,
  },
}
