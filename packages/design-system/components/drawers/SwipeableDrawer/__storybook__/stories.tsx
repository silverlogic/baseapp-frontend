import { useState } from 'react'

import { Button, Typography } from '@mui/material'
import { Meta, StoryObj } from '@storybook/react'

import SwipeableDrawer from '..'
import { SwipeableDrawerProps } from '../types'

export default {
  title: '@baseapp-frontend | designSystem/Drawers/SwipeableDrawer',
  component: SwipeableDrawer,
  argTypes: {
    open: { control: 'boolean' },
    onClose: {
      action: 'closed',
      table: {
        type: { summary: 'VoidFunction' },
      },
    },
    onOpen: {
      action: 'opened',
      table: {
        type: { summary: 'VoidFunction' },
      },
    },
    children: {
      control: false,
      description: 'Content to be rendered inside the drawer.',
      table: { type: { summary: 'ReactNode' } },
    },
    globalHeight: { control: 'text', table: { type: { summary: 'string | number' } } },
  },
  tags: ['autodocs'],
} as Meta<SwipeableDrawerProps>

type Story = StoryObj<SwipeableDrawerProps>

const SwipeableDrawerTemplate = (args: any) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Button variant="outlined" onClick={handleOpen} style={{ width: '250px' }}>
        Open Swipeable Drawer
      </Button>
      <SwipeableDrawer {...args} open={open} onClose={handleClose} onOpen={handleOpen}>
        <Typography variant="body1" sx={{ p: 2 }}>
          This is the content of the Swipeable Drawer. You can put any components or content here.
        </Typography>
      </SwipeableDrawer>
    </>
  )
}

export const Default: Story = {
  render: (args) => <SwipeableDrawerTemplate {...args} />,
  args: {
    open: false,
    globalHeight: `calc(25% - 56px)`,
  },
}
