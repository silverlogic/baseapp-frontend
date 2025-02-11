'use client'

import { FC, MouseEventHandler } from 'react'

import { Box } from '@mui/material'

import IconButton from '../../buttons/IconButton'
import CloseIcon from '../../icons/CloseIcon'
import { StyledDialog } from './styled'
import { DialogProps } from './types'

const Dialog: FC<DialogProps> = ({ children, ...props }) => {
  const { onClose } = props

  const handleClose: MouseEventHandler<HTMLButtonElement> = (e) => {
    onClose?.(e, 'backdropClick')
  }

  return (
    <StyledDialog {...props}>
      {!!onClose && (
        <Box position="absolute" top={16} right={16} zIndex={1}>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      )}
      {children}
    </StyledDialog>
  )
}
export default Dialog
