import { Meta, StoryObj } from '@storybook/react'

import Scrollbar from '..'
import { ScrollbarProps } from '../types'
import { DemoBox } from './styled'

const meta: Meta<ScrollbarProps> = {
  title: '@baseapp-frontend | designSystem/Scrollbars/Scrollbar',
  component: Scrollbar,
}

export default meta

type Story = StoryObj<ScrollbarProps>

export const Default: Story = {
  args: {
    children: (
      <DemoBox>
        {Array.from({ length: 30 }, (_, i) => (
          <div key={i} style={{ padding: '4px 0' }}>
            Item {i + 1}
          </div>
        ))}
      </DemoBox>
    ),
  },
  render: (args) => <Scrollbar {...args} sx={{ width: 300, height: 300 }} />,
}
