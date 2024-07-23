import { FC } from 'react'

import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

import Dialog from '../Dialog'
import { ConfirmDialogProps } from './types'

const ConfirmDialog: FC<ConfirmDialogProps> = ({
  title,
  content,
  action,
  cancelText = 'Cancel',
  onClose,
  ...props
}) => (
  <Dialog fullWidth onClose={onClose} customMaxWidth={366} {...props}>
    <DialogTitle variant="h6">{title}</DialogTitle>
    {content && (
      <DialogContent
        sx={{
          typography: 'body1',
          color: 'text.secondary',
        }}
      >
        {content}
      </DialogContent>
    )}
    <DialogActions
      sx={{
        '& > .MuiButtonBase-root': {
          width: 'fit-content',
        },
      }}
    >
      <Button variant="outlined" color="inherit" onClick={onClose}>
        {cancelText}
      </Button>
      {action}
    </DialogActions>
  </Dialog>
)

export default ConfirmDialog
