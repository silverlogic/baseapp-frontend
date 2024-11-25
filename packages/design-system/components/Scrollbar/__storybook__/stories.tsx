import Box from '@mui/material/Box'
import { Meta, StoryObj } from '@storybook/react'

import Scrollbar from '..'
import { ScrollbarProps } from '../types'

export default {
  title: '@baseapp-frontend | designSystem/General/Scrollbar',
  component: Scrollbar,
} as Meta<ScrollbarProps>

type Story = StoryObj<ScrollbarProps>

export const Default: Story = {
  args: {
    children: (
      <Box
        sx={{
          width: 300,
          height: 300,
          border: '1px solid',
          borderColor: 'grey.300',
          borderRadius: 2,
          padding: 2,
        }}
      >
        {Array.from({ length: 30 }, (_, i) => (
          <div key={i} style={{ padding: '4px 0' }}>
            Item {i + 1}
          </div>
        ))}
      </Box>
    ),
  },
  render: (args) => <Scrollbar {...args} sx={{ width: 300, height: 300 }} />,
}
