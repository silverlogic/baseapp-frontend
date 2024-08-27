import { useState } from 'react'

import { Button } from '@mui/material'
import { Meta, StoryObj } from '@storybook/react'

import Popover from '..'
import { MenuPopoverProps } from '../types'

export default {
  title: '@baseapp-frontend | designSystem/Popover/Popover',
  component: Popover,
  argTypes: {
    open: { control: 'boolean', table: { type: { summary: 'boolean' } } },
    arrow: {
      control: 'select',
      options: ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'left', 'right'],
      table: { type: { summary: 'string' } },
    },
    hiddenArrow: { control: 'boolean' },
    children: {
      control: false,
      description: 'Content to be rendered inside the popover component.',
      table: { type: { summary: 'ReactNode' } },
    },
  },
  tags: ['autodocs'],
} as Meta<MenuPopoverProps>

type Story = StoryObj<MenuPopoverProps>

const PopoverTemplate = (args: any) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '35vh',
      }}
    >
      <Button variant="outlined" onClick={handleClick} style={{ width: '250px' }}>
        Open Popover
      </Button>
      <Popover {...args} open={anchorEl} onClose={handleClose}>
        <div style={{ padding: '20px' }}>This is the content of the Popover</div>
      </Popover>
    </div>
  )
}

export const TopRight: Story = {
  render: (args) => <PopoverTemplate {...args} />,
  args: {
    open: null,
    arrow: 'top-right',
    hiddenArrow: false,
  },
}

export const TopLeft: Story = {
  render: (args) => <PopoverTemplate {...args} />,
  args: {
    open: null,
    arrow: 'top-left',
    hiddenArrow: false,
  },
}

export const BottomRight: Story = {
  render: (args) => <PopoverTemplate {...args} />,
  args: {
    open: null,
    arrow: 'bottom-right',
    hiddenArrow: false,
  },
}

export const BottomLeft: Story = {
  render: (args) => <PopoverTemplate {...args} />,
  args: {
    open: null,
    arrow: 'bottom-left',
    hiddenArrow: false,
  },
}

export const Left: Story = {
  render: (args) => <PopoverTemplate {...args} />,
  args: {
    open: null,
    arrow: 'left',
    hiddenArrow: false,
  },
}

export const Right: Story = {
  render: (args) => <PopoverTemplate {...args} />,
  args: {
    open: null,
    arrow: 'right',
    hiddenArrow: false,
  },
}
