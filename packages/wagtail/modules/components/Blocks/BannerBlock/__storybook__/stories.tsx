import type { Meta, StoryObj } from '@storybook/react'

import BannerBlock from '..'
import { mockBannerBlockProps } from './mockBannerBlockProps'

const meta: Meta<typeof BannerBlock> = {
  title: '@baseapp-frontend | wagtail/Blocks/BannerBlock',
  component: BannerBlock,
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: 'The value returned from the Wagtail API.',
      table: {
        type: {
          summary: 'IBannerBlockValue',
        },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof BannerBlock>

export const DefaultBannerBlock: Story = {
  name: 'Default BannerBlock',
  args: {
    ...mockBannerBlockProps,
  },
}
