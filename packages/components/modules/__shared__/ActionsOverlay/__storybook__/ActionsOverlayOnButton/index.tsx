import React, { RefAttributes } from 'react'

import { Button } from '@mui/material'

import ActionsOverlay from '../..'
import { ActionOverlayProps } from '../../types'

const ActionsOverlayOnButton = (
  props: Omit<ActionOverlayProps, 'ref'> & RefAttributes<HTMLDivElement>,
) => {
  const pageRef = React.useRef<HTMLDivElement>(null)
  return (
    <ActionsOverlay {...props} ref={pageRef}>
      <Button sx={{ width: 300, height: 150 }}>Button with overlay</Button>
    </ActionsOverlay>
  )
}

export default ActionsOverlayOnButton
