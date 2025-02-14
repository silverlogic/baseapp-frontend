import { useState } from 'react'

import { Button } from '@mui/material'
import { Meta, StoryObj } from '@storybook/react'

import ConfirmDialog from '..'
import { ConfirmDialogProps } from '../types'

const meta: Meta<ConfirmDialogProps> = {
  title: '@baseapp-frontend | designSystem/Dialogs/ConfirmDialog',
  component: ConfirmDialog,
}

export default meta

type Story = StoryObj<ConfirmDialogProps>

const ConfirmDialogTemplate = (args: any) => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleConfirm = () => {
    alert('Confirmed')
    handleClose()
  }

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen} style={{ width: '250px' }}>
        Open Confirm Dialog
      </Button>
      <ConfirmDialog
        {...args}
        open={open}
        onClose={handleClose}
        action={
          <Button variant="contained" color="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        }
      />
    </>
  )
}

export const Default: Story = {
  render: (args) => <ConfirmDialogTemplate {...args} />,
  args: {
    title: 'Confirm Action',
    content: 'Are you sure you want to proceed with this action?',
    cancelText: 'Cancel',
  },
}
